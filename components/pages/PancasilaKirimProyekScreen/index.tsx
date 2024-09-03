import React from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import styles from './styles';
import usePancasilaKirimProyek from './usePancasilaKirimProyek';
import Colors from '@constants/colors';
import InfoProfile from './components/InfoProfile';
import {Header, PopUp, SwipeUp} from '@components/atoms';
import SwipeUpRadioButton from './components/SwipeUpRadioButton';
import {mockMateri, mockTema} from './mockdata';
import DescriptionForm from './components/DescriptionForm';
import SubmitForm from './components/SubmitForm';
import RobotClose from '@assets/svg/Robot_close.svg';
import InputFormKirimProyek from './components/InputFormKirimProyek';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import SwipeUpDateForm from './components/SwipeUpDateForm';
import {isPlatformIOS} from '@constants/functional';

const PancasilaKirimProyekScreen = () => {
  const {
    // isLoading,
    dataType,
    getUser,
    tema,
    isShowTema,
    setTema,
    setIsShowTema,
    materi,
    isShowMateri,
    setMateri,
    setIsShowMateri,
    kelas,
    listKelas,
    isShowKelas,
    setKelas,
    rombel,
    listRombel,
    isShowRombel,
    setRombel,
    setIsShowRombel,
    isShowDateStart,
    setIsShowDateStart,
    valueDateStart,
    setValueDateStart,
    isShowDateEnd,
    setIsShowDateEnd,
    valueDateEnd,
    setValueDateEnd,
    handleDisabled,
    handleDateClose,
    isShowConfirmPopup,
    setIsShowConfirmPopup,
    onKirimButtonPress,
    onKembaliButtonPress,
    onCloseSwipeUpKelas,
    onPilihRombel,
    onPopupKirimButtonPress,
    description,
    setDescription,
    isTypeKirim,
    dateStart,
    dateEnd,
  } = usePancasilaKirimProyek();

  const renderChildrenSwipeUpTema = () => {
    return (
      <SwipeUpRadioButton
        data={mockTema}
        selected={tema}
        setSelected={setTema}
        title={'Pilih Tema'}
      />
    );
  };

  const renderChildrenSwipeUpMateri = () => {
    return (
      <SwipeUpRadioButton
        data={mockMateri}
        selected={materi}
        setSelected={setMateri}
        title={'Pilih Materi'}
      />
    );
  };

  const renderChildrenSwipeUpKelas = () => {
    return (
      <SwipeUpRadioButton
        data={listKelas}
        selected={kelas}
        setSelected={setKelas}
        title={'Pilih Kelas'}
      />
    );
  };

  const renderChildrenSwipeUpRombel = () => {
    return (
      <SwipeUpRadioButton
        data={listRombel}
        selected={rombel}
        setSelected={setRombel}
        title={'Pilih Rombel'}
      />
    );
  };

  const renderChildrenSwipeUpDateStart = () => {
    return (
      <SwipeUpDateForm
        label={dateStart?.initValue}
        valueDate={valueDateStart}
        setValueDate={setValueDateStart}
        onClose={() => {
          handleDateClose('start');
        }}
      />
    );
  };

  const renderChildrenSwipeUpDateEnd = () => {
    return (
      <SwipeUpDateForm
        label={dateEnd.initValue}
        valueDate={valueDateEnd}
        setValueDate={setValueDateEnd}
        onClose={() => {
          handleDateClose('end');
        }}
      />
    );
  };

  return (
    <View style={styles.parentContainer}>
      <KeyboardAvoidingView
        behavior={isPlatformIOS ? 'position' : 'height'}
        style={styles.keyboardAvoidingView}>
        {/* Header */}
        <Header
          label={'Kirim Projek'}
          onPressIconLeft={onKembaliButtonPress}
          backgroundColor={Colors.white}
        />

        <ScrollView>
          <View style={styles.cardContainer}>
            {/* Body */}
            <InfoProfile
              avatar={getUser?.data?.path_url}
              name={getUser?.data?.full_name}
              nik={getUser?.data?.registration_number?.replace('.', '')}
            />
            {dataType?.map((i: any, index: number) => (
              <InputFormKirimProyek
                key={index}
                onPress={() => {
                  if (i?.title?.toLowerCase()?.includes('rombel')) {
                    return onPilihRombel();
                  }
                  i?.onPress();
                }}
                rightIcon={
                  i?.title?.toLowerCase()?.includes('jam') ? (
                    <IconCalendar width={24} height={24} />
                  ) : null
                }
                title={i?.title}
                value={i?.value}
                selected={i?.value !== i?.initValue}
                disabled={handleDisabled(i?.title, isTypeKirim)}
                error={i?.error}
              />
            ))}

            <DescriptionForm
              setText={setDescription}
              valueText={description}
              placeholderText="Tulis deskripsi di sini..."
            />
            <SubmitForm
              onKembali={onKembaliButtonPress}
              onKirim={onKirimButtonPress}
              name={isTypeKirim ? 'Kirim' : 'Simpan'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowTema}
        onClose={() => {
          setIsShowTema(false);
        }}
        height={500}
        children={renderChildrenSwipeUpTema()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowMateri}
        onClose={() => {
          setIsShowMateri(false);
        }}
        height={500}
        children={renderChildrenSwipeUpMateri()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowKelas}
        onClose={onCloseSwipeUpKelas}
        height={500}
        children={renderChildrenSwipeUpKelas()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowRombel}
        onClose={() => {
          setIsShowRombel(false);
        }}
        height={500}
        children={renderChildrenSwipeUpRombel()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowDateStart}
        onClose={() => {
          setIsShowDateStart(false);
        }}
        height={500}
        children={renderChildrenSwipeUpDateStart()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowDateEnd}
        onClose={() => {
          setIsShowDateEnd(false);
        }}
        height={500}
        children={renderChildrenSwipeUpDateEnd()}
      />
      <PopUp
        show={isShowConfirmPopup}
        Icon={RobotClose}
        title={isTypeKirim ? 'Kirim Projek' : 'Simpan Perubahan'}
        desc={
          isTypeKirim
            ? 'Apakah anda yakin untuk mengirim Projek berikut?'
            : 'Apakah anda yakin mau menyimpan perubahan pada Projek ini?'
        }
        titleConfirm={isTypeKirim ? 'Kirim' : 'Simpan'}
        actionConfirm={onPopupKirimButtonPress}
        titleCancel={isTypeKirim ? 'Kembali' : 'Batal'}
        actionCancel={() => {
          setIsShowConfirmPopup(false);
        }}
        close={() => {
          setIsShowConfirmPopup(false);
        }}
      />
      {/* {isLoading ? <LoadingIndicator /> : null} */}
    </View>
  );
};

export {PancasilaKirimProyekScreen};
