import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';
import {styles} from './styles';
import Search from '@assets/svg/ic_search_blue.svg';
import Down from '@assets/svg/ic_arrow_bottom_blue.svg';
import Right from '@assets/svg/right.svg';
import Question from '@assets/svg/ic24_question_mark_grey.svg';
import {ScrollView} from 'react-native-gesture-handler';
import useFormInputScoreStudent from './useFormInputScoreStudent';
import {SwipeUp} from '@components/atoms';
import {ListStudent} from './component/ListStudent';
import {ModalInfo} from './component/ModalInfo';
import {SwipeDate} from './component/SwipeDate';
import {SwipeClass} from './component/SwipeClass';
const InputScoreStudentScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'InputScoreStudentScreen'>>();
  const [showSearch, setShowSearch] = useState(false);
  const {
    allStudent,
    allDate,
    handleFilterAcademic,
    choosenAcademic,
    allClass,
    handleFilterClass,
    chooseClass,
    firstAcademic,
    image,
    searchQuery,
    setSearchQuery,
    filteredData,
    setFilteredData,
    mergedData,
    handleSearch,
  } = useFormInputScoreStudent();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'InputScoreStudentScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      header: () => (
        <Header
          label={showSearch ? '' : 'Input Nilai Murid'}
          labelContent={
            showSearch ? (
              <TextInput
                style={styles.searchInput}
                placeholder="Cari murid"
                placeholderTextColor={'grey'}
                onChangeText={text => handleSearch(text)}
              />
            ) : (
              false
            )
          }
          backgroundColor="white"
          iconRight={
            showSearch ? (
              <Text style={styles.textCancel}>Batal</Text>
            ) : (
              <Search />
            )
          }
          onPressIconRight={() => {
            setShowSearch(!showSearch);
            handleSearch('');
          }}
        />
      ),
    });
  }, [handleSearch, navigation, showSearch]);
  const [show, setShow] = useState(false);
  const [showChoose, setShowChoose] = useState(false);
  const [type, setType] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentFilter}>
          <Pressable
            style={styles.filter}
            onPress={() => {
              setType(true);
              setShowChoose(!showChoose);
            }}>
            <Text style={styles.textFilter}>
              {choosenAcademic?.years
                ? choosenAcademic?.years
                : firstAcademic?.years}
            </Text>
            <Down width={20} />
          </Pressable>
          <Pressable
            style={styles.filter}
            onPress={() => {
              setType(false);
              setShowChoose(!showChoose);
            }}>
            <Text style={styles.textFilter}>
              {chooseClass?.length === 0
                ? route?.params?.rombel_id?.name
                : chooseClass?.name}
            </Text>
            <Down width={20} />
          </Pressable>
        </View>

        <View style={styles.contentKD}>
          <Pressable style={styles.row} onPress={() => setShow(!show)}>
            <Text style={styles.textTitle}>Kompetensi Dasar</Text>
            <Question width={24} height={24} />
          </Pressable>
          <Pressable
            style={styles.buttonKD}
            onPress={() =>
              navigation.navigate('InputDetailKDScreen', {
                academic_year_id: choosenAcademic?.id
                  ? choosenAcademic?.id
                  : firstAcademic?.id,
                class_id:
                  chooseClass.length === 0
                    ? route?.params?.rombel_id?.class_id
                    : chooseClass?.class_id,
              })
            }>
            <Text style={[styles.textTitle, {color: 'white'}]}>Atur KD</Text>
            <Right width={20} />
          </Pressable>
        </View>
        <View style={styles.line} />
        <ListStudent
          avatar={image}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          mergedData={mergedData}
          handleSearch={handleSearch}
          data={allStudent}
          navigation={(item: any) => {
            const classId =
              chooseClass.length === 0 ? route?.params?.rombel_id : chooseClass;

            const years = choosenAcademic?.years
              ? choosenAcademic?.years
              : firstAcademic?.years;

            const yearsId = choosenAcademic ? choosenAcademic : firstAcademic;

            navigation.navigate('InputDetailKDReportScreen', {
              student_data: item,
              class_id: classId,
              years: years,
              years_id: yearsId,
            });
          }}
        />
      </ScrollView>
      <SwipeUp
        height={200}
        visible={show}
        onClose={() => setShow(!show)}
        children={<ModalInfo />}
      />
      <SwipeUp
        height={200}
        visible={showChoose}
        onClose={() => setShowChoose(false)}
        children={
          type ? (
            <SwipeDate
              allDate={allDate}
              handleFilterAcademic={(item: any) => handleFilterAcademic(item)}
              choosen={choosenAcademic}
              setShowChoose={setShowChoose}
              showChoose={showChoose}
              firstAcademic={firstAcademic}
            />
          ) : (
            <SwipeClass
              allClass={allClass}
              handleFilterClass={(item: any) => handleFilterClass(item)}
              choosen={chooseClass}
              setShowChoose={setShowChoose}
              showChoose={showChoose}
              firstClass={route?.params?.rombel_id}
            />
          )
        }
      />
    </View>
  );
};

export {InputScoreStudentScreen};
