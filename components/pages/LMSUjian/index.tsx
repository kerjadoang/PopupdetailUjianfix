import React from 'react';
import {View} from 'react-native';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import TopContentComponent from './components/topContentComponent';
import BottomContentComponent from './components/bottomContentComponent';
import {Styles} from './style';
import PopUpComponent from './components/popUpComponent';
import useLMSUjian from './useLMSUjian';

const LMSUjian = () => {
  const {
    modalVisible,
    handleOpenPopUp,
    tabActive,
    popUpType,
    handleOnPressTab,
    setPopUpType,
    examDataSchedule,
    listSubject,
    handleSetListSubject,
    handleSaveSelectedSubject,
    handleUpdateSelectedSubject,
    handleResetSelectedSubject,
    listSavedSubject,
    cardData,
    setCardData,
    examDataOnGoing,
    handleGetListExamOnGoing,
  } = useLMSUjian();
  return (
    <View style={Styles.mainContainer}>
      <Header label="Ujian" backgroundColor={Colors.white} />
      <View style={Styles.contentContainer}>
        <TopContentComponent
          handleSetPopUpType={setPopUpType}
          handleOpenPopUp={handleOpenPopUp}
          handleSetCardData={setCardData}
          examData={examDataOnGoing}
        />
        <BottomContentComponent
          handleOpenPopUp={handleOpenPopUp}
          handleOnPressTab={handleOnPressTab}
          handleSetCardData={setCardData}
          handleSetPopUpType={setPopUpType}
          handleSetListSubject={handleSetListSubject}
          examDataSchedule={examDataSchedule}
          tabActive={tabActive}
          fetchOnExamGoingData={handleGetListExamOnGoing}
          listSavedSubject={listSavedSubject}
        />
      </View>
      <PopUpComponent
        isOpenPopUp={modalVisible}
        filterType={popUpType}
        listSubject={listSubject}
        handleShowPopUp={handleOpenPopUp}
        handleUpdateSelectedSubject={handleUpdateSelectedSubject}
        handleSaveSelectedSubject={handleSaveSelectedSubject}
        handleResetSelectedSubject={handleResetSelectedSubject}
        listSavedSubject={listSavedSubject}
        cardData={cardData}
      />
    </View>
  );
};

export {LMSUjian};
