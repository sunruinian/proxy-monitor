type shouldHandleMethodFunc = (target: object, rootProperty: string, property: string) => boolean;
type shouldHandleResultFunc = (
  callResult: object,
  rootProperty: string,
  property: string
) => boolean;
type shouldReportPropertySet = (target: object, rootProperty: string, property: string) => boolean;
type getApiIdFunc = () => string;

export interface ReportParam {
  apiId: string;
  apiName: string;
  property?: string;
  pid: string;
  args?: any[];
  res?: any;
  isAsync?: boolean;
  ret: string;
}

export interface ReportData {
  apiId: string;
  apiName: string;
  property?: string;
  pid: string;
  parentApiName: string;
  traceId: string;
  traceApiName: string;
  args?: any[];
  res?: any;
  ret: string;
  time: number;
  isAsync?: boolean;
  isTimeout?: boolean;
}

export interface Options {
  apiPrefix?: string; // 用于apiName、parentApiName、traceApiName前面加上前缀
  shouldHandleMethod?: shouldHandleMethodFunc;
  shouldHandleResult?: shouldHandleResultFunc;
  shouldReportPropertySet?: shouldReportPropertySet;
  shouldHookConsoleError?: boolean;
  useApiTag?: boolean;
  getApiId?: getApiIdFunc;
  hookSetTimeout?: any;
  hookSetInterval?: any;
  apiCbkTimeout?: number;
  eventCbkTimeout?: number;
  report?(data: ReportData): void;
}

export interface ApiInfo {
  name: string;
  time: number;
  isCbk: boolean;
  isFinish: boolean;
  cbkCalledList?: string[];
  checkTimeoutSt?: any;
}
