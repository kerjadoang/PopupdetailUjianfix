/* eslint-disable react-native/no-inline-styles */

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SwipeUp, PopUp} from '@components/atoms';
import SnackbarResult from '@components/atoms/SnackbarResult';
import PublishDateChild from '../../Component/PublishDateChild';
import {EducationYearChild} from '../../Component/EducationYearChild';
import {PaperTypeChild} from '../../Component/PaperTypeChild';
import {ShareRaportChild} from '../../Component/ShareRaportChild';
import {Divider} from 'react-native-paper';
import ListChild from '../../Component/ListChild/ListChild';
import DetailRaport from '../../Component/DetailRaport';
import {useSettings} from './useSettings';
import {initDatePicker} from '../../utils';

const Settings = () => {
  const {
    school,
    year,
    papperType,
    setPapperType,
    swipe,
    setSwipe,
    paperList,
    officialPaper,
    setOfficialPaper,
    snakbar,
    setSnakbar,
    _handlersetPaper,
    alertPaper,
    valueDatePicker,
    setValueDatePicker,
    _handlerCloseSwipe,
    popUp,
    setPopUp,
    academicYear,
    yearId,
    classes_data,
    eraportShareList,
    tempEraportShareList,
    _handlerVisibleSwipe,
    dateIssue,
    phase,
    filterEraporChild,
    selectChild,
    onPressSelectAllChild,
    isAllChildSelected,
    onEducationYearChildPress,
    onTerapkanPublishDateChild,
    isSearchMode,
    setIsSearchMode,
    eRaportPopup,
    setEraportPopup,
    onDownloadEraport,
    onEraportShare,
    listFormSettings,
    onEraportReset,
    onEraportSeeDetails,
    onAturPenilaianRaport,
    image,
  } = useSettings();
  const popupShareDesc = `Apakah Anda yakin untuk membagikan e-Rapor ke ${
    !eRaportPopup ? `${tempEraportShareList?.length} Murid ` : 'Murid ini'
  }?`;
  const renderDetailRaport = () => {
    if (isSearchMode) {
      return <View />;
    }
    return (
      <DetailRaport
        listFormSettings={listFormSettings}
        logoSekolah={image?.data?.path_url}
        year={year}
        dateIssue={dateIssue}
        kertas={papperType}
        penilaianRaport={phase.type}
        schoolName={school?.name}
        schoolAddress={school?.address}
        onAturKertas={() => setSwipe({...swipe, show: true, type: 'paper'})}
        onAturPenilaianRaport={onAturPenilaianRaport}
        onAturTahunAjaran={() => setSwipe({...swipe, show: true, type: 'year'})}
        onAturTanggalTerbit={() =>
          setSwipe({...swipe, show: true, type: 'publishDate'})
        }
      />
    );
  };

  const renderListChild = () => {
    return (
      <ListChild
        isStickyShareEraporShow={tempEraportShareList?.length != 0}
        class_name={classes_data?.name || ''}
        childList={
          eraportShareList?.data?.assessment_erapor_share_student || []
        }
        filterEraporChild={filterEraporChild}
        isAllChildSelected={isAllChildSelected}
        isSearchMode={isSearchMode}
        onPressSelectAllChild={onPressSelectAllChild}
        selectChild={selectChild}
        setIsSearchMode={setIsSearchMode}
        onMore={(eraport: any) => {
          setEraportPopup(eraport);
          setSwipe({...swipe, show: true, type: 'share'});
        }}
        onFilterStatusPress={() => {
          setSwipe({...swipe, show: true, type: 'filterStatus'});
        }}
      />
    );
  };
  return (
    <>
      <ScrollView>
        <View style={styles.mainContainer}>
          {renderDetailRaport()}
          <Divider style={{height: 2}} />
          {renderListChild()}
          <SwipeUp
            visible={_handlerVisibleSwipe()}
            height={100}
            onClose={() => {
              setEraportPopup({});
              _handlerCloseSwipe();
            }}
            children={
              swipe.type === 'year' ? (
                <EducationYearChild
                  data={academicYear?.data?.data || []}
                  year={year}
                  yearId={yearId}
                  onPress={onEducationYearChildPress}
                />
              ) : swipe.type === 'paper' ? (
                <PaperTypeChild
                  alertPaper={alertPaper}
                  officialPaper={officialPaper}
                  paperList={paperList || []}
                  papperType={papperType}
                  setOfficialPaper={item => setOfficialPaper(item)}
                  setPapperType={item => setPapperType(item)}
                  onSimpan={() => {
                    _handlersetPaper();
                    _handlerCloseSwipe();
                  }}
                />
              ) : swipe.type === 'publishDate' ? (
                <PublishDateChild
                  onTerapkan={onTerapkanPublishDateChild}
                  setValueDatePicker={setValueDatePicker}
                  valueDatePicker={valueDatePicker || initDatePicker}
                />
              ) : (
                <ShareRaportChild
                  studentEraport={eRaportPopup}
                  onEraportShare={onEraportShare}
                  onEraportSeeDetail={onEraportSeeDetails}
                  onEraportDownload={onDownloadEraport}
                />
              )
            }
          />

          <PopUp
            show={popUp}
            title={'Bagikan e-Rapor'}
            desc={popupShareDesc}
            titleCancel={'Batalkan'}
            titleConfirm={'Bagikan'}
            actionCancel={() => {
              setEraportPopup({});
              setPopUp(false);
            }}
            actionConfirm={onEraportShare}
          />
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 70, width: '100%'}}>
        <SnackbarResult
          label={snakbar.label}
          visible={snakbar.status}
          onPressClose={() =>
            setSnakbar({...snakbar, status: false, label: ''})
          }
        />
      </View>
      {eraportShareList?.data?.assessment_erapor_share_student && (
        <ShareRaportChild
          isSticky={tempEraportShareList?.length != 0}
          onEraportShare={() => setPopUp(true)}
          totalStudent={tempEraportShareList?.length}
          onEraportDownload={onDownloadEraport}
          onEraportReset={onEraportReset}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    paddingBottom: 100,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schoolName: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  schoolAdd: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 5,
    marginRight: 10,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  textBlue: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  shareItemText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.black,
    marginLeft: 10,
  },
  allStatusContainer: {
    marginVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllChild: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 10,
  },
  selectAllChildText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    lineHeight: 28,
    color: Colors.black,
  },
});

export {Settings};
