import { useFonts as usePoppinsFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export const useFonts = () => {
  return usePoppinsFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
};
