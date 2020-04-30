const ProxyMonitor = require("../dist").default;
const axios = require("axios").default;
const ReportUrl =
  "https://www.urlshare.cn/qqqzonetest/miniapp/api/base_lib_report"; //x-wns-uin
const uin = "243597890";
const TruncatLen = 1000; //超过长度截断
const distinctMethodMap = new Map();
let reportLen = 100; //超过100条上报
const reportIntevalTime = 30000; //循环上报
let reportCache = [];
let from = "app"; //game app  为game后台会过滤只记录error
let sessionid = ""; //先发get请求，利用wnscgi在头部注入uin，后端拿到uin返回sessionid，后续上报用post请求带上sessionid
let appid = "1108100302";
let QUA = "V1_AND_SQ_8.2.8_0_RDM_B";
let originSetTimeout;
let useIdIndex1 = false; //设为true，apiid从1开始累加方便观察调试
let showReportLog = false; //设为true会打印report的log日志

const blackList = []; //这里面的api不会上报
const apiResultBlackList = []; //这里面的api的结果不会被继续代理
const platform = "android";

let ApiIdIndex = 1;
function getApiId() {
  if (useIdIndex1) {
    return ApiIdIndex++;
  }
  let random = Math.floor(Math.random() * 100000) + "";
  while (random.length < 5) {
    random = "0" + random;
  }
  return Date.now() + "_" + random;
}

function checkMethodFrequency(propertyName) {
  let list = distinctMethodMap.get(propertyName) || [];
  if (list.st) {
    clearTimeout(list.st);
  }
  list.st = originSetTimeout(function() {
    //防止distinctMethodMap越来越大
    distinctMethodMap.delete(propertyName);
  }, 2000);
  let now = Date.now();
  let sizeBeyond = list.length >= 5;
  let canReport = !sizeBeyond || now - list[0] > 1000; //5条，时间间隔少于1s不上报
  if (sizeBeyond) {
    list.shift();
  }
  list.push(now);
  distinctMethodMap.set(propertyName, list);
  return canReport;
}
function isInBlackList(property) {
  return blackList.includes(property);
}

function CSRFToken(str) {
  for (var i = 0, len = str.length, salt = 5388; i < len; ++i) {
    salt += salt + str.charAt(i).charCodeAt();
  }
  return salt & 0x7fffffff;
}

function getTruncatLenString(target) {
  if (!target) {
    return String(target);
  }
  return target.length > TruncatLen
    ? {
        type: "string",
        length: target.length,
        value: `${target.slice(0, TruncatLen)}...`
      }
    : target;
}
function truncatObjectProperty(target, level = 1) {
  try {
    if (!target) {
      return target;
    }
    let targetType = typeof target;
    if (targetType === "string") {
      return getTruncatLenString(target);
    }
    if (targetType === "function") {
      return "function";
    }
    let isObject = typeof target === "object";
    if (isObject) {
      let isArray = Array.isArray(target);
      let clone = isArray ? [] : {};
      if (level > 2) {
        return typeof target; //避免无限循环
      }
      Object.keys(target).forEach(key => {
        let value = truncatObjectProperty(target[key], level++);
        if (isArray) {
          clone.push(value);
        } else {
          clone[key] = value;
        }
      });
      return clone;
    }
  } catch (e) {
    console.error("truncatObjectProperty error", e);
    return "parse error:" + e.message;
  }
  return target;
}

let getSessionIdPromise;
function getInitData() {
  if (getSessionIdPromise) {
    return getSessionIdPromise;
  }
  getSessionIdPromise = axios({
    url: ReportUrl,
    method: "get",
    data: {
      _wnscgi: 1,
      platform,
      qua: QUA
    },
    headers: {
      "x-wns-uin": uin
    }
  }).then(res => {
    console.log("get res", res.data);
    let { data = {} } = res;
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }
    sessionid = data.sessionid;
    console.log("get report sessionid:" + JSON.stringify(data));
  });
  return getSessionIdPromise;
}

let reportSt,
  tmpTime,
  timeIndex = 0,
  unOkNum = 0;
function report_user_api(reportArg) {
  let {
    api,
    apiid = getApiid(), //session范围内的appid
    pid = "",
    parentApiName = "",
    traceid,
    traceApiName,
    args = {}, //用户参数 长的数据截断处理
    res = {}, //返回结果 长的数据截断处理
    ret = "ok", //ok fail cancel error ...
    callStartTime, //调用时间
    isView
  } = reportArg;
  api = "qq." + api;
  if (ret != "ok") {
    //非ok的时候都要限制最多条数
    unOkNum++;
    if (unOkNum > 400) {
      return;
    }
    // console.log('report not ok', ret)
  }
  if (tmpTime !== callStartTime) {
    timeIndex = 0;
  }
  tmpTime = callStartTime;
  callStartTime = callStartTime * 1000 + timeIndex++;
  let callEndTime = callStartTime + 1; //上报在函数执行前，这个callEndTime没意义，只是后台做展示需要这个字段
  if (from === "view") {
    wx.report_user_api(reportArg);
    return;
  }
  let isFrom = isView ? "view" : from;
  apiid = apiid + "";
  getInitData();

  let reportData = {
    api,
    apiid,
    traceid,
    pid,
    parentApiName,
    traceApiName,
    args,
    res,
    ret,
    callStartTime,
    callEndTime
  };
  if (showReportLog) {
    console.log("report_app_api", reportData);
  }
  reportCache.push(reportData);
  function report() {
    let reportList = reportCache;
    if (reportList.length <= 0) {
      return;
    }
    reportCache = [];
    getInitData().then(function() {
      let time = Date.now();
      let reportData = {
        time: Date.now(),
        QUA,
        appid,
        from: isFrom,
        sessionid,
        signatrue: CSRFToken(time + "")
      };
      reportData.list = reportList;
      // console.log('report data', isFrom, platform, sessionid, appid, reportList.length)

      axios({
        url: ReportUrl,
        data: reportData,
        method: "post"
      }).then(res => {
        console.log("report res", res.data);
      });
    });
  }
  if (reportCache.length >= reportLen) {
    report();
  }
  if (!reportSt) {
    reportSt = setInterval(report, reportIntevalTime); //循环上报
  }
}

const ProxyReport = {
  /**
   *
   * @param {*} target hook对象
   */
  getProxy(target) {
    // return target
    originSetTimeout = setTimeout;
    let monitor = new ProxyMonitor(target, {
      getApiId,
      hookSetTimeout: setTimeout,
      report(data) {
        if (!checkMethodFrequency(data.apiName)) {
          return;
        }
        let ret = "ok";
        let { property, apiName } = data;
        if (apiName.endsWith(":exception")) {
          ret = "exception";
        } else if (apiName === "errorLog") {
          ret = "errorLog";
        }
        report_user_api({
          api: data.apiName,
          apiid: data.apiId, //session范围内的appid
          pid: data.pid,
          parentApiName: data.parentApiName,
          traceid: data.traceId,
          traceApiName: data.traceApiName,
          args: truncatObjectProperty(data.args), //用户参数 长的数据截断处理
          res: truncatObjectProperty(data.res), //返回结果 长的数据截断处理
          ret,
          callStartTime: data.time //调用时间
        });
      },
      shouldHandleMethod(target, rootProperty, property) {
        if (isInBlackList(property)) {
          return false;
        }
        return true;
      },
      shouldHandleResult(target, rootProperty, property) {
        if (apiResultBlackList.includes(property)) {
          return false;
        }
        return true;
      },
      autoAddCallbackProperties: ["success", "fail", "cancel", "complete"]
    });
    let proxy = monitor.proxy;
    setTimeout = monitor.setTimeout;
    return proxy;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = ProxyReport;
}

let SDK = {
  api1sync(cbk) {
    cbk();
  },
  api2async(cbk) {
    setTimeout(function() {
      cbk();
    }, 100);
  },
  api3sync() {
  },
  api5sync(cbk) {
    cbk();
  },
  api6sync() {}
};
SDK = ProxyReport.getProxy(SDK);

SDK.api1sync(() => {
  SDK.api2async(() => {
    SDK.api3sync();
  });
  SDK.api5sync(() => {
    SDK.api6sync();
  });
});
