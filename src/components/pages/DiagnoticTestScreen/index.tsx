import {Pressable, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {styles} from './styles';
import {Button, Header, MainView, PopUp} from '@components/atoms';
import useDiagnoticTest from './useDiagnoticTest';
import {StepperQuestion} from '@components/atoms/StepperQuestion';
import Ic24_info from '@assets/svg/ic24_info_custom.svg';
import Colors from '@constants/colors';
import NextPrevButton from '../CheckPRPRojectTeacherScreen/components/NextPrevButton';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Icon_drag from '@assets/svg/icon_titik.svg';
import ShockRobotIcon from '@assets/svg/maskot_3.svg';
import HappyRobotIcon from '@assets/svg/robot_success.svg';
import SuperHappyRobot from '@assets/svg/robot.svg';
import Group39947 from '@assets/svg/group_39947.svg';

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
  item: any;
};

const DiagnoticTestScreen = () => {
  const {
    navigation,
    totalQuestion,
    currentQuestion,
    _handlerStepper,
    handleNextPrevButton,
    data,
    _renderData,
    _onDragEnd,
    showPopupFinish,
    showPopupNotFinish,
    setShowPopupFinish,
    setShowPopupNotFinish,
    _handlerSubmit,
    showFinishSection,
    _handlerFinishButton,
    _handlerGoBackButton,
    showPopupNotFinishTest,
    setShowPopupNotFinishTest,
  } = useDiagnoticTest();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: showFinishSection
        ? () => <View />
        : () => (
            <Header
              label={'Test Minat & Kepribadian'}
              subLabel={'Sekolah Menengah Atas (SMA)'}
              iconRight={
                <View style={styles.finishButtonContainer}>
                  <Text style={styles.finishButton}>{'Selesai'}</Text>
                </View>
              }
              onPressIconRight={_handlerFinishButton}
              onPressIconLeft={_handlerGoBackButton}
            />
          ),
    });
  }, [navigation, showFinishSection, data?.filled]);

  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <Pressable
          onLongPress={drag}
          style={[styles.card, isActive && styles.activeCard]}>
          <Pressable onPressIn={drag} disabled={isActive}>
            <Icon_drag width={20} height={24} />
          </Pressable>
          <Text style={styles.textCard}>{item?.profession_name}</Text>
        </Pressable>
      </ScaleDecorator>
    );
  };

  const _renderFinishSection = () => {
    return (
      <View style={styles.containerFinish}>
        <Group39947 style={styles.backgroundImage} />
        <SuperHappyRobot width={100} height={100} />
        <Text style={styles.finishTitle}>
          Selamat! {'\n'}Kamu telah berhasil menyelesaikan Test Minat &
          Kepribadian
        </Text>
        <Text style={styles.finishLabel}>
          Yuk lihat hasil dan penjelasannya!
        </Text>
        <View style={styles.bottomContainer}>
          <Button
            style={styles.buttonBottom}
            label="Lanjutkan"
            action={() => {
              navigation.replace('DiagnoticTestResultScreen');
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.content}>
      {showFinishSection ? (
        _renderFinishSection()
      ) : (
        <View style={styles.container}>
          <StepperQuestion
            question={{
              filled: data?.filled,
            }}
            totalQuestion={totalQuestion}
            currentQuestion={currentQuestion}
            onPressQuestion={(data: any) => {
              _handlerStepper(data);
            }}
          />
          <View style={styles.subContainer}>
            <View style={styles.infoHeader}>
              <Ic24_info
                width={24}
                height={24}
                style={styles.iconInfo}
                color={Colors.primary.light1}
              />
              <View style={{width: '90%'}}>
                <Text style={styles.textInfo}>
                  Urutkan jawaban berdasarkan yang{' '}
                  <Text style={[styles.textInfo, styles.textInfoBold]}>
                    Sangat Kamu Sukai{' '}
                  </Text>
                  sampai{' '}
                  <Text style={[styles.textInfo, styles.textInfoBold]}>
                    Sangat tidak Kamu Sukai.
                  </Text>
                </Text>
              </View>
            </View>
            <DraggableFlatList
              data={_renderData()}
              showsVerticalScrollIndicator={false}
              onDragEnd={({data}) => _onDragEnd(data)}
              keyExtractor={(item: any) => `${item.id}`}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </View>

          <MainView marginHorizontal={16}>
            <NextPrevButton
              handleNextPrevButton={handleNextPrevButton}
              currentQuestion={currentQuestion}
              questionLength={totalQuestion}
              separateButton={true}
            />
          </MainView>

          <PopUp
            show={showPopupNotFinish}
            close={() => setShowPopupNotFinish(false)}
            title="Belum Selesai!"
            desc={
              'Apakah kamu yakin untuk keluar? Progresmu tidak akan tersimpan.'
            }
            Icon={ShockRobotIcon}
            titleConfirm="Lanjut Latihan"
            titleCancel="Keluar"
            actionCancel={() => {
              setShowPopupNotFinish(false);
              navigation.goBack();
            }}
            actionConfirm={() => setShowPopupNotFinish(false)}
          />
          <PopUp
            show={showPopupNotFinishTest}
            close={() => setShowPopupNotFinishTest(false)}
            title="Belum Selesai!"
            desc={'Mohon selesaikan latihan terlebih dahulu'}
            Icon={ShockRobotIcon}
            titleConfirm="Lanjut Latihan"
            actionConfirm={() => setShowPopupNotFinishTest(false)}
          />
          <PopUp
            show={showPopupFinish}
            Icon={HappyRobotIcon}
            title="Siap Dikumpulkan!"
            desc={`Keren! Kamu berhasil menjawab ${
              data?.filled?.length ?? 0
            } dari 5 latihan Soal Tes Minat & Kepribadian`}
            titleCancel="Periksa Ulang"
            titleConfirm="Kumpulkan"
            actionCancel={() => {
              setShowPopupFinish(false);
            }}
            actionConfirm={() => _handlerSubmit()}
          />
        </View>
      )}
    </View>
  );
};

export {DiagnoticTestScreen};
