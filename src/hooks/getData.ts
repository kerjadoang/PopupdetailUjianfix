/**
 * Copy
 * @param {string} param, ex: 'Hello world'
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
export const getData = async () => {
  // Copy using navigator
  const data = await AsyncStorage.getItem(Keys.dataUser);
  const dataParse = await JSON.parse(data);
  return dataParse;
};
