/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import Colors from '@constants/colors';
import {CardProgress} from '../../component/CardProgress';
import Fonts from '@constants/fonts';
import {SubjectType} from '@constants/subjectType';
import LogoRegular from '@assets/svg/kelaspintar_regular.svg';
import ArrowDown from '@assets/svg/ic_arrow_bottom_blue.svg';
import ArrowRight from '@assets/svg/ic_arrow_right_blue.svg';
import Clock from '@assets/svg/ic16_clock.svg';
import LearnLogo from '@assets/svg/ic32_learn.svg';
import PracticeLogo from '@assets/svg/ic32_practice.svg';
import TestLogo from '@assets/svg/ic32_test.svg';
import MateriType1 from '@assets/svg/videoPresentasi.svg';
import MateriType2 from '@assets/svg/videoAnimasi.svg';
import MateriType3 from '@assets/svg/learnEbook.svg';
const materiTypeRes: any[] = [
  {
    learning_method: 'Video Presentasi',
    learning_method_id: 2,
    desc: 'materi dipelajari',
  },
  {
    learning_method: 'Video Animasi',
    learning_method_id: 3,
    desc: 'materi ditonton',
  },
  {
    learning_method: 'Ebook',
    learning_method_id: 1,
    desc: 'materi dibaca',
  },
];

const Materi = ({subject, handleShowPopUp, chapterChoosed}: any) => {
  const {mapelMateri, typeMateri, durationSummary, navigation} = {
    subject,
    chapterChoosed,
    handleShowPopUp,
  };
  const [materiArrRes, setMateriArrRes] = useState<any[]>(materiTypeRes);
  const [_chapterChoosed, _setChapterChoosed] = useState<any>(0);
  const {total, total_per_week} = durationSummary?.data?.data || false;
  const {name, path_url} = mapelMateri?.data?.data?.subject || false;
  const average = mapelMateri?.data?.data?.average_test;

  const {learn, practice, test} =
    mapelMateri?.data?.data?.total_history || false;

  const history = [
    {
      title: 'learn',
      total: learn?.total_materi,
      progress: learn?.user_progress,
      percentage: learn?.percentage,
      desc: 'materi dipelajari',
    },
    {
      title: 'practice',
      total: practice?.total_materi,
      progress: practice?.user_progress,
      percentage: practice?.percentage,
      desc: 'materi latihan dikerjakan',
    },
    {
      title: 'test',
      total: test?.total_materi,
      progress: test?.user_progress,
      percentage: test?.percentage,
      desc: 'materi ujian dikerjakan',
    },
  ];

  const cekType = (x: string) => {
    if (x === 'learn') {
      return SubjectType.KPRegular.Learn;
    } else if (x === 'practice') {
      return SubjectType.KPRegular.Practice;
    } else {
      return SubjectType.KPRegular.Test;
    }
  };

  useEffect(() => {
    const materiType = typeMateri?.data?.data;
    materiType?.map((ie: any) => {
      switch (ie?.learning_method_id) {
        case 1:
          materiTypeRes[0] = {
            ...materiTypeRes[0],
            total: ie?.total ?? 0,
            total_learn: ie?.total_learn ?? 0,
          };
          break;
        case 2:
          materiTypeRes[1] = {
            ...materiTypeRes[1],
            total: ie?.total ?? 0,
            total_learn: ie?.total_learn ?? 0,
          };
          break;
        case 3:
          materiTypeRes[2] = {
            ...materiTypeRes[2],
            total: ie?.total ?? 0,
            total_learn: ie?.total_learn ?? 0,
          };
          break;

        default:
          break;
      }
    });
    setMateriArrRes(materiTypeRes);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subjectContainer}>
        <SvgUri uri={path_url} width={50} height={50} />
        <Text style={styles.subjectName}>{name}</Text>
      </View>

      <View style={styles.whiteContainer}>
        <View style={[styles.subjectContainer, {marginBottom: 10}]}>
          <Text
            style={[
              styles.subjectName,
              {fontSize: 16, marginLeft: 0, marginRight: 8},
            ]}>
            Materi
          </Text>
          <LogoRegular />
        </View>
        <View>
          <Pressable style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>Semua Bab</Text>
            <ArrowDown />
          </Pressable>
        </View>
        {history?.map((item: any, index: number) => {
          return (
            <CardProgress
              key={index}
              type={item.title}
              allTask={item?.total}
              progress={item.progress}
              desc={item.desc}
              img={
                item.title === 'learn' ? (
                  <LearnLogo width={50} height={50} />
                ) : item.title === 'practice' ? (
                  <PracticeLogo width={50} height={50} />
                ) : (
                  <TestLogo width={50} height={50} />
                )
              }
              action={() => {
                item?.total &&
                  navigation.navigate('ChapterKPRegularScreen', {
                    subject_type: cekType(item.title),
                    subject_data: mapelMateri?.data?.data,
                  });
              }}
            />
          );
        })}

        <View style={styles.averageContainer}>
          {average?.length > 0 ? (
            average?.map((item: any, index: number) => {
              return (
                <View
                  key={index}
                  style={{
                    marginHorizontal: 10,
                    width: 100,
                  }}>
                  <Text
                    style={
                      styles.greyText
                    }>{`Rata-rata ${item.test_name}`}</Text>
                  <Text style={styles.averageValue}>{item.average}</Text>
                </View>
              );
            })
          ) : (
            <Text>Belum Ada Nilai Rata-rata Test</Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('KPRegularHistoryScoreScreen', {
                report: {subject: mapelMateri?.data?.data?.subject},
              })
            }
            style={[
              styles.btn,
              {
                width: 185,
                alignSelf: 'center',
                marginTop: 16,
                paddingHorizontal: 16,
              },
            ]}>
            <Text style={styles.btnText}>Riwayat Nilai Test</Text>
            <ArrowRight width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.whiteContainer}>
        <View style={[styles.subjectContainer, {marginBottom: 10}]}>
          <Text
            style={[
              styles.subjectName,
              {fontSize: 16, marginLeft: 0, marginRight: 8},
            ]}>
            Materi Sekolah
          </Text>
        </View>
        <View>
          <Pressable
            style={styles.btn}
            onPress={() => {
              handleShowPopUp(true);
            }}>
            <Text style={styles.btnText}>Semua Bab</Text>
            <ArrowDown />
          </Pressable>
        </View>
        {materiArrRes?.map((item: any, index: number) => {
          return (
            <CardProgress
              key={`MateriArrResKey${index}`}
              type={item?.learning_method}
              allTask={item?.total}
              progress={item?.total_learn}
              desc={item?.desc}
              img={
                item?.learning_method_id === 2 ? (
                  <MateriType1 width={50} height={50} />
                ) : item?.learning_method_id === 3 ? (
                  <MateriType2 width={50} height={50} />
                ) : (
                  <MateriType3 width={50} height={50} />
                )
              }
            />
          );
        })}
      </View>
      <View style={styles.whiteContainer}>
        <View style={styles.subjectContainer}>
          <Clock width={25} height={25} />
          <Text style={[styles.subjectName, {fontSize: 16}]}>
            Durasi Belajar
          </Text>
        </View>
        <View style={styles.durationHeader}>
          <View>
            <Text style={styles.greyText}>Total</Text>
            <Text
              style={
                styles.averageValue
              }>{`${total?.hour} Jam ${total?.minute} Menit`}</Text>
          </View>
          <View>
            <Text style={styles.greyText}>Total Minggu Ini</Text>
            <Text
              style={
                styles.averageValue
              }>{`${total_per_week?.hour} Jam ${total_per_week?.minute} Menit`}</Text>
          </View>
        </View>
        <Text style={styles.greyText}>Grafik Minggu Ini</Text>
      </View>
      <View style={styles.whiteContainer} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
    paddingBottom: 25,
  },
  subjectContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  subjectName: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    marginLeft: 18.5,
    textAlignVertical: 'center',
  },
  whiteContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    borderRadius: 15,
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
  },
  btnText: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
  },
  greyText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  averageValue: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  durationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
});

export {Materi};
