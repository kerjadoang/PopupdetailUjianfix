import Colors from '@constants/colors';
import {IMAGES} from '@constants/image';
import React from 'react';
import {Image, Pressable, PressableProps} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import MoreIcon from '@assets/svg/ic_more_gray.svg';
import {IGetNotesResponseData} from '@redux';
import Fonts from '@constants/fonts';
import {convertDate} from '@constants/functional';

type ListNoteItemProps = {
  data?: IGetNotesResponseData;
  onPress?: PressableProps['onPress'];
  onPressMore?: () => void;
  firstIndex?: boolean;
  isSharedNote?: boolean;
};

export const ListNoteItem: React.FC<ListNoteItemProps> = props => {
  return (
    <>
      {!props.firstIndex && <View style={styles.divider} />}
      <View style={styles.wrapper}>
        <Pressable style={{flex: 1}} onPress={props.onPress}>
          <View style={styles.contentContainer}>
            <Text
              style={styles.notesTitle}
              numberOfLines={3}
              ellipsizeMode="tail">
              {props.data?.notes}
            </Text>
            {props.data?.path_url && (
              <View style={styles.heroImg}>
                <Image
                  style={{width: 56, height: 56}}
                  defaultSource={IMAGES.imgPlaceHolder}
                  source={{uri: props.data?.path_url}}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
          {props.data?.user?.full_name && props?.isSharedNote && (
            <Text style={styles.sharedFrom}>
              Dari {props.data?.user?.user_type?.name}:{' '}
              {props.data?.user?.full_name}
            </Text>
          )}
          {props.data?.created_at && (
            <Text
              style={[
                styles.notesDate,
                {marginTop: props.data?.user?.full_name ? 4 : 0},
              ]}>
              {props.data?.created_at &&
                `${convertDate(props.data?.created_at).format(
                  'D MMM YYYY • HH:mm',
                )}`}
            </Text>
          )}
        </Pressable>
        {props?.onPressMore ? (
          <TouchableOpacity onPress={props.onPressMore}>
            <MoreIcon />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.neutral20,
    marginVertical: 16,
  },
  heroImg: {
    width: 56,
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
  },
  contentContainer: {flexDirection: 'row', alignItems: 'center', gap: 15},
  notesTitle: {
    flex: 2,
    fontSize: 14,
    color: Colors.dark.neutral100,
    fontFamily: 'Poppins-Regular',
  },
  sharedFrom: {
    color: Colors.primary.light1,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 5,
  },
  notesDate: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
});

export default ListNoteItem;
