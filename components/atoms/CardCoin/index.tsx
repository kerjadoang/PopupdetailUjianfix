import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import {KoinIcon, RightArrow} from '@assets/images';

type Props = {
  coins: string;
  action: any;
};

const CardCoins: FC<Props> = ({coins, action}) => {
  return (
    <View style={styles.container}>
      <View style={styles.yellowContainer}>
        <Image
          source={KoinIcon}
          style={{
            width: 35,
            height: 35,
            alignSelf: 'center',
            marginVertical: 10,
          }}
        />
      </View>
      <Text style={[styles.Text, {width: '50%'}]}>{coins} Koin </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          width: '30%',
          alignContent: 'flex-end',
          alignItems: 'center',
        }}
        onPress={action}>
        <Text
          style={[styles.Text, {fontSize: 14, fontFamily: 'Poppins-Light'}]}>
          Lihat Detail
        </Text>
        <Image
          source={RightArrow}
          style={{
            width: 12,
            height: 12,
            resizeMode: 'contain',
            marginHorizontal: 10,
          }}
        />
      </Pressable>
    </View>
  );
};
export default CardCoins;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    // height: ,
    backgroundColor: Colors.primary.light1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  yellowContainer: {
    backgroundColor: Colors.secondary.base,
    borderBottomEndRadius: 50,
    borderTopEndRadius: 50,
    borderBottomStartRadius: 15,
    borderTopStartRadius: 15,
    padding: 8,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  Text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.white,
    paddingLeft: '4%',
    textAlignVertical: 'center',
  },
});
