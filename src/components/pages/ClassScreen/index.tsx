import {Button, RadioButton, Stepper} from '@components/atoms';
import React from 'react';
import Logo from '@assets/svg/maskot_2.svg';
import HatSMA from '@assets/svg/ic_sma.svg';
import HatSMP from '@assets/svg/ic_smp.svg';
import HatSD from '@assets/svg/ic_sd.svg';

import {ScrollView, Text, View} from 'react-native';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMergeState} from '@constants/functional';

const ClassScreen = ({}) => {
  const [state, setState] = useMergeState({
    selectedSchoolLevel: false,
    selectedSchoolMajor: false,
    selectedSchoolClass: false,
    listClassData: false,
    popUpData: false,
  });

  const route = useRoute();
  const {userName, fullName, userTypeId, phoneNumber}: any =
    route?.params || false;
  const {selectedSchoolLevel, selectedSchoolClass, selectedSchoolMajor} = state;
  const isSelectSMA = selectedSchoolLevel === 'SMA';
  const isSelectSMP = selectedSchoolLevel === 'SMP';
  const isSelectSD = selectedSchoolLevel === 'SD';
  const useClass =
    selectedSchoolClass == 10 && selectedSchoolMajor === 'IPA'
      ? 10
      : selectedSchoolClass == 10 && selectedSchoolMajor === 'IPS'
      ? 10
      : selectedSchoolClass == 11 && selectedSchoolMajor === 'IPA'
      ? 11
      : selectedSchoolClass == 11 && selectedSchoolMajor === 'IPS'
      ? 11
      : selectedSchoolClass == 12 && selectedSchoolMajor === 'IPA'
      ? 12
      : selectedSchoolClass == 12 && selectedSchoolMajor === 'IPS'
      ? 12
      : selectedSchoolClass;

  // const useClass =
  //   selectedSchoolClass == 10 && selectedSchoolMajor === 'IPA'
  //     ? 10
  //     : selectedSchoolClass == 10 && selectedSchoolMajor === 'IPS'
  //     ? 15
  //     : selectedSchoolClass == 11 && selectedSchoolMajor === 'IPA'
  //     ? 11
  //     : selectedSchoolClass == 11 && selectedSchoolMajor === 'IPS'
  //     ? 12
  //     : selectedSchoolClass == 12 && selectedSchoolMajor === 'IPA'
  //     ? 13
  //     : selectedSchoolClass == 12 && selectedSchoolMajor === 'IPS'
  //     ? 14
  //     : selectedSchoolClass;

  const navigation: any = useNavigation();

  const _renderScreen = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Header />

        <View style={styles.container}>
          <View>
            <Stepper
              active={2}
              labels={['Data Diri', 'Kelas', 'Kata Sandi', 'Verifikasi']}
            />

            <Logo width={80} height={80} style={styles.maskotIcon} />

            <Text style={styles.title}>{'Pilih Jenjang dan Kelas'}</Text>

            <RadioButton
              type="VERTICAL_WITH_IMAGE"
              label="Pilih Jenjang"
              bottom={24}
              data={[
                {
                  value: 'SD',
                  image: (
                    <HatSD width={64} height={64} style={{marginBottom: 8}} />
                  ),
                },
                {
                  value: 'SMP',
                  image: (
                    <HatSMP width={64} height={64} style={{marginBottom: 8}} />
                  ),
                },
                {
                  value: 'SMA',
                  image: (
                    <HatSMA width={64} height={64} style={{marginBottom: 8}} />
                  ),
                },
              ]}
              onSelect={value => {
                setState({
                  selectedSchoolLevel: value,
                  selectedSchoolClass: false,
                  selectedSchoolMajor: false,
                });
              }}
            />

            {selectedSchoolLevel ? (
              <RadioButton
                type={isSelectSD ? 'SDCLASS' : 'CLASS'}
                label={'Pilih Kelas'}
                data={
                  isSelectSMA
                    ? [{value: '10'}, {value: '11'}, {value: '12'}]
                    : isSelectSMP
                    ? [{value: '7'}, {value: '8'}, {value: '9'}]
                    : [
                        {value: '1'},
                        {value: '2'},
                        {value: '3'},
                        {value: '4'},
                        {value: '5'},
                        {value: '6'},
                      ]
                }
                onSelect={value => {
                  setState({
                    selectedSchoolClass: value,
                  });
                }}
              />
            ) : null}

            {isSelectSMA && selectedSchoolClass ? (
              <RadioButton
                top={24}
                bottom={40}
                type="MAJOR"
                label="Pilih Jurusan"
                data={[{value: 'IPA'}, {value: 'IPS'}]}
                onSelect={value => {
                  setState({
                    selectedSchoolMajor: value,
                  });
                }}
              />
            ) : null}
          </View>

          <Button
            isDisabled={
              !selectedSchoolLevel ||
              !selectedSchoolClass ||
              (isSelectSMA && !selectedSchoolMajor)
            }
            action={() => {
              navigation.navigate('InputPasswordScreen', {
                userName: userName,
                fullName: fullName,
                userTypeId: userTypeId,
                phoneNumber: phoneNumber,
                userClass: useClass,
              });
            }}
            label={'Lanjut'}
          />
        </View>
      </ScrollView>
    );
  };

  return _renderScreen();
};

export {ClassScreen};
