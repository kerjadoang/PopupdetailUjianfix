/**
 * Copy
 * @param {string} param, ex: 'Hello world'
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Logout = async navigation => {
  // Copy using navigator
  await AsyncStorage.removeItem('TOKEN');
  await navigation.navigate('Autentikasi');
};
