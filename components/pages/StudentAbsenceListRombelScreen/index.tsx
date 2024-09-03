/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Header} from '@components/atoms';
import Colors from '@constants/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Pressable, Text, View} from 'react-native';
import ProviderLMS from '@services/lms/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ScrollView} from 'react-native-gesture-handler';
import SeniorHighSchoolIcon from '@assets/svg/seniorHighSchoolIcon.svg';
import ArrowBlueIcon from '@assets/svg/ic_arrow_right_grey.svg';
import {useSelector} from 'react-redux';

const StudentAbsenceListRombelScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'StudentAbsenceListRombelScreen'>
    >();
  const isFocus = useIsFocused();
  const [rombelData, setRombelData] = useState<any>([]);
  const {getUser} = useSelector(state => state);
  const handleFetchGetListRombel = async () => {
    try {
      const _resFetch = await ProviderLMS.getAllRombelWithStudentRequests();
      const ResData = _resFetch || false;
      if (ResData?.data?.code === 100) {
        setRombelData(ResData?.data?.data);
      } else {
        Toast?.show({
          type: 'error',
          text1: 'Terjadi kesalahan pada sistem kami',
        });
      }
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ||
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };
  useEffect(() => {
    handleFetchGetListRombel();
  }, [isFocus]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        label={'Pengajuan Ketidakhadiran'}
        backgroundColor={Colors.white}
        onPressIconRight={() => {}}
      />
      <ScrollView>
        {rombelData?.map(
          (_data: {
            id: number;
            name: string;
            order: number;
            rombel_class_school: any;
          }) => {
            return (
              <View key={Math?.random()} style={{paddingBottom: 20}}>
                <View
                  style={{
                    width: '100%',
                    paddingLeft: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SeniorHighSchoolIcon />
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      marginLeft: 10,
                      fontSize: 14,
                      lineHeight: 22,
                      letterSpacing: 0.25,
                      color: Colors?.dark?.neutral100,
                    }}>
                    {_data?.name}
                  </Text>
                </View>
                {_data?.rombel_class_school?.map(
                  (_rombelData: {
                    id: number;
                    name: string;
                    absent_request_count: number;
                  }) => {
                    return (
                      <Pressable
                        onPress={() => {
                          navigation?.navigate('StudentAbsenceHistoryScreen', {
                            role:
                              getUser?.data?.user_type_id === 4
                                ? 'kepsek'
                                : 'admin',
                            classRombelId: _rombelData?.id,
                            className: _rombelData?.name,
                          });
                        }}
                        style={{width: '100%', alignItems: 'center'}}>
                        <View
                          style={{
                            width: '90%',
                            paddingVertical: 10,
                            marginBottom: '1%',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            borderRadius: 10,
                            backgroundColor: 'white',
                            marginVertical: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                          }}>
                          <View style={{flex: 1}}>
                            <Text
                              style={{
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 14,
                                lineHeight: 18,
                                color: Colors?.dark?.neutral100,
                              }}>
                              {_rombelData?.name}
                            </Text>
                          </View>
                          <View style={{flex: 0.35}}>
                            {_rombelData?.absent_request_count !== 0 && (
                              <Text
                                style={{
                                  fontFamily: 'Poppins-Regular',
                                  fontSize: 12,
                                  lineHeight: 16,
                                  color: Colors?.primary?.base,
                                }}>
                                {_rombelData?.absent_request_count ?? 0}{' '}
                                Pengajuan
                              </Text>
                            )}
                          </View>
                          <View style={{flex: 0.1}}>
                            <ArrowBlueIcon />
                          </View>
                        </View>
                      </Pressable>
                    );
                  },
                )}
              </View>
            );
          },
        )}
      </ScrollView>
    </View>
  );
};

export default StudentAbsenceListRombelScreen;
