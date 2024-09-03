import Colors from '@constants/colors';
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {Button} from '@components/atoms';
import {QuestionMark} from '@assets/images';

type Props = {
  action: () => void;
  leftText: () => void;
  rightText: () => void;
};

const BottomContainer = ({action, leftText, rightText}: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, {fontFamily: 'Poppins-Bold', marginBottom: 10}]}>
        Butuh Bantuan ?
      </Text>
      <Button
        label={'Lihat Pusat Bantuan'}
        background={Colors.white}
        color={Colors.primary.base}
        icon={QuestionMark}
        style={styles.btn}
        action={action}
      />
      <View style={styles.row}>
        <Pressable onPress={leftText}>
          <Text style={styles.text}>Syarat & Ketentuan</Text>
        </Pressable>
        <Pressable onPress={rightText}>
          <Text style={styles.text}>Kebijakan Privasi</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.base,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 25,
    height: 250,
  },
  btn: {
    padding: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  text: {
    fontFamily: 'Poppins-Light',
    color: Colors.white,
    fontSize: 16,
  },
});
export default BottomContainer;
