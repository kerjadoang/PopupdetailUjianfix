import {MainView} from '@components/atoms';
import RenderImage from '@components/atoms/RenderImage';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

type Item = {
  name: string;
  img?: any;
  imgId?: string;
  action?: () => void;
};

const ItemSubject = ({imgId, name, action}: Item) => {
  return (
    <Pressable style={styles.itemsub} onPress={action}>
      {/* <SvgUri uri={img} /> */}
      <RenderImage
        imageId={imgId}
        height={62}
        width={62}
        onPress={action}
        placeholder={<MainView width={52} height={52} />}
      />
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
