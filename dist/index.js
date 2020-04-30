(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/const.ts":
/*!**********************!*\
  !*** ./src/const.ts ***!
  \**********************/
/*! exports provided: autoAddCallbackProperties, argPropertyCbkCheckNames, apiCbkDefaultTimeout, eventCbkDefaultTimeout, TruncatLen, ApiInfoMapMaxSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoAddCallbackProperties", function() { return autoAddCallbackProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "argPropertyCbkCheckNames", function() { return argPropertyCbkCheckNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiCbkDefaultTimeout", function() { return apiCbkDefaultTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventCbkDefaultTimeout", function() { return eventCbkDefaultTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TruncatLen", function() { return TruncatLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiInfoMapMaxSize", function() { return ApiInfoMapMaxSize; });
// 很多问题是开发者没有传fail回调不知道出错引起的
var autoAddCallbackProperties = ['success', 'fail'];
var argPropertyCbkCheckNames = ['success', 'fail']; // 这两个回调方法，检查回调超时
var apiCbkDefaultTimeout = 3000; // api类回调超时时间
var eventCbkDefaultTimeout = 300000; // 事件类回调超时时间
var TruncatLen = 1000; // 字符串截断长度
var ApiInfoMapMaxSize = 1000; // 记录setApiInfo存储的key，达到一定量把前面的删了


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/const.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};


function emptyFunc() { }
var OriginalMap = Map; //在某个小游戏里Map被重写了，导致下面代码出问题
var ProxyMonitor = /** @class */ (function () {
    function ProxyMonitor(target, options) {
        this.parentIdMap = new OriginalMap();
        this.apiInfoMap = new OriginalMap();
        this.apiTagMap = new OriginalMap();
        if (!_util__WEBPACK_IMPORTED_MODULE_1__["default"].checkCanBeProxy(target)) {
            console.warn('ProxyMonitorError:target can not be Proxied');
            this.proxy = target;
            this.isProxied = false;
            return;
        }
        this.isProxied = true;
        this.options = __assign({}, options);
        this.options.shouldHandleMethod = this.options.shouldHandleMethod || (function () { return true; });
        this.options.shouldHandleResult = this.options.shouldHandleResult || (function () { return true; });
        this.options.shouldReportPropertySet = this.options.shouldReportPropertySet || (function () { return false; });
        this.options.report = this.options.report || (function () { return undefined; });
        this.options.apiCbkTimeout = this.options.apiCbkTimeout || _const__WEBPACK_IMPORTED_MODULE_0__["apiCbkDefaultTimeout"]; // 回调超时时间
        this.options.eventCbkTimeout = this.options.eventCbkTimeout || _const__WEBPACK_IMPORTED_MODULE_0__["eventCbkDefaultTimeout"]; // 回调超时时间
        this.options.getApiId =
            this.options.getApiId ||
                (function () {
                    var index = 0;
                    return function () {
                        return String(index++);
                    };
                })();
        if (this.options.hookSetTimeout) {
            this.setTimeout = this.dealSetTimeoutOrSetInterval(this.options.hookSetTimeout, 'setTimeout');
        }
        if (this.options.hookSetInterval) {
            this.setInterval = this.dealSetTimeoutOrSetInterval(this.options.hookSetInterval, 'setInterval');
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
    ProxyMonitor.prototype.addApiInfo = function (key, value) {
        this.apiInfoMap.set(key, value);
        this.apiInfoKeys.push(key);
        while (this.apiInfoKeys.length > _const__WEBPACK_IMPORTED_MODULE_0__["ApiInfoMapMaxSize"]) {
            var firstKey = this.apiInfoKeys.shift();
            this.apiInfoMap.delete(firstKey);
        }
    };
    ProxyMonitor.prototype.hookConsoleError = function () {
        var _this = this;
        var originConsoleError = console.error;
        var desc = Object.getOwnPropertyDescriptor(console, 'error');
        if (!desc.writable) {
            console.warn('console.error不可被hook'); // ide的真机调试里console.error不可被修改
            return;
        }
        console.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var pid = _this.callPaths[_this.callPaths.length - 1];
            _this.report({
                apiName: 'ConsoleError',
                apiId: _this.options.getApiId(),
                pid: pid,
                args: args,
                ret: 'errorLog' // errorLog还可以有console.error之外的情况
            });
            originConsoleError.apply(console, args);
        };
    };
    ProxyMonitor.prototype.dealSetTimeoutOrSetInterval = function (func, apiName) {
        var _this = this;
        return function (cbk, delay) {
            if (delay === void 0) { delay = 0; }
            var pid = _this.callPaths[_this.callPaths.length - 1];
            var newCbk = cbk;
            if (pid && _this.apiInfoMap.get(pid).isCbk) {
                var setTimoutApiId_1 = _this.options.getApiId();
                _this.addApiInfo(setTimoutApiId_1, {
                    name: apiName,
                    time: Date.now(),
                    isCbk: false,
                    isFinish: false
                });
                _this.report({
                    apiName: apiName,
                    apiId: setTimoutApiId_1,
                    pid: pid,
                    ret: 'ok'
                });
                newCbk = function () {
                    var setCbkApiId = _this.options.getApiId();
                    var funcPid = setTimoutApiId_1;
                    _this.callPaths.push(setCbkApiId);
                    var funcApi = apiName + ':callback';
                    _this.addApiInfo(setCbkApiId, {
                        name: funcApi,
                        time: Date.now(),
                        isCbk: true,
                        isFinish: false
                    });
                    _this.report({
                        apiId: setCbkApiId,
                        apiName: funcApi,
                        pid: funcPid,
                        ret: 'ok'
                    });
                    cbk();
                    _this.callPaths.splice(_this.callPaths.length - 1, 1);
                };
            }
            return func(newCbk, delay);
        };
    };
    ProxyMonitor.prototype.report = function (reportParams) {
        var apiId = reportParams.apiId, apiName = reportParams.apiName, property = reportParams.property, pid = reportParams.pid, _a = reportParams.args, args = _a === void 0 ? [] : _a, res = reportParams.res, _b = reportParams.isAsync, isAsync = _b === void 0 ? null : _b, _c = reportParams.ret, ret = _c === void 0 ? 'ok' : _c;
        apiId = String(apiId);
        var traceId = apiId;
        var parentApiName;
        var traceApiName = apiName;
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
        var apiPrefix = this.options.apiPrefix;
        if (apiPrefix) {
            apiName = apiPrefix + '.' + apiName;
            traceApiName = apiPrefix + '.' + traceApiName;
            if (parentApiName) {
                parentApiName = apiPrefix + '.' + parentApiName;
            }
        }
        var reportData = {
            apiId: apiId,
            apiName: apiName,
            property: property,
            pid: pid,
            parentApiName: parentApiName,
            traceId: traceId,
            traceApiName: traceApiName,
            args: _util__WEBPACK_IMPORTED_MODULE_1__["default"].truncatObjectProperty(args),
            res: _util__WEBPACK_IMPORTED_MODULE_1__["default"].truncatObjectProperty(res),
            ret: ret,
            isAsync: isAsync,
            time: Date.now()
        };
        this.options.report(reportData);
    };
    /**
     * 对API的参数（回调函数）进行包装
     * @param target 目标对象
     * @param func 原函数
     * @param apiName 上报显示的名字
     * @param pid 父id
     * @param property 属性名 有属性名，是方法参数的属性，如小程序success、fail、complete
     */
    ProxyMonitor.prototype.getArgFuncHook = function (target, func, apiName, pid, property, argProperty) {
        return function () {
            var _this = this;
            var cbkArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                cbkArgs[_i] = arguments[_i];
            }
            var multiCallRes = '';
            var orderWarnRes = '';
            var asyncWarnRes = '';
            var isAsync = null;
            var parentApiInfo = this.apiInfoMap.get(pid);
            if (parentApiInfo) {
                var cbkCalledList = parentApiInfo.cbkCalledList, checkTimeoutSt = parentApiInfo.checkTimeoutSt, isFinish = parentApiInfo.isFinish;
                isAsync = isFinish;
                if (checkTimeoutSt) {
                    clearTimeout(checkTimeoutSt);
                }
                if (_const__WEBPACK_IMPORTED_MODULE_0__["argPropertyCbkCheckNames"].includes(argProperty)) {
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
                if (cbkCalledList.filter(function (item) { return _const__WEBPACK_IMPORTED_MODULE_0__["argPropertyCbkCheckNames"].includes(item); }).length > 1) {
                    multiCallRes = '回调success、fail被重复调用';
                }
            }
            var apiId = this.options.getApiId();
            var proxyCbkArgs = cbkArgs.map(function (arg, index) {
                return _util__WEBPACK_IMPORTED_MODULE_1__["default"].checkCanBeProxy(arg) // 参数为数组，ArrayBuffer，DataView不做处理
                    ? new Proxy(arg, _this.getHandler(apiName + ":args[" + index + "]", apiId))
                    : arg;
            });
            this.addApiInfo(apiId, {
                name: apiName,
                time: Date.now(),
                isCbk: true,
                isFinish: false
            });
            this.report({
                apiId: apiId,
                apiName: apiName,
                property: argProperty,
                pid: pid,
                args: cbkArgs,
                isAsync: isAsync,
                ret: argProperty === 'fail'
                    ? 'fail'
                    : property === 'onError' ||
                        property === 'onSocketError' ||
                        property === 'onUpdateFailed'
                        ? 'onError'
                        : 'ok'
            });
            this.callPaths.push(apiId);
            var warnReport = function (warnRet, warnRes) {
                _this.report({
                    apiId: _this.options.getApiId(),
                    apiName: apiName + ':' + warnRet,
                    ret: warnRet,
                    res: warnRes,
                    property: argProperty,
                    pid: pid
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
                var res = func.apply(target, proxyCbkArgs);
                this.callPaths.splice(this.callPaths.length - 1, 1);
                this.apiInfoMap.get(apiId).isFinish = true;
                return res;
            }
            catch (err) {
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
    };
    /**
     * 对API进行包装
     * @param target 原对象
     * @param rootProperty 上层属性组装名
     * @param property 属性名
     */
    ProxyMonitor.prototype.getFuncHook = function (target, rootProperty, property) {
        var funcTarget = target[property];
        var propertyName = "" + (rootProperty ? rootProperty + '.' : '') + property;
        if (this.options.useApiTag) {
            var tag = this.apiTagMap.get(property) || 0;
            propertyName = propertyName + ':' + tag++;
            this.apiTagMap.set(property, tag);
        }
        // tslint:disable-next-line: no-this-assignment
        var self = this;
        return function warpFunc() {
            var funcArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                funcArgs[_i] = arguments[_i];
            }
            var newArgs = [];
            var apiId = self.options.getApiId();
            var pid = self.callPaths[self.callPaths.length - 1];
            var checkTimeoutSt = null;
            function setCallbackTimeoutSt(isArgProperty) {
                if (!checkTimeoutSt) {
                    checkTimeoutSt = setTimeout(function () {
                        var ret = isArgProperty ? 'timeout' : 'timeout_maybe';
                        self.report({
                            apiName: propertyName + ':' + ret,
                            apiId: self.options.getApiId(),
                            property: property,
                            pid: apiId,
                            args: funcArgs,
                            res: "\u7B49\u5F85\u56DE\u8C03\u8D85\u8FC7\u4E86" + self.options.apiCbkTimeout + "\u79D2",
                            ret: ret
                        });
                    }, isArgProperty ? self.options.apiCbkTimeout : self.options.eventCbkTimeout // 事件超时，设置时间长些，api回调由外界传参指定
                    );
                }
            }
            // 一般方法参数里的回调和方法参数属性的回调，不会同时存在。有这种情况的话再对超时检查作调整
            funcArgs.forEach(function (arg, index) {
                var argType = typeof arg;
                if (argType === 'function') {
                    if (!arg.__hook_new_func) {
                        setCallbackTimeoutSt(false);
                        var apiName = propertyName + ":args[" + index + "]:callback";
                        arg.__hook_new_func = self.getArgFuncHook(null, arg, apiName, apiId, property, '');
                    }
                    newArgs.push(arg.__hook_new_func);
                }
                else if (_util__WEBPACK_IMPORTED_MODULE_1__["default"].checkCanBeProxy(arg)) {
                    var funcHandledMap_1 = new OriginalMap();
                    var argKeys = Reflect.ownKeys(arg);
                    for (var _i = 0, argKeys_1 = argKeys; _i < argKeys_1.length; _i++) {
                        var key = argKeys_1[_i];
                        if (_const__WEBPACK_IMPORTED_MODULE_0__["argPropertyCbkCheckNames"].includes(String(key))) {
                            setCallbackTimeoutSt(true);
                            break;
                        }
                    }
                    var newObj = new Proxy(arg, {
                        get: function (target, argProperty) {
                            try {
                                var propertyValue = target[argProperty];
                                var isAutoAdd = false;
                                if (propertyValue === undefined &&
                                    _const__WEBPACK_IMPORTED_MODULE_0__["autoAddCallbackProperties"].includes(argProperty)) {
                                    // tslint:disable-next-line: only-arrow-functions
                                    propertyValue = emptyFunc;
                                    isAutoAdd = true;
                                }
                                if (typeof propertyValue === 'function') {
                                    if (!funcHandledMap_1.has(argProperty)) {
                                        // 防止被多次get hook @todo 补充测试案例
                                        var apiName = propertyName + ":args[" + index + "]." + argProperty + (isAutoAdd ? ':autoadd' : '') + ":callback";
                                        funcHandledMap_1.set(argProperty, self.getArgFuncHook(target, propertyValue, apiName, apiId, property, argProperty));
                                    }
                                    return funcHandledMap_1.get(argProperty);
                                }
                                return propertyValue;
                            }
                            catch (e) {
                                console.warn('proxy handler get property faild', property, argProperty, e.message);
                                return target[argProperty];
                            }
                        }
                    });
                    newArgs.push(newObj);
                }
                else {
                    newArgs.push(arg);
                }
            });
            self.addApiInfo(apiId, {
                name: propertyName,
                time: Date.now(),
                isCbk: false,
                isFinish: false,
                checkTimeoutSt: checkTimeoutSt,
                cbkCalledList: []
            });
            self.report({
                apiName: propertyName,
                apiId: apiId,
                property: property,
                pid: pid,
                args: funcArgs,
                ret: 'ok'
            });
            self.callPaths.push(apiId);
            try {
                var callResult = void 0;
                if (warpFunc.prototype === this.__proto__) {
                    callResult = new (funcTarget.bind.apply(funcTarget, __spreadArrays([void 0], newArgs)))();
                }
                else {
                    callResult = funcTarget.apply(target, newArgs);
                }
                self.callPaths.splice(self.callPaths.length - 1, 1);
                self.apiInfoMap.get(apiId).isFinish = true;
                callResult =
                    _util__WEBPACK_IMPORTED_MODULE_1__["default"].checkCanBeProxy(callResult) &&
                        self.options.shouldHandleResult(callResult, rootProperty, property)
                        ? new Proxy(callResult, self.getHandler(propertyName, apiId))
                        : callResult;
                return callResult;
            }
            catch (err) {
                self.callPaths.splice(self.callPaths.length - 1, 1);
                self.apiInfoMap.get(apiId).isFinish = true;
                self.report({
                    apiName: propertyName + ':exception',
                    apiId: self.options.getApiId(),
                    property: property,
                    pid: apiId,
                    res: err.message,
                    ret: 'exception'
                });
                throw err;
            }
        };
    };
    /**
     * 生成handler，用于创建代理对象
     * @param rootProperty 上层属性组装名
     * @param pid 父id
     */
    ProxyMonitor.prototype.getHandler = function (rootProperty, pid) {
        var _this = this;
        return {
            get: function (target, property, receiver) {
                try {
                    var propertyValue = Reflect.get(target, property, receiver);
                    if (typeof property === 'symbol') {
                        return propertyValue;
                    }
                    if (typeof propertyValue !== 'function') {
                        return propertyValue;
                    }
                    if (!_this.options.shouldHandleMethod(target, rootProperty, property)) {
                        return propertyValue;
                    }
                    return _this.getFuncHook(target, rootProperty, property).bind(target);
                }
                catch (e) {
                    // 一般是属性非对象自身属性的情况
                    return target[property];
                }
            },
            set: function (target, property, value, receiver) {
                try {
                    if (_this.options.shouldReportPropertySet(target, rootProperty, property)) {
                        _this.report({
                            apiId: _this.options.getApiId(),
                            apiName: "" + (rootProperty ? rootProperty + '.' : '') + property + ".set",
                            property: property,
                            args: [value],
                            pid: pid,
                            ret: 'ok'
                        });
                    }
                    return Reflect.set(target, property, value, receiver);
                }
                catch (e) {
                    try {
                        target[property] = value;
                        return true;
                    }
                    catch (e) {
                        console.error('proxy handler set property error', property, target);
                        return false;
                    }
                }
            }
        };
    };
    return ProxyMonitor;
}());
/* harmony default export */ __webpack_exports__["default"] = (ProxyMonitor);


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/const.ts");

/**
 * 截断字符串防止过长
 * @param target 截断目标
 */
function getTruncatLenString(target) {
    if (!target) {
        return String(target);
    }
    return target.length > _const__WEBPACK_IMPORTED_MODULE_0__["TruncatLen"] ? target.slice(0, _const__WEBPACK_IMPORTED_MODULE_0__["TruncatLen"]) + "..." : target;
}
/**
 * 截断目标防止过大
 * @param target 截断目标
 * @param level 递归层级
 */
function truncatObjectProperty(target, level) {
    if (level === void 0) { level = 1; }
    try {
        if (!target) {
            return target;
        }
        var targetType = typeof target;
        if (targetType === 'string') {
            return getTruncatLenString(target);
        }
        if (targetType === 'function') {
            return 'function';
        }
        var isObject = typeof target === 'object';
        if (isObject) {
            var isArray_1 = Array.isArray(target);
            var clone_1 = isArray_1 ? [] : {};
            if (level > 2) {
                return typeof target; // 避免无限循环
            }
            Object.keys(target).forEach(function (key) {
                var value = truncatObjectProperty(target[key], level + 1);
                if (isArray_1) {
                    clone_1.push(value);
                }
                else {
                    clone_1[key] = value;
                }
            });
            return clone_1;
        }
    }
    catch (e) {
        console.error('truncatObjectProperty error', e);
        return 'parse error:' + e.message;
    }
    return target;
}
/**
 * 判断能否被代理
 * @param  target 检查对象
 */
function checkCanBeProxy(target) {
    return (!!target &&
        typeof target === 'object' &&
        !isArrayBufferOrViewOrArray(target) &&
        typeof Proxy === 'function' &&
        Object.prototype.toString.call(new Proxy({}, {})) === Object.prototype.toString.call({}) // ios 10 返回的是 [object ProxyObject]
    );
}
/**
 * 检查目标对象是否是Array、ArrayBuffer、DataView
 * @param target 目标对象
 */
function isArrayBufferOrViewOrArray(target) {
    if (typeof target !== 'object') {
        return false;
    }
    if (Array.isArray(target)) {
        return true;
    }
    if (target instanceof ArrayBuffer) {
        return true;
    }
    if (ArrayBuffer.isView(target)) {
        return true;
    }
    return false;
}
/* harmony default export */ __webpack_exports__["default"] = ({
    truncatObjectProperty: truncatObjectProperty,
    checkCanBeProxy: checkCanBeProxy
});


/***/ })

/******/ })));
//# sourceMappingURL=index.js.map