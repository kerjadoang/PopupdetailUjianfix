import {StyleSheet, Text, View, Pressable} from 'react-native';
import Arrow from '@assets/svg/yellowArrow.svg';
import React, {FC} from 'react';

import Colors from '@constants/colors';

type Props = {
  label: string;
  action: any;
  description: string;
  background: string;
};
const CardKPRegular: FC<Props> = ({label, action, description, background}) => {
  return (
    <Pressable onPress={action} style={[styles.card, styles.shadowProp]}>
      <View style={[styles.header, {backgroundColor: background}]}>
        <Text style={styles.titleBold}>{label}</Text>
        <Arrow width={8} height={8} />
      </View>
      <Text style={styles.title}>{description}</Text>
    </Pressable>
  );
};

export default CardKPRegular;

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    padding: 10,
  },
  titleBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 158,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
