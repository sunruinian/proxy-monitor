import ProxyMonitor from '../src/index';
import { SDK } from './SDK';

function checktParentChild(parent: any, child: any) {
  expect(parent).toBeDefined();
  expect(child).toBeDefined();
  expect(child.pid === parent.apiId);
  expect(child.traceId === parent.traceId);
}
describe('context test', () => {
  test('autoAddFailCallbackProperties', () => {
    let mockFnReport: any = jest.fn(() => {});
    let proxy: any = new ProxyMonitor(SDK, {
      report: mockFnReport
    }).proxy;
    proxy.argCallbackSync({});
    let { calls } = mockFnReport.mock;
    let cbkCall = calls.filter(
      (call: any[]) => call[0].apiName === 'argCallbackSync:args[0].fail:autoadd:callback'
    );
    expect(cbkCall.length).toBe(1);
  });

  test('api error', () => {
    let mockFnReport: any = jest.fn(() => {});
    let proxy: any = new ProxyMonitor(SDK, {
      report: mockFnReport
    }).proxy;
    try {
      proxy.errorApi();
    } catch (e) {
      console.log('error api error');
    }
    let { calls } = mockFnReport.mock;
    let cbkCall = calls.filter((call: any[]) => call[0].apiName === 'errorApi:exception');
    expect(cbkCall.length).toBe(1);
    expect(cbkCall[0][0].ret).toBe('exception');
  });
  test('console error', () => {
    let mockFnReport: any = jest.fn(() => {});
    let proxy: any = new ProxyMonitor(SDK, {
      report: mockFnReport
    }).proxy;
    proxy.argCallbackSync({
      success() {
        console.error('test error');
      }
    });
    let { calls } = mockFnReport.mock;
    let cbkCall = calls.filter(
      (call: any[]) => call[0].apiName === 'argCallbackSync:args[0].success:callback'
    );
    let errorCall = calls.filter((call: any[]) => call[0].apiName === 'console.error');
    checktParentChild(cbkCall, errorCall);
  });

  test('api cbk error', () => {
    let mockFnReport: any = jest.fn(() => {});
    let proxy: any = new ProxyMonitor(SDK, {
      report: mockFnReport
    }).proxy;
    try {
      proxy.errorApiCbk(() => {
        throw new Error('test');
      });
    } catch (e) {}
    let { calls } = mockFnReport.mock;
    let cbkCall = calls.filter(
      (call: any[]) => call[0].apiName === 'errorApiCbk:args[0]:callback:exception'
    );
    expect(cbkCall.length).toBe(1);
    expect(cbkCall[0][0].ret).toBe('exception');
  });

  describe('api and callback', () => {
    describe('sync', () => {
      test('event callback', () => {
        let mockFnReport: any = jest.fn(() => {});
        let proxy: any = new ProxyMonitor(SDK, {
          report: mockFnReport
        }).proxy;
        function cbk() {}
        proxy.api1sync(cbk);
        let { calls } = mockFnReport.mock;
        let apiCall = calls.filter((call: any[]) => call[0].apiName === 'api1sync')[0];
        let apiCbkCall = calls.filter(
          (call: any[]) => call[0].apiName === 'api1sync:args[0]:callback'
        )[0];
        checktParentChild(apiCall, apiCbkCall);
        expect(apiCbkCall[0].isAsync).toBe(false);
      });

      test('property callback', () => {
        let mockFnReport: any = jest.fn(() => {});
        let proxy: any = new ProxyMonitor(SDK, {
          report: mockFnReport
        }).proxy;
        function cbk() {}
        proxy.argCallbackSync({ fail: cbk });
        let { calls } = mockFnReport.mock;
        let apiCall = calls.filter((call: any[]) => call[0].apiName === 'argCallbackSync')[0];
        let apiCbkCall = calls.filter(
          (call: any[]) => call[0].apiName === 'argCallbackSync:args[0].fail:callback'
        )[0];
        let warnCall = calls.filter(
          (call: any[]) => call[0].apiName === 'argCallbackSync:args[0].fail:callback:cbkAsyncWarn'
        )[0];
        checktParentChild(apiCall, apiCbkCall);
        expect(apiCbkCall[0].isAsync).toBe(false);
        expect(warnCall.length).toBe(1);
        checktParentChild(apiCall, warnCall);
      });
    });

    describe('async', () => {
      test('event callback', async () => {
        let mockFnReport: any = jest.fn(() => {});
        let proxy: any = new ProxyMonitor(SDK, {
          report: mockFnReport
        }).proxy;
        await new Promise((resolve, reject) => {
          proxy.api2async(() => {
            resolve();
          });
        });
        let { calls } = mockFnReport.mock;
        let apiCall = calls.filter((call: any[]) => call[0].apiName === 'api2async')[0];
        let apiCbkCall = calls.filter(
          (call: any[]) => call[0].apiName === 'api2async:args[0]:callback'
        )[0];
        checktParentChild(apiCall, apiCbkCall);
        expect(apiCbkCall[0].isAsync).toBe(true);
      });

      test('property callback', async () => {
        let mockFnReport: any = jest.fn(() => {});
        let proxy: any = new ProxyMonitor(SDK, {
          report: mockFnReport
        }).proxy;
        await new Promise((resolve, reject) => {
          proxy.argCallbackAsync({
            success() {
              resolve();
            }
          });
        });
        let { calls } = mockFnReport.mock;
        let apiCall = calls.filter((call: any[]) => call[0].apiName === 'argCallbackAsync')[0];
        let apiCbkCall = calls.filter(
          (call: any[]) => call[0].apiName === 'argCallbackAsync:args[0].success:callback'
        )[0];
        checktParentChild(apiCall, apiCbkCall);
        expect(apiCbkCall[0].isAsync).toBe(true);
      });
    });
  });

  describe('cbk multi call', () => {
    test('property callback', async () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport
      }).proxy;
      await new Promise((resolve, reject) => {
        let callTimes = 0;
        proxy.argPropertyCallbackMultiCall({
          success() {
            callTimes++;
            if (callTimes >= 3) {
              resolve();
            }
          }
        });
      });
      let { calls } = mockFnReport.mock;
      let apiCall = calls.filter(
        (call: any[]) => call[0].apiName === 'argPropertyCallbackMultiCall'
      )[0];
      let apiCbkCallList = calls.filter(
        (call: any[]) =>
          call[0].apiName === 'argPropertyCallbackMultiCall:args[0].success:callback:cbkMultiWarn'
      );
      expect(apiCbkCallList.length).toBe(2);
      expect(apiCbkCallList[0][0].ret).toBe('cbkMultiWarn');
      expect(apiCbkCallList[1][0].ret).toBe('cbkMultiWarn');
      checktParentChild(apiCall, apiCbkCallList[0]);
    });

    test('success、fail multi call', async () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport
      }).proxy;
      await new Promise((resolve, reject) => {
        let callTimes = 0;
        proxy.successOrFailCallbackMultiCall({
          success() {},
          fail() {
            resolve();
          }
        });
      });
      let { calls } = mockFnReport.mock;
      let apiCall = calls.filter(
        (call: any[]) => call[0].apiName === 'successOrFailCallbackMultiCall'
      )[0];
      let apiCbkCallList = calls.filter(
        (call: any[]) =>
          call[0].apiName === 'successOrFailCallbackMultiCall:args[0].fail:callback:cbkMultiWarn'
      );
      expect(apiCbkCallList.length).toBe(1);
      expect(apiCbkCallList[0][0].ret).toBe('cbkMultiWarn');
      checktParentChild(apiCall, apiCbkCallList[0]);
    });
  });
  describe('ret fail', () => {
    test('fail cbk', async () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport
      }).proxy;
      await new Promise((resolve, reject) => {
        proxy.failCbk({
          fail() {
            resolve();
          }
        });
      });
      let { calls } = mockFnReport.mock;
      let apiCbkCallList = calls.filter(
        (call: any[]) => call[0].apiName === 'failCbk:args[0].fail:callback'
      );
      expect(apiCbkCallList.length).toBe(1);
      expect(apiCbkCallList[0][0].ret).toBe('fail');
    });
    test('on error cbk', async () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport
      }).proxy;
      await new Promise((resolve, reject) => {
        proxy.onError(() => {
          resolve();
        });
      });
      let { calls } = mockFnReport.mock;
      let apiCbkCallList = calls.filter(
        (call: any[]) => call[0].apiName === 'onError:args[0]:callback'
      );
      expect(apiCbkCallList.length).toBe(1);
      expect(apiCbkCallList[0][0].ret).toBe('onError');
    });
  });
  describe('cbkOrderWarn', () => {
    test('success after complete', async () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport
      }).proxy;
      await new Promise((resolve, reject) => {
        proxy.successAfterComplete({
          success() {
            resolve();
          },
          complete() {}
        });
      });
      let { calls } = mockFnReport.mock;
      let apiCall = calls.filter((call: any[]) => call[0].apiName === 'successAfterComplete')[0];
      let apiCbkCallList = calls.filter(
        (call: any[]) =>
          call[0].apiName === 'successAfterComplete:args[0].success:callback:cbkOrderWarn'
      );
      expect(apiCbkCallList.length).toBe(1);
      expect(apiCbkCallList[0][0].ret).toBe('cbkOrderWarn');
      checktParentChild(apiCall, apiCbkCallList[0]);
    });
    test('fail after complete', async () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport
      }).proxy;
      await new Promise((resolve, reject) => {
        proxy.failAfterComplete({
          fail() {
            resolve();
          },
          complete() {}
        });
      });
      let { calls } = mockFnReport.mock;
      let apiCall = calls.filter((call: any[]) => call[0].apiName === 'failAfterComplete')[0];
      let apiCbkCallList = calls.filter(
        (call: any[]) => call[0].apiName === 'failAfterComplete:args[0].fail:callback:cbkOrderWarn'
      );
      expect(apiCbkCallList.length).toBe(1);
      expect(apiCbkCallList[0][0].ret).toBe('cbkOrderWarn');
      checktParentChild(apiCall, apiCbkCallList[0]);
    });
  });

  describe('cbk timeout', () => {
    test('property callback', async () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport,
        apiCbkTimeout: 3000
      }).proxy;
      await new Promise((resolve, reject) => {
        proxy.argPropertyCallbackTimeout({
          success() {
            resolve();
          }
        });
      });
      let { calls } = mockFnReport.mock;
      let apiCall = calls.filter(
        (call: any[]) => call[0].apiName === 'argPropertyCallbackTimeout'
      )[0];
      let apiCbkCallList = calls.filter(
        (call: any[]) => call[0].apiName === 'argPropertyCallbackTimeout:timeout'
      );
      expect(apiCbkCallList.length).toBe(1);
      expect(apiCbkCallList[0][0].ret).toBe('timeout');
      checktParentChild(apiCall, apiCbkCallList[0]);
    });
    test('event callback', async () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport,
        eventCbkTimeout: 3000
      }).proxy;
      await new Promise((resolve, reject) => {
        proxy.eventCallbackTimeout(() => {
          resolve();
        });
      });
      let { calls } = mockFnReport.mock;
      let apiCall = calls.filter((call: any[]) => call[0].apiName === 'eventCallbackTimeout')[0];
      let apiCbkCallList = calls.filter(
        (call: any[]) => call[0].apiName === 'eventCallbackTimeout:timeout_maybe'
      );
      expect(apiCbkCallList.length).toBe(1);

      expect(apiCbkCallList[0][0].ret).toBe('timeout_maybe');
      checktParentChild(apiCall, apiCbkCallList[0]);
    });
  });

  test('callback and api in callback', async () => {
    let mockFnReport: any = jest.fn(() => {});
    let proxy: any = new ProxyMonitor(SDK, {
      report: mockFnReport
    }).proxy;
    await new Promise((resolve, reject) => {
      proxy.api1sync(() => {
        proxy.api2async(() => {
          proxy.api3sync();
          resolve();
        });
        proxy.api5sync(() => {
          proxy.api6sync();
        });
      });
    });

    let { calls } = mockFnReport.mock;
    let api1syncCallback = calls.filter(
      (call: any[]) => call[0].apiName === 'api1sync:args[0]:callback'
    )[0];
    let api2async = calls.filter((call: any[]) => call[0].apiName === 'api2async')[0];
    let api2asyncCallback = calls.filter(
      (call: any[]) => call[0].apiName === 'api2async:args[0]:callback'
    )[0];
    let api3sync = calls.filter((call: any[]) => call[0].apiName === 'api3sync')[0];
    let api5sync = calls.filter((call: any[]) => call[0].apiName === 'api5sync')[0];
    let api5syncCallback = calls.filter(
      (call: any[]) => call[0].apiName === 'api5sync:args[0]:callback'
    )[0];
    let api6sync = calls.filter((call: any[]) => call[0].apiName === 'api6sync')[0];
    checktParentChild(api1syncCallback, api2async);
    checktParentChild(api1syncCallback, api5sync);
    checktParentChild(api2asyncCallback, api3sync);
    checktParentChild(api5syncCallback, api6sync);
  });
  test('setTimeout', async () => {
    let mockFnReport: any = jest.fn(() => {});
    let monitor: any = new ProxyMonitor(SDK, {
      report: mockFnReport,
      hookSetTimeout: setTimeout
    });
    let proxy = monitor.proxy;
    let setTimeoutHook = monitor.setTimeout;
    await new Promise((resolve, reject) => {
      proxy.api1sync(() => {
        setTimeoutHook(() => {
          proxy.api2async();
          resolve();
        });
      });
    });
    let { calls } = mockFnReport.mock;
    let api1syncCallback = calls.filter(
      (call: any[]) => call[0].apiName === 'api1sync:args[0]:callback'
    )[0];
    let setTimeoutCall = calls.filter((call: any[]) => call[0].apiName === 'setTimeout')[0];
    let setTimeoutCallback = calls.filter(
      (call: any[]) => call[0].apiName === 'setTimeout:callback'
    )[0];
    let api2async = calls.filter((call: any[]) => call[0].apiName === 'api2async')[0];
    checktParentChild(api1syncCallback, setTimeoutCall);
    checktParentChild(setTimeoutCall, setTimeoutCallback);
    checktParentChild(setTimeoutCallback, api2async);
  });

  test('setInterval', async () => {
    let mockFnReport: any = jest.fn(() => {});
    let monitor: any = new ProxyMonitor(SDK, {
      report: mockFnReport,
      hookSetInterval: setInterval
    });
    let proxy = monitor.proxy;
    let setIntervalHook = monitor.setInterval;
    let index = 0;
    await new Promise((resolve: Function, reject: Function) => {
      proxy.api1sync(() => {
        let st = setIntervalHook(() => {
          proxy.api2async();
          index++;
          if (index === 2) {
            clearInterval(st);
            resolve();
          }
        }, 1000);
      });
    });
    let { calls } = mockFnReport.mock;
    let api1syncCallback = calls.filter(
      (call: any[]) => call[0].apiName === 'api1sync:args[0]:callback'
    )[0];
    let setIntervalCall = calls.filter((call: any[]) => call[0].apiName === 'setInterval')[0];
    let setIntervalCallbacks = calls.filter(
      (call: any[]) => call[0].apiName === 'setInterval:callback'
    );
    let api2async = calls.filter((call: any[]) => call[0].apiName === 'api2async')[0];
    expect(setIntervalCallbacks.length).toBe(2);
    checktParentChild(api1syncCallback, setIntervalCall);
    checktParentChild(setIntervalCall, setIntervalCallbacks[0]);
    checktParentChild(setIntervalCall, setIntervalCallbacks[1]);
    checktParentChild(setIntervalCallbacks[0], api2async);
    checktParentChild(setIntervalCallbacks[1], api2async);
  });
});
