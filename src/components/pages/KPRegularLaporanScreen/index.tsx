import React, {FC, useLayoutEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';

import {styles} from './style';
import Colors from '@constants/colors';
import api from '@api/index';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {ProgressCircle} from '@components/atoms';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import apiWithoutToken from '@api/withoutToken';
import {IRoute} from 'type/screen';

const RenderHeader = ({
  isLoading,
  reports,
}: {
  isLoading: boolean;
  reports?: any;
}) => {
  const navigation: any = useNavigation();
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerWrapperFirst}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconArrowLeftWhite />
          </TouchableOpacity>

          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.headerWrapperFirstTitle}>Laporan Belajar</Text>

            <Text style={styles.headerWrapperFirstSubtitle}>
              Kelas Pintar Regular
            </Text>
          </View>
        </View>

        <View style={styles.headerWrapperSecond}>
          <View>
            <ProgressCircle
              progress={
                isLoading ? 0 : Math.round(reports?.percentage?.learn || 0)
              }
              size={64}
              strokeWidth={6}
              color={'#B859FE'}
              children={
                <Text style={styles.textBold}>
                  {isLoading ? 0 : Math.round(reports?.percentage?.learn || 0)}%
                </Text>
              }
            />

            <Text style={[styles.textNormal, {top: 8}]}>Learn</Text>
          </View>

          <View>
            <ProgressCircle
              progress={
                isLoading ? 0 : Math.round(reports?.percentage?.practice || 0)
              }
              size={64}
              strokeWidth={6}
              color={'#FF9E16'}
              children={
                <Text style={styles.textBold}>
                  {isLoading
                    ? 0
                    : Math.round(reports?.percentage?.practice || 0)}
                  %
                </Text>
              }
            />

            <Text style={[styles.textNormal, {top: 8}]}>Practice</Text>
          </View>

          <View>
            <ProgressCircle
              progress={
                isLoading ? 0 : Math.round(reports?.percentage?.test || 0)
              }
              size={64}
              strokeWidth={6}
              color={Colors.success.light1}
              children={
                <Text style={styles.textBold}>
                  {isLoading ? 0 : Math.round(reports?.percentage?.test || 0)}%
                </Text>
              }
            />

            <Text style={[styles.textNormal, {top: 8}]}>Test</Text>
          </View>
        </View>
      </View>

      {isLoading && <LoadingIndicator />}
    </>
  );
};

const KPRegularLaporanScreen: FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute<IRoute<'KPRegularLaporanScreen'>>();
  const {user} = route?.params || {};

  const [reports, setReports] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const getAllReport = async () => {
      try {
        let response = await api.get('/lpt/v1/report');

        if (route?.params?.user) {
          const {access_token} = user;

          response = await apiWithoutToken.get('/lpt/v1/report', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
        }

        if (response.status === 200) {
          const data = response.data || {};

          const promises = data.data?.summary?.map(async (obj: any) => {
            if (obj?.subject?.icon_mobile) {
              const imgRes = await api.get(
                `/media/v1/image/${obj.subject.icon_mobile}`,
              );

              if (imgRes.status === 200 && imgRes.data?.code === 100) {
                obj.subject.path_url = imgRes.data?.data?.path_url;
              }
            }
          });

          await Promise.all(promises);
          setReports(data.data);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    getAllReport();
  }, [route?.params?.user, user]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.primary.base,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={{height: 297 * 0.75}}>
        <Bg width={'100%'} height={297} style={{position: 'absolute'}} />
        <RenderHeader isLoading={isLoading} reports={reports} />
      </View>

      <View style={styles.body}>
        {reports?.summary?.map((val: any, id: number) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('KPRegularLaporanDetailScreen', {
                subject_id: val?.subject?.id,
                icon_mobile: val?.subject?.path_url,
                user: user,
              });
            }}
            key={id}
            style={styles.card}>
            <SvgUri uri={val?.subject?.path_url} width={48} height={48} />

            <View style={{flex: 1}}>
              <Text style={styles.cardTextTitle}>{val?.subject?.name}</Text>

              <Text style={styles.cardTextSubTitle}>
                <Text style={{color: Colors.dark.neutral100}}>
                  {val?.user_progress}
                </Text>{' '}
                {`dari ${val?.total_materi} materi selesai`}
              </Text>
            </View>

            <ProgressCircle
              progress={val?.percentage}
              size={48}
              strokeWidth={4}
              color={Colors.primary.base}
              children={
                <Text style={[styles.textNormal, {color: Colors.primary.base}]}>
                  {`${val?.percentage}%`}
                </Text>
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export {KPRegularLaporanScreen};
