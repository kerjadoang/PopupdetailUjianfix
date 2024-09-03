import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Button} from '../Button';
import {SvgUri} from 'react-native-svg';
import {
  dateFormatWithOnlyTime,
  renderCheckTodayDate,
} from '@constants/functional';

type _INotifData = {
  action_tolak_terima?: boolean;
  created_at?: string;
  description?: string;
  id_relasi?: number;
  id_image?: string;
  path_url?: string;
  is_read?: number;
  receiver_id?: number;
  title?: string;
  type?: string;
  user_id?: number;
  uuid?: string;
};

type IListNotification = {
  notifData: _INotifData;
  action: any;
  actionApproved?: any;
  actionRejected?: any;
};

const ListNotification = ({
  notifData,
  action,
  actionApproved,
  actionRejected,
}: IListNotification) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.view,
        {
          backgroundColor: !notifData?.is_read
            ? notifData?.action_tolak_terima
              ? Colors.white
              : Colors.primary.light3
            : Colors.white,
        },
      ]}>
      <View style={styles.imageContainer}>
        {notifData?.path_url?.endsWith('.svg') ? (
          <SvgUri uri={notifData?.path_url} width={'100%'} />
        ) : notifData?.path_url?.endsWith('.png') ||
          notifData?.path_url?.endsWith('.svg') ||
          notifData?.path_url?.endsWith('.jpg') ? (
          <Image source={{uri: notifData?.path_url ?? ''}} />
        ) : null}
      </View>
      <View style={styles.titleContainer}>
        {!notifData?.is_read && !notifData?.action_tolak_terima && (
          <View style={styles.dot} />
        )}

        <Text
          style={[
            styles.title,
            {
              color: !notifData?.is_read
                ? notifData?.action_tolak_terima
                  ? Colors.dark.neutral80
                  : Colors.dark.neutral100
                : Colors.dark.neutral80,
            },
          ]}>
          {notifData?.title}
        </Text>
      </View>
      <View>
        <Text style={[styles.description]}>{notifData?.description}</Text>
      </View>

      {notifData?.action_tolak_terima && (
        <View style={styles.invitationButtonContainer}>
          <View style={styles.invitationButtonLeft}>
            <Button
              label={'Tolak'}
              outline={true}
              fontSize={14}
              background={'white'}
              action={() => actionRejected()}
            />
          </View>
          <View style={styles.invitationButtonRight}>
            <Button
              label={'Terima'}
              action={() => actionApproved()}
              fontSize={14}
            />
          </View>
        </View>
      )}

      <View>
        <Text style={styles.date}>
          {/* {formatDateProductComment(
            notifData?.created_at,
            'DD MMM YYYY, HH:mm',
          )} */}
          {renderCheckTodayDate(
            notifData?.created_at || '',
            dateFormatWithOnlyTime,
            'DD MMM YYYY, HH:mm',
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
  },
  imageContainer: {width: '100%', marginBottom: '2%', alignItems: 'center'},
  invitationButtonLeft: {flex: 1, paddingRight: '3%'},
  invitationButtonRight: {flex: 1, paddingRight: '6%'},
  invitationButtonContainer: {
    flexDirection: 'row',
    marginVertical: '3%',
    justifyContent: 'center',
  },
  banner: {
    flex: 1,
    height: 150,
    marginVertical: 10,
    resizeMode: 'contain',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    marginTop: '1.5%',
    backgroundColor: Colors.primary.base,
    borderRadius: 25,
    marginRight: 8,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.dark.neutral80,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: 'Poppins-Regular',
  },
  date: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
    fontFamily: 'Poppins-Regular',
  },
});

export {ListNotification};
