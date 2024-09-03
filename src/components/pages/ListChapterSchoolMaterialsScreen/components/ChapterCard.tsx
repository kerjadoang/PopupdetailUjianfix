import React from 'react';
import Colors from '@constants/colors';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import IconCheck from '@assets/svg/ic24_check_green.svg';
import IconMore from '@assets/svg/ic24_more_gray.svg';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {generalStyles} from '@constants/styles';
type Data = {
  name?: string;
  editable?: boolean;
  is_active?: boolean;
  subject_id?: number;
  class_id?: number;
  id?: number;
  school_id?: number;
  duration?: number;
};

type Props = {
  index: number;
  onPress?: any;
  onPressMore?: any;
  imageStyle?: any;
  title?: string;
  data?: Data;
  setSelected?: any;
  selected?: any;
  lengthData?: number;
};

const ChapterCard = (props: Props) => {
  return (
    <View
      style={[
        styles.card,
        {
          marginBottom:
            props?.index + 1 === props?.lengthData
              ? props?.lengthData * 11
              : 16,
        },
      ]}>
      <Pressable
        onPress={() => {
          props.onPress ? props?.onPress() : null;
          props?.setSelected(props?.data);
        }}
        style={styles.titleContainer}>
        <Text style={[styles.title]}>
          {props?.data?.name ? props.data?.name : '-'}
        </Text>
      </Pressable>
      <View style={generalStyles.row}>
        {props?.selected?.id === props?.data?.id ? (
          <IconCheck width={24} height={24} />
        ) : null}
        {props?.data?.editable && props?.data?.school_id !== 0 ? (
          <TouchableOpacity
            onPress={() => {
              props?.onPressMore();
              props?.setSelected(props?.data);
            }}>
            <IconMore width={24} height={24} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export {ChapterCard};
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});
