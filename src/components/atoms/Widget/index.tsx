import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import Plus from '@assets/svg/plus.svg';
import Minus from '@assets/svg/minus.svg';
import RenderImage from '../RenderImage';

type Props = {
  type: number;
  title: string;
  backgroundColor: string;
  action: any;
  remove: boolean;
  add: boolean;
  image?: any;
  svg?: any;
  imageId?: string;
};

const Widget = ({
  type,
  title,
  backgroundColor,
  action,
  remove,
  add,
  svg,
  imageId,
}: Props) => {
  return (
    <Pressable
      onPress={action}
      style={
        type === 3
          ? [
              styles.container,
              {
                width: '50%',
              },
            ]
          : styles.container
      }>
      <View
        style={
          type === 1
            ? [styles.containerWidget]
            : type === 2
            ? [
                styles.containerWidget,
                {
                  backgroundColor: backgroundColor,
                  borderRadius: 10,
                  padding: 8,
                },
              ]
            : [
                styles.containerWidget,
                {
                  backgroundColor: backgroundColor,
                  borderRadius: 10,
                  flexDirection: 'row',
                  margin: 2,
                },
              ]
        }>
        {remove && (
          <View
            style={[styles.absoluted, {backgroundColor: Colors.danger.base}]}>
            <Minus width={10} height={10} />
          </View>
        )}
        {add && (
          <View
            style={[styles.absoluted, {backgroundColor: Colors.success.base}]}>
            <Plus width={10} height={10} />
          </View>
        )}
        <View
          style={
            type === 1
              ? [
                  styles.containerLogo,
                  {
                    backgroundColor: backgroundColor,
                    flex: 0.7,
                  },
                ]
              : type === 2
              ? [
                  styles.containerLogo,
                  {
                    backgroundColor: backgroundColor,
                    paddingHorizontal: 12,
                  },
                ]
              : [
                  styles.containerLogo,
                  {
                    paddingVertical: 12,
                    width: '30%',
                  },
                ]
          }>
          {/* {svg ? (
            svg?.endsWith('png') ? (
              <Image
                style={styles.photo}
                source={{
                  uri: image,
                }}
              />
            ) : svg?.endsWith('svg') ? (
              <SvgUri uri={svg} width={60} height={60} />
            ) : (
              <View style={{width: 30, height: 30}} />
            )
          ) : (
            <View style={{width: 30, height: 30}} />
          )} */}
          <RenderImage
            imageId={imageId}
            onPress={action}
            width={60}
            height={60}
            style={styles.photo}
            imageUrl={svg}
            placeholder={
              <View style={{height: 60, width: 60, borderRadius: 12}} />
            }
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#C2185B',
    height: 110,
    marginHorizontal: 5,
    marginTop: 16,
  },
  titleStyle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark?.neutral100,
    lineHeight: 16,
  },
  absoluted: {
    position: 'absolute',
    top: -5,
    right: -5,
    padding: 4,
    zIndex: 99,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
  },
  containerWidget: {
    alignItems: 'center',
    maxWidth: 80,
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    textAlign: 'center',
  },
  containerLogo: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: '20%',
    borderRadius: 15,
  },
  photo: {
    width: 40,
    height: 40,
  },
  text: {
    flex: 1,
    fontSize: 12,
    flexWrap: 'wrap',
    width: 80,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    height: 15,
    width: 15,
  },
});

export {Widget};
