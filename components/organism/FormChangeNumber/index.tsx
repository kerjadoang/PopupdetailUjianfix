import {Button, InputText} from '@components/atoms';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './style';
import Colors from '@constants/colors';
import {Header} from '@components/atoms/Header';
import {Text} from 'react-native';
import useFormChangeNumber from './useFormChangeNumber';
import IconHandphone from '@assets/svg/ic_handphone.svg';
import {useRoute} from '@react-navigation/native';

const FormChangeNumber = ({}) => {
  const route = useRoute();
  const {phoneNumber} = route?.params;
  const {form, handleuserChange, submit, valid, errorMessage} =
    useFormChangeNumber();

  const _renderScreen = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Header label={'Ubah Nomor HP'} />

        <View style={styles.container}>
          <View>
            <Text style={styles.headerTitle}>
              {
                'Pastikan nomor handphone terhubung dengan WhatsApp untuk verifikasi kode.'
              }
            </Text>

            <View style={styles.fieldDescription}>
              <InputText
                inputMode={'numeric'}
                label={'No. HP Saat Ini'}
                backgroundColor={Colors.dark.neutral20}
                value={phoneNumber?.replace('+62', '0')}
                onChangeText={handleuserChange}
                disabled={true}
                leftIcon={IconHandphone}
                leftIconColor={Colors.primary.base}
              />
            </View>

            <InputText
              inputMode={'numeric'}
              label={'No. HP Baru'}
              backgroundColor={Colors.dark.neutral10}
              error={!valid}
              errorMessage={errorMessage}
              placeholder={'Masukan Nomor HP Baru'}
              onChangeText={handleuserChange}
              leftIcon={IconHandphone}
              leftIconColor={Colors.primary.base}
            />
          </View>

          <Button
            isDisabled={!valid}
            action={() => submit(form?.phone_number)}
            label={'Kirim Kode Verifikasi'}
          />
        </View>
      </ScrollView>
    );
  };

  return _renderScreen();
};

export {FormChangeNumber};
