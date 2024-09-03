import {StorageKeys} from './keys';

interface ISaveToStorage<T = any> {
  key: IStorageKeys;
  data: T;
  ttl: dayjs.Dayjs;
  callback?: CallBack<T>;
  removeWhenExpired?: boolean;
}

type IStorageKeys = keyof typeof StorageKeys;

interface IStorage<T = any> {
  key: IStorageKeys;
  callback?: CallBack<T>;
}

interface ISaveStorage extends IStorage {
  data: string;
}

interface IRemoveFromStorage extends Omit<IStorage, 'key'> {
  key: IStorageKeys | IStorageKeys[];
}

interface IGetStorage<T = any> extends IStorage<T> {}
interface IGetFromStorageProps<T = any> extends Pick<ISaveToStorage<T>, 'key'> {
  removeWhenExpired?: boolean;
}
interface IGetFromStorage<T = any> extends ISaveToStorage<T> {
  isExpired?: boolean;
}
