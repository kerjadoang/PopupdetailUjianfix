interface IFirebaseDatabaseLog {
  type: IFirebaseDatabaseLogType;
  serviceName: ServiceType;
  feature:
    | ILMSFeature
    | IPTNFeature
    | IGURUFeature
    | IIAPFeature
    | IApiFeature
    | IGlobalFeature;
  logId?: string;
  appLogId?: string;
  callback?: CallBackWithParams<void, any>;
}

type ILMSFeature = 'lms_ujian' | 'lms_tugas' | 'lms_monitoring';
type IPTNFeature = 'ptn_live_class' | 'ptn_record_session';
type IGURUFeature = 'guru_live_class' | 'guru_record_session';
type IIAPFeature =
  | 'iap_subscription'
  | 'iap_purchase'
  | 'iap_error'
  | 'iap_info';
type IApiFeature = 'api';
type IGlobalFeature = 'global_alert';

type IFirebaseDatabaseLogType = 'INFO' | 'ERROR' | 'REQUEST' | 'CRITICAL';

type IFirebaseDatabaseRefType = 'error' | 'info' | 'critical';

type IBaseFirebaseLog = {
  title?: string;
  screenName?: string;
  headers?: DynamicObject;
  url?: string;
};

type IFirebaseErrorLog = {
  body?: any;
  urlPath?: string;
  message?: string;
  errorResponse?: string;
} & IFirebaseDatabaseLog &
  IBaseFirebaseLog;

type IFirebaseCriticalErrorLog = {} & IFirebaseErrorLog;

type IFirebaseSendLog = {
  data: any;
} & IFirebaseDatabaseLog &
  IBaseFirebaseLog;

type ISendToFirebase = {
  rootPath: IFirebaseDatabaseRefType;
};

interface IFbDatabaseLogPrint {
  data: IFirebaseDatabaseLog;
  error?: any;
  options: ISendToFirebase;
  finalData: any;
  dbRef: string;
  result: 'Error' | 'Success';
}
