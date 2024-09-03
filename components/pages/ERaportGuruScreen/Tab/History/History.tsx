import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CardRaport} from '../../Component';
import Colors from '@constants/colors';
import {useHistory} from './useHistory';
import RobotEmpty from '@assets/svg/robot_empty_state.svg';
import Fonts from '@constants/fonts';

const History = () => {
  const {classes_data, navigation, listGage} = useHistory();

  const renderEmptyComponent = () => {
    return (
      <View style={styles.containerEmpty}>
        <RobotEmpty />

        <Text style={styles.titleEmpty}>
          Belum Ada Riwayat{'\n'}Pembagian e-Rapor
        </Text>
        <Text style={styles.subTitleEmpty}>
          e-Rapor yang telah dibagikan ke murid{'\n'}akan tampil di sini.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.body}>
      {listGage?.ganjil?.status || listGage?.genap?.status ? (
        <View>
          {listGage?.ganjil?.status && (
            <CardRaport
              title={listGage?.ganjil?.name}
              subtitle={listGage?.ganjil?.note}
              disabled={!listGage?.ganjil?.status}
              action={() => {
                navigation.navigate('HistoryShareEraporScreen', {
                  classes_data: classes_data,
                  academic_phase_id: listGage?.ganjil?.academi_phase_id,
                });
              }}
            />
          )}
          {listGage?.genap?.status && (
            <CardRaport
              title={listGage?.genap?.name}
              subtitle={listGage?.genap?.note}
              disabled={!listGage?.genap?.status}
              action={() => {
                navigation.navigate('HistoryShareEraporScreen', {
                  classes_data: classes_data,
                  academic_phase_id: listGage?.genap?.academi_phase_id,
                });
              }}
            />
          )}
        </View>
      ) : (
        renderEmptyComponent()
      )}
    </View>
  );
};

export {History};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    padding: 16,
    width: '100%',
    height: '100%',
  },
  containerEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  titleEmpty: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    paddingTop: 12,
  },
  subTitleEmpty: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.dark.neutral80,
    paddingTop: 6,
  },
});
