import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Header} from '@components/atoms';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Colors from '@constants/colors';
import Left from '@assets/svg/ic24_chevron_left_white.svg';
import {styles} from './styles';
import HighScoreItem from '@components/atoms/HighScoreItem';
import useFormTryOutDetailHistory from './useFormTryOutDetailHistory';
import ChartSection from './component/ChartSection';
import ScoreSection from './component/ScoreSection';
import Down from '@assets/svg/ic24_chevron_down_blue.svg';
import Up from '@assets/svg/ic24_chevron_up_blue.svg';
import ListScore from './component/ListScore';
import {ParamList} from 'type/screen';
import ImproveYourSkillsCard from './component/ImproveYourSkillsCard';

const TryOutDetailHistoryScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'TryOutDetailHistoryScreen'>>();
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'TryOutDetailHistoryScreen'>
    >();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Try Out'}
          backgroundColor={Colors.primary.base}
          colorLabel={'white'}
          iconLeft={<Left width={18} height={18} />}
        />
      ),
    });
  }, [navigation]);

  const {dataHistory} = route?.params;
  const [show, setShow] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const {
    rank,
    allData,
    dataBarTPS,
    formStateRef,
    dataBarSaintek,
    dataBarSoshum,
    classRecommendation,
    bankSoalRecommendation,
  } = useFormTryOutDetailHistory(dataHistory);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <ChartSection
          data={allData}
          dataBarTPS={dataBarTPS}
          dataBarSaintek={dataBarSaintek}
          dataBarSoshum={dataBarSoshum}
          formStateRef={formStateRef}
        />
        <ScoreSection data={allData} />
        <Text style={styles.textTitleBigBlack}>Papan Peringkat</Text>
        <View style={[styles.shadowProp, styles.card, {alignItems: 'center'}]}>
          <HighScoreItem data={rank?.data} />
          <Pressable
            onPress={() => navigation.navigate('LeaderboardScreen')}
            style={styles.dropDown}>
            <Text style={styles.textBlueBold}>Lihat Selengkapnya</Text>
          </Pressable>
        </View>

        {Object.keys(formStateRef?.current?.module).map(
          (moduleName: any, index: number) => (
            <View
              key={index}
              style={{
                borderBottomWidth: 0.5,
                borderColor: Colors.dark.neutral50,
              }}>
              <Pressable
                style={[styles.rowBetween, {paddingVertical: 10}]}
                onPress={() => {
                  setShow(!show);
                  setSelectedModule(moduleName);
                }}>
                <Text style={styles.textTitleBigBlack}>
                  {moduleName.toUpperCase()}
                </Text>
                {show && moduleName === selectedModule ? (
                  <Up width={24} height={24} />
                ) : (
                  <Down width={24} height={24} />
                )}
              </Pressable>
              {show &&
                moduleName === selectedModule &&
                formStateRef?.current?.module[moduleName]?.map(
                  (item: any, i: number) => (
                    <ListScore
                      key={i}
                      data={item}
                      action={() =>
                        navigation.navigate('ExplanationTryOutScreen', {
                          tyroutHistoryId: item.tryout_user_history_id,
                          subjectId: item.subject_id,
                          testName: item.subject.name,
                        })
                      }
                    />
                  ),
                )}
            </View>
          ),
        )}

        <ImproveYourSkillsCard
          classRecommendation={classRecommendation}
          bankSoalRecommendation={bankSoalRecommendation}
        />
      </ScrollView>
    </View>
  );
};

export {TryOutDetailHistoryScreen};
