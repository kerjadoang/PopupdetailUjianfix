import React, {FC, useState} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import styles from './styles';
import {AccessSubjectCard, ImageSubjects, MainView} from '@components/atoms';
import IconKPReg from '@assets/svg/kelaspintar_regular.svg';
import IconSoal from '@assets/svg/logo_soal.svg';
import Colors from '@constants/colors';
import Subjects from '@components/molecules/Subjects';
import useQuestionScreen from '@components/pages/QuestionScreen/useQuestionScreen';

type Props = {
  navigation: any;
  activeCuriculum: ICurriculum;
  activePhase: IPhaseClass;
  onPressActiveCuriculum: () => void;
  onPressActivePhase: () => void;
  scrollViewRef: any;
  Coachmarks: any[];
  doneCoachMark: () => void;
  totalCoachmark: number;
  _handlerCoachmark: (queue: number) => void;
  onSwipeUp: () => void;
  onSetting: () => void;
  onSwipeUpPractice: () => void;
  onSwipeUpTest: () => void;
  onSwipeUpForbiddenAccess: () => void;
  subjectData: any;
  subjectClass: any;
  onNextSubjects: () => void;
};

const TeacherSubject: FC<Props> = ({
  navigation,
  activeCuriculum,
  activePhase,
  onPressActiveCuriculum,
  onPressActivePhase,
  scrollViewRef,
  Coachmarks,
  doneCoachMark,
  totalCoachmark,
  _handlerCoachmark,
  onSwipeUp,
  onSetting,
  onSwipeUpPractice,
  onSwipeUpTest,
  onSwipeUpForbiddenAccess,
  subjectData,
  subjectClass,
  onNextSubjects,
}) => {
  const [activeTab, setActiveTab] = useState<'KPREG' | 'SOAL'>('KPREG');
  const {isHidden, lastAccessed} = useQuestionScreen();

  const renderContent = (activeTab: 'KPREG' | 'SOAL') => {
    switch (activeTab) {
      case 'SOAL':
        return (
          <MainView paddingTop={16}>
            <Text style={[styles.cardTitle]}>
              Mau latihan soal apa hari ini?
            </Text>
            <View style={[styles.cardMiddleContainer, {marginTop: 16}]}>
              <ScrollView
                contentContainerStyle={styles.cardMiddleContainerScroll}
                nestedScrollEnabled={true}>
                {subjectClass?.map((item: any, index: any) => (
                  <ImageSubjects
                    key={index}
                    pressableStyle={styles.subCard}
                    imageStyle={{width: 50, height: 50}}
                    data={item}
                    onPress={() => {
                      navigation.navigate('QuestionDetailScreen', {
                        category: 'Soal',
                        subjectData: item,
                      });
                    }}
                  />
                ))}
              </ScrollView>
            </View>

            {!isHidden && lastAccessed?.length !== 0 && (
              <View style={styles.lastAccessedContainer}>
                <Text style={[styles.cardTitle, {alignSelf: 'flex-start'}]}>
                  Terakhir Diakses
                </Text>
                <View style={styles.bottomContainer}>
                  <ScrollView
                    nestedScrollEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {lastAccessed?.slice(0, 5).map((item: any, index: any) => (
                      <AccessSubjectCard
                        key={index}
                        data={item}
                        onPress={() => {
                          navigation.navigate('QuestionDetailScreen', {
                            category: 'Soal',
                            subjectData: item.subject,
                          });
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
          </MainView>
        );
      default:
        return (
          <Subjects
            userRole="guru"
            activeCuriculum={activeCuriculum}
            activePhase={activePhase}
            onPressActiveCuriculum={onPressActiveCuriculum}
            onPressActivePhase={onPressActivePhase}
            scrollViewRef={scrollViewRef}
            Coachmarks={Coachmarks}
            doneCoachMark={doneCoachMark}
            totalCoachmark={totalCoachmark}
            _handlerCoachmark={_handlerCoachmark}
            onSwipeUp={onSwipeUp}
            onSetting={onSetting}
            onSwipeUpPractice={onSwipeUpPractice}
            onSwipeUpTest={onSwipeUpTest}
            onSwipeUpForbiddenAccess={onSwipeUpForbiddenAccess}
            subjectData={subjectData}
            onNextSubjects={onNextSubjects}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* MARK: START TAB BAR */}
      <MainView
        flexDirection="row"
        borderBottomWidth={1}
        borderBottomColor={Colors.dark.neutral20}>
        {/* MARK: START KPREG */}
        <MainView flex={1}>
          <Pressable onPress={() => setActiveTab('KPREG')}>
            <MainView paddingBottom={10} alignItems="center">
              <IconKPReg height={22} />
            </MainView>
            {activeTab === 'KPREG' ? (
              <MainView style={styles.tabBarIndicator} />
            ) : null}
          </Pressable>
        </MainView>
        {/* MARK: END KPREG */}

        {/* MARK: START SOAL */}
        <MainView flex={1}>
          <Pressable onPress={() => setActiveTab('SOAL')}>
            <MainView paddingBottom={10} alignItems="center">
              <IconSoal height={22} />
            </MainView>
            {activeTab === 'SOAL' ? (
              <MainView style={styles.tabBarIndicator} />
            ) : null}
          </Pressable>
        </MainView>
        {/* MARK: END SOAL */}
      </MainView>
      {/* MARK: END TAB BAR */}

      <MainView paddingBottom={20}>{renderContent(activeTab)}</MainView>
    </View>
  );
};

export default TeacherSubject;
