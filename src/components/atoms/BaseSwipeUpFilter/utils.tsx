const mappingBaseFilter = <T,>(
  datas: Array<T>,
  callback: CallBackWithParams<BaseFilter<T>, T>,
) => (datas || [])?.map(callback);

export {mappingBaseFilter};
