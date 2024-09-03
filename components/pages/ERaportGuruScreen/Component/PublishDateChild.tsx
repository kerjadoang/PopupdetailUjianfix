import {Button, DatePicker} from '@components/atoms';
import Fonts from '@constants/fonts';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
interface PublishDateChildProps {
  valueDatePicker: any;
  setValueDatePicker: any;
  onTerapkan: () => void;
}
const PublishDateChild = (props: PublishDateChildProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Tanggal</Text>
      <DatePicker
        selected={props.valueDatePicker}
        onChange={props.setValueDatePicker}
      />
      <Button
        label="Terapkan"
        action={props.onTerapkan}
        style={{marginTop: 20, marginHorizontal: 16}}
      />
    </View>
  );
};

export default PublishDateChild;

const styles = StyleSheet.create({
  container: {height: 320, marginBottom: 14},
  title: {
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
});
