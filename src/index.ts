import {
  apiCbkDefaultTimeout,
  ApiInfoMapMaxSize,
  argPropertyCbkCheckNames,
  autoAddCallbackProperties,
  eventCbkDefaultTimeout
} from './const';
import { ApiInfo, Options, ReportData, ReportParam } from './interface';
import util from './util';
function emptyFunc() {}
const OriginalMap = Map; //在某个小游戏里Map被重写了，导致下面代码出问题
export default class ProxyMonitor {
  public setTimeout?: any;
  public setInterval?: any;
  public proxy: object;
  public isProxied: boolean;
  // @todo DOM对象 处理
  private options: Options;
  private parentIdMap: Map<string, string> = new OriginalMap();
  private apiInfoMap: Map<string, ApiInfo> = new OriginalMap();
  private apiTagMap: Map<string, number> = new OriginalMap();
  private callPaths: string[];
  private apiInfoKeys: string[];
  public constructor(target: object, options: Options) {
    if (!util.checkCanBeProxy(target)) {
      console.warn('ProxyMonitorError:target can not be Proxied');
      this.proxy = target;
      this.isProxied = false;
      return;
    }
    this.isProxied = true;
    this.options = { ...options };
    this.options.shouldHandleMethod = this.options.shouldHandleMethod || (() => true);
    this.options.shouldHandleResult = this.options.shouldHandleResult || (() => true);
    this.options.shouldReportPropertySet = this.options.shouldReportPropertySet || (() => false);

    this.options.report = this.options.report || (() => undefined);
    this.options.apiCbkTimeout = this.options.apiCbkTimeout || apiCbkDefaultTimeout; // 回调超时时间
    this.options.eventCbkTimeout = this.options.eventCbkTimeout || eventCbkDefaultTimeout; // 回调超时时间
    this.options.getApiId =
      this.options.getApiId ||
      (() => {
        let index = 0;
        return () => {
          return String(index++);
        };
      })();
    if (this.options.hookSetTimeout) {
      this.setTimeout = this.dealSetTimeoutOrSetInterval(this.options.hookSetTimeout, 'setTimeout');
    }
    if (this.options.hookSetInterval) {
      this.setInterval = this.dealSetTimeoutOrSetInterval(
        this.options.hookSetInterval,
        'setInterval'
      );
    }
    if (this.options.shouldHookConsoleError) {
      this.hookConsoleError();
    }
    this.callPaths = []; // 方法调用栈
    this.apiInfoKeys = []; // 记录setApiInfo存储的key，达到一定量把前面的删了
    this.proxy = new Proxy(target, this.getHandler());
  }

  /**
   * 往apiInfoMap添加的时候，防止过大，删掉前面的元素
   * @param key ky
   * @param value value
   */
  private addApiInfo(key: string, value: ApiInfo) {
    this.apiInfoMap.set(key, value);
    this.apiInfoKeys.push(key);
    while (this.apiInfoKeys.length > ApiInfoMapMaxSize) {
      let firstKey = this.apiInfoKeys.shift();
      this.apiInfoMap.delete(firstKey);
    }
  }

  private hookConsoleError() {
    let originConsoleError = console.error;
    let desc = Object.getOwnPropertyDescriptor(console, 'error');
    if (!desc.writable) {
      console.warn('console.error不可被hook'); // ide的真机调试里console.error不可被修改
      return;
    }
    console.error = (...args: any[]) => {
      let pid: string = this.callPaths[this.callPaths.length - 1];
      this.report({
        apiName: 'ConsoleError',
        apiId: this.options.getApiId(),
        pid,
        args,
        ret: 'errorLog' // errorLog还可以有console.error之外的情况
      });
      originConsoleError.apply(console, args);
    };
  }
  private dealSetTimeoutOrSetInterval(func: any, apiName: string) {
    return (cbk: any, delay = 0) => {
      let pid: string = this.callPaths[this.callPaths.length - 1];
      let newCbk = cbk;
      if (pid && this.apiInfoMap.get(pid).isCbk) {
        let setTimoutApiId = this.options.getApiId();
        this.addApiInfo(setTimoutApiId, {
          name: apiName,
          time: Date.now(),
          isCbk: false,
          isFinish: false
        });
        this.report({
          apiName,
          apiId: setTimoutApiId,
          pid,
          ret: 'ok'
        });
        newCbk = () => {
          let setCbkApiId = this.options.getApiId();
          let funcPid = setTimoutApiId;
          this.callPaths.push(setCbkApiId);
          let funcApi = apiName + ':callback';
          this.addApiInfo(setCbkApiId, {
            name: funcApi,
            time: Date.now(),
            isCbk: true,
            isFinish: false
          });
          this.report({
            apiId: setCbkApiId,
            apiName: funcApi,
            pid: funcPid,
            ret: 'ok'
          });
          cbk();
          this.callPaths.splice(this.callPaths.length - 1, 1);
        };
      }
      return func(newCbk, delay);
    };
  }

  private report(reportParams: ReportParam) {
    let {
      apiId,
      apiName,
      property,
      pid,
      args = [],
      res,
      isAsync = null,
      ret = 'ok'
    } = reportParams;
    apiId = String(apiId);
    let traceId = apiId;
    let parentApiName: string;
    let traceApiName = apiName;
    if (pid && this.apiInfoMap.has(pid)) {
      this.parentIdMap.set(apiId, pid);
      parentApiName = this.apiInfoMap.get(pid).name;
      while (this.parentIdMap.has(traceId)) {
        traceId = this.parentIdMap.get(traceId);
      }
      if (this.apiInfoMap.has(traceId)) {
        traceApiName = this.apiInfoMap.get(traceId).name;
      }
    }
    let { apiPrefix } = this.options;

    if (apiPrefix) {
      apiName = apiPrefix + '.' + apiName;
      traceApiName = apiPrefix + '.' + traceApiName;
      if (parentApiName) {
        parentApiName = apiPrefix + '.' + parentApiName;
      }
    }
    let reportData: ReportData = {
      apiId,
      apiName,
      property,
      pid,
      parentApiName,
      traceId,
      traceApiName,
      args: util.truncatObjectProperty(args),
      res: util.truncatObjectProperty(res),
      ret,
      isAsync,
      time: Date.now()
    };
    this.options.report(reportData);
  }

  /**
   * 对API的参数（回调函数）进行包装
   * @param target 目标对象
   * @param func 原函数
   * @param apiName 上报显示的名字
   * @param pid 父id
   * @param property 属性名 有属性名，是方法参数的属性，如小程序success、fail、complete
   */
  private getArgFuncHook(
    target: object,
    func: any,
    apiName: string,
    pid: string,
    property: string,
    argProperty: string
  ) {
    return function (...cbkArgs: any[]) {
      let multiCallRes = '';
      let orderWarnRes = '';
      let asyncWarnRes = '';
      let isAsync = null;
      let parentApiInfo = this.apiInfoMap.get(pid);
      if (parentApiInfo) {
        let { cbkCalledList, checkTimeoutSt, isFinish } = parentApiInfo;
        isAsync = isFinish;
        if (checkTimeoutSt) {
          clearTimeout(checkTimeoutSt);
        }
        if (argPropertyCbkCheckNames.includes(argProperty)) {
          // 检查complete在success、fail之前
          if (cbkCalledList.includes('complete')) {
            orderWarnRes = 'complete在回调success、fail前被调用';
          }
          // success、fail期望是异步回调
          if (!isAsync) {
            asyncWarnRes = '异步接口同步回调了';
          }
        }

        if (argProperty) {
          cbkCalledList.push(argProperty);
        }
        // 检查success、fail重复调用
        if (
          cbkCalledList.filter((item: string) => argPropertyCbkCheckNames.includes(item)).length > 1
        ) {
          multiCallRes = '回调success、fail被重复调用';
        }
      }

      let apiId = this.options.getApiId();
      let proxyCbkArgs = cbkArgs.map((arg, index) =>
        util.checkCanBeProxy(arg) // 参数为数组，ArrayBuffer，DataView不做处理
          ? new Proxy(arg, this.getHandler(`${apiName}:args[${index}]`, apiId))
          : arg
      );
      this.addApiInfo(apiId, {
        name: apiName,
        time: Date.now(),
        isCbk: true,
        isFinish: false
      });

      this.report({
        apiId,
        apiName,
        property: argProperty,
        pid,
        args: cbkArgs,
        isAsync,
        ret:
          argProperty === 'fail'
            ? 'fail'
            : property === 'onError' ||
              property === 'onSocketError' ||
              property === 'onUpdateFailed'
            ? 'onError'
            : 'ok'
      });

      this.callPaths.push(apiId);

      let warnReport = (warnRet: string, warnRes: string) => {
        this.report({
          apiId: this.options.getApiId(),
          apiName: apiName + ':' + warnRet,
          ret: warnRet,
          res: warnRes,
          property: argProperty,
          pid
        });
      };
      // 回调警告上报放到cbk上报后面
      if (multiCallRes) {
        warnReport('cbkMultiWarn', multiCallRes);
      }
      if (orderWarnRes) {
        warnReport('cbkOrderWarn', orderWarnRes);
      }
      if (asyncWarnRes) {
        warnReport('cbkAsyncWarn', asyncWarnRes);
      }

      try {
        let res = func.apply(target, proxyCbkArgs);
        this.callPaths.splice(this.callPaths.length - 1, 1);
        this.apiInfoMap.get(apiId).isFinish = true;

        return res;
      } catch (err) {
        this.callPaths.splice(this.callPaths.length - 1, 1);
        this.apiInfoMap.get(apiId).isFinish = true;
        this.report({
          apiName: apiName + ':exception',
          apiId: this.options.getApiId(),
          property: argProperty,
          pid: apiId,
          res: err.message,
          ret: 'exception'
        });
        throw err;
      }
    }.bind(this);
  }

  /**
   * 对API进行包装
   * @param target 原对象
   * @param rootProperty 上层属性组装名
   * @param property 属性名
   */
  private getFuncHook(target: any, rootProperty: string, property: string) {
    let funcTarget = target[property];
    let propertyName = `${rootProperty ? rootProperty + '.' : ''}${property}`;
    if (this.options.useApiTag) {
      let tag = this.apiTagMap.get(property) || 0;
      propertyName = propertyName + ':' + tag++;
      this.apiTagMap.set(property, tag);
    }
    // tslint:disable-next-line: no-this-assignment
    let self = this;
    return function warpFunc(...funcArgs: any[]) {
      let newArgs: any[] = [];
      let apiId = self.options.getApiId();
      let pid = self.callPaths[self.callPaths.length - 1];
      let checkTimeoutSt: any = null;

      function setCallbackTimeoutSt(isArgProperty: boolean) {
        if (!checkTimeoutSt) {
          checkTimeoutSt = setTimeout(
            () => {
              let ret = isArgProperty ? 'timeout' : 'timeout_maybe';
              self.report({
                apiName: propertyName + ':' + ret,
                apiId: self.options.getApiId(),
                property,
                pid: apiId,
                args: funcArgs,
                res: `等待回调超过了${self.options.apiCbkTimeout}秒`,
                ret
              });
            },
            isArgProperty ? self.options.apiCbkTimeout : self.options.eventCbkTimeout // 事件超时，设置时间长些，api回调由外界传参指定
          );
        }
      }
      // 一般方法参数里的回调和方法参数属性的回调，不会同时存在。有这种情况的话再对超时检查作调整
      funcArgs.forEach((arg, index) => {
        let argType = typeof arg;
        if (argType === 'function') {
          if (!arg.__hook_new_func) {
            setCallbackTimeoutSt(false);
            let apiName = `${propertyName}:args[${index}]:callback`;
            arg.__hook_new_func = self.getArgFuncHook(null, arg, apiName, apiId, property, '');
          }
          newArgs.push(arg.__hook_new_func);
        } else if (util.checkCanBeProxy(arg)) {
          let funcHandledMap: Map<string, Function> = new OriginalMap();
          let argKeys = Reflect.ownKeys(arg);
          for (let key of argKeys) {
            if (argPropertyCbkCheckNames.includes(String(key))) {
              setCallbackTimeoutSt(true);
              break;
            }
          }
          let newObj = new Proxy(arg, {
            get: (target: any, argProperty: string) => {
              try {
                let propertyValue = target[argProperty];
                let isAutoAdd = false;
                if (
                  propertyValue === undefined &&
                  autoAddCallbackProperties.includes(argProperty)
                ) {
                  // tslint:disable-next-line: only-arrow-functions
                  propertyValue = emptyFunc;
                  isAutoAdd = true;
                }
                if (typeof propertyValue === 'function') {
                  if (!funcHandledMap.has(argProperty)) {
                    // 防止被多次get hook @todo 补充测试案例
                    let apiName = `${propertyName}:args[${index}].${argProperty}${
                      isAutoAdd ? ':autoadd' : ''
                    }:callback`;
                    funcHandledMap.set(
                      argProperty,
                      self.getArgFuncHook(
                        target,
                        propertyValue,
                        apiName,
                        apiId,
                        property,
                        argProperty
                      )
                    );
                  }
                  return funcHandledMap.get(argProperty);
                }
                return propertyValue;
              } catch (e) {
                console.warn('proxy handler get property faild', property, argProperty, e.message);
                return target[argProperty];
              }
            }
          });
          newArgs.push(newObj);
        } else {
          newArgs.push(arg);
        }
      });
      self.addApiInfo(apiId, {
        name: propertyName,
        time: Date.now(),
        isCbk: false,
        isFinish: false,
        checkTimeoutSt,
        cbkCalledList: []
      });
      self.report({
        apiName: propertyName,
        apiId,
        property,
        pid,
        args: funcArgs,
        ret: 'ok'
      });
      self.callPaths.push(apiId);
      try {
        let callResult;
        if (warpFunc.prototype === this.__proto__) {
          callResult = new funcTarget(...newArgs);
        } else {
          callResult = funcTarget.apply(target, newArgs);
        }
        self.callPaths.splice(self.callPaths.length - 1, 1);
        self.apiInfoMap.get(apiId).isFinish = true;
        callResult =
          util.checkCanBeProxy(callResult) &&
          self.options.shouldHandleResult(callResult, rootProperty, property)
            ? new Proxy(callResult, self.getHandler(propertyName, apiId))
            : callResult;
        return callResult;
      } catch (err) {
        self.callPaths.splice(self.callPaths.length - 1, 1);
        self.apiInfoMap.get(apiId).isFinish = true;
        self.report({
          apiName: propertyName + ':exception',
          apiId: self.options.getApiId(),
          property,
          pid: apiId,
          res: err.message,
          ret: 'exception'
        });
        throw err;
      }
    };
  }

  /**
   * 生成handler，用于创建代理对象
   * @param rootProperty 上层属性组装名
   * @param pid 父id
   */
  private getHandler(rootProperty?: string, pid?: string) {
    return {
      get: (target: any, property: string, receiver: object) => {
        try {
          let propertyValue = Reflect.get(target, property, receiver);
          if (typeof property === 'symbol') {
            return propertyValue;
          }
          if (typeof propertyValue !== 'function') {
            return propertyValue;
          }
          if (!this.options.shouldHandleMethod(target, rootProperty, property)) {
            return propertyValue;
          }
          return this.getFuncHook(target, rootProperty, property).bind(target);
        } catch (e) {
          // 一般是属性非对象自身属性的情况
          return target[property];
        }
      },
      set: (target: any, property: string, value: string, receiver: object) => {
        try {
          if (this.options.shouldReportPropertySet(target, rootProperty, property)) {
            this.report({
              apiId: this.options.getApiId(),
              apiName: `${rootProperty ? rootProperty + '.' : ''}${property}.set`,
              property,
              args: [value],
              pid,
              ret: 'ok'
            });
          }
          return Reflect.set(target, property, value, receiver);
        } catch (e) {
          try {
            target[property] = value;
            return true;
          } catch (e) {
            console.error('proxy handler set property error', property, target);
            return false;
          }
        }
      }
    };
  }
}
