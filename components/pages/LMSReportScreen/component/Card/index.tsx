/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import ExamIcon from '@assets/svg/Ujian.svg';
import TaskIcon from '@assets/svg/ic24_PR.svg';
import LatihanIcon from '@assets/svg/Latihan.svg';
import Fonts from '@constants/fonts';
import {BlueBackArrow} from '@assets/images';

type Props = {
  isExam?: boolean;
  isAKM?: boolean;
  onAKM?: () => void;
  onPRProjekTugas?: () => void;
  finished: string;
  unfinished?: string;
  highest?: any;
  lowest?: any;
  key?: number;
};

const Card = ({
  key,
  isExam,
  finished,
  unfinished,
  isAKM,
  onAKM,
  onPRProjekTugas,
  highest,
  lowest,
}: Props) => {
  const [show, setShow] = useState(true);

  return (
    <View style={styles.container} key={key}>
      <View style={styles.header}>
        {isExam ? (
          <>
            <ExamIcon width={24} height={24} />
            <Text style={[styles.title, styles.titleBold]}>Ujian</Text>
          </>
        ) : isAKM ? (
          <>
            <LatihanIcon width={24} height={24} />
            <Text style={[styles.title, styles.titleBold]}>AKM</Text>
          </>
        ) : (
          <>
            <TaskIcon width={24} height={24} />

            <Text style={[styles.title, styles.titleBold]}>
              PR/Projek/Tugas
            </Text>
          </>
        )}
      </View>
      <View
        style={
          isExam
            ? styles.section
            : [styles.section, {justifyContent: 'space-between'}]
        }>
        {isExam ? (
          <View style={{marginBottom: 16}}>
            <Text style={styles.thinText}>Total ujian selesai</Text>

            <Text style={[styles.title, styles.titleValueBold]}>
              {finished} Ujian
            </Text>
          </View>
        ) : isAKM ? (
          <>
            <View style={{marginBottom: 16}}>
              <Text style={styles.thinText}>Total dikerjakan</Text>

              <Text style={[styles.title, styles.titleValueBold]}>
                {finished} paket soal
              </Text>
            </View>
          </>
        ) : (
          <>
            <View style={{marginBottom: 16}}>
              <Text style={styles.thinText}>Total dikerjakan</Text>

              <Text style={[styles.title, styles.titleValueBold]}>
                {finished}
              </Text>
            </View>
            <View>
              <Text style={styles.thinText}>Total tidak dikerjakan</Text>
              <Text style={[styles.title, styles.titleValueBold]}>
                {unfinished}
              </Text>
            </View>
          </>
        )}
      </View>
      {!isExam && !isAKM && unfinished ? (
        <Pressable
          onPress={() => {}}
          style={[
            styles.btn,
            {
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 10,
              marginBottom: 16,
              alignItems: 'center',
              alignSelf: 'stretch',
              justifyContent: 'space-between',
            },
          ]}>
          <Text
            style={[
              styles.thinText,
              {
                fontWeight: '400',
                lineHeight: 18,
                letterSpacing: 0.25,
                color: Colors.dark.neutral100,
              },
            ]}>
            {unfinished} Belum dikerjakan
          </Text>

          <Pressable
            onPress={onPRProjekTugas}
            style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={styles.textBtn}>Kerjakan</Text>

            <Image
              source={BlueBackArrow}
              style={
                (styles.iconBtn,
                {marginBottom: 1, transform: [{rotate: '180deg'}]})
              }
            />
          </Pressable>
        </Pressable>
      ) : null}
      {show === false || isAKM ? null : (
        <View>
          <View>
            <Text style={[styles.thinText, {marginBottom: 8}]}>
              {isExam ? 'Nilai Ujian Tertinggi' : 'Nilai Tugas Tertinggi'}
            </Text>
            {highest}
          </View>
          <View style={{marginTop: 16, marginBottom: 12}}>
            <Text style={[styles.thinText, {marginBottom: 8}]}>
              {isExam
                ? 'Nilai Ujian Terendah (Di Bawah KKM)'
                : 'Nilai Tugas Terendah (Di Bawah KKM)'}
            </Text>
            {lowest}
          </View>
        </View>
      )}
      <Pressable
        onPress={() => setShow(!show)}
        style={isAKM ? {display: 'none'} : styles.btn}>
        <Text style={styles.textBtn}>
          {show === true ? 'Sembunyikan' : 'Lihat Nilai Rata-Rata'}
        </Text>
        <Image
          source={BlueBackArrow}
          style={
            show === true
              ? styles.iconBtn
              : [styles.iconBtn, {transform: [{rotate: '270deg'}]}]
          }
        />
      </Pressable>
      <Pressable onPress={onAKM} style={isAKM ? styles.btn : {display: 'none'}}>
        <Text style={styles.textBtn}>Selengkapnya</Text>
        <Image
          source={BlueBackArrow}
          style={[styles.iconBtn, {transform: [{rotate: '180deg'}]}]}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 15,
    backgroundColor: Colors.white,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  section: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
  },
  titleBold: {
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginLeft: 8,
    marginTop: 4,
  },
  titleValueBold: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
    marginTop: 4,
  },
  thinText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  textBtn: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.primary.base,
  },
  iconBtn: {
    transform: [{rotate: '90deg'}],
    alignSelf: 'center',
    marginLeft: 5,
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
});

export {Card};
