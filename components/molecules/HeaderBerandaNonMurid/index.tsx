import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import React from 'react';
import SearchIcon from '@assets/svg/ic_search_round_32x32.svg';
import Colors from '@constants/colors';
import useHeaderBerandaNonMurid from './useHeaderBerandaNonMurid';
import Avatar from '@components/atoms/Avatar';
const HeaderBerandaNonMurid = ({type, style}: {type: any; style?: any}) => {
  const {decode, navigation} = useHeaderBerandaNonMurid();
  return (
    <ImageBackground
      style={style}
      source={require('@assets/images/header_background.png')}
      resizeMode="cover">
      <View style={styles.header}>
        <Avatar
          id={decode?.avatar}
          style={[
            styles.imageProfile,
            {
              borderColor:
                type === 'Orang Tua'
                  ? Colors.success.base
                  : Colors.primary.base,
            },
          ]}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleHeader}>Halo, {decode?.fullname}</Text>
          <View
            style={[
              styles.kelasContainer,
              {
                backgroundColor:
                  type === 'Orang Tua'
                    ? Colors.success.base
                    : Colors.primary.light1,
                width: type === 'Orang Tua' ? '50%' : '100%',
              },
            ]}>
            <Text style={styles.kelas}>
              {type} {decode?.school_name}
            </Text>
          </View>
        </View>
        {type === 'Guru' && (
          <Pressable onPress={() => navigation.navigate('GlobalSearchScreen')}>
            <SearchIcon />
          </Pressable>
        )}
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
export {HeaderBerandaNonMurid};
