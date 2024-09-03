import AsyncStorage from '@react-native-async-storage/async-storage';
import {convertDate} from './functional';
import {
  IGetFromStorage,
  IGetFromStorageProps,
  IGetStorage,
  IRemoveFromStorage,
  ISaveStorage,
  ISaveToStorage,
} from './storageType';
import {StorageKeys} from './keys';
export class Storage {
  static async saveToStorage(props: ISaveToStorage) {
    try {
      const mappedData = {
        data: props.data,
        ttl: props.ttl.toString(),
        removeWhenExpired: props.removeWhenExpired,
      };
      const stringifyData = JSON.stringify(mappedData);
      await this.save({...props, data: stringifyData});
    } catch (error) {}
  }

  static async getFromStorage<T = any>(
    props: IGetFromStorageProps<T>,
  ): Promise<IGetFromStorage<T> | undefined> {
    try {
      const data = await this.get({...props});
      if (!data) {
        return;
      }

      const isExpired = convertDate().isAfter(convertDate(data?.ttl));
      if (data.removeWhenExpired || props.removeWhenExpired) {
        if (isExpired) {
          this.remove({...props});
        }
      }

      return {
        ...props,
        data: data?.data,
        ttl: data?.ttl,
        isExpired,
      } as IGetFromStorage<T>;
    } catch (error) {}
  }

  protected static async get<T = any>(props: IGetStorage<T>) {
    try {
      const dataString = await AsyncStorage.getItem(
        StorageKeys[props.key],
        props.callback,
      );
      if (!dataString) {
        return;
      }
      return JSON.parse(dataString) as T;
    } catch (error) {}
  }

  protected static async save(props: ISaveStorage) {
    try {
      await AsyncStorage.setItem(
        StorageKeys[props.key],
        props.data,
        props.callback,
      );
    } catch (error) {}
  }

  static async remove(props: IRemoveFromStorage) {
    try {
      if (typeof props.key === 'string') {
        return await AsyncStorage.removeItem(
          StorageKeys[props.key],
          props.callback,
        );
      }
      const removedKeys = props.key.map(key => StorageKeys[key]);
      return await AsyncStorage.multiRemove(removedKeys, props.callback);
    } catch (error) {}
  }
}
