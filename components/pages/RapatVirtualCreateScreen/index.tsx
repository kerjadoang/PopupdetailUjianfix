/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import {Header, InputText, SwipeUp} from '@components/atoms';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from '@components/atoms';
import styles from './style';
import {
  convertDate,
  dismissLoading,
  makePrefixUppercaseRestLowercase,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import ChevronDown from '@assets/svg/ic_arrow_right_blue.svg';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
// const windoweight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;
import {virtualMeetingStateUpdate} from '@redux';
import {FormSelect, SwipeUpContent} from './components';
import {__formatDateTime} from './utils';
import IconCalendarBlue from '@assets/svg/ic_calendar_blue.svg';
import IconCopy from '@assets/svg/ic24_copy_blue.svg';
import dayjs from 'dayjs';
import api from '@api/index';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {apiGet, apiPut} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';

const RapatVirtualCreateScreen = () => {
  // routing setup
  const dispatch: any = useDispatch();
  const {virtualMeetingState} = useSelector((state: RootState) => state);
  const route = useRoute<RouteProp<ParamList, 'RapatVirtualCreateScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'RapatVirtualCreateScreen'>>();

  const {type, data} = route?.params;
  const currUser: IBaseUser = useSelector(
    (state: RootState) => state.getUser.data,
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={
            type === 'create' ? 'Buat Rapat Virtual' : 'Ubah Rapat Virtual'
          }
          onPressIconLeft={() => {
            navigation.goBack();
            dispatch(virtualMeetingStateUpdate('', 'destroy'));
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {}, [virtualMeetingState]);

  const [isShowSwipeUpDatePickerSent, setIsShowSwipeUpDatePickerSent] =
    useState(false);
  const [isShowSwipeUpDatePickerFinished, setIsShowSwipeUpDatePickerFinished] =
    useState(false);
  const [linkMeeting, setLinkMeeting] = useState<any>();
  const [duration, setDuration] = useState<any>();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [valueDatePicker, setValueDatePicker] = useState({
    day: dayjs().get('day'),
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
    hour: dayjs().get('hour'),
    minute: dayjs().get('minute'),
  });

  const __handleSaveDatePicker = (type: 'SENT' | 'FINISHED') => {
    if (type === 'SENT') {
      dispatch(virtualMeetingStateUpdate(valueDatePicker, 'time_start'));
      setIsShowSwipeUpDatePickerSent(false);
    } else if (type === 'FINISHED') {
      dispatch(virtualMeetingStateUpdate(valueDatePicker, 'time_end'));
      setIsShowSwipeUpDatePickerFinished(false);
    }
  };

  const createSubmit = async () => {
    const updatedData = {
      ...virtualMeetingState,
      time_start: __formatDateTime(virtualMeetingState.time_start, true),
      time_end: __formatDateTime(virtualMeetingState.time_end, true),
      participant: virtualMeetingState.participant.map(({id}: any) => ({id})),
    };

    setIsSubmit(true);
    const res = await api.post('/lms/v1/virtual-meeting/', updatedData);
    if (res?.status === 200) {
      setIsSubmit(false);
      Toast.show({
        type: 'success',
        text1: 'Rapat Virtual berhasil dibuat.',
      });
      dispatch(virtualMeetingStateUpdate('', 'destroy'));
      navigation.navigate('RapatVirtualTeacherScreen');
    } else {
      Toast.show({
        type: 'error',
        text1: res?.data?.message ?? '',
      });
    }
  };

  const updateVirtualMeeting = async () => {
    const updatedData = {
      ...virtualMeetingState,
      time_start: __formatDateTime(virtualMeetingState.time_start, true),
      time_end: __formatDateTime(virtualMeetingState.time_end, true),
      participant: virtualMeetingState.participant
        .flat()
        .map(({id}: any) => ({id})),
      meeting_url: linkMeeting,
      duration: duration,
    };
    try {
      const res = await apiPut({
        url: URL_PATH.put_update_virtual_meeting(data?.id),
        body: updatedData,
      });

      showSuccessToast('Rapat virtual berhasil disimpan.');
      dispatch(virtualMeetingStateUpdate('', 'destroy'));
      navigation.navigate('RapatVirtualTeacherScreen');
    } catch (err: any) {
      showErrorToast('Terjadi Kesalahan');
    }
  };

  const mapDateTime = (date: any) => {
    date = convertDate(date);
    return {
      day: dayjs(date).get('day'),
      date: dayjs(date).get('date'),
      month: dayjs(date).get('month') + 1,
      year: dayjs(date).get('year'),
      hour: dayjs(date).get('hour'),
      minute: dayjs(date).get('minute'),
    };
  };

  const getDetail = async (id: any) => {
    try {
      showLoading();
      const res = await apiGet({
        url: URL_PATH.get_detail_virtual_meeting(id ?? 0),
      });

      const participantList = res?.participant?.filter(
        (item: any) => item?.id !== currUser?.id,
      );

      setLinkMeeting(res?.meeting_url);
      setDuration(res?.duration);
      dispatch(virtualMeetingStateUpdate(res?.title, 'title'));
      dispatch(virtualMeetingStateUpdate(res?.description, 'description'));
      dispatch(virtualMeetingStateUpdate(participantList, 'participant'));
      dispatch(
        virtualMeetingStateUpdate(mapDateTime(res?.time_start), 'time_start'),
      );
      dispatch(
        virtualMeetingStateUpdate(mapDateTime(res?.time_end), 'time_end'),
      );
    } catch (err: any) {
      showErrorToast('Gagal mendapatkan detail rapat virtual.');
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (type === 'edit') {
      getDetail(data?.id);
    }
  }, [type]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* =============== */}
        {/* JUDUL RAPAT */}
        {/* =============== */}
        <View style={styles.MB_24}>
          <View style={styles.row}>
            <Text style={styles.titleInputForm}>Judul Rapat</Text>
          </View>

          <View style={[styles.row, styles.MT_8]}>
            <InputText
              value={virtualMeetingState.title}
              placeholder="Masukkan Judul Rapat"
              placeholderTextColor={Colors.dark.neutral50}
              onChangeText={value =>
                dispatch(virtualMeetingStateUpdate(value, 'title'))
              }
              inputTextStyle={styles.inputText}
            />
          </View>

          {isSubmit && !virtualMeetingState.title ? (
            <Text style={styles.textError}>{`${makePrefixUppercaseRestLowercase(
              'Judul Rapat',
            )} wajib diisi.`}</Text>
          ) : null}
        </View>

        {/* =============== */}
        {/* PESERTA RAPAT */}
        {/* =============== */}
        <View style={styles.MB_24}>
          <View style={styles.row}>
            <Text style={styles.titleInputForm}>Peserta Rapat</Text>
          </View>

          <View style={[styles.row, styles.MT_8]}>
            <InputText
              // value={title}
              placeholder={`${
                virtualMeetingState.participant.flat().length > 0
                  ? `${virtualMeetingState.participant.flat().length} Peserta`
                  : 'Pilih Peserta Rapat'
              }`}
              placeholderTextColor={Colors.dark.neutral50}
              onChangeText={() => {}}
              inputTextStyle={styles.inputText}
              disabled={true}
              onPress={() =>
                navigation.navigate('RapatVirtualListParticipantsScreen', {})
              }
              rightIcon={ChevronDown}
            />
          </View>

          {isSubmit && virtualMeetingState.participant.flat().length === 0 ? (
            <Text style={styles.textError}>{`${makePrefixUppercaseRestLowercase(
              'Peserta Rapat',
            )} wajib diisi.`}</Text>
          ) : null}
        </View>

        {/* =============== */}
        {/* TANGGAL MULAI */}
        {/* =============== */}
        <FormSelect
          label="Tanggal & Jam Mulai"
          selectedItem={
            virtualMeetingState?.time_start
              ? __formatDateTime(virtualMeetingState?.time_start)
              : 'Pilih Tanggal & Jam'
          }
          rightIcon={<IconCalendarBlue width={24} height={24} />}
          isValueExist={virtualMeetingState?.time_start}
          isSubmit={isSubmit && !virtualMeetingState?.time_start ? true : false}
          onPress={() => setIsShowSwipeUpDatePickerSent(true)}
        />

        <FormSelect
          label="Tanggal & Jam Selesai"
          selectedItem={
            virtualMeetingState?.time_end
              ? __formatDateTime(virtualMeetingState?.time_end)
              : 'Pilih Tanggal & Jam'
          }
          rightIcon={<IconCalendarBlue width={24} height={24} />}
          isValueExist={virtualMeetingState?.time_end}
          isSubmit={isSubmit && !virtualMeetingState?.time_end ? true : false}
          onPress={() => setIsShowSwipeUpDatePickerFinished(true)}
        />

        <View style={styles.MB_24}>
          <View style={styles.row}>
            <Text style={styles.titleInputForm}>Deskripsi (opsional)</Text>
          </View>

          <View style={[styles.row, styles.MT_8]}>
            <InputText
              multiline={true}
              value={virtualMeetingState.description}
              placeholder="Tulis deskripsi rapat virtual..."
              placeholderTextColor={Colors.dark.neutral50}
              onChangeText={value =>
                dispatch(virtualMeetingStateUpdate(value, 'description'))
              }
              inputTextStyle={{...styles.inputText, height: 120}}
            />
          </View>
        </View>

        {type === 'edit' ? (
          <View style={styles.MB_74}>
            <View style={styles.row}>
              <Text style={styles.titleInputForm}>Link Rapat</Text>
            </View>

            <InputText
              backgroundColor={Colors.dark.neutral20}
              disabled={true}
              onChangeText={() => {}}
              placeholder={linkMeeting}
              disabledRightIcon={false}
              rightIcon={IconCopy}
              onPressIcon={async () => {
                const token = await AsyncStorage.getItem(Keys.token);
                Clipboard.setString(
                  `${linkMeeting}${token?.replace(/^"(.*)"$/, '$1')}`,
                );
                showSuccessToast('Tautan Berhasil Disalin');
              }}
            />
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.containerBottomShadow}>
        <Button
          label={'Simpan'}
          action={() =>
            type === 'create' ? createSubmit() : updateVirtualMeeting()
          }
          fontSize={16}
        />
      </View>

      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUpDatePickerSent}
        onClose={() => setIsShowSwipeUpDatePickerSent(false)}
        height={500}
        children={
          <SwipeUpContent
            title="Pilih Tanggal & Jam Dikirim"
            type="DATE"
            selectedItem={valueDatePicker}
            onPress={() => __handleSaveDatePicker('SENT')}
            setSelectedItem={setValueDatePicker}
          />
        }
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUpDatePickerFinished}
        onClose={() => setIsShowSwipeUpDatePickerFinished(false)}
        height={500}
        children={
          <SwipeUpContent
            title="Pilih Tanggal & Jam Selesai"
            type="DATE"
            selectedItem={valueDatePicker}
            onPress={() => __handleSaveDatePicker('FINISHED')}
            setSelectedItem={setValueDatePicker}
          />
        }
      />
    </View>
  );
};
export {RapatVirtualCreateScreen};
