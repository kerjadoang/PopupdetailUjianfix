/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import IconMoreGray from '@assets/svg/ic_more_gray.svg';
import Fonts from '@constants/fonts';
import Avatar from '../Avatar';
import {RadioButton} from 'react-native-paper';

type Props = {
  data?: any;
  id?: any;
  onPress?: any;
  waitingVerified?: boolean;
  cstmWidth?: any;
  isPackageScreen?: boolean;
  withShadow?: boolean;
  withRadio?: boolean;
};
const CardAnak: FC<Props> = ({
  data,
  id,
  onPress,
  waitingVerified,
  cstmWidth,
  isPackageScreen,
  withShadow,
  withRadio,
}) => {
  const window = Dimensions.get('window');
  const choosedUser = id === data.user_id;

  // console.log('DATA', data);
  // console.log('===================');
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.flexDirection,
        {
          ...(withShadow && {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            marginBottom: 8,
            elevation: 2,
          }),
        },
        {
          gap: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          // minWidth: '50%',
          width: cstmWidth || window.width * 0.9,
          ...(withRadio
            ? {
                backgroundColor: Colors.white,
                borderColor: Colors.white,
                borderWidth: 2,
              }
            : {
                backgroundColor: choosedUser
                  ? Colors.primary.light3
                  : isPackageScreen
                  ? Colors.primary.light4
                  : Colors.white,
                borderColor: choosedUser ? Colors.primary.base : Colors.white,
                borderWidth: choosedUser ? 2 : 0,
              }),
          borderRadius: 15,
          marginRight: 8,
        },
      ]}>
      <View>
        <Avatar id={data?.avatar} />
      </View>
      <View style={{flex: 1}}>
        <View>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 14,
              fontFamily: Fonts.SemiBoldPoppins,
              color: Colors.black,
            }}
            numberOfLines={2}>
            {data?.full_name || '-'}
          </Text>
          <Text
            style={[
              styles.font,
              {
                fontWeight: '400',
                fontSize: 12,
              },
            ]}>
            {data?.rombel_name || 'Kelas --'}{' '}
            {waitingVerified && ' • Menunggu verifikasi'}
          </Text>
        </View>
      </View>
      {waitingVerified && (
        <View
          style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
          <IconMoreGray width={26} height={26} />
        </View>
      )}

      {withRadio && (
        <View>
          <RadioButton
            color={Colors.primary.base}
            value="second"
            status={choosedUser ? 'checked' : 'unchecked'}
            onPress={onPress}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  imageProfile: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: Colors.white,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginBottom: 8,
  },
  titleClass: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
  },
  font: {
    fontFamily: 'Poppins-Regular',
  },
  next: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
});

export {CardAnak};
