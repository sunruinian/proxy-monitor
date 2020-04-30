
// 很多问题是开发者没有传fail回调不知道出错引起的
export const autoAddCallbackProperties = ['success', 'fail'];
export const argPropertyCbkCheckNames = ['success', 'fail']; // 这两个回调方法，检查回调超时
export const apiCbkDefaultTimeout = 3000; // api类回调超时时间
export const eventCbkDefaultTimeout = 300000; // 事件类回调超时时间
export const TruncatLen = 1000; // 字符串截断长度
export const ApiInfoMapMaxSize = 1000; // 记录setApiInfo存储的key，达到一定量把前面的删了
