/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ListNotification} from '@components/atoms';
import Colors from '@constants/colors';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {fetchGetPromo, fetchUpdateReadPromo} from '@redux';
import {ScrollView} from 'react-native-gesture-handler';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const PromoTab: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'NotificationScreen'>>();
  const [promoNotifData, setPromoNotifData] = useState<any>([]);
  const [limitPromo, setLimitPromo] = useState<number>(0);
  const isFocus = useIsFocused();

  const handleMarkNotif = async (_data: {
    _id?: string;
    uuid?: string;
    id_relasi?: number;
    id_image?: string;
    title?: string;
    description?: string;
    is_read?: number;
    user_id?: number;
    created_at?: string;
    path_url?: string;
  }) => {
    await dispatch(
      fetchUpdateReadPromo(_data?.uuid, () => {
        dispatch(
          fetchGetPromo(
            limitPromo,
            (res: {
              config?: any;
              data?: {
                code?: number;
                data?: any;
                log_id?: any;
                message?: any;
                time?: any;
              };
              headers?: any;
              request?: any;
              status?: number;
              statusText?: any;
              proto?: any;
            }) => {
              if (res?.data?.code === 100) {
                setPromoNotifData(res?.data?.data);
              } else {
                Toast.show({
                  type: 'error',
                  text1: res?.data?.message ?? 'Terjadi kesalahan pada sistem',
                });
              }
            },
          ),
        );
      }),
    );
    navigation?.navigate('PromoDetailScreen', {
      data: _data,
      uuid: _data?._id,
    });
  };

  useFocusEffect(
    useCallback(() => {
      setLimitPromo(10);
    }, [isFocus]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        fetchGetPromo(
          limitPromo,
          (res: {
            config?: any;
            data?: {
              code?: number;
              data?: any;
              log_id?: any;
              message?: any;
              time?: any;
            };
            headers?: any;
            request?: any;
            status?: number;
            statusText?: any;
            proto?: any;
          }) => {
            setPromoNotifData(res?.data?.data);
          },
        ),
      );
    }, [limitPromo]),
  );

  return (
    <View style={styles.listContainer}>
      {promoNotifData?.length > 0 ? (
        <ScrollView>
          {promoNotifData?.map(
            (ie: {
              _id?: string;
              uuid?: string;
              id_relasi?: number;
              id_image?: string;
              title?: string;
              description?: string;
              is_read?: number;
              user_id?: number;
              created_at?: string;
              path_url?: string;
            }) => {
              return (
                <ListNotification
                  key={Math.random()}
                  notifData={ie}
                  action={() => handleMarkNotif(ie)}
                />
              );
            },
          )}
        </ScrollView>
      ) : (
        <View style={styles.emptyNotificationContainer}>
          <View style={styles.emptyNotificationContent}>
            <View style={styles.descriptionContent}>
              <Image
                source={require('../../../assets/images/maskot9.png')}
                style={styles.maskotStyle}
              />
              <Text style={styles.topDescription}>Belum Ada Promo Baru</Text>
              <Text style={styles.bottomDescription}>
                Cek kembali nanti, ya!
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
  listContainer: {backgroundColor: '#EEF0F4', height: '100%'},
  maskotStyle: {width: 110, height: 90, marginBottom: 20},
  emptyNotificationContent: {
    width: '90%',
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
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PromoTab;
