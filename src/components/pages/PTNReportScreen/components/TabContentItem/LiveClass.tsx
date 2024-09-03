/* eslint-disable react-native/no-inline-styles */
import React, {FC, useLayoutEffect, useState} from 'react';
import dayjs from 'dayjs';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import IconClock from '@assets/svg/ic16_clock.svg';
import api from '@api/index';
import providerGuru from '@services/guru/provider';
import {CardListItem} from '../';
import {usePTNReportScreen} from '../../utils';
import apiWithoutToken from '@api/withoutToken';
import providerMedia from '@services/media/provider';
import ImproveYourSkillsCard from '@components/pages/TryOutDetailHistoryScreen/component/ImproveYourSkillsCard';
import {MainView} from '@components/atoms';
import LiveClassChart from '../LiveClassChart';
import {useNavigation} from '@react-navigation/native';
import IconPencil from '@assets/svg/ic32_practice.svg';
import IconChevronRight from '@assets/svg/ic16_chevron_right.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useDiagnoticTestResult from '@components/pages/DiagnoticTestResultScreen/useDiagnoticTestResult';

const LiveClass: FC<{
  valueFilterTryOut: any;
  valueFilterMapel: any;
  isFromParent: boolean;
  data: any;
}> = ({valueFilterTryOut, valueFilterMapel, isFromParent, data}) => {
  const navigation: any = useNavigation();
  const {checkHasDoneMinatBakat} = useDiagnoticTestResult();
  const {ptnStore} = usePTNReportScreen();
  const [summaryPoint, setSummaryPoint] = useState<any>(null);
  const [tryOutDate, setTryOutDate] = useState<any>(null);
  const [graph, setGraph] = useState<any>(null);

  useLayoutEffect(() => {
    const __getTryOutDate = async () => {
      try {
        let response = await api.get('guru/v1/murid/ptn/report/list-tryout');

        if (ptnStore?.user?.access_token) {
          response = await apiWithoutToken.get(
            'guru/v1/murid/ptn/report/list-tryout',
            {
              headers: {
                Authorization: `Bearer ${ptnStore?.user?.access_token}`,
              },
            },
          );
        }

        const {
          status,
          data: {data},
        } = response;

        if (status === 200) {
          const tryout = data?.find(
            (value: any) => value?.id === valueFilterTryOut,
          );

          if (tryout?.register_date_start && tryout?.time_start) {
            setTryOutDate({
              startRegistrasi: dayjs(tryout?.register_date_start).format(
                'YYYY-MM-DD',
              ),
              startTryout: dayjs(tryout?.time_start).format('YYYY-MM-DD'),
            });
          }
        }
      } catch (_) {}
    };

    __getTryOutDate();
  }, [ptnStore?.user?.access_token, valueFilterTryOut]);

  useLayoutEffect(() => {
    const __getGraph = async () => {
      try {
        const {
          status,
          data: {data},
        } = await providerGuru.getReportLiveClassGraph(
          {
            ...tryOutDate,
            module: valueFilterMapel,
          },
          ptnStore?.user,
        );

        if (status === 200) {
          setGraph(data);
        }
      } catch (_) {}
    };

    __getGraph();
  }, [ptnStore?.user, tryOutDate, valueFilterMapel]);

  useLayoutEffect(() => {
    const __getSummaryTotal = async () => {
      try {
        const {
          status,
          data: {data},
        } = await providerGuru.getReportLiveClassSummaryTotal(
          {
            ...tryOutDate,
            module: valueFilterMapel,
          },
          ptnStore?.user,
        );

        if (status === 200) {
          setSummaryPoint(data);

          await providerMedia.getImage(
            summaryPoint?.recommendation?.live_class?.user?.avatar,
          );
        }
      } catch (_) {}
    };

    __getSummaryTotal();
  }, [
    ptnStore?.user,
    summaryPoint?.recommendation?.live_class?.user?.avatar,
    tryOutDate,
    valueFilterMapel,
  ]);

  return (
    <>
      <CardListItem
        type="COLUMN"
        titleHighest="Jumlah Tertinggi"
        titleLowest="Jumlah Terendah"
        data={summaryPoint as any}
        isHideButtonDetail={true}
        services="Live Class"
      />

      <View style={[styles.card, {marginVertical: 16, paddingHorizontal: 16}]}>
        <MainView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
            }}>
            <IconClock width={24} height={24} />
            <Text style={styles.textBold}>Durasi Belajar</Text>
          </View>

          <View style={styles.durasiBelajarRow}>
            <View>
              <Text style={[styles.textRegular, {marginBottom: 4}]}>
                Total Sesi Kelas
              </Text>

              <Text style={styles.textBold}>
                {graph?.total_live_class !== 0 ? graph?.total_live_class : '-'}
              </Text>
              <MainView flexDirection="row" alignItems="center">
                <MainView
                  backgroundColor={Colors.primary.base}
                  width={20}
                  height={8}
                  marginRight={6}
                  borderRadius={8}
                  overflow="hidden"
                />
                <Text style={[styles.textRegular, {}]}>Sesi Kelas</Text>
              </MainView>
            </View>

            <View>
              <Text style={[styles.textRegular, {marginBottom: 4}]}>
                Total Rekaman Kelas
              </Text>

              <Text style={styles.textBold}>
                {graph?.total_record !== 0 ? graph?.total_record : '-'}
              </Text>
              <MainView flexDirection="row" alignItems="center">
                <MainView
                  backgroundColor={Colors.primary.light2}
                  width={20}
                  height={8}
                  marginRight={6}
                  borderRadius={8}
                  overflow="hidden"
                />
                <Text style={[styles.textRegular, {}]}>Rekaman Kelas</Text>
              </MainView>
            </View>
          </View>
        </MainView>

        <ScrollView
          horizontal={true}
          persistentScrollbar={true}
          showsHorizontalScrollIndicator={false}
          style={
            {
              // paddingBottom: 12,
            }
          }>
          <MainView>
            <LiveClassChart data={graph?.subject || []} />
            {/* <LiveClassChart data={liveClassDummyData} /> */}
          </MainView>
        </ScrollView>
      </View>

      {isFromParent ? (
        <TouchableOpacity
          onPress={() => {
            checkHasDoneMinatBakat(data, navigation);
          }}>
          <View style={styles.diagnosticReportComponent}>
            <Text style={styles.diagnosticReportTitle}>
              Lihat detil rekomendasi dan pilihan universitas favorit anak anda.
            </Text>
            <View style={styles.diagnosticReportFooter}>
              <IconPencil />
              <Text style={styles.diagnosticReportBtnTitle}>
                Laporan Minat & Bakat
              </Text>
              <IconChevronRight />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <ImproveYourSkillsCard
          classRecommendation={summaryPoint?.recommendation?.live_class}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  lineHorizontal: {
    height: 1,
    backgroundColor: Colors.dark.neutral20,
    marginBottom: 12,
    marginHorizontal: -16,
  },
  colorDark100: {
    color: Colors.dark.neutral100,
  },
  mv16: {
    marginVertical: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  textSize14: {
    fontSize: 14,
  },
  textSize16: {
    fontSize: 16,
  },
  textBold: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  textRegular: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 1,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  avatarContainer: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
  },
  watchRecordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  watchRecordingContainerText: {
    color: Colors.dark.neutral80,
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  durasiBelajarRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginRight: 16,
  },
  diagnosticReportComponent: {
    padding: 12,
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
  },
  diagnosticReportTitle: {
    color: Colors.primary.dark2,
    fontSize: 12,
    marginBottom: 8,
  },
  diagnosticReportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diagnosticReportBtnTitle: {
    flex: 1,
    marginLeft: 8,
    color: Colors.dark.neutral100,
    fontWeight: '600',
  },
});

export default LiveClass;
