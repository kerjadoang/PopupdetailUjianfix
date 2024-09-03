import React from 'react';
import Colors from '@constants/colors';
import {StyleSheet, Text, Pressable, Image, View} from 'react-native';
import {SvgUri} from 'react-native-svg';

type Props = {
  index?: number;
  onPress?: any;
  pressableStyle?: any;
  imageStyle?: any;
  title?: string;
  data?: any;
};

const AccessSubjectCard = ({index, onPress, pressableStyle, data}: Props) => {
  const name = data?.subject?.name ? data.subject.name : '-';
  const description = data?.question_package_service?.name
    ? data?.question_package_service?.name
    : data?.learning_method
    ? data?.learning_method?.name
    : '-';
  const path_url = data?.subject?.path_url
    ? data.subject.path_url
    : 'https://storage.googleapis.com/kp-bucket-staging/kelas_pintar/file/master/a299aa23-285f-4a60-9eaf-86ea117bd9df.svg';
  return (
    <Pressable
      key={index}
      onPress={onPress}
      style={[pressableStyle, styles.card]}>
      {path_url?.endsWith('svg') ? (
        <SvgUri uri={path_url} height={29} width={29} />
      ) : (
        <Image
          style={styles.iconContainer}
          source={{
            uri: path_url,
          }}
        />
      )}
      <View style={{flexDirection: 'column', marginLeft: 15}}>
        <Text style={[styles.title]}>{name}</Text>
        <Text style={[styles.titleDescription]}>{description}</Text>
      </View>
    </Pressable>
  );
};

export {AccessSubjectCard};
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  titleDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  iconContainer: {
    width: 29,
    height: 29,
  },
});
