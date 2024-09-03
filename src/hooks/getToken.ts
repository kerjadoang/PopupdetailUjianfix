/**
 * Copy
 * @param {string} param, ex: 'Hello world'
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
export const getToken = async () => {
  // Copy using navigator
  try {
    const token = await AsyncStorage.getItem(Keys.token);
    const tokenParse = JSON.parse(token || '');
    return tokenParse;
  } catch (error) {
    return null;
  }
};
