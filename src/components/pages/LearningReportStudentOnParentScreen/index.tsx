/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '@components/atoms';
import {
  CardLearningReportStudent,
  RenderLaporanKelasPintarRegular,
  RenderLaporanLMS,
  RenderLaporanPTN,
  RenderLaporanSoal,
} from './components';
import Colors from '@constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import apiWithoutToken from '@api/withoutToken';
import {IRombelUserDetail} from 'type/rombel-user-detail';
import jwtDecode from 'jwt-decode';
import {ParamList} from 'type/screen';

const LearningReportStudentOnParentScreen = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<ParamList, 'LearningReportStudentOnParentScreen'>>();
  const {data} = route.params;
  const [detail, setDetail] = useState<IRombelUserDetail>();
  const [detailUser, setDetailUser] = useState<IBaseUser>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Laporan Belajar'}
          subLabel={`${data?.full_name} • ${
            data?.rombel_name || 'Tidak ada Class'
          }`}
        />
      ),
    });
  }, []);

  useEffect(() => {
    getDetailUser();
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const res = await apiWithoutToken.get(
        `/lms/v1/rombel-user/detail/${data?.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        },
      );
      if (res?.data?.code === 100) {
        return setDetail(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const getDetailUser = async () => {
    try {
      const resUser = jwtDecode<IBaseUser>(data?.access_token);
      setDetailUser(resUser);
    } catch (err) {
      return;
    }
  };

  const renderLaporanKelasPintarRegular = () => {
    return <RenderLaporanKelasPintarRegular data={data} />;
  };

  const renderLaporanSoal = () => {
    return <RenderLaporanSoal data={data} />;
  };

  const renderLaporanPTN = () => {
    return <RenderLaporanPTN data={data} navigation={navigation} />;
  };

  const renderLaporanLMS = () => {
    return <RenderLaporanLMS data={data} />;
  };

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: Colors.white,
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 10,
          paddingHorizontal: 1,
        }}>
        <CardLearningReportStudent
          title="Laporan Kelas Pintar Regular"
          children={renderLaporanKelasPintarRegular()}
          next={true}
          nextAction={() =>
            navigation.navigate('KPRegularLaporanScreen', {user: data})
          }
        />
        <CardLearningReportStudent
          title="Laporan Soal"
          children={renderLaporanSoal()}
          next={true}
          nextAction={() =>
            navigation.navigate('PracticeSoalReportScreen', {user: data})
          }
        />
        <CardLearningReportStudent
          title="Laporan PTN"
          children={renderLaporanPTN()}
          next={false}
        />
        {!!detailUser?.school_id && (
          <CardLearningReportStudent
            title="Laporan LMS"
            children={renderLaporanLMS()}
            next={true}
            nextAction={() =>
              navigation.navigate('LMSOnParentScreen', {
                data: data,
                detail: detail,
              })
            }
          />
        )}
      </ScrollView>
    </View>
  );
};

export {LearningReportStudentOnParentScreen};
