import React from 'react';
import Colors from '@constants/colors';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import IconCheckbox from '@assets/svg/Checkbox_unselect.svg';
import IconCheckboxSelected from '@assets/svg/Checkbox_selected.svg';
type Data = {
  name?: string;
  editable?: boolean;
  is_active?: boolean;
  curriculum_id?: number;
  class_id?: number;
  id?: number;
  path_url?: string;
  school_id?: number;
  icon_path_url?: string;
};

type Props = {
  index: number;
  onPress?: any;
  data?: Data;
  setSubjectSelected?: any;
  stylesTitle?: any;
  leftIconSize?: any;
  subjectSelected?: any;
  lengthData?: number;
};

const SubjectCardCheckbox = (props: Props) => {
  const path_url = props?.data?.icon_path_url
    ? props?.data.icon_path_url
    : 'https://storage.googleapis.com/kp-bucket-staging/kelas_pintar/file/master/a299aa23-285f-4a60-9eaf-86ea117bd9df.svg';
  return (
    <View
      style={[
        styles.card,
        {
          marginBottom:
            props?.index + 1 === props?.lengthData ? props?.lengthData * 2 : 16,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {path_url?.endsWith('svg') ? (
          <SvgUri
            uri={path_url}
            height={props?.leftIconSize ? props.leftIconSize : 24}
            width={props?.leftIconSize ? props.leftIconSize : 24}
          />
        ) : (
          <Image
            style={[
              styles.iconContainer,
              {
                width: props?.leftIconSize ? props.leftIconSize : 24,
                height: props?.leftIconSize ? props.leftIconSize : 24,
              },
            ]}
            source={{
              uri: path_url,
            }}
          />
        )}
        <View style={{marginLeft: 16, width: '70%'}}>
          <Text
            style={[styles.title, props?.stylesTitle && props?.stylesTitle]}>
            {props?.data?.name ? props.data?.name : '-'}
          </Text>
        </View>
      </View>
      {props?.subjectSelected?.includes(props?.data) ? (
        <TouchableOpacity
          onPress={() => {
            props.setSubjectSelected((prev: any) =>
              prev?.filter((obj: Data) => obj !== props?.data),
            );
          }}>
          <IconCheckboxSelected width={24} height={24} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            props.setSubjectSelected((prev: any) =>
              prev ? [...prev, props?.data] : [props?.data],
            );
          }}>
          <IconCheckbox width={24} height={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export {SubjectCardCheckbox};
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  iconContainer: {
    width: 40,
    height: 40,
  },
});
