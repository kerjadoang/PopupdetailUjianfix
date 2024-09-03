import _ from 'lodash';

const mappingClass = (listClass: IClass[]) => {
  interface MappedItem {
    id: number;
    label: string;
  }

  const mappedData: _.Dictionary<any[]> = _.groupBy(
    listClass,
    (item: IClass) => {
      if ((item.id || 0) >= 1 && (item.id || 0) <= 6) {
        return 'SD';
      } else if ((item.id || 0) >= 7 && (item.id || 0) <= 9) {
        return 'SMP';
      } else {
        return 'SMA';
      }
    },
  );

  const result: {[key: string]: MappedItem[]} = {};

  for (const key in mappedData) {
    if (Object.hasOwnProperty.call(mappedData, key)) {
      result[key] = mappedData[key].map(({id, name}: any) => ({
        id,
        label: name,
      }));
    }
  }
  return result;
};

export {mappingClass};
