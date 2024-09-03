/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from './style';
import Colors from '@constants/colors';
import {Keys} from '@constants/keys';
import api from '@api/index';
import IconArrowRightGray from '@assets/svg/ic_chevron_right_16x16.svg';
import IconArrowLeftBlue from '@assets/svg/ic24_chevron_left_blue.svg';
import ImageAKMMateri from '@assets/svg/akm_materi.svg';
import {Header} from '@components/atoms/Header';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import dayjs from 'dayjs';

const Chip: FC<{
  title: string;
  active: boolean;
  onPress: () => void;
}> = ({title, active, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        active
          ? {backgroundColor: Colors.primary.base}
          : {backgroundColor: Colors.dark.neutral10},
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.chipTextTitle,
          active ? styles.chipTextTitleActive : {color: Colors.dark.neutral80},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Card = ({
  created_at,
  name,
  correct_answer,
  wrong_answer,
  pass_answer,
  duration,
  point,
}: {
  created_at: string;
  name: string;
  correct_answer: number;
  wrong_answer: number;
  pass_answer: number;
  duration: string;
  point: number;
}) => {
  return (
    <View style={styles.card}>
      <Text
        style={[
          styles.cardTextNormal,
          {fontSize: 11, lineHeight: 16, marginBottom: 4},
        ]}>
        {dayjs(created_at).format('DD MMM YYYY')}
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 2}}>
          <Text
            style={[
              styles.cardTextBold,
              {fontSize: 14, lineHeight: 18, marginBottom: 4},
            ]}>
            {name}
          </Text>

          <Text
            style={[
              styles.cardTextNormal,
              {fontSize: 14, lineHeight: 18, marginBottom: 4},
            ]}>
            {correct_answer} Benar {'\u2022'} {wrong_answer} Salah {'\u2022'}{' '}
            {pass_answer} Dilewati
          </Text>

          <Text style={[styles.cardTextNormal, {fontSize: 14, lineHeight: 18}]}>
            Durasi Pengerjaan:{' '}
            <Icon name="clock-o" size={16} color={Colors.dark.neutral50} />{' '}
            {duration} menit
          </Text>
        </View>

        <View style={{flex: 0.5, alignItems: 'center'}}>
          <Text style={styles.cardTextNilai}>Nilai</Text>
          <Text style={styles.cardTextNilaiValue}>{point}</Text>
        </View>

        <IconArrowRightGray />
      </View>
    </View>
  );
};

type Props = {
  route: any;
};

const SERVICES = [
  {
    id: 1,
    name: 'Literasi PG',
  },
  {
    id: 2,
    name: 'Literasi Uraian',
  },
  {
    id: 3,
    name: 'Numerasi PG',
  },
  {
    id: 4,
    name: 'Numerasi Uraian',
  },
];

const AKMLaporanScreen: FC<Props> = ({}) => {
  const navigation: any = useNavigation();
  const [selectedChip, setSelectedChip] = useState<any>(null);
  const [reports, setReports] = useState<any>([]);
  const [report, setReport] = useState<any>({});

  useEffect(() => {
    const getAllAKMReport = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');

        const response = await api.get('/lpt/v1/akm/user_history', {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        });

        if (response.status === 200) {
          setReports(response.data?.data || []);
          setReport(response.data?.data[0]?.pilihan_ganda);
          setSelectedChip(SERVICES[0].id);
        }
      } catch (err) {
        return;
      }
    };

    getAllAKMReport();
  }, []);

  useEffect(() => {
    switch (selectedChip) {
      case SERVICES[1].id:
        setReport(reports[0]?.essay);
        break;
      case SERVICES[2].id:
        setReport(reports[1]?.pilihan_ganda);
        break;
      case SERVICES[3].id:
        setReport(reports[1]?.essay);
        break;
      default:
        setReport(reports[0]?.pilihan_ganda);
        break;
    }
  }, [selectedChip, reports]);

  const handleClickDetail = async (title: string, id: number) => {
    try {
      const {
        status,
        data: {data},
      } = await api.get(`/soal/v1/history/user-history/${id}`);

      if (status === 200) {
        const {correct_answer, wrong_answer, pass_answer} = data;

        const resultDataMapping = (values: []) =>
          values?.map((value: any) => ({
            id: value?.selected_option?.id,
            question: value?.question?.question,
            answer_user: value?.selected_option?.key || value?.user_answer,
            answer_system: value?.question?.options?.find(
              (_value: any) => _value?.is_correct,
            )?.key,
            is_correct: value?.selected_option?.is_correct,
            explanation: value?.question?.question_discuss?.explanation,
            orders: value?.order,
          }));

        let typeAKM = '';

        if (selectedChip === 1 || selectedChip === 2) {
          typeAKM = 'AKM Literasi';
        } else {
          typeAKM = 'AKM Numerasi';
        }

        return navigation.navigate('ExplanationScreen', {
          title: `${typeAKM} • ${title}`,
          questionServiceId:
            selectedChip === 1 || selectedChip === 3
              ? QUESTION_SERVICE_TYPE.AKM_LITERASI_PILIHAN_GANDA
              : QUESTION_SERVICE_TYPE.AKM_LITERASI_URAIAN,
          data: {
            corrects: {data: resultDataMapping(correct_answer)},
            wrongs: {data: resultDataMapping(wrong_answer)},
            skips: {data: resultDataMapping(pass_answer)},
          },
        });
      }
    } catch (_) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <Header
          label="Laporan AKM"
          subLabel="Kelas Pintar Regular"
          onPressIconLeft={() => navigation.goBack()}
          iconLeft={<IconArrowLeftBlue />}
        />

        <View style={{paddingHorizontal: 16}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', gap: 8}}>
              {SERVICES.map((val: any) => (
                <Chip
                  key={val?.id}
                  title={val.name}
                  active={selectedChip === val?.id}
                  onPress={() => setSelectedChip(val?.id)}
                />
              ))}
            </View>
          </ScrollView>

          <View style={[styles.summary, styles.card, {marginTop: 32}]}>
            <ImageAKMMateri />

            <View>
              <Text style={styles.summaryTextTitle}>Rata-rata nilai</Text>

              <Text style={styles.summaryTextValue}>
                {report?.summary?.average}
              </Text>
            </View>

            <View style={{marginLeft: 24}}>
              <Text style={styles.summaryTextTitle}>Nilai Tertinggi</Text>

              <Text style={styles.summaryTextValue}>
                {report?.summary?.max_point}
              </Text>
            </View>
          </View>

          <List.AccordionGroup>
            {report?.question_package?.map((val: any) => (
              <List.Accordion
                key={val?.id}
                id={val?.id}
                title={val?.name}
                titleStyle={styles.cardTextTitle}
                style={styles.containerCard}>
                {val?.user_history?.map((_val: any) => (
                  <TouchableOpacity
                    key={_val?.id}
                    onPress={() => handleClickDetail(val?.name, _val?.id)}>
                    <Card
                      created_at={_val?.created_at}
                      name={_val?.attempt}
                      correct_answer={_val?.correct_answer}
                      wrong_answer={_val?.wrong_answer}
                      pass_answer={_val?.pass_answer}
                      duration={_val?.duration}
                      point={_val?.point}
                    />
                  </TouchableOpacity>
                ))}
              </List.Accordion>
            ))}
          </List.AccordionGroup>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {AKMLaporanScreen};
