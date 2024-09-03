type IErrorHandler = {
  error: Error;
  isFatal: boolean;
  route: IRouteRef;
  logId?: string;
};

type IRouteRef = {
  screenName: string;
  screenStack: string[];
};
