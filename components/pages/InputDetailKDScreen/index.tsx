import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header, MainView, SwipeUp} from '@components/atoms';
import {styles} from './styles';
import Icon_search from '@assets/svg/robot_empty_search.svg';
import Add_Kd from '@assets/svg/ic_plus.svg';
import useFormInputDetailKD from './useFormInputDetailKD';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {SwipeUpKDForm} from './components/SwipeUpKDForm';
type ParamList = {
  InputDetailKDScreen: undefined;
};

const InputDetailKDScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'InputDetailKDScreen'>>();

  const {
    allData,
    submitAddKD,
    snackbar,
    showSwipe,
    setShowSwipe,
    allKnowledge,
    selectedItem,
    setSelectedItem,
    showSwipeUpFormKD,
    closeSwipeUpFormKD,
    swipeUpType,
    type,
    setType,
  } = useFormInputDetailKD();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail KD'}
          backgroundColor="white"
          iconRight={
            allData ? (
              <Pressable
                style={styles.buttonAdd}
                onPress={() => {
                  showSwipeUpFormKD('add');
                  setType(!type);
                }}>
                <Text style={styles.textButtonAdd}>Tambah</Text>
              </Pressable>
            ) : null
          }
          onPressIconRight={() => {}}
        />
      ),
    });
  }, [allData, navigation]);

  const renderEmpty = () => (
    <View style={styles.emptyListContainer}>
      <View style={styles.emptyList}>
        <Icon_search width={100} height={100} />
        <Text style={styles.textEmptyTitle}>Belum Ada KD Ditambahkan</Text>
        <Text style={styles.textEmptySubTitle}>
          Klik Tambah KD untuk menambahkan Kompetensi Dasar ke dalam Mapel.
        </Text>
        <Pressable
          style={styles.buttonAdd}
          onPress={() => showSwipeUpFormKD('add')}>
          <Add_Kd width={20} style={{marginRight: 10}} />
          <Text style={[styles.textEmptyTitle, {color: 'white'}]}>
            Tambah KD
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderData = ({item}: {item: any}) => {
    return (
      <Pressable style={[styles.listButton, styles.shadowProp]}>
        <MainView flex={1}>
          <Text style={[styles.textTitle]}>{item?.subject_name}</Text>
          <Text style={styles.textSubTitle}>
            Jumlah KD:{' '}
            {item?.basic_competency_student_assessment_detail?.length}
          </Text>
        </MainView>
        <Pressable
          style={styles.buttodEditList}
          onPress={() => {
            setSelectedItem(item);
            showSwipeUpFormKD('edit');
            // setShowSwipeEdit(true);
          }}>
          <Text style={styles.textEdit}>Edit</Text>
        </Pressable>
      </Pressable>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={allData}
          renderItem={renderData}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{paddingBottom: 30}}
          keyExtractor={item => item.id.toString()}
          style={styles.contentRender}
        />
      </View>
      <SwipeUp
        height={400}
        onClose={() => closeSwipeUpFormKD()}
        children={
          <SwipeUpKDForm
            swipeUpType={swipeUpType}
            data={allData}
            type={type}
            setType={setType}
            onButtonCancelClick={() => closeSwipeUpFormKD()}
            handleSubmit={(item: any, id: any, subject_id: any) => {
              submitAddKD(item, id, subject_id);
              closeSwipeUpFormKD();
            }}
            allKnowledge={allKnowledge}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            setShowSwipe={setShowSwipe}
          />
        }
        visible={showSwipe}
      />
      <SnackbarResult visible={snackbar} label="KD berhasil disimpan" />
    </>
  );
};

export {InputDetailKDScreen};
