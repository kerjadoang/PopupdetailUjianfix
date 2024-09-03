import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Button, SwipeUp} from '@components/atoms';
import {rulesSOALTest} from '@components/pages';
import Fonts from '@constants/fonts';
import {showErrorToast} from '@constants/functional';
import {useNavigation} from '@react-navigation/native';
import ProviderSOAL from '@services/soal/provider';

type Props = {
  isOpenPopUp: boolean;
  setIsOpenPopUp: (data: boolean) => void;
  chapterName: string;
  totalQuestion: number;
  questionPackageId: number;
  questionPackageServiceId: number;
  chapterId: number;
  questionServiceId: number;
  rules: any;
};

const KpSwipeupTest: FC<Props> = ({
  isOpenPopUp,
  setIsOpenPopUp,
  chapterName,
  totalQuestion,
  questionPackageId,
  questionPackageServiceId,
  chapterId,
  questionServiceId,
  rules,
}) => {
  const navigation: any = useNavigation();
  return (
    <SwipeUp
      height={100}
      onClose={() => setIsOpenPopUp(false)}
      isSwipeLine={true}
      visible={isOpenPopUp}
      children={
        <View style={styles.soalTestContainer}>
          <View style={styles.soalTestHeaderContainer}>
            <Text style={styles.soalTestHeaderTextTop}>{chapterName}</Text>
            <Text style={styles.soalTestHeaderTextBottom}>
              Ulangan Harian • Test
            </Text>
          </View>
          <View style={styles.soalTestInfoContainer}>
            <View style={styles.soalTestInfoButtonContainer}>
              <Text
                style={
                  styles.soalTestInfoButtonText
                }>{`${totalQuestion} Soal`}</Text>
            </View>
            <View style={styles.soalTestInfoButtonContainer}>
              <Text style={styles.soalTestInfoButtonText}>{'60 Menit'}</Text>
            </View>
          </View>
          <View style={styles.soalTestRulesContainer}>
            <View>
              <Text style={[styles.soalTestRulesTitleText, {marginBottom: 5}]}>
                Cara Pengerjaan:
              </Text>
              {rulesSOALTest?.map((_rules: string, index: number) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: 10,
                  }}>
                  <View style={{flex: 0.03}}>
                    <Text style={styles.soalTestRulesTitleText}>{'•'}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.soalTestRulesTitleText,
                        {fontFamily: Fonts.RegularPoppins},
                      ]}>
                      {_rules}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.soalTestSubmitButtonContainer}>
            <Button
              action={async () => {
                setIsOpenPopUp(false);
                try {
                  const _res = await ProviderSOAL?.startSoalOrAkm({
                    question_package_id: questionPackageId,
                    question_package_service_id: questionPackageServiceId,
                    duration_minutes: 60,
                  });
                  var resDataStartSoal: any = _res?.data || false;

                  navigation.navigate('MultipleChoiceQuestionScreen', {
                    chapter_id: chapterId,
                    question_service_id: questionServiceId,
                    question_package_id: questionPackageId,
                    title: 'Ulangan Harian',
                    level_id: 1,
                    subTitle: '',
                    is_done: false,
                    service: 'Ulangan Harian Test',
                    rules: rules,
                    question_data: resDataStartSoal,
                  });
                } catch (error: any) {
                  if (
                    error?.response?.data?.code === 906 ||
                    error?.response?.data?.code === 100
                  ) {
                    navigation.navigate('MultipleChoiceQuestionScreen', {
                      chapter_id: chapterId,
                      question_service_id: questionServiceId,
                      question_package_id: questionPackageId,
                      title: 'Ulangan Harian',
                      level_id: 1,
                      subTitle: '',
                      is_done: false,
                      service: 'Ulangan Harian Test',
                      rules: rules,
                      question_data: error?.response?.data,
                    });
                    null;
                  } else {
                    showErrorToast(
                      error?.response?.data?.message ??
                        'Internal server error [500]',
                    );
                  }
                }
              }}
              label="Mulai"
              style={styles.soalTestSubmitButton}
            />
          </View>
        </View>
      }
    />
  );
};

export default KpSwipeupTest;
