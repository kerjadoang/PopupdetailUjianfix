/* eslint-disable react-native/no-inline-styles */
import {ScrollView, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HighScoreItem from '@components/atoms/HighScoreItem';
import Colors from '@constants/colors';
import Ic_xp from '@assets/svg/ic_xp_16x16.svg';
import useRankTable from '../RankTable/useRankTable';
import Warning from '@assets/svg/warning.svg';
import {Keys} from '@constants/keys';
import {Button, CoachmarkLib, SwipeUp} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import {useCoachmark} from '@hooks/useCoachmark';
import {generalStyles} from '@constants/styles';
import Avatar from '@components/atoms/Avatar';

const FormLeaderboard = (params: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {rank} = useRankTable(params?.token);

  const {Coachmarks, doneCoachMark, _handlerCoachmark} = useCoachmark(
    Keys.coachmark_mobile_leaderboard,
  );

  return (
    <View style={styles.container}>
      <Header
        label="Papan Peringkat"
        iconRight={
          <CoachmarkLib
            ref={ref => (Coachmarks[0] = ref)}
            onNext={() => _handlerCoachmark(1)}
            onSkip={doneCoachMark}
            buttonOnContent
            contentContainerStyle={generalStyles.contentFlexWhite}
            queue={1}
            buttonFinishText="Tutup"
            totalCoachmark={1}
            title={'Informasi Peringkat'}
            message={'Cek informasi lengkap  tentang Papan Peringkat di sini.'}>
            <Warning width={24} />
          </CoachmarkLib>
        }
        onPressIconRight={() => setModalVisible(true)}
      />

      <View style={styles.card}>
        <Image
          source={require('@assets/images/bg_leaderboard.png')}
          style={styles.background}
        />
        <HighScoreItem data={rank?.data} />
      </View>
      <View style={[styles.shadowProp, styles.card_list]}>
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {rank?.data?.map((item, index) => {
            if (index >= 3) {
              return (
                <View
                  style={[
                    styles.list_content,
                    {
                      backgroundColor: item?.is_user
                        ? Colors.secondary.light1
                        : Colors.white,
                    },
                  ]}
                  key={index}>
                  <View>
                    <Text style={styles.text}>{item?.rank}</Text>
                  </View>
                  <View
                    style={[
                      styles.molecule,
                      {flex: 1, justifyContent: 'flex-start'},
                    ]}>
                    <Avatar id={item?.avatar} style={styles.pp} />
                    <Text
                      style={[styles.text, styles.textName]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item?.full_name}
                    </Text>
                  </View>
                  <View style={styles.molecule}>
                    <Ic_xp width={32} height={32} />
                    <Text
                      style={[
                        styles.text,
                        {fontFamily: 'Poppins-Bold', color: '#1D252D'},
                      ]}>
                      {item?.xp || '0'}
                    </Text>
                  </View>
                </View>
              );
            } else {
              return null;
            }
          })}
        </ScrollView>
      </View>
      {modalVisible ? (
        <SwipeUp
          height={200}
          onClose={() => setModalVisible(false)}
          children={
            <View style={{padding: 10}}>
              <Text style={styles.title}>Cara Kerja Papan Peringkat</Text>
              <Text style={styles.textInfo}>
                {/* Papan Peringkat merupakan rangkuman jumlah perolehan akumulasi
                XP murid dari kelas yang sama selama menggunakan aplikasi Kelas
                Pintar. */}
                Papan Peringkat merupakan rangkuman jumlah perolehan akumulasi
                XP Murid selama menggunakan aplikasi Kelas Pintar.
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.bullet} />
                <Text style={[styles.textInfo, {flex: 1}]}>
                  {/* Dapatkan XP dengan cara menggunakan fitur Practice dan Test
                  pada Kelas Pintar Regular */}
                  Dapatkan XP dengan cara menggunakan Kelas Pintar Regular,
                  GURU, SOAL, TANYA dan PTN
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.bullet} />
                <Text style={[styles.textInfo, {flex: 1}]}>
                  {/* Semakin banyak XP yang diperoleh, semakin tinggi posisi
                  peringkatmu pada Papan Peringkat. */}
                  Semakin banyak XP yang diperoleh, semakin tinggi posisi
                  peringkatmu pada Papan Peringkat
                </Text>
              </View>
              <Button label={'Tutup'} action={() => setModalVisible(false)} />
            </View>
          }
          visible={true}
        />
      ) : null}
    </View>
  );
};

export default FormLeaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    padding: 10,
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  card_list: {
    flex: 2,
    backgroundColor: Colors.white,
    padding: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  background: {
    width: '100%',
    borderTopLeftRadius: 20,
    height: 200,
    borderTopRightRadius: 20,
    position: 'absolute',
    // top: 30,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  list_content: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    borderRadius: 10,
  },
  pp: {
    width: 33,
    height: 33,
    borderRadius: 100,
  },
  molecule: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInfo: {
    fontFamily: 'Poppins-Regular',
    padding: 5,
    fontSize: 14,
    lineHeight: 22,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.dark.neutral60,
    margin: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
  },
  textName: {width: '70%'},
});
