import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Ujian from '@assets/svg/ic40_ujian.svg';
import PR from '@assets/svg/ic40_PR.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetCountExam, fetchGetCountTask} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {MainText, MainView} from '@components/atoms';
import {isEmpty} from 'lodash';

interface RootState {
  getCountTask: any;
  getCountExam: any;
}

const Checking = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const {getCountExam, getCountTask} = useSelector((state: RootState) => state);

  const generateListRombelExam = () => {
    const listRombel: any[] = getCountExam?.data?.rombels;
    if (listRombel?.length === 1) {
      return listRombel?.[0]?.rombel_name;
    } else {
      const firstRombel = listRombel?.[0]?.rombel_name;
      const remainingCount = listRombel?.length - 1;
      return `${firstRombel}, dan ${remainingCount} lainnya`;
    }
  };

  const generateListRombelTask = () => {
    const listRombel: any[] = getCountTask?.data?.rombels;
    if (listRombel?.length === 1) {
      return listRombel?.[0]?.rombel_name;
    } else {
      const firstRombel = listRombel?.[0]?.rombel_name;
      const remainingCount = listRombel?.length - 1;
      return `${firstRombel}, dan ${remainingCount} lainnya`;
    }
  };

  useEffect(() => {
    dispatch(fetchGetCountExam());
    dispatch(fetchGetCountTask());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perlu Diperiksa</Text>
      <View style={[styles.card, styles.shadowProp]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UjianScreen', {});
          }}>
          <MainView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}>
              <View>
                <Ujian width={40} height={40} />
              </View>
              <MainView flex={1}>
                <View style={styles.flexDirection}>
                  <Text style={styles.title}>
                    {getCountExam?.data?.total || 0} Ujian
                  </Text>
                </View>
                {!isEmpty(getCountExam?.data?.rombels) ? (
                  <MainText color={Colors.dark.neutral60}>
                    {generateListRombelExam()}
                  </MainText>
                ) : null}
              </MainView>
              <View>
                <Icon
                  name="chevron-right"
                  size={14}
                  color={Colors.primary.base}
                />
              </View>
            </View>
          </MainView>
        </TouchableOpacity>
        <View style={styles.hr} />
        <TouchableOpacity
          onPress={() => navigation.navigate('LMSTeacherTaskScreen')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
            <View>
              <PR width={40} height={40} />
            </View>
            <MainView flex={1} marginVertical={4}>
              <View style={styles.flexDirection}>
                <Text style={styles.title}>
                  {getCountTask?.data?.total || 0} PR/Projek/Tugas
                </Text>
              </View>
              {!isEmpty(getCountTask?.data?.rombels) ? (
                <MainText color={Colors.dark.neutral60}>
                  {generateListRombelTask()}
                </MainText>
              ) : null}
            </MainView>
            <View>
              <Icon
                name="chevron-right"
                size={14}
                color={Colors.primary.base}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {Checking};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
  },
  titleClass: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
  },
  next: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  flexDirection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  hr: {
    borderWidth: 0.3,
    opacity: 0.5,
    marginVertical: 16,
    backgroundColor: Colors.primary.light3,
  },
});
