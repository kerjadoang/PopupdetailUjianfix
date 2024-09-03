import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {SvgUri} from 'react-native-svg';

type Item = {
  name: string;
  img?: any;
  action?: () => void;
};

const ItemSubject = ({img, name, action}: Item) => {
  return (
    <Pressable style={styles.itemsub} onPress={action}>
      <SvgUri uri={img} />
      <Text style={styles.textItem}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    elevation: 8,
    borderRadius: 15,
  },
  titleMapel: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.dark.neutral100,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemsub: {
    alignItems: 'center',
    marginVertical: 5,
    width: '28%',
  },
  imgItem: {
    width: '90%',
    height: 65,
  },
  textItem: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
});

export {ItemSubject};
