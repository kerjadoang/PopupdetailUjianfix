/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import {capitalizeEachWord} from '@constants/functional';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import ArrowBlueIcon from '@assets/svg/blueArrow.svg';
import Provider from '@services/media/provider';
import {Pressable} from 'react-native';

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
  const [userAvatar, setUserAvatar] = useState<string>('');

  const handleFetchAvatar = async () => {
    const _resImage: any = await Provider?.getImage(data?.avatar);
    const resDataImage = _resImage || false;
    if (resDataImage?.code === 100) {
      setUserAvatar(resDataImage?.data?.path_url);
    }
  };

  useEffect(() => {
    handleFetchAvatar();
  }, []);
  return (
    <View
      key={Math.random()}
      style={{
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      }}>
      <View
        style={{
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginBottom: 10,
            marginTop: 15,
          }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {userAvatar.endsWith('.svg') ? (
              <SvgUri uri={userAvatar ?? ''} />
            ) : userAvatar.endsWith('.png') || userAvatar.endsWith('.jpg') ? (
              <Image
                source={{uri: userAvatar ?? ''}}
                style={{width: 40, height: 40, borderRadius: 100}}
              />
            ) : (
              <View />
            )}
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 14,
                lineHeight: 18,
                color: Colors.dark.neutral100,
              }}>
              {data?.full_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                lineHeight: 16,
                color: Colors.dark.neutral80,
                marginTop: 3,
              }}>
              NIS: {data?.registration_number}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              paddingRight: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                lineHeight: 16,
                color: Colors.dark.neutral60,
              }}>
              {/* 13 Jun 2022 • 08:20 */}
              {dayjs(data?.requested_date)
                .locale('id')
                .format('d MMM YYYY • hh:mm')}
            </Text>
            <View
              style={{
                minWidth: 20,
                paddingVertical: 5,
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  backgroundColor:
                    data?.approval_status === 'diterima'
                      ? Colors.success.light2
                      : data?.approval_status === 'ditolak'
                      ? Colors.danger.light2
                      : Colors.secondary.light2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    lineHeight: 16,
                    fontSize: 11,
                    color:
                      data?.approval_status === 'diterima'
                        ? Colors.success.base
                        : data?.approval_status === 'ditolak'
                        ? Colors.danger.base
                        : Colors.orange.dark1,
                  }}>
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
        <Text
          style={{
            paddingLeft: 15,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 12,
            lineHeight: 16,
            color: Colors.dark.neutral80,
            marginTop: 5,
            marginBottom: 15,
          }}>
          {`${capitalizeEachWord(data?.reason)} (${data?.days} hari: ${dayjs(
            data?.start_date,
          )
            .locale('id')
            .format('d MMM YYYY')} -  ${dayjs(data?.end_date)
            .locale('id')
            .format('d MMM YYYY')})`}
        </Text>
        {data?.approval_status === 'menunggu' &&
          withoutApprovalButton === false && (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: 15,
                }}>
                <Button
                  label="Tolak"
                  action={handleIgnore}
                  background="white"
                  borderColor={Colors.primary.base}
                  borderWidth={1}
                  color={Colors.primary.base}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: 5,
                  paddingRight: 15,
                }}>
                <Button
                  label="Terima"
                  action={handleAccept}
                  background={Colors.success.light1}
                />
              </View>
            </View>
          )}
        <Pressable
          onPress={handleGoDetail}
          style={{
            width: '100%',
            height: 50,
            backgroundColor: Colors.primary.light4,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingLeft: 15,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              lineHeight: 22,
              color: Colors.primary.base,
            }}>
            Lihat detail pengajuan
          </Text>
          <View style={{position: 'absolute', right: 20}}>
            <ArrowBlueIcon />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AttendanceCardComponent;
