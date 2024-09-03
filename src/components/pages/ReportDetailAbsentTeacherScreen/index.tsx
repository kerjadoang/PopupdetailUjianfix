import {View, Text, ScrollView, Pressable, Linking} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms';
import {styles} from './styles';
import Calender from '@assets/svg/ic_calendar_blue.svg';
import File from '@assets/svg/ic_file_blue.svg';
import useFormReportDetailAbsentTeacher from './useFormReportDetailAbsentTeacher';
import {ParamList} from 'type/screen';
import {convertDate} from '@constants/functional';
import RenderImage from '@components/atoms/RenderImage';
const ReportDetailAbsentTeacherScreen = () => {
  const route: any =
    useRoute<RouteProp<ParamList, 'ReportDetailAbsentTeacherScreen'>>();
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'ReportDetailAbsentTeacherScreen'>
    >();
  const {id, type, full_name} = route?.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail Ketidakhadiran'}
          backgroundColor="white"
          subLabel={full_name || '-'}
        />
      ),
    });
  }, [full_name, navigation]);
  const {data, media, isImage}: any = useFormReportDetailAbsentTeacher(
    id,
    type,
  );

  const formatDateToCustomFormatNoDays = (dateString: any) => {
    const formattedDate = convertDate(dateString).format('D MMMM YYYY');
    return formattedDate;
  };

  const formatDateToCustomFormatWIthTime = (dateString: any) => {
    const formattedDate = convertDate(dateString).format('D MMMM YYYY HH:mm');
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.card}>
          <Text style={styles.textTitleBlack}>{data?.full_name}</Text>
          <Text style={styles.textSubTitle}>
            NIK: {data?.registration_number || '-'}
          </Text>
          <Text style={[styles.textGrey, {textTransform: 'capitalize'}]}>
            {data?.reason} ({data?.days} Hari)
          </Text>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <Calender width={24} height={24} style={{marginRight: 10}} />
            {data?.days > 1 ? (
              <Text style={styles.textSubTitle}>
                {formatDateToCustomFormatNoDays(data?.start_date)} -{' '}
                {formatDateToCustomFormatNoDays(data?.end_date)}
              </Text>
            ) : (
              <Text style={styles.textSubTitle}>
                {formatDateToCustomFormatNoDays(data?.start_date)}
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.textSubTitle}>
            Diajukan pada{' '}
            {formatDateToCustomFormatWIthTime(data?.requested_date)}
          </Text>
          <View
            style={[
              styles.row,
              {alignItems: 'center', marginVertical: 10, gap: 8},
            ]}>
            <Pressable
              style={
                data?.approval_status === 'diterima'
                  ? styles.buttonGreen
                  : styles.buttonRed
              }>
              <Text
                style={
                  data?.approval_status === 'diterima'
                    ? [styles.textGreen, {textTransform: 'capitalize'}]
                    : [styles.textRed, {textTransform: 'capitalize'}]
                }>
                {data?.approval_status}
              </Text>
            </Pressable>
            <Text style={[styles.textSubTitle, {width: '60%'}]}>
              Oleh Admin: {data?.reviewer} {'\n'}pada{' '}
              {formatDateToCustomFormatWIthTime(data?.reviewed_date)}
            </Text>
          </View>
        </View>
        {data?.media_id ? (
          <View>
            <View style={styles.line} />
            <Text style={styles.textTitleBigBlack}>Lampiran</Text>

            <View>
              {isImage ? (
                <RenderImage imageId={data?.media_id} style={styles.image} />
              ) : (
                <Pressable
                  style={styles.buttonFile}
                  onPress={() => {
                    Linking.openURL(media?.path_url).catch((err: any) =>
                      // eslint-disable-next-line no-console
                      console.error("Couldn't load page", err),
                    );
                  }}>
                  <Text style={styles.textSubTitleGrey}>File</Text>
                  <View style={styles.row}>
                    <File style={{marginRight: 10}} />
                    <Text style={styles.textTitleBlack}>
                      {media?.original_name}
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
          </View>
        ) : null}
        <View style={styles.line} />
        <View>
          <Text style={styles.textTitleBigBlack}>Catatan</Text>
          <Text style={styles.textSubTitle}>{data?.note || '-'}</Text>
        </View>
        {data?.approval_status === 'ditolak' ? (
          <View>
            <View style={styles.line} />
            <Text style={styles.textTitleBigBlack}>Catatan Dari Admin</Text>
            <Text style={styles.textSubTitle}>
              {data?.reviewer_note || '-'}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export {ReportDetailAbsentTeacherScreen};
