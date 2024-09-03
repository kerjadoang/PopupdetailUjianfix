/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback, useLayoutEffect} from 'react';
import {
  BackHandler,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './style';
import IconCalendarBlue from '@assets/svg/ic_calendar_blue.svg';
import IconUploadBlue from '@assets/svg/ic_upload_blue.svg';
import IconClose from '@assets/svg/x.svg';
import RobotClose from '@assets/svg/Robot_close.svg';
import Colors from '@constants/colors';
import {Button, Header, InputText, PopUp, SwipeUp} from '@components/atoms';
import {
  convertDate,
  makePrefixUppercaseRestLowercase,
} from '@constants/functional';
import {FormSelect, SwipeUpContent} from './components';
import ProgressBar from '@components/atoms/ProgressBar';
import {__formatDateTime, useAnnouncementManageCreateScreen} from './utils';
import provider from '@services/lms/provider';
import mediaProvider from '@services/media/provider';

const AnnouncementManageCreateScreen: FC = () => {
  const {
    route,
    navigation,
    setIsLoading,
    isSubmit,
    title,
    setTitle,
    isShowSwipeUpListReceiver,
    setIsShowSwipeUpListReceiver,
    isShowSwipeUpDatePickerSent,
    setIsShowSwipeUpDatePickerSent,
    isShowSwipeUpDatePickerFinished,
    setIsShowSwipeUpDatePickerFinished,
    content,
    setContent,
    attachmentTemporary,
    setAttachmentTemporary,
    setAttachmentData,
    isShowUpload,
    setIsShowUpload,
    progressUpload,
    datePickerSent,
    setDatePickerSent,
    datePickerFinished,
    setDatePickerFinished,
    valueDatePicker,
    setValueDatePicker,
    listReceivers,
    receivers,
    setReceivers,
    receiversTemp,
    setReceiversTemp,
    formatReceiversToText,
    isShowPopUpBack,
    setIsShowPopUpBack,
    setProgressUpload,
    //
    __handleSave,
    __handleSelectedReceivers,
    __getListReceivers,
    __resetAttachment,
    __onUploadImage,
    __renderContentSwipeupUpload,
    __handleSaveDatePicker,
  } = useAnnouncementManageCreateScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: __renderHeader,
    });

    setIsLoading(true);
    __getListReceivers().finally(() => setIsLoading(false));

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setIsShowPopUpBack(true);
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  useLayoutEffect(() => {
    if (route.params?.type === 'EDIT') {
      const __getAnnouncement = async (announcementID: number) => {
        try {
          const {
            status,
            data: {data},
          } = await provider.getAnnouncement(announcementID);

          if (status === 200 && data) {
            const {image, ...sd} = data;
            let currentImage = null;

            if (image) {
              currentImage = (await mediaProvider.getImage(image))?.data;
              setAttachmentData({ID: image});
              setProgressUpload('100%');

              setAttachmentTemporary({
                name: currentImage?.name,
                type: currentImage?.content_type,
                uri: currentImage?.path_url,
              });
            }
            setTitle(sd?.title);
            setContent(sd?.description);
            const datePickerSentConverted = convertDate(sd?.time_start);
            const datePickerFinishedConverted = convertDate(sd?.time_end);

            setDatePickerSent({
              day: datePickerSentConverted.get('day'),
              date: datePickerSentConverted.get('date'),
              month: datePickerSentConverted.get('month') + 1,
              year: datePickerSentConverted.get('year'),
              hour: datePickerSentConverted.get('hour'),
              minute: datePickerSentConverted.get('minute'),
            });

            setDatePickerFinished({
              day: datePickerFinishedConverted.get('day'),
              date: datePickerFinishedConverted.get('date'),
              month: datePickerFinishedConverted.get('month') + 1,
              year: datePickerFinishedConverted.get('year'),
              hour: datePickerFinishedConverted.get('hour'),
              minute: datePickerFinishedConverted.get('minute'),
            });

            setReceivers(
              sd?.announcement_user_type?.map((value: any) => ({
                id: value?.user_type?.id,
                name: value?.user_type?.name?.replace('Guru Sekolah', 'Guru'),
                class: value?.announcement_class?.length
                  ? value?.announcement_class?.map((_value: any) => ({
                      id: _value?.class?.id,
                      name: _value?.class?.name,
                      parent_id: value?.user_type?.id,
                    }))
                  : null,
                total_class: value?.total_class || 0,
              })),
            );
          }
        } catch (_) {}
      };

      __getAnnouncement(route.params?.id!);
    }
  }, [route.params]);

  useLayoutEffect(() => {
    if (receivers?.length > 0) {
      setReceiversTemp(receivers);
    } else {
      setReceiversTemp([]);
    }
  }, [isShowSwipeUpListReceiver]);

  const __renderHeader = useCallback(
    () => (
      <View style={{backgroundColor: Colors.white}}>
        <StatusBar barStyle="dark-content" translucent={true} />

        <Header
          label={
            route.params?.type !== 'EDIT'
              ? 'Buat Pengumuman'
              : 'Perbarui Pengumuman'
          }
          backgroundColor="transparent"
          onPressIconLeft={() => setIsShowPopUpBack(true)}
        />
      </View>
    ),
    [],
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.MT_8} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {route.params?.isFrom ? (
            <View style={styles.row}>
              <View
                style={[
                  styles.badgeContainer,
                  {
                    backgroundColor:
                      route?.params?.isFrom === 'Dijadwalkan'
                        ? Colors.secondary.light2
                        : Colors.primary.light3,
                  },
                ]}>
                <Text
                  style={[
                    styles.badgeTxt,
                    {
                      color:
                        route?.params?.isFrom === 'Dijadwalkan'
                          ? Colors.orange.dark1
                          : Colors.primary.base,
                    },
                  ]}>
                  Pengumuman {route?.params?.isFrom ?? ''}
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.MB_24}>
            <View style={styles.row}>
              <Text style={styles.titleInputForm}>Judul Pengumuman</Text>
            </View>

            <View style={[styles.row, styles.MT_8]}>
              <InputText
                value={title}
                placeholder="Masukkan judul pengumuman"
                placeholderTextColor={Colors.dark.neutral50}
                onChangeText={value => setTitle(value)}
                inputTextStyle={styles.inputText}
              />
            </View>

            {isSubmit && !title ? (
              <Text
                style={styles.textError}>{`${makePrefixUppercaseRestLowercase(
                'Judul Pengumuman',
              )} wajib diisi.`}</Text>
            ) : null}
          </View>

          <FormSelect
            isTypeSelected
            label="Penerima Pengumuman"
            selectedItem={formatReceiversToText || 'Pilih Penerima'}
            isValueExist={formatReceiversToText ? true : false}
            isSubmit={isSubmit && !formatReceiversToText ? true : false}
            onPress={() => setIsShowSwipeUpListReceiver(true)}
          />

          <FormSelect
            label="Tanggal & Jam Dikirim"
            selectedItem={
              datePickerSent
                ? __formatDateTime(datePickerSent)
                : 'Pilih Tanggal & Jam'
            }
            rightIcon={<IconCalendarBlue width={24} height={24} />}
            isValueExist={datePickerSent}
            isSubmit={isSubmit && !datePickerSent ? true : false}
            onPress={() => {
              datePickerSent && setValueDatePicker(datePickerSent);
              return setIsShowSwipeUpDatePickerSent(true);
            }}
            isDisabled={route.params?.isFrom === 'Aktif'}
          />

          <FormSelect
            label="Tanggal & Jam Selesai"
            selectedItem={
              datePickerFinished
                ? __formatDateTime(datePickerFinished)
                : 'Pilih Tanggal & Jam'
            }
            rightIcon={<IconCalendarBlue width={24} height={24} />}
            isValueExist={datePickerFinished}
            isSubmit={isSubmit && !datePickerFinished ? true : false}
            onPress={() => {
              datePickerFinished && setValueDatePicker(datePickerFinished);
              return setIsShowSwipeUpDatePickerFinished(true);
            }}
            // isDisabled={route.params?.type === 'EDIT'}
          />

          <View style={styles.MB_24}>
            <View style={styles.row}>
              <Text style={styles.titleInputForm}>Isi Pengumuman</Text>
            </View>

            <View style={[styles.row, styles.MT_8]}>
              <InputText
                multiline={true}
                value={content}
                placeholder="Tulis isi pengumuman..."
                placeholderTextColor={Colors.dark.neutral50}
                onChangeText={value => setContent(value)}
                inputTextStyle={{...styles.inputText, height: 120}}
              />
            </View>

            {isSubmit && !content ? (
              <Text
                style={styles.textError}>{`${makePrefixUppercaseRestLowercase(
                'Isi Pengumuman',
              )} wajib diisi.`}</Text>
            ) : null}
          </View>

          <View style={styles.MB_24}>
            <View style={styles.row}>
              <Text style={styles.titleInputForm}>Unggah File (Opsional)</Text>
            </View>

            {!attachmentTemporary?.uri ? (
              <View style={[styles.row, styles.MT_8]}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={() => setIsShowUpload(true)}>
                  <IconUploadBlue width={24} height={24} />
                  <Text style={styles.uploadTitle}>Unggah File</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.MT_8}>
                <ImageBackground
                  source={{uri: attachmentTemporary?.uri}}
                  imageStyle={styles.imageBackground}>
                  <View style={styles.attachmentImageContainer}>
                    {progressUpload === '100%' ? (
                      <TouchableOpacity onPress={__resetAttachment}>
                        <IconClose
                          width={8}
                          height={8}
                          style={styles.iconClose}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <View />

                    {progressUpload === '100%' ? (
                      <TouchableOpacity
                        onPress={__onUploadImage}
                        style={styles.attachmentResendContainer}>
                        <Text style={styles.attachmentResendTitle}>
                          {'Unggah ulang'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <ProgressBar progress={progressUpload} />
                    )}
                  </View>
                </ImageBackground>
              </View>
            )}

            <Text style={[styles.textError, {color: Colors.dark.neutral60}]}>
              Maksimum ukuran file 230 MB
            </Text>
          </View>
        </ScrollView>

        <Button action={__handleSave} label={'Simpan'} />
      </View>

      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUpListReceiver}
        onClose={() => setIsShowSwipeUpListReceiver(false)}
        height={420}
        children={
          <SwipeUpContent
            title="Pilih Penerima Pengumuman"
            options={listReceivers}
            type="RECEIVER"
            selectedItem={receiversTemp}
            setSelectedItem={__handleSelectedReceivers}
            onPress={data => {
              setReceivers(data);
              setIsShowSwipeUpListReceiver(false);
            }}
          />
        }
      />

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

      <SwipeUp
        isSwipeLine={true}
        visible={isShowUpload}
        onClose={() => setIsShowUpload(false)}
        height={500}
        children={__renderContentSwipeupUpload()}
      />

      <PopUp
        show={isShowPopUpBack}
        Icon={RobotClose}
        title={'Belum Selesai!'}
        desc={
          'Apakah Anda yakin untuk keluar?\nPengumuman yang sedang dibuat\nbelum disimpan.'
        }
        titleConfirm={'Lanjutkan'}
        actionConfirm={() => setIsShowPopUpBack(false)}
        titleCancel={'Keluar'}
        actionCancel={() => {
          setIsShowPopUpBack(false);
          navigation.goBack();
        }}
      />

      {/* {isLoading ? <LoadingIndicator /> : null} */}
    </>
  );
};

export {AnnouncementManageCreateScreen};
