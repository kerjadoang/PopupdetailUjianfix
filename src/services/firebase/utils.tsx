/* eslint-disable no-console */
export const fbDatabaseLogPrint = ({
  data,
  options,
  dbRef,
  finalData,
  result,
  error,
}: IFbDatabaseLogPrint) => {
  if (!__DEV__) {
    return;
  }
  console.log();
  console.log('🚀 ~ ======Firebase Database Log Print====== ~ 🚀');
  console.log(`🚀 ~ ${result} send ${data.type} log to firebase ~ 🚀`);
  console.log('🚀 ~ DB Ref : ', dbRef);
  console.log('🚀 ~ Options : ', JSON.stringify(options));
  console.log('🚀 ~ Data sent to firebase : ', JSON.stringify(finalData));
  error && console.log('🚀 ~ ERROR : ', error);
  console.log(`🚀 ~ ${result} send ${data.type} log to firebase ~ 🚀`);
  console.log('🚀 ~ ======Firebase Database Log Print====== ~ 🚀');
  console.log();
};
