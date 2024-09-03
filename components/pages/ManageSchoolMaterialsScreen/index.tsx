import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Header} from '@components/atoms/Header';
import {styles} from './style';
import Ic_empty_pr from '@assets/svg/ic_empty_PR.svg';
import {Button, PopUp, SwipeUp} from '@components/atoms';
import {SCREEN_NAME} from '@constants/screen';
import useManageSchoolMaterialsScreen from './useManageSchoolMaterialsScreen';
import MaterialsItem from './components/MaterialsItem';
import Ic24Trash from '@assets/svg/ic24_trash_red.svg';
import SwipeUpActionSubject from '../ListSubjectSchoolMaterialsScreen/components/SwipeUpActionSubject';
import SnackbarResult from '@components/atoms/SnackbarResult';
import Colors from '@constants/colors';
import SwipeUpRemoveSubject from './components/SwipeUpRemoveSubject';

const ManageSchoolMaterials = () => {
  const {
    data,
    navigation,
    _handlerEditSubject,
    _handlerDelete,
    error,
    setError,
    isShowSnackBar,
    setIsShowSnackbar,
    snackbarLabel,
    isShowActionSubject,
    setIsShowActionSubject,
    isShowEditSubject,
    setIsShowEditSubject,
    subjectSelected,
    setSubjectSelected,
    popupData,
    isShowPopup,
    snackbarMode,
    classSelected,
    setClassSelected,
    _handlerDeleteClass,
    isShowRemoveSubject,
    setIsShowRemoveSubject,
    subjectSelectedArray,
    setSubjectSelectedArray,
  } = useManageSchoolMaterialsScreen();

  const renderChildrenSwipeUpActionSubject = () => {
    return (
      <View
        style={[
          styles.swipeUpContainer,
          {flexDirection: 'column', marginTop: 16},
        ]}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: 24}}
          onPress={() => {
            setIsShowRemoveSubject(true);
          }}>
          <Ic24Trash width={24} height={24} color={Colors.danger.base} />
          <Text style={styles.textSwipeUpAction}>Hapus Mata Pelajaran</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: 6}}
          onPress={() => {
            const arrayDataSubject = data
              ?.filter((obj: any) => obj?.class === classSelected)
              .map((obj: any) => obj?.subject);

            _handlerDeleteClass(arrayDataSubject[0]);
          }}>
          <Ic24Trash width={24} height={24} color={Colors.danger.base} />
          <Text style={styles.textSwipeUpAction}>Hapus Kelas</Text>
        </TouchableOpacity>
        <SwipeUp
          isSwipeLine={true}
          visible={isShowEditSubject}
          onClose={() => {
            setIsShowActionSubject(false);
            setIsShowEditSubject(false);
          }}
          height={500}
          children={renderChildrenSwipeUpEditSubject()}
        />
        <SwipeUp
          isSwipeLine={true}
          visible={isShowRemoveSubject}
          onClose={() => {
            setIsShowActionSubject(false);
            setIsShowRemoveSubject(false);
          }}
          height={500}
          children={renderChildrenSwipeUpRemoveSubject()}
        />
        <PopUp
          show={isShowPopup}
          Icon={popupData?.icon}
          title={popupData?.title}
          desc={popupData?.description}
          titleConfirm={popupData?.labelConfirm}
          actionConfirm={popupData?.onPressConfirm}
          titleCancel={popupData?.labelCancel}
          actionCancel={popupData?.onPressCancel}
        />
      </View>
    );
  };

  const renderChildrenSwipeUpRemoveSubject = () => {
    return (
      <>
        <SwipeUpRemoveSubject
          data={data}
          classSelected={classSelected}
          setIsShowRemoveSubject={setIsShowRemoveSubject}
          subjectSelected={subjectSelectedArray}
          setSubjectSelected={setSubjectSelectedArray}
          onPressSaved={_handlerDelete}
        />
        <PopUp
          show={isShowPopup}
          Icon={popupData?.icon}
          title={popupData?.title}
          desc={popupData?.description}
          titleConfirm={popupData?.labelConfirm}
          actionConfirm={popupData?.onPressConfirm}
          titleCancel={popupData?.labelCancel}
          actionCancel={popupData?.onPressCancel}
        />
      </>
    );
  };

  const renderChildrenSwipeUpEditSubject = () => {
    return (
      <SwipeUpActionSubject
        title={'Ubah Mata Pelajaran'}
        value={subjectSelected}
        onCancel={() => {
          setIsShowEditSubject(false);
          setIsShowActionSubject(false);
        }}
        onSaved={_handlerEditSubject}
        error={error}
        setError={setError}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        label={'Materi Sekolah'}
        onPressIconLeft={() => {
          navigation.goBack();
        }}
        backgroundColor={Colors.white}
      />
      <View>
        {data?.length !== 0 ? (
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={styles.subContainer}
            showsVerticalScrollIndicator={false}>
            {data
              ?.filter((obj: any) => obj?.subject !== null)
              ?.map((i: any, index: number) => (
                <MaterialsItem
                  key={index}
                  data={i}
                  index={index}
                  dataLength={data?.length}
                  onPressClass={() => {
                    setIsShowActionSubject(true);
                    setClassSelected(i?.class);
                  }}
                  onPressSubject={(obj: any) => {
                    navigation.navigate('ListBabScreen', {
                      subject: obj,
                      classes: {id: i?.class?.id, name: i?.class?.name},
                      allData: i,
                    });
                  }}
                  subjectSelected={subjectSelected}
                  setSubjectSelected={setSubjectSelected}
                />
              ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyDataContainer}>
            <Ic_empty_pr width={100} height={100} />
            <Text style={[styles.notFoundTitle, {paddingTop: 12}]}>
              Belum Ada Materi Sekolah
            </Text>
            <Text style={[styles.notFoundTitle, {paddingBottom: 12}]}>
              Ditambahkan
            </Text>
            <Button
              label={'+ Tambah Materi Sekolah'}
              action={() => {
                navigation.navigate(SCREEN_NAME.AddSchoolMaterialsScreen);
              }}
              style={styles.buttonNotFound}
            />
          </View>
        )}
      </View>
      {data?.length !== 0 ? (
        <View style={styles.bottomContainer}>
          <Button
            label={'+ Tambah Materi Sekolah'}
            action={() => {
              navigation.navigate(SCREEN_NAME.AddSchoolMaterialsScreen);
            }}
            style={styles.buttonBottom}
          />
        </View>
      ) : null}
      <SwipeUp
        isSwipeLine={true}
        visible={isShowActionSubject}
        onClose={() => {
          setIsShowActionSubject(false);
        }}
        height={500}
        children={renderChildrenSwipeUpActionSubject()}
      />
      <SnackbarResult
        label={snackbarLabel}
        visible={isShowSnackBar}
        type={snackbarMode}
        onPressClose={() => {
          setIsShowSnackbar(false);
        }}
      />
    </SafeAreaView>
  );
};

export {ManageSchoolMaterials};
