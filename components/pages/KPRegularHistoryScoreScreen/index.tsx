/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useState, useCallback, useMemo} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './style';
import Colors from '@constants/colors';
import api from '@api/index';
import IconArrowRightGray from '@assets/svg/ic_chevron_right_16x16.svg';
import IconArrowLeftBlue from '@assets/svg/ic24_chevron_left_blue.svg';
import {Header} from '@components/atoms/Header';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {URL_PATH} from '@constants/url';
import {
  _handleUserTypeId,
  convertDate,
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {goToExplanationUtils} from '../StudentHistoryExamScreen/utils';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

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
        {convertDate(created_at).format('DD MMM YYYY')}
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

const KPRegularHistoryScoreScreen: FC<Props> = ({route}) => {
  const navigation = useNavigation<any>();
  const [tests, setTests] = useState([]);
  const [selectedChip, SetSelectedChip] = useState(null);
  const [chapters, setChapters] = useState<any>([]);
  const {
    params: {
      report: {subject},
      student,
      user,
    },
  } = route;
  const {data: currentUser}: IGetUser = useSelector(
    (state: RootState) => state.getUser,
  );
  const currentUserType = _handleUserTypeId(currentUser?.user_type_id || 0);
  const customHeaders = useMemo(
    () =>
      user?.access_token && {
        Authorization: `Bearer ${user?.access_token}`,
      },
    [user?.access_token],
  );
  const getStudentId = useCallback(() => {
    if (currentUserType?.role === 'GURU') {
      return student?.id || currentUser?.id;
    }
    return student?.user_id || currentUser?.id;
  }, [currentUser?.id, currentUserType?.role, student?.id, student?.user_id]);

  const handleItemClick = useCallback(
    async (userHistoryId: number, title: string, data: any) => {
      try {
        showLoading();
        const response = await api.get(
          URL_PATH.get_history_detail_test(
            data?.chapter_id,
            userHistoryId!,
            customHeaders ? undefined : getStudentId(),
          ),
          {
            headers: customHeaders,
          },
        );
        dismissLoading();

        if (response.status !== 200) {
          const errMessage = response.data?.message || '';
          showErrorToast(errMessage);
          return;
        }

        if (response.status !== 200) {
          const errMessage = response.data?.message || '';
          showErrorToast(errMessage);
          return;
        }

        if (response.status === 200) {
          let {
            data: {data},
          } = response;

          if (data) {
            const {correct_answer, wrong_answer, pass_answer, service} = data;

            goToExplanationUtils({
              navigation: navigation,
              title: title,
              questionServiceId:
                service?.question_type_id || QUESTION_SERVICE_TYPE.TEST_ADAPTIF,
              data: {
                correct_answer,
                wrong_answer,
                pass: pass_answer,
              },
            });
          }
          return;
        }
      } catch (err) {
        dismissLoading();
      }
    },
    [customHeaders, getStudentId, navigation],
  );

  useEffect(() => {
    const getAllTest = async () => {
      try {
        const response = await api.get(
          URL_PATH.get_all_test_type(subject?.id),
          {
            headers: customHeaders,
          },
        );

        if (response.status === 200) {
          setTests(response.data?.data || []);
          SetSelectedChip(response.data?.data[0]?.id);
        }
      } catch (err) {
        return;
      }
    };

    getAllTest();
  }, [customHeaders, subject]);

  useEffect(() => {
    const getAllSubjectChapterReport = async () => {
      try {
        const finalUrl = URL_PATH.get_all_subject_report_kpreg(
          subject?.id,
          (selectedChip || 0).toString(),
          customHeaders ? undefined : getStudentId(), // student?.id,
        );
        const response = await api.get(finalUrl, {
          headers: customHeaders,
        });

        if (response.status === 200) {
          setChapters(response.data?.data || []);
        }
      } catch (err) {
        return;
      }
    };

    getAllSubjectChapterReport();
  }, [subject, selectedChip, customHeaders, getStudentId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <Header
          label="Riwayat Nilai Test"
          subLabel={subject?.name}
          onPressIconLeft={() => navigation.goBack()}
          iconLeft={<IconArrowLeftBlue />}
        />

        <View style={{paddingHorizontal: 16}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', gap: 8}}>
              {tests.map((val: any) => (
                <Chip
                  key={val?.id}
                  title={val.name}
                  active={selectedChip === val?.id}
                  onPress={() => SetSelectedChip(val?.id)}
                />
              ))}
            </View>
          </ScrollView>

          <View style={{marginTop: 16}}>
            <List.AccordionGroup>
              {chapters.map((val: any) => (
                <List.Accordion
                  key={val?.id}
                  id={val?.id}
                  title={val?.name}
                  titleStyle={styles.cardTextTitle}
                  style={styles.containerCard}>
                  {val?.user_service_history?.map((_val: any) => (
                    <Pressable
                      style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}
                      key={_val?.id}
                      onPress={() => {
                        handleItemClick(
                          _val.id,
                          _val.question_service_type.name,
                          _val,
                        );
                      }}>
                      <Card
                        created_at={_val?.created_at}
                        name={_val?.question_service_type?.name}
                        correct_answer={_val?.correct_answer}
                        wrong_answer={_val?.wrong_answer}
                        pass_answer={_val?.pass_answer}
                        duration={_val?.duration}
                        point={_val?.point}
                      />
                    </Pressable>
                  ))}
                </List.Accordion>
              ))}
            </List.AccordionGroup>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {KPRegularHistoryScoreScreen};
