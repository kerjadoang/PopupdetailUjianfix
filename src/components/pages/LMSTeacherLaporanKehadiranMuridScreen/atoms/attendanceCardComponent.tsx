/* eslint-disable react-native/no-inline-styles */
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import {capitalizeEachWord, convertDate} from '@constants/functional';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import ArrowBlueIcon from '@assets/svg/blueArrow.svg';
import Avatar from '@components/atoms/Avatar';

type _IAttendanceCardComponent = {
  data: any;
  handleIgnore?: any;
  handleAccept?: any;
  handleGoDetail?: any;
};

const AttendanceCardComponent = ({
  data,
  handleAccept,
  handleIgnore,
  handleGoDetail,
}: _IAttendanceCardComponent) => {
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
            <Avatar
              id={data?.avatar}
              style={{width: 40, height: 40, borderRadius: 100}}
            />
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
              {convertDate(data?.requested_date).format('d MMM YYYY • hh:mm')}
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
          {`${capitalizeEachWord(data?.reason)} (${
            data?.days
          } hari: ${convertDate(data?.start_date).format('DD MMM YYYY')}${
            data?.days > 1 ? ' - ' : ''
          }${
            data?.days > 1
              ? convertDate(data?.end_date).format('DD MMM YYYY')
              : ''
          })`}
        </Text>
        {data?.approval_status === 'menunggu' && (
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
          <View
            style={{
              position: 'absolute',
              right: 20,
              paddingVertical: 10,
              paddingLeft: 10,
            }}>
            <ArrowBlueIcon />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default AttendanceCardComponent;
