import React from 'react';
import Colors from '@constants/colors';
import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import IconMore from '@assets/svg/ic24_more_gray.svg';
import IconCheck from '@assets/svg/ic24_check_green.svg';
import IconRight from '@assets/svg/ic16_chevron_right.svg';
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
  index?: number;
  onPress?: any;
  onPressMore?: any;
  onPressSubject?: any;
  imageStyle?: any;
  title?: string;
  data?: Data;
  setSubjectSelected?: any;
  stylesTitle?: any;
  leftIconSize?: any;
  subjectSelected?: Data;
  lengthData?: number;
  isNavigate?: boolean;
};

const SubjectCard = (props: Props) => {
  const icon =
    props?.data?.icon_path_url ??
    'https://storage.googleapis.com/kp-bucket-staging/kelas_pintar/file/master/a299aa23-285f-4a60-9eaf-86ea117bd9df.svg';
  return (
    <View
      style={[
        styles.card,
        {
          marginBottom:
            props?.index + 1 === props?.lengthData
              ? props?.lengthData * 30
              : 16,
        },
      ]}>
      <Pressable
        onPress={() => {
          props?.onPress
            ? props.onPress()
            : props.onPressSubject
            ? props?.onPressSubject(props?.data)
            : null;
          props?.setSubjectSelected(props?.data);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {icon?.endsWith('svg') ? (
          <SvgUri
            uri={icon}
            height={props?.leftIconSize ? props.leftIconSize : 40}
            width={props?.leftIconSize ? props.leftIconSize : 40}
          />
        ) : (
          <Image
            style={[
              styles.iconContainer,
              {
                width: props?.leftIconSize ? props.leftIconSize : 40,
                height: props?.leftIconSize ? props.leftIconSize : 40,
              },
            ]}
            source={{
              uri: icon,
            }}
          />
        )}
        <View style={{marginLeft: 16, width: '70%'}}>
          <Text
            style={[styles.title, props?.stylesTitle && props?.stylesTitle]}>
            {props?.data?.name ? props.data?.name : '-'}
          </Text>
        </View>
      </Pressable>
      <View style={{flexDirection: 'row'}}>
        {props?.subjectSelected?.id === props?.data?.id ? (
          <IconCheck width={24} height={24} />
        ) : null}
        {props?.isNavigate ||
        (props?.data?.editable && props?.data?.school_id) ? (
          <TouchableOpacity
            onPress={() => {
              props.onPressSubject
                ? props?.onPressSubject(props?.data?.id, props?.data?.name)
                : props?.onPressMore
                ? props?.onPressMore()
                : null;

              props?.setSubjectSelected(props?.data);
            }}>
            {props?.isNavigate ? (
              <IconRight width={16} height={16} />
            ) : (
              <IconMore width={24} height={24} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export {SubjectCard};
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
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  iconContainer: {
    width: 40,
    height: 40,
  },
});
