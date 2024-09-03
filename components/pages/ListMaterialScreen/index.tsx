import {View, Text, Pressable} from 'react-native';

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import Back from '@assets/svg/ic_arrow_left_white.svg';
import {styles} from './styles';
import Colors from '@constants/colors';
import Plus from '@assets/svg/plus.svg';
import Option from '@assets/svg/ic_option.svg';

import MapelMatematika from '@assets/svg/ic56_mapel_matematika.svg';
import ListComponent from './component/ListComponent';
import {SwipeUp} from '@components/atoms';
import SwipeOption from './component/SwipeOption';
import SnackbarResult from '@components/atoms/SnackbarResult';
import useFormListMaterial from './useFormListMaterial';
import {generalStyles} from '@constants/styles';
const ListMaterialScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'ListMaterialScreen'>>();
  const {params} = route;
  const check = params?.check;
  const chapter_id = params?.id ?? params?.contentData?.chapter_id;
  const subject = params?.subject;
  const classes = params?.classes;
  const subjects = params?.subjects;
  const selectedBab = params?.selectedBab;

  useEffect(() => {
    if (!check) {
    } else {
    }
  }, [check]);
  const [snack, setSnack] = useState(check);
  const {
    data,
    submit,
    Alert,
    showAlert,
    snackDelete,
    showSnack,
    section,
    setSection,
    show,
    setShow,
    setCheckedItems,
    checkedItems,
  } = useFormListMaterial(chapter_id);

  const handleCheckedItemsChange = (newCheckedItems: number[]) => {
    setCheckedItems(newCheckedItems);
  };
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ListBabScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={''}
          backgroundColor={Colors.primary.base}
          iconLeft={<Back width={24} height={24} />}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Bg width={'100%'} height={297} style={{position: 'absolute'}} />
      <View style={styles.listRow}>
        <MapelMatematika width={67} />
        <View>
          <Text style={styles.subTitleWhite}>
            Materi Sekolah • {classes?.name}
          </Text>
          <Text style={styles.subTitleWhite}>{subjects?.name}</Text>
          <Text style={styles.titleBigWhite}>{subject?.name}</Text>
        </View>
      </View>
      <View style={styles.scrollView}>
        <View style={[styles.listRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.titleBlack}>Daftar Materi</Text>
          <Pressable
            onPress={() => setShow(true)}
            style={{
              height: 20,
              width: 20,
              justifyContent: 'center',
            }}>
            <Option width={20} />
          </Pressable>
        </View>
        <ListComponent
          data={data}
          subject={subjects}
          classes={classes}
          chapterName={subject?.name}
        />
      </View>
      <View style={generalStyles.backgroundWhite}>
        {data?.length !== 0 ? (
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('AddSchoolMaterialsScreen', {
                materialsParams: {
                  subject: subjects,
                  classes: classes,
                  curriculum: subjects?.curriculum,
                },
              })
            }>
            <Plus width={20} />
            <Text style={styles.title}>Tambah Materi Sekolah</Text>
          </Pressable>
        ) : null}
      </View>
      <SwipeUp
        height={200}
        visible={show}
        onClose={() => {
          handleCheckedItemsChange([]);
          setSection(false);
          return setShow(false);
        }}
        children={
          <SwipeOption
            action={() => {
              navigation.navigate('SortMaterialScreen', {
                id: chapter_id,
                dataList: data,
              });
              setShow(false);
            }}
            data={data}
            selectedBab={selectedBab}
            handleCheckedItemsChange={handleCheckedItemsChange}
            showAlert={showAlert}
            Alert={Alert}
            submit={(item: any) => submit(item)}
            section={section}
            setSection={setSection}
            checkedItems={checkedItems}
          />
        }
      />
      {/* {Alert ? (
        <PopUpWithIcon
          twoButton
          action_2={showAlert}
          action={() => submit(checkedItems)}
          textButton="Hapus"
          textButton_2="Batal"
          icon
          iconName={<Robot />}
          title="Hapus Material"
          desc="Apakah Anda yakin untuk menghapus bab Material 1. Perkenalan? Materi di dalamnya akan turut terhapus."
        />
      ) : null} */}
      <SnackbarResult
        label={'Urutan Material berhasil diatur.'}
        visible={snack}
        onPressClose={() => setSnack(false)}
      />
      <SnackbarResult
        label={'Material berhasil dihapus.'}
        visible={snackDelete}
        onPressClose={showSnack}
      />
    </SafeAreaView>
  );
};

export {ListMaterialScreen};
