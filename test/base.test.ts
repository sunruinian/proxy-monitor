import ProxyMonitor from '../src/index';
import { canvas, FileStat, FileSystemManager, SDK } from './SDK';

describe('proxy monitor create and run test', () => {
  test('proxy null', () => {
    let monitor = new ProxyMonitor(null, {});
    expect(monitor.isProxied).toBe(false);

    monitor = new ProxyMonitor({}, {});
    expect(monitor.isProxied).toBe(true);
  });
  test('instance should have property proxy and equal target', () => {
    class Target {
      public name: string;
      public constructor() {
        this.name = 'folger';
      }
      public sing() {
        console.log('sing');
      }
    }
    let target = new Target();
    Object.assign(target, {
      age: 2,
      jump() {
        console.log('jump');
      }
    });
    let monitor = new ProxyMonitor(target, {});
    expect(monitor).toHaveProperty('proxy');
    expect(Reflect.ownKeys(monitor.proxy)).toEqual(Reflect.ownKeys(target));
    expect(monitor.proxy).toBeInstanceOf(Target);
  });
});

describe('proxy monitor run test', () => {
  test('call options getApiId and times should be right', () => {
    let index = 0;
    function getApiId() {
      return String(index++);
    }
    let mockFn = jest.fn(getApiId);
    let proxy: any = new ProxyMonitor(
      {},
      {
        getApiId: mockFn
      }
    ).proxy;
    proxy.name = 'folger';
    expect(mockFn.mock.calls.length).toBe(index);
  });

  test('call report and times should be right', () => {
    let index = 0;
    let mockFnApiId = jest.fn(() => {
      return index++ + '';
    });
    let mockFnReport = jest.fn((data) => {});
    let proxy: any = new ProxyMonitor(
      {},
      {
        getApiId: mockFnApiId,
        report: mockFnReport
      }
    ).proxy;
    proxy.name = 'folger';
    expect(mockFnReport.mock.calls.length).toBe(mockFnApiId.mock.calls.length);
  });

  test('api tag', () => {
    let mockFnReport = jest.fn(() => {});
    let proxy: any = new ProxyMonitor(SDK, {
      report: mockFnReport,
      useApiTag: true
    }).proxy;
    proxy.api();
    proxy.api();
    let apiCall1 = mockFnReport.mock.calls.filter((call: any[]) => call[0].apiName === 'api:0');
    let apiCall2 = mockFnReport.mock.calls.filter((call: any[]) => call[0].apiName === 'api:1');
    expect(apiCall1.length).toBe(1);
    expect(apiCall2.length).toBe(1);
  });

  test('console.error', () => {
    let mockFnReport = jest.fn(() => {});
    let proxy: any = new ProxyMonitor(
      {},
      {
        report: mockFnReport,
        shouldHookConsoleError: true
      }
    ).proxy;
    console.error('test error');
    let calls: any[] = mockFnReport.mock.calls.filter(
      (calls: any[]) => calls[0].apiName === 'ConsoleError'
    );
    expect(calls.length).toBe(1);
    expect(calls[0][0].ret).toBe('errorLog');
  });

  test('shouldHandleMethod', () => {
    let list: Array<any> = [];
    let proxy: any = new ProxyMonitor(SDK, {
      shouldHandleMethod(target, rootProperty, property) {
        expect(target).toBe(SDK);
        expect(rootProperty).toBe(undefined);
        if (property === 'api1sync') {
          return false;
        }
        return true;
      },
      report(data) {
        list.push(data);
      }
    }).proxy;
    proxy.api1sync();
    proxy.api2async();
    expect(list.filter((item) => item.apiName === 'api1sync').length).toBe(0);
    expect(list.filter((item) => item.apiName === 'api2async').length).toBe(1);
  });
  test('shouldHandleMethod second level', () => {
    let list: Array<any> = [];
    let inSub = false;
    let proxy: any = new ProxyMonitor(SDK, {
      shouldHandleMethod(target, rootProperty, property) {
        if (property === 'saveFile') {
          inSub = true;
          expect(target).toBe(FileSystemManager);
          expect(rootProperty).toBe('getFileSystemManager');
          return false;
        }
        if (property === 'isDirectory') {
          expect(rootProperty).toBe('getFileSystemManager.getFileStat');
        }
        return true;
      },
      report(data) {
        list.push(data);
      }
    }).proxy;
    let sub = proxy.getFileSystemManager();
    sub.saveFile();
    sub.moveFile();
    sub.getFileStat().isDirectory();
    expect(inSub).toBe(true);
    expect(list.filter((item) => item.apiName === 'getFileSystemManager').length).toBe(1);
    expect(list.filter((item) => item.apiName === 'getFileSystemManager.saveFile').length).toBe(0);
    expect(list.filter((item) => item.apiName === 'getFileSystemManager.moveFile').length).toBe(1);
    expect(list.filter((item) => item.apiName === 'getFileSystemManager.getFileStat').length).toBe(
      1
    );
    expect(
      list.filter((item) => item.apiName === 'getFileSystemManager.getFileStat.isDirectory').length
    ).toBe(1);
  });

  test('shouldHandleResult', () => {
    let list: Array<any> = [];
    let proxy: any = new ProxyMonitor(SDK, {
      shouldHandleResult(result, rootProperty, property) {
        if (property === 'createCanvas') {
          expect(result).toBe(canvas);
          expect(rootProperty).toBe(undefined);
          return false;
        }
        if (property === 'isDirectory') {
          expect(rootProperty).toBe('getFileSystemManager.getFileStat');
        }
        return true;
      },
      report(data) {
        list.push(data);
      }
    }).proxy;
    let sub1 = proxy.createCanvas();
    let sub2 = proxy.getFileSystemManager();
    sub1.getContext();
    sub2.getFileStat().isDirectory();
    expect(list.filter((item) => item.apiName === 'createCanvas').length).toBe(1);
    expect(list.filter((item) => item.apiName === 'getFileSystemManager').length).toBe(1);
    expect(list.filter((item) => item.apiName === 'createCanvas.getContext').length).toBe(0);
    expect(list.filter((item) => item.apiName === 'getFileSystemManager.getFileStat').length).toBe(
      1
    );
    expect(
      list.filter((item) => item.apiName === 'getFileSystemManager.getFileStat.isDirectory').length
    ).toBe(1);
  });

  describe('report data', () => {
    test('property set', () => {
      let index = 0;
      function getApiId() {
        return String(index++);
      }
      let test: object = { name: 'folger' };
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(test, {
        getApiId,
        report: mockFnReport,
        shouldReportPropertySet() {
          return true;
        }
      }).proxy;
      proxy.name = 'folger';
      expect(mockFnReport.mock.calls[0][0]).toMatchObject({
        apiId: '0',
        apiName: 'name.set',
        args: ['folger'],
        parentApiName: undefined,
        pid: undefined,
        res: undefined,
        traceApiName: 'name.set',
        traceId: '0',
        ret: 'ok'
      });
    });

    test('property call', () => {
      let index = 0;
      function getApiId() {
        return String(index++);
      }
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        getApiId,
        report: mockFnReport
      }).proxy;
      proxy.api('folger');
      expect(mockFnReport.mock.calls[0][0]).toMatchObject({
        apiId: '0',
        apiName: 'api',
        res: undefined,
        parentApiName: undefined,
        pid: undefined,
        args: ['folger'],
        traceApiName: 'api',
        traceId: '0',
        ret: 'ok'
      });
    });

    test('property is constructor', () => {
      let mockFnReport: any = jest.fn(() => {});
      let proxy: any = new ProxyMonitor(SDK, {
        report: mockFnReport
      }).proxy;
      let proxyMe = new proxy.Person('folger');
      let simpleMe: any = new SDK.Person('folger');
      expect(proxyMe).toMatchObject(simpleMe);
    });
  });
});
