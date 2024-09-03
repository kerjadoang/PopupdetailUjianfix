/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Colors from '@constants/colors';
import IconArrowBlue from '@assets/svg/ic_arrow_right_blue.svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SubjectType} from '@constants/subjectType';

type ILMSKPRegularCard = {
  path_url: string;
  subjectData: any;
};

export const LMSKPRegularCard: any = ({subjectData}: ILMSKPRegularCard) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'KPRegularScreen'>>();
  return (
    <View
      style={{
        width: '100%',
        height: 74,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChapterKPRegularScreen', {
            subject_data: subjectData,
            subject_type: SubjectType?.KPRegular.Learn,
          });
        }}
        style={{
          flex: 1,
          backgroundColor: Colors.primary?.light2,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            paddingLeft: '2%',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              lineHeight: 22,
              letterSpacing: 0.22,
              color: Colors.dark.neutral100,
            }}>
            Kelas Pintar Regular
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconArrowBlue />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          justifyContent: 'center',
          paddingLeft: '2%',
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 0.25,
            color: Colors.dark.neutral80,
          }}>
          Akses materi lainnya untuk mata pelajaran ini
        </Text>
      </View>
    </View>
  );
};
