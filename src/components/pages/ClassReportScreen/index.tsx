import {View, StyleSheet, Text, ScrollView} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header} from '@components/atoms/Header';

// routing
import {useNavigation, useRoute} from '@react-navigation/native';
import Colors from '@constants/colors';

// list button icon color
import {ButtonIconColor} from '@components/atoms';
import LeftIcon from '@assets/svg/ic24_task.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

//input
import {InputText} from '@components/atoms';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import useClassReportScreen from './useClassReportScreen';

//search empty
import {EmptyDisplay} from '@components/atoms';
import MaskotEmpty from '@assets/svg/robot_empty_search.svg';
import Avatar from '@components/atoms/Avatar';
import {INavigation, IRoute} from 'type/screen';

const ClassReportScreen = () => {
  const route = useRoute<IRoute<'ClassReportScreen'>>();
  const navigation = useNavigation<INavigation<'ClassReportScreen'>>();
  const {search, setSearch, murid, task, exam, _handlerOnSubmitSearch} =
    useClassReportScreen(route);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={`Laporan ${route?.params?.id?.name}`}
          backgroundColor={Colors.white}
          colorLabel={Colors.dark.neutral100}
        />
      ),
    });
  }, []);

  return (
    <View style={{backgroundColor: Colors.white, flex: 1, padding: 16}}>
      <ButtonIconColor
        rightIconCustom={
          <Icon name="chevron-right" size={16} color={Colors.primary.base} />
        }
        leftIcon={<LeftIcon />}
        title={'Riwayat PR, Projek & Tugas'}
        subTitle={`${task?.total || ''} PR/Projek/Tugas diberikan`}
        backgroundColor={Colors.primary.light3}
        borderColor={Colors.secondary.base}
        onPress={() => {
          navigation.navigate('PRProjectTaskHistoryScreen', {
            id: route?.params.id,
            isFromReport: true,
          });
        }}
      />
      <ButtonIconColor
        rightIconCustom={
          <Icon name="chevron-right" size={16} color={Colors.primary.base} />
        }
        leftIcon={<LeftIcon />}
        title={'Riwayat Ujian'}
        subTitle={`${exam?.total || ''} Ujian diberikan`}
        backgroundColor={Colors.primary.light3}
        borderColor={Colors.secondary.base}
        onPress={() => {
          navigation.navigate('HistoryExamScreenTeacher', {
            id: route?.params.id,
          });
        }}
      />
      <ButtonIconColor
        rightIconCustom={
          <Icon name="chevron-right" size={16} color={Colors.primary.base} />
        }
        leftIcon={<LeftIcon />}
        title={'LKS'}
        subTitle={`${exam?.total || ''} Ujian diberikan`}
        backgroundColor={Colors.primary.light3}
        borderColor={Colors.secondary.base}
        onPress={() => {
          navigation.navigate('LKSListScreen', {
            class_id: route?.params?.id,
          });
        }}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Daftar Murid</Text>
        <View>
          <Text style={styles.headerSubtitle}>{murid.length} Murid</Text>
        </View>
      </View>
      <View style={styles.inputTextContainer}>
        <InputText
          width={'100%'}
          backgroundColor={Colors.dark.neutral10}
          returnKeyType={'search'}
          value={search}
          maxLength={60}
          onChangeText={(val: any) => {
            setSearch(val);
          }}
          onSubmitEditing={() => {
            _handlerOnSubmitSearch();
          }}
          leftIcon={IconSearchBlue}
          placeholder={'Cari'}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {murid?.map((items: any, index) => {
          return (
            <View key={index}>
              <ButtonIconColor
                stylesContainer={[
                  styles.shadowProp,
                  styles.card,
                  {marginVertical: 6},
                ]}
                rightIconCustom={
                  <Icon
                    name="chevron-right"
                    size={16}
                    color={Colors.primary.base}
                  />
                }
                leftIcon={
                  <Avatar id={items?.avatar} style={styles.imageProfile} />
                }
                title={items?.full_name}
                subTitle={`NIS: ${items?.registration_number}`}
                backgroundColor={Colors.white}
                borderColor={Colors.secondary.base}
                onPress={() => {
                  navigation.navigate('DetailReportStudentScreen', {
                    data: {
                      student: items,
                      id: route?.params.id,
                    },
                  });
                }}
              />
            </View>
          );
        })}

        {murid?.length === 0 && (
          <EmptyDisplay
            containerStyle={styles.containerStyle}
            imageSvg={<MaskotEmpty width={100} height={100} />}
            title={'Pencarian Tidak Ditemukan'}
            desc={`Hasil pencarian “${search}” nihil. \nCoba masukkan kata kunci lainnya!`}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 16,
  },
  imageProfile: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.dark.neutral20,
  },
  containerStyle: {
    paddingTop: 44,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
  },
  inputTextContainer: {
    marginTop: 12,
  },
});

export {ClassReportScreen};
