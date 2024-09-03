import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header} from '@components/atoms/Header';
import {styles} from './style';
import Ic24_info from '@assets/svg/ic24_info_custom.svg';
import Colors from '@constants/colors';
import useListChapterSchoolMaterials from './useListChapterSchoolMaterials';
import {Button, PopUp, SwipeUp} from '@components/atoms';
import {ChapterCard} from './components/ChapterCard';
import SnackbarResult from '@components/atoms/SnackbarResult';
import Ic24Edit from '@assets/svg/ic24_edit_2.svg';
import Ic24Trash from '@assets/svg/ic24_trash_red.svg';
import SwipeUpActionChapter from './components/SwipeUpActionChapter';
import {SCREEN_NAME} from '@constants/screen';
import RobotEmpty from '@assets/svg/ic_empty_PR.svg';

const ListChapterSchoolMaterialsScreen = () => {
  const {
    navigation,
    dataList,
    class_name,
    isShowAddChapter,
    setIsShowAddChapter,
    _handlerSaveChapter,
    _handlerEditChapter,
    _handlerDelete,
    error,
    setError,
    isShowSnackBar,
    setIsShowSnackbar,
    snackbarLabel,
    isShowActionChapter,
    setIsShowActionChapter,
    isShowEditChapter,
    setIsShowEditChapter,
    chapterSelected,
    setChapterSelected,
    popupData,
    isShowPopup,
    snackbarMode,
    materialsParams,
  } = useListChapterSchoolMaterials();

  const renderChildrenSwipeUpAddChapter = () => {
    return (
      <SwipeUpActionChapter
        title={'Tambah Bab Lainnya'}
        onCancel={() => {
          setIsShowAddChapter(false);
        }}
        onSaved={_handlerSaveChapter}
        error={error}
        setError={setError}
      />
    );
  };

  const renderChildrenSwipeUpActionChapter = () => {
    return (
      <View
        style={[
          styles.swipeUpContainer,
          {flexDirection: 'column', marginTop: 16},
        ]}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: 24}}
          onPress={() => {
            setIsShowEditChapter(true);
          }}>
          <Ic24Edit width={24} height={24} />
          <Text style={styles.textSwipeUpAction}>Ubah Judul Bab</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', marginBottom: 6}}
          onPress={() => {
            _handlerDelete(chapterSelected?.id);
          }}>
          <Ic24Trash width={24} height={24} color={Colors.danger.base} />
          <Text style={styles.textSwipeUpAction}>Hapus Bab</Text>
        </TouchableOpacity>
        <SwipeUp
          isSwipeLine={true}
          visible={isShowEditChapter}
          onClose={() => {
            setIsShowEditChapter(false);
          }}
          height={500}
          children={renderChildrenSwipeUpEditChapter()}
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

  const renderChildrenSwipeUpEditChapter = () => {
    return (
      <SwipeUpActionChapter
        title={'Ubah Bab'}
        value={chapterSelected}
        onCancel={() => {
          setIsShowEditChapter(false);
          setIsShowActionChapter(false);
        }}
        onSaved={_handlerEditChapter}
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
          label={'Daftar Bab'}
          subLabel={class_name}
          onPressIconLeft={() => {
            navigation.goBack();
          }}
          backgroundColor={Colors.white}
        />
      ),
    });
  }, [navigation]);

  const _renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        <RobotEmpty width={100} height={100} />
        <Text style={styles.noDataLabel}>Belum Ada Bab Ditambahkan</Text>
        <Button
          label={'+ Tambah Bab'}
          action={() => {
            setIsShowAddChapter(true);
          }}
          style={styles.buttonNoData}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
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
              Anda bisa menambahkan/menghapus bab lainnya yang tidak tersedia di
              Kelas Pintar.
            </Text>
          </View>
        </View>
        <Text style={styles.subjectTitle}>Pilih Bab</Text>
        {dataList !== null && dataList?.length !== 0 ? (
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            {dataList?.map((item: any, index: any) => (
              <ChapterCard
                index={index}
                data={item?.chapter}
                onPress={() => {
                  navigation.navigate(SCREEN_NAME.AddSchoolMaterialsScreen, {
                    chapterParams: item?.chapter,
                    materialsParams: materialsParams,
                  });
                }}
                onPressMore={() => {
                  setIsShowActionChapter(true);
                }}
                selected={chapterSelected}
                setSelected={setChapterSelected}
                lengthData={dataList?.length}
              />
            ))}
          </ScrollView>
        ) : (
          _renderNoData()
        )}
      </View>
      {dataList !== null && dataList?.length !== 0 ? (
        <View style={styles.bottomContainer}>
          <Button
            label={'+ Tambah Bab'}
            style={styles.buttonBottom}
            action={() => {
              setIsShowAddChapter(true);
            }}
          />
        </View>
      ) : null}

      <SwipeUp
        isSwipeLine={true}
        visible={isShowAddChapter}
        onClose={() => {
          setIsShowAddChapter(false);
        }}
        height={500}
        children={renderChildrenSwipeUpAddChapter()}
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowActionChapter}
        onClose={() => {
          setIsShowActionChapter(false);
        }}
        height={500}
        children={renderChildrenSwipeUpActionChapter()}
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

export {ListChapterSchoolMaterialsScreen};
