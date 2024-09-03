/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Colors from '@constants/colors';
import {ListNotification} from '@components/atoms';
import {_IItem, _IUpdateReadActivityConfirm} from './type';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchGetActivity,
  fetchGetAllChildren,
  fetchUpdateReadActivity,
  fetchUpdateReadActivityConfirm,
} from '@redux';
import {navigateNotification} from '@components/atoms/NotificationController/utils';
import {ParamList} from 'type/screen';

const Item = ({
  itemData,
  _handleMarkNotif,
  _handleUpdateReadActivityConfirm,
}: _IItem) => (
  <ListNotification
    key={itemData.id}
    notifData={itemData}
    action={() => _handleMarkNotif(itemData.uuid)}
    actionApproved={() =>
      _handleUpdateReadActivityConfirm({
        uuid: itemData?.uuid,
        type: 'approved',
        notifData: itemData,
      })
    }
    actionRejected={() =>
      _handleUpdateReadActivityConfirm({
        uuid: itemData?.uuid,
        type: 'rejected',
        notifData: itemData,
      })
    }
  />
);

const AktivitasTab: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigation: NavigationProp<ParamList> = useNavigation();
  const {
    getActivity,
    getUser: {data: userData},
  }: any = useSelector(state => state);
  const [notifActivityData, setNotifActivityData] = useState<any>([]);
  const [notifPage, setNotifPage] = useState<number>(10);
  const isFocus = useIsFocused();
  const userType = userData?.user_type_id;
  const handleMarkNotif = (id: string) => {
    dispatch(
      fetchUpdateReadActivity(id, (res: any) => {
        if (res?.data?.code === 0) {
          // Toast?.show({
          //   type: 'error',
          //   text1: res?.message ?? 'Terjadi kesalahan pada sistem kami',
          // });
        } else {
          dispatch(fetchGetActivity(notifPage));
          if (userType === 2) {
            dispatch(fetchGetAllChildren());
          }
        }
      }),
    );
  };

  const handleUpdateReadActivityConfirm = ({
    uuid,
    type,
    notifData,
  }: _IUpdateReadActivityConfirm) => {
    dispatch(
      fetchUpdateReadActivityConfirm({
        reqBody:
          userType === 2
            ? {
                student_id: notifData?.user_id,
                status: type,
                uuid: uuid,
              }
            : {
                parent_id: notifData?.user_id,
                status: type,
                uuid: uuid,
              },
        userType,
        callback: () => {
          dispatch(fetchGetActivity(notifPage));
          if (userType === 2) {
            dispatch(fetchGetAllChildren());
          }
        },
        // errCallback: (res: AxiosResponse) => {
        //   // dispatch(fetchGetActivity(notifPage));
        //   // if (userType === 2) {
        //   //   dispatch(fetchGetAllChildren());
        //   // }
        //   const errMessage = res.data?.message;
        //   if (errMessage) {
        //     showErrorToast(errMessage);
        //   }
        // },
      }),
    );
  };

  const handleEndReachList = () => {
    setNotifPage((prevNotifPage: number) => prevNotifPage + 10);
  };

  useFocusEffect(
    useCallback(() => {
      if (!isFocus) {
        return;
      }
      setNotifPage(10);
    }, [isFocus]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchGetActivity(notifPage));
    }, [notifPage]),
  );

  useFocusEffect(
    useCallback(() => {
      setNotifActivityData(getActivity);
    }, [getActivity]),
  );

  return (
    <View>
      {notifActivityData?.data?.length > 0 ? (
        <FlatList
          data={notifActivityData?.data}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReachList}
          renderItem={({item}) =>
            Item({
              itemData: item,
              _handleMarkNotif: async (id: any) => {
                navigateNotification({
                  navigation: navigation,
                  notifData: item,
                });
                handleMarkNotif(id);
              },
              _handleUpdateReadActivityConfirm: handleUpdateReadActivityConfirm,
            })
          }
        />
      ) : (
        <View style={styles.emptyNotificationContainer}>
          <View style={styles.emptyNotificationContent}>
            <View style={styles.descriptionContent}>
              <Image
                source={require('../../../assets/images/maskot9.png')}
                style={styles.maskotStyle}
              />
              <Text style={styles.topDescription}>Belum Ada Notifikasi</Text>
              <Text style={styles.bottomDescription}>
                Notifikasi baru akan tampil di sini.
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  maskotStyle: {width: 110, height: 90, marginBottom: 20},
  emptyNotificationContent: {
    width: '90%',
    marginTop: '50%',
  },
  activityIndicatorContainer: {
    width: '100%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomDescription: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  topDescription: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.dark.neutral100,
    fontFamily: 'Poppins-SemiBold',
  },
  descriptionContent: {
    alignItems: 'center',
  },
  maskotIcon: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  emptyNotificationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AktivitasTab;
