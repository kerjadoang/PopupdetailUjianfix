import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import {Button, InputText} from '@components/atoms';
import {regexEmail, regexPhoneIndonesia} from '@constants/functional';
import {useLinkAccount, useUserSearch} from '@services/uaa';

import Robot from '@assets/svg/robot_link_account.svg';
import ModalUserInfo from './components/ModalUserInfo';
import {ISearchUserData} from '@services/uaa/type';
import {useDispatch} from 'react-redux';
import {fetchGetAllChildren} from '@redux';
import {ParamList} from 'type/screen';

const content = {
  ['orangtua']: {
    title: 'Anak',
    subtitle:
      'Hubungkan akun anak untuk pantau aktivitas dan progres belajarmu.',
    desc: (userFullName?: string) =>
      `Silakan konfirmasi jika akun di atas adalah benar anak kamu. Notifikasi akan dikirim ke ${userFullName} untuk melakukan verifikasi.`,
  },
  ['anak']: {
    title: 'Orang Tua',
    subtitle:
      'Hubungkan akun orang tua untuk pantau aktivitas dan progres belajarmu.',
    desc: (userFullName?: string) =>
      `Silakan konfirmasi jika akun di atas adalah benar orang tua kamu. Notifikasi akan dikirim ke ${userFullName} untuk melakukan verifikasi.`,
  },
};

const LinkAccountScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {error, mutate} = useUserSearch();
  const {mutate: mutateLinkAccount} = useLinkAccount();
  const route = useRoute<RouteProp<ParamList, 'LinkAccountScreen'>>();
  const {
    control,
    formState: {errors, isValid},
    handleSubmit,
    setError,
  } = useForm({mode: 'onChange'});
  const {height} = useWindowDimensions();

  const [visible, setVisible] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [userDataResponse, setUserDataResponse] = useState<ISearchUserData>();

  const title = route.params?.title;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      header: () => <Header backgroundColor="transparent" />,
    });
  }, [navigation]);

  useEffect(() => {
    if (error) {
      setError('nomorTelp', {
        type: 'validate',
        message: error?.response?.data?.message ?? '',
      });
    }
  }, [error, setError]);

  const onSubmit = (data: any) => {
    let nomorTelfon: String = data?.nomorTelp;
    const prefix08 = ['08'];
    const prefix62 = ['628'];
    if (prefix08?.includes(data?.nomorTelp.slice(0, 2))) {
      nomorTelfon = '+628' + data?.nomorTelp.slice(2, data?.nomorTelp?.length);
    } else if (prefix62?.includes(data?.nomorTelp.slice(0, 3))) {
      nomorTelfon = '+628' + data?.nomorTelp.slice(3, data?.nomorTelp?.length);
    }
    mutate(title, {username: nomorTelfon?.toLowerCase()}).then(
      (res: ISearchUserData) => {
        if (res) {
          setUserDataResponse(res);
          setVisible(true);
        }
      },
    );
  };

  const onLinkAccount = () => {
    const bodyParentRequest = {
      orangtua: {
        student_id: userDataResponse?.data?.id,
      },
      anak: {
        parent_id: userDataResponse?.data?.id,
      },
    };
    mutateLinkAccount(title, bodyParentRequest[title]).then(res => {
      if (res) {
        setShow(true);
        if (title === 'orangtua') {
          dispatch(fetchGetAllChildren());
        }
      }
    });
  };

  const isInputValid = useCallback((value: any) => {
    if (isNaN(Number(value))) {
      return regexEmail.test(value) || 'Penulisan nomor HP/Email salah';
    }
    return regexPhoneIndonesia.test(value) || 'Penulisan nomor HP/Email salah';
  }, []);

  const onCloseSwipeUp = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollVContainer}>
        <Robot width={80} height={80} />
        <Text style={styles.title}>Tambah Akun {content[title].title}</Text>
        <Text style={styles.subtitle}>{content[title].subtitle}</Text>

        <View style={{width: '100%', marginTop: 24}}>
          <Controller
            name="nomorTelp"
            control={control}
            rules={{
              required: 'Penulisan nomor HP/Email salah',
              validate: isInputValid,
            }}
            render={({field: {onChange, value}}) => (
              <InputText
                label={`No. HP / Email ${content[title].title}`}
                error={!!errors?.nomorTelp?.message}
                errorMessage={errors?.nomorTelp?.message as string}
                placeholder=""
                value={value}
                // value={form?.username}
                onChangeText={onChange}
                backgroundColor={Colors.dark.neutral10}
                borderWidth={undefined}
                secure={false}
              />
            )}
          />
        </View>
      </ScrollView>
      <Button
        style={{width: '95%'}}
        label="Hubungkan Akun"
        isDisabled={!isValid}
        action={handleSubmit(onSubmit)}
      />
      <ModalUserInfo
        visible={visible}
        data={userDataResponse?.data}
        height={(height / 75) * 100}
        onClose={onCloseSwipeUp}
        onConfirm={onLinkAccount}
        role={title}
        show={show}
        setShow={setShow}
        navigation={navigation}
        desc={content[title].desc(userDataResponse?.data?.full_name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingBottom: 20,
  },
  scrollVContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '95%',
    marginTop: 40,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.dark.neutral100,
    marginTop: 24,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LinkAccountScreen;
