/* eslint-disable react-hooks/exhaustive-deps */
import api from '@api/index';
import {MainView} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {convertDate} from '@constants/functional';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import IconPeople from '@assets/svg/people.svg';
import IconCalendar from '@assets/svg/ic_calendar_blue.svg';

type IPromoDetail = {
  id: string;
  date: string;
  image: string;
  description: string;
  isLMS: boolean;
};

const AnnouncementDetailScreen = ({route}: any) => {
  const [detail, setDetail] = useState<IAnnouncementDetailState>({
    loading: true,
    data: {},
  });

  useEffect(() => {
    const {id}: IPromoDetail = route.params;
    fetchDetail(id);
  }, []);

  const fetchDetail = async (id: string) => {
    try {
      setDetail({...detail, data: {}, loading: true});
      const res = await api.get(`/lms/v1/announcement/${id}`, {});
      if (res?.status === 200) {
        const data = res?.data?.data || [];
        const imgRes = await api.get(
          `/media/v1/image/${res?.data?.data?.image}`,
        );
        if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
          data.path_url = imgRes?.data?.data?.path_url;
        }
        setDetail({...detail, data: data, loading: false});
      } else {
        setDetail({...detail, data: {}, loading: false});
        // Alert.alert('Mohon maaf artikel tidak tersedia');
      }
    } catch (err) {
      setDetail({...detail, data: {}, loading: false});
      // Alert.alert('Mohon maaf artikel tidak tersedia');
    }
  };

  if (detail?.loading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator />
      </View>
    );
  }
  const {data}: {data: IAnnouncementDetail} = detail;

  return (
    <SafeAreaView style={styles.background}>
      <Header label={'Pengumuman'} />
      {/*
        <View style={styles.buyButtonContainer}>
          <View style={styles.buyButtonInnerContainer}>
            <Button label={'Beli Paket'} action={undefined} />
          </View>
        </View>
     */}
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{data?.title || '-'}</Text>
        </View>
        <View style={styles.dateContainer}>
          <MainView flexDirection="row" gap={4} alignItems="center">
            <IconPeople height={20} width={20} />
            <Text style={styles.dateText}>
              {detail.data?.announcement_user_type
                ?.map(data => data.user_type?.name)
                .join(', ')}
            </Text>
          </MainView>
          <MainView flexDirection="row" gap={4} alignItems="center">
            <IconCalendar height={20} width={20} />
            <Text style={styles.dateText}>
              {convertDate(data?.time_start).format(
                'dddd, DD MMMM YYYY HH:mm',
              ) || ''}
              {' • '}
              {convertDate(data?.time_end).format('dddd, DD MMMM YYYY HH:mm') ||
                ''}
            </Text>
          </MainView>
        </View>
        {data?.path_url && (
          <View style={styles.imageContainer}>
            {data?.path_url.endsWith('svg') ? (
              <SvgUri uri={data?.path_url} />
            ) : (
              <Image
                style={{width: '100%', height: 150}}
                source={{
                  uri: data?.path_url,
                }}
              />
            )}
          </View>
        )}
        <View>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  activityIndicatorContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {width: '100%', borderRadius: 10, height: 150},
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
  },
  imageContainer: {alignItems: 'center', marginVertical: 10},
  dateContainer: {marginVertical: 10},
  titleContainer: {marginTop: 0},
  bodyContainer: {marginHorizontal: '5%', marginTop: 20},
  backIconContainer: {height: 80, justifyContent: 'center', marginLeft: '5%'},
  textButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {position: 'absolute', top: 0, width: '100%', height: 150},
  snackbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
  },
  buyButtonInnerContainer: {width: '90%'},
  headerInner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  emptyNotificationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContent: {
    alignItems: 'center',
  },
  maskotIcon: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  topDescription: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.dark.neutral100,
    fontFamily: 'Poppins-SemiBold',
  },
  bottomDescription: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  emptyNotificationContent: {
    width: '90%',
    marginTop: '80%',
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonContainer: {
    width: '100%',
    height: 80,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    alignItems: 'center',
    paddingTop: 15,
  },
});

export {AnnouncementDetailScreen};
