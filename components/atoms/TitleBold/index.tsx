/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

type Props = {
  title?: string;
  rightBtnTitle?: string;
  action: any;
};

const TitleBold = ({title, rightBtnTitle, action}: Props) => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={rightBtnTitle ? null : {display: 'none'}}
        onPress={action}>
        <Text style={styles.btnText}>{rightBtnTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '90%',
    marginHorizontal: '5%',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    width: '75%',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  btnText: {
    fontSize: 14,
    color: Colors.primary.base,
    fontWeight: 'bold',
  },
});

export default TitleBold;
