import Colors from '@constants/colors';
import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

type Props = {
  onPress: () => void | any;
  title: string;
};

const CenteringButton = ({onPress, title}: Props) => {
  return (
    <View style={styles.centering}>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.textBtn}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centering: {
    justifyContent: 'center',
    marginVertical: 4,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

export {CenteringButton};
