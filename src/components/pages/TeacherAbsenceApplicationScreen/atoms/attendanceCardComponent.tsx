import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import {capitalizeEachWord} from '@constants/functional';
import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'react-native';
import ArrowBlueIcon from '@assets/svg/blueArrow.svg';
import {Pressable} from 'react-native';
import {styles} from '../styles';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import Avatar from '@components/atoms/Avatar';

type _IAttendanceCardComponent = {
  data: {
    id: any;
    full_name: string;
    registration_number: string;
    reason: string;
    start_date: string;
    end_date: string;
    days: number;
    media_id: string;
    note: string;
    avatar: string;
    reviewer: string;
    reviewer_note: string;
    approval_status: string;
    requested_date: string;
    reviewed_date: string;
  };
  handleIgnore?: any;
  handleAccept?: any;
  handleGoDetail?: any;
  withoutApprovalButton?: boolean;
};

const AttendanceCardComponent = ({
  data,
  handleAccept,
  handleIgnore,
  handleGoDetail,
  withoutApprovalButton = false,
}: _IAttendanceCardComponent) => {
  const {getUser}: any = useSelector((state: RootState) => state);

  return (
    <View key={Math.random()} style={styles.attendanceCardContainerStyle}>
      <View style={styles.attendanceCardInnerContainerStyle}>
        <View style={styles.leftContentContainerStyle}>
          <View style={styles.avatarContainerStyle}>
            <Avatar id={data?.avatar} style={styles.imageStyle} />
          </View>
          <View style={styles.flex15}>
            <Text allowFontScaling={false} style={styles.fullnameStyle}>
              {data?.full_name ?? ''}
            </Text>
            <Text allowFontScaling={false} style={styles.registNumberStyle}>
              NIS: {data?.registration_number || '-'}
            </Text>
          </View>
          <View style={styles.statusContainerStyle}>
            <Text
              allowFontScaling={false}
              style={styles.requestedDateContainerStyle}>
              {/* 13 Jun 2022 • 08:20 */}
              {`${dayjs(data?.requested_date)
                .locale('id')
                .format('DD MMM YYYY • HH:mm')}`}
            </Text>
            <View style={styles.statusTextContainerStyle}>
              <View
                style={
                  data?.approval_status === 'diterima'
                    ? styles.statusApprovedBgColorStyle
                    : data?.approval_status === 'ditolak'
                    ? styles.statusRejectedBgColorStyle
                    : styles.statusPendingBgColorStyle
                }>
                <Text
                  allowFontScaling={false}
                  style={
                    data?.approval_status === 'diterima'
                      ? styles.statusApprovedTextColorStyle
                      : data?.approval_status === 'ditolak'
                      ? styles.statusRejectedTextColorStyle
                      : styles.statusPendingTextColorStyle
                  }>
                  {data?.approval_status === 'diterima'
                    ? 'Diterima'
                    : data?.approval_status === 'ditolak'
                    ? 'Ditolak'
                    : 'Belum diverifikasi'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text allowFontScaling={false} style={styles.startDateStyle}>
          {`${capitalizeEachWord(data?.reason)} (${data?.days} hari: ${dayjs(
            data?.start_date,
          )
            .utc()
            .locale('id')
            .format('DD MMM YYYY')} -  ${dayjs(data?.end_date)
            .utc()
            .locale('id')
            .format('DD MMM YYYY')})`}
        </Text>
        {data?.approval_status === 'menunggu' &&
          withoutApprovalButton === false &&
          getUser?.data?.user_type_id !== 4 && (
            <View style={styles.actionButtonContainerStyle}>
              <View style={styles.rejectButtonStyle}>
                <Button
                  label="Tolak"
                  action={handleIgnore}
                  background="white"
                  borderColor={Colors.primary.base}
                  borderWidth={1}
                  color={Colors.primary.base}
                />
              </View>
              <View style={styles.approveButtonStyle}>
                <Button
                  label="Terima"
                  action={handleAccept}
                  background={Colors.success.light1}
                />
              </View>
            </View>
          )}
        <Pressable onPress={handleGoDetail} style={styles.goDetailButtonStyle}>
          <Text
            allowFontScaling={false}
            style={styles.goDetailButtonLabelStyle}>
            Lihat detail pengajuan
          </Text>
          <View style={styles.seeDetailButton}>
            <ArrowBlueIcon />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AttendanceCardComponent;
