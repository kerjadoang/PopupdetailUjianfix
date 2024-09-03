import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';
// eslint-disable-next-line prettier/prettier
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

interface PoppinsTextProps extends TextProps {
  children: ReactNode;
  style?: object;
  weight?: 'Regular' | 'SemiBold' | 'Bold';
}

const PoppinsText: React.FC<PoppinsTextProps> = ({
  children,
  style,
  weight = 'Regular',
  ...props
}) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let fontFamily = 'Poppins_400Regular';
  if (weight === 'SemiBold') {
    fontFamily = 'Poppins_600SemiBold';
  }
  if (weight === 'Bold') {
    fontFamily = 'Poppins_700Bold';
  }

  return (
    <Text {...props} style={[styles.text, {fontFamily}, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

export default PoppinsText;
