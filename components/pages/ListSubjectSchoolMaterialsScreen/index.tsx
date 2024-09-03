import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header} from '@components/atoms/Header';
import {styles} from './style';
import Ic24_info from '@assets/svg/ic24_info_custom.svg';
import Colors from '@constants/colors';
import useListSubjectSchoolMaterials from './useListSubjectSchoolMaterials';
import {Button, PopUp, SwipeUp} from '@components/atoms';
import {SubjectCard} from './components/SubjectCard';
import SwipeUpActionSubject from './components/SwipeUpActionSubject';
import SnackbarResult from '@components/atoms/SnackbarResult';
import Ic24Edit from '@assets/svg/ic24_edit_2.svg';
import Ic24Trash from '@assets/svg/ic24_trash_red.svg';

const ListSubjectSchoolMaterialsScreen = () => {
  const {
    navigation,
    dataList,
    class_name,
    isShowAddSubject,
    setIsShowAddSubject,
    _handlerSaveSubject,
    _handlerEditSubject,
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
    setIsShowEdit,
    _handlerDelete,
  } = useListSubjectSchoolMaterials();

  const renderChildrenSwipeUpAddSubject = () => {
    return (
      <SwipeUpActionSubject
        title={'Tambah Mata Pelajaran Lainnya'}
        onCancel={() => {
          setIsShowAddSubject(false);
        }}
        onSaved={_handlerSaveSubject}
        error={error}
        setError={setError}
      />
    );
  };

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
            setIsShowEditSubject(true);
          }}>
          <Ic24Edit width={24} height={24} />
          <Text style={styles.textSwipeUpAction}>
            Ubah Judul Mata Pelajaran
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: 6}}
          onPress={() => {
            _handlerDelete(subjectSelected?.id);
          }}>
          <Ic24Trash width={24} height={24} color={Colors.danger.base} />
          <Text style={styles.textSwipeUpAction}>Hapus Mata Pelajaran</Text>
        </TouchableOpacity>
        <SwipeUp
          isSwipeLine={true}
          visible={isShowEditSubject}
          onClose={() => {
            setIsShowEditSubject(false);
            setIsShowEdit(false);
          }}
          height={500}
          children={renderChildrenSwipeUpEditSubject()}
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

  const renderChildrenSwipeUpEditSubject = () => {
    return (
      <SwipeUpActionSubject
        title={'Ubah Mata Pelajaran'}
        value={subjectSelected}
        onCancel={() => {
          setIsShowEditSubject(false);
        }}
        onSaved={_handlerEditSubject}
        error={error}
        setError={setError}
      />
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Daftar Mata Pelajaran'}
          subLabel={class_name}
          onPressIconLeft={() => {
            navigation.goBack();
          }}
          backgroundColor={Colors.white}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
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
              Anda bisa menambahkan/menghapus mata pelajaran lainnya yang tidak
              tersedia di Kelas Pintar.
            </Text>
          </View>
        </View>
        <Text style={styles.subjectTitle}>Pilih Mata Pelajaran</Text>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {dataList?.map((item: any, index: any) => (
            <SubjectCard
              index={index}
              data={item}
              onPress={() => {
                navigation.navigate('AddSchoolMaterialsScreen', {
                  subjectParams: item,
                });
              }}
              onPressMore={() => {
                setIsShowActionSubject(true);
              }}
              subjectSelected={subjectSelected}
              setSubjectSelected={setSubjectSelected}
              lengthData={dataList?.length}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          label={'+ Tambah Mata Pelajaran'}
          style={styles.buttonBottom}
          action={() => {
            setIsShowAddSubject(true);
          }}
        />
      </View>
      <SwipeUp
        isSwipeLine={true}
        visible={isShowAddSubject}
        onClose={() => {
          setIsShowAddSubject(false);
        }}
        height={500}
        children={renderChildrenSwipeUpAddSubject()}
      />
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

export {ListSubjectSchoolMaterialsScreen};
