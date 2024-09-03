/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import ArrowBlue from '@assets/svg/blueArrow.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchGetRombelWithStudentRequests} from '@redux';
import {styles} from '../style';

const PengajuanKetidakHadiranScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'PengajuanKetidakHadiranScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'PengajuanKetidakHadiranScreen'>>();
  const dispatch: any = useDispatch();
  const [classesData, setClassesData] = useState<any>([]);

  useEffect(() => {
    dispatch(
      fetchGetRombelWithStudentRequests((res: any) => {
        setClassesData(res?.data.data);
      }),
    );
  }, []);

  return (
    <View style={styles.PKSContainer}>
      <Header
        label={'Pengajuan Ketidakhadiran'}
        backgroundColor={Colors.white}
      />
      <ScrollView>
        {classesData?.map((ie: any) =>
          ie?.rombel_class_school.map((ix: any) => {
            return (
              <Pressable
                key={Math.random()}
                onPress={() => {
                  navigation.navigate('KetidakhadiranScreen', {
                    subTitle: `${ix?.name} • ${route?.params?.type}`,
                    type: route?.params?.type,
                    rombelClassSchoolId: ix?.id,
                  });
                }}
                style={styles.PKSAttendanceCardContainer}>
                <View style={styles.PKSClassNameContainer}>
                  <Text
                    allowFontScaling={false}
                    style={styles.PKSAttendanceCardNameStyle}>
                    {ix?.name}
                  </Text>
                </View>
                <View style={styles.flex04}>
                  <Text
                    allowFontScaling={false}
                    style={styles.PKSAttendanceCardApplicationCountStyle}>
                    {ix?.absent_request_count > 0 &&
                      `${ix?.absent_request_count} Pengajuan`}
                  </Text>
                </View>
                <View style={styles.flex01}>
                  <ArrowBlue />
                </View>
              </Pressable>
            );
          }),
        )}
      </ScrollView>
    </View>
  );
};

export default PengajuanKetidakHadiranScreen;
