/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header} from '@components/atoms/Header';
import Arrow from '@assets/svg/ic_arrow_right_grey.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import useRombel from './useRombel';
import {useNavigation} from '@react-navigation/native';

import SD from '@assets/svg/hat_sd.svg';
import SMP from '@assets/svg/hat_smp.svg';
import SMA from '@assets/svg/hat_sma.svg';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

type Card = {
  label: string;
  action: () => void;
};
const ERaportGuruChooseClassScreen = () => {
  const {rombelList} = useRombel();
  const rombel = rombelList?.data?.data;

  const navigation: any = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Pilih Kelas'} />,
    });
  }, [navigation]);

  const Card = ({label, action}: Card) => {
    return (
      <TouchableOpacity style={s.card} onPress={action}>
        <Text style={s.textCard}>{label}</Text>
        <Arrow />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={s.container}>
        {rombel?.map((item: any, index: number) => {
          const Icon = (x: number) => {
            if (x <= 6) {
              return <SD width={16} height={16} />;
            } else if (x > 6 && x <= 9) {
              return <SMP width={16} height={16} />;
            } else {
              return <SMA width={16} height={16} />;
            }
          };

          return (
            <View key={index}>
              <View style={s.containerClass}>
                <View style={s.headerClass}>
                  {Icon(item?.order)}
                  <Text style={s.textClass}>
                    {item?.name} - {item?.major?.name}
                  </Text>
                </View>
                <View style={s.cardContainer}>
                  {item?.rombel_class_school?.map((_item: any) => {
                    return (
                      <Card
                        key={_item?.id}
                        label={`${_item?.name}`}
                        action={() =>
                          navigation.navigate('ERaportGuruScreen', {
                            academic_year_id: 0,
                            academic_phase: 0,
                            classes_data: _item,
                          })
                        }
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  card: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '48%',
  },
  textCard: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    height: WINDOW_HEIGHT,
    padding: 16,
  },
  containerClass: {
    marginVertical: 10,
  },
  textClass: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    marginLeft: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  headerClass: {
    flexDirection: 'row',
    marginBottom: 13,
    alignItems: 'center',
  },
});
export {ERaportGuruChooseClassScreen};
