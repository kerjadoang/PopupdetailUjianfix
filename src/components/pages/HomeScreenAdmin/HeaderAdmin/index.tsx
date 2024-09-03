import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React from 'react';

import Colors from '@constants/colors';

const HeaderAdmin = () => {
  return (
    <ImageBackground
      source={require('@assets/images/header_background.png')}
      resizeMode="cover">
      <View style={styles.header}>
        <View>
          <Image
            source={
              {
                // uri: image?.data?.path_url,
              }
            }
            style={[
              styles.imageProfile,
              {
                borderColor: Colors.primary.base,
              },
            ]}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleHeader}>Halo, </Text>
          <View
            style={[
              styles.kelasContainer,
              {
                backgroundColor: Colors.primary.light1,
                width: '100%',
              },
            ]}>
            <Text style={styles.kelas}>-</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: '5%',
  },
  imageProfile: {
    width: 48,
    height: 48,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    lexDirection: 'column',
    flex: 1,
    gap: 4,
    paddingHorizontal: 8,
  },
  titleHeader: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    color: Colors.white,
  },
  kelasContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 25,
    alignItems: 'center',
  },
  kelas: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
  },
});
export {HeaderAdmin};
