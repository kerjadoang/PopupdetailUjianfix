import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RobotHappy from '@assets/svg/robot_gembira.svg';
import RobotFlat from '@assets/svg/robot_success.svg';
import RobotSad from '@assets/svg/Robot_cry.svg';
import Robot from '@assets/svg/robot_success.svg';
import Fonts from '@constants/fonts';
import {Rating} from 'react-native-ratings';
import {Button} from '@components/atoms';
import Colors from '@constants/colors';

interface Iprops {
  rating: number;
  setRating?: any;
  onPressLater: any;
  onPressSave: any;
}
const SwipeUpRating = (props: Iprops) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bagaimana pengalaman Anda {'\n'} menggunakan Test Minat & Kepribadian ?
      </Text>
      <Text style={styles.label}>
        Halo! Kami ingin mendengar pendapat Anda tentang pengalaman Anda dengan
        Fitur
      </Text>
      {props?.rating >= 1 && props?.rating <= 2 ? (
        <RobotSad width={80} height={80} />
      ) : props?.rating >= 3 && props?.rating < 4 ? (
        <RobotFlat width={80} height={80} />
      ) : props?.rating >= 4 ? (
        <RobotHappy width={80} height={80} />
      ) : props?.rating <= 1 ? (
        <Robot width={80} height={80} />
      ) : (
        <Robot width={80} height={80} />
      )}
      <Rating
        ratingCount={5}
        onFinishRating={(val: number) => val >= 1 && props?.setRating(val)}
        imageSize={40}
        startingValue={props?.rating}
        style={styles.rating}
      />
      <Text style={styles.text}>
        Terima kasih telah membantu kami menjadi lebih baik!
      </Text>
      <View style={styles.bottomContainer}>
        <Button
          label="Nanti"
          action={props?.onPressLater}
          color={Colors.primary.base}
          background={Colors.primary.light3}
          style={styles.button}
        />
        <Button
          label="Simpan"
          action={props?.onPressSave}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default SwipeUpRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    fontWeight: '600',
    color: Colors.dark.neutral100,
  },
  label: {
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    fontWeight: '400',
    paddingTop: 8,
    paddingVertical: 16,
    color: Colors.dark.neutral60,
  },
  text: {
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
    fontWeight: '400',
    paddingTop: 12,
    paddingVertical: 16,
    color: Colors.dark.neutral80,
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  button: {
    width: '48%',
    marginHorizontal: 6,
  },
  rating: {
    marginTop: 20,
  },
});
