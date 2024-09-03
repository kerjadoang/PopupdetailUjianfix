import {View, Text, Pressable, TextInput} from 'react-native';
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
import {Button, PopUpWithIcon, SwipeUp} from '@components/atoms';
import SwipeOption from './component/SwipeOption';
import Robot from '@assets/svg/ic_robot_hapus.svg';
import useFormListBab from './useFormListBab';
import SnackbarResult from '@components/atoms/SnackbarResult';
import OptionVertical from '@assets/svg/dots-vertical.svg';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const ListBabScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'ListBabScreen'>>();
  const {params} = route;
  const check = params?.check;
  const subject = params?.subject;
  const classes = params?.classes;

  const allData = params?.allData;
  const [snack, setSnack] = useState(check);

  const selectedBab = allData?.subject.find(item => item?.id === subject?.id);

  const [onText, onChangeText] = useState('');
  const {
    data,
    submit,
    alert,
    alert_2,
    setAlert_2,
    showAlert,
    snackDelete,
    showSnack,
    submitChange,
    showEdit,
    setShowEdit,
    newNameSubject,
    show,
    setShow,
    submitDelete,
    section,
    setSection,
    loading,
  } = useFormListBab(subject?.id);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckedItemsChange = (newCheckedItems: number[]) => {
    setCheckedItems(newCheckedItems);
  };
  useEffect(() => {
    if (!check) {
    } else {
    }
  }, [check]);
  const [type, setType] = useState(false);
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
          iconRight={
            <OptionVertical
              width={24}
              height={24}
              onPress={() => {
                setShow(true);
                setType(true);
              }}
            />
          }
          onPressIconRight={selectedBab?.school_id === 0 ? false : true}
        />
      ),
    });
  }, [navigation, setShow]);

  return (
    <SafeAreaView style={styles.container}>
      <Bg width={'100%'} height={297} style={{position: 'absolute'}} />
      <View style={styles.listRow}>
        <MapelMatematika width={67} />
        <View>
          <Text style={styles.subTitle}>
            Materi Sekolah {'\u2022'} {allData?.class?.name}
          </Text>
          <Text style={styles.title}>
            {!newNameSubject ? subject?.name : newNameSubject}
          </Text>
        </View>
      </View>
      <View style={styles.scrollView}>
        <View style={[styles.listRow, {justifyContent: 'space-between'}]}>
          <Text style={styles.titleBlack}>Daftar Bab</Text>
          <Pressable
            onPress={() => {
              setShow(true);
              setType(false);
            }}
            style={{
              height: 20,
              width: 20,
              justifyContent: 'center',
            }}>
            <Option width={20} />
          </Pressable>
        </View>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <ListComponent data={data} selectedBab={selectedBab} />
        )}
      </View>
      <View style={{backgroundColor: Colors.white}}>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate('AddSchoolMaterialsScreen', {
              materialsParams: {
                subject: subject,
                classes: classes,
              },
            })
          }>
          <Plus width={20} />
          <Text style={styles.title}>Tambah Materi Sekolah</Text>
        </Pressable>
      </View>
      <SwipeUp
        height={200}
        visible={show}
        onClose={() => setShow(false)}
        children={
          <SwipeOption
            action={() => {
              navigation.navigate('SortBabScreen', {
                dataList: data,
                id: subject?.id,
              });
              setShow(false);
            }}
            action_delete={() => {
              setSection(true);
              // setShow(false);
            }}
            selectedBab={selectedBab}
            type={type}
            action_2={() => setShowEdit(true)}
            action_delete_2={() => setAlert_2(true)}
            setSection={setSection}
            section={section}
            data={data}
            checkedItems={checkedItems}
            handleCheckedItemsChange={handleCheckedItemsChange}
            showAlert={showAlert}
            alert={alert}
            newNameSubject={newNameSubject}
            subject={subject}
            submit={submit}
          />
        }
      />

      <SwipeUp
        height={200}
        visible={showEdit}
        onClose={() => setShowEdit(false)}
        children={
          <View style={{padding: 16}}>
            <Text style={[styles.titleBlack, {textAlign: 'center'}]}>
              Ubah Mata Pelajaran
            </Text>
            <Text style={styles.subTitleBlack}>Judul Mata Pelajaran</Text>
            <TextInput
              placeholder={!newNameSubject ? subject?.name : newNameSubject}
              style={styles.input}
              onChangeText={text => onChangeText(text)}
              placeholderTextColor={Colors.dark.neutral60}
            />
            <View style={styles.rowButton}>
              <Button
                label="Batal"
                background={Colors.white}
                color={Colors.primary.base}
                borderWidth={2}
                style={{width: '40%', height: 50}}
                action={() => setShowEdit(false)}
              />
              <Button
                label="Simpan"
                style={{width: '40%', height: 50}}
                action={() => submitChange(onText)}
                background={
                  !onText ? Colors.dark.neutral60 : Colors.primary.base
                }
                isDisabled={!onText ? true : false}
              />
            </View>
          </View>
        }
      />

      {alert_2 ? (
        <PopUpWithIcon
          twoButton
          action_2={() => submitDelete(subject?.id)}
          action={() => setAlert_2(false)}
          textButton="Batal"
          textButton_2="Hapus"
          icon
          iconName={<Robot />}
          title="Hapus Mata Pelajaran"
          desc={
            <Text>
              Apakah Anda yakin untuk menghapus mata pelajaran{' '}
              <Text style={[styles.title, {color: '#4D545C'}]}>
                {!newNameSubject ? subject?.name : newNameSubject}
              </Text>
              ? Seluruh detail kelas dan materi akan terhapus.
            </Text>
          }
        />
      ) : null}
      <SnackbarResult
        label={'Urutan bab berhasil diatur.'}
        visible={snack}
        onPressClose={() => setSnack(false)}
      />
      <SnackbarResult
        label={'Bab berhasil dihapus.'}
        visible={snackDelete}
        onPressClose={showSnack}
      />
    </SafeAreaView>
  );
};

export {ListBabScreen};
