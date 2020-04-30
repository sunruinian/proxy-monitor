import { TruncatLen } from './const';

/**
 * 截断字符串防止过长
 * @param target 截断目标
 */
function getTruncatLenString(target: string): string {
  if (!target) {
    return String(target);
  }
  return target.length > TruncatLen ? `${target.slice(0, TruncatLen)}...` : target;
}

/**
 * 截断目标防止过大
 * @param target 截断目标
 * @param level 递归层级
 */
function truncatObjectProperty(target: any, level = 1): any {
  try {
    if (!target) {
      return target;
    }
    let targetType = typeof target;
    if (targetType === 'string') {
      return getTruncatLenString(target);
    }
    if (targetType === 'function') {
      return 'function';
    }
    let isObject = typeof target === 'object';
    if (isObject) {
      let isArray = Array.isArray(target);
      let clone: any = isArray ? [] : {};
      if (level > 2) {
        return typeof target; // 避免无限循环
      }
      Object.keys(target).forEach((key) => {
        let value: any = truncatObjectProperty(target[key], level + 1);
        if (isArray) {
          clone.push(value);
        } else {
          clone[key] = value;
        }
      });
      return clone;
    }
  } catch (e) {
    console.error('truncatObjectProperty error', e);
    return 'parse error:' + e.message;
  }
  return target;
}

/**
 * 判断能否被代理
 * @param  target 检查对象
 */
function checkCanBeProxy(target: any): boolean {
  return (
    !!target &&
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
function isArrayBufferOrViewOrArray(target: any): boolean {
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
export default {
  truncatObjectProperty,
  checkCanBeProxy
};
