import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {styles} from './styles';
import {KPHeader} from './molecules/KPHeader';
import {KPHeaderProgress} from './molecules/KPHeaderProgress';
import {KPKonsepPelajaran} from './molecules/KPKonsepPelajaran';
import {KPChapterLesson} from './molecules/KPChapterLesson';
import {KPBottom} from './molecules/KPBottom';
import {CoachmarkLib, SwipeUp} from '@components/atoms';
import {KPPracticeInstructionContent} from './molecules/KPPracticeInstructionContent';
import Colors from '@constants/colors';
import {SoalBlue, SoalYellow} from '@assets/images/index';
import ArrowBlue from '@assets/svg/blueArrow.svg';
import ChecklistIcon from '@assets/svg/ic_checklist_green.svg';
import useChapterLessonDetail from './useLessonChapterDetail';
import {SubjectType} from '@constants/subjectType';
import KpSwipeupTest from './molecules/KpSwipeupTest';
import {QUESTION_SERVICE_TYPE} from '@constants/questionServiceType';
import {isStringContains} from '@constants/functional';
import {MultipleChoiceQuestionScreenParam} from 'type/screen';

const KPRegularDetailBab = () => {
  const {
    navigation,
    category,
    handleScroll,
    chapterData,
    subject_id,
    subject_name,
    subject_icon,
    isSoal,
    soal_type,
    contentData,
    getAllAkmTypePackage,
    getUlanganHarianChapterPracticePackage,
    getUlanganHarianChapterTestPackage,
    classId,
    isOpenInstruction,
    setIsOpenInstruction,
    instructionNotes,
    instructionTitle,
    isLoading,
    materialData,
    listMaterial,
    setAkmInstructionData,
    handleOpenInstruction,
    returnServiceType,
    handleNavigationContent,
    fetchChapter,
    isOpenPopUp,
    setIsOpenPopUp,
    soalDataDetail,
    navigateToTest,
    navigateToWatchVideo,
    Coachmarks,
    doneCoachMark,
    _handlerCoachmark,
    totalCoachmark,
    hasDataPresentation,
    hasDataAnimation,
    hasDataEbook,
    scrollView,
    isIKM,
  } = useChapterLessonDetail();

  return (
    <>
      {/* {scrollPosition < 5 ? ( */}
      <KPHeader
        key={Math.random()}
        isSoal={isSoal}
        subjectName={subject_name}
        chapterData={
          category === SubjectType?.AKM?.AKM
            ? getAllAkmTypePackage
            : chapterData
        }
        category={category}
        navigation={navigation}
        subjectIcon={subject_icon}
        soalType={soal_type ? soal_type : ''}
        Coachmarks={Coachmarks}
        doneCoachMark={doneCoachMark}
        _handlerCoachmark={_handlerCoachmark}
        totalCoachmark={totalCoachmark}
        hasDataPresentation={hasDataPresentation}
        hasDataAnimation={hasDataAnimation}
        hasDataEbook={hasDataEbook}
        scrollView={scrollView}
      />
      {/* ) : (
        <KPHeaderSmall
          key={Math.random()}
          isSoal={isSoal}
          subjectName={subject_name}
          chapterData={
            category === SubjectType?.AKM?.AKM
              ? getAllAkmTypePackage
              : chapterData
          }
          category={category}
          navigation={navigation}
          subjectIcon={subject_icon}
          soalType={soal_type ? soal_type : ''}
        />
      )} */}
      {isLoading ? (
        <ActivityIndicator
          color={Colors.primary.base}
          style={styles.mt10}
          size={'large'}
        />
      ) : (
        <ScrollView
          scrollEventThrottle={8}
          onScroll={handleScroll}
          style={styles.content}
          showsVerticalScrollIndicator={false}>
          {/* main content */}
          {category === SubjectType?.AKM?.AKM && (
            <View style={{backgroundColor: Colors.white}}>
              <ScrollView>
                {contentData?.map((ie: any, index: number) => {
                  const isEssayType = isStringContains(
                    ie?.question_type?.question_type,
                    'essay',
                  );
                  return (
                    <Pressable
                      onPress={() => {
                        setAkmInstructionData({
                          id: ie?.id,
                          akmCategory: ie?.question_package_service_id,
                          akmMaxDuration: ie?.rules?.max_duration,
                          akmQuestionType: ie?.question_type,
                          akmTotalQuestion: ie?.total_question,
                          akmTitle: ie?.name,
                          akmType: getAllAkmTypePackage?.data?.type,
                          ruleNotes: ie?.rules?.rules,
                        });
                        handleOpenInstruction(ie);
                      }}
                      key={`AKM-${ie?.id}${Math.random()}`}
                      style={[
                        styles.akmQuestionTabContainer,
                        {marginTop: index === 0 ? 30 : 10},
                      ]}>
                      <View style={styles.akmQuestionTabInnerContainer}>
                        <View style={styles.akmQuestionIconContainer}>
                          <Image
                            source={
                              getAllAkmTypePackage?.data?.type ===
                              'AKM Literasi'
                                ? SoalYellow
                                : SoalBlue
                            }
                            style={styles.akmuQuiestionIcon}
                          />
                        </View>
                        <View style={styles.akmQuestionMiddlePartContainer}>
                          <Text
                            allowFontScaling={false}
                            style={styles.akmQuestionMiddlePartTitle}>
                            {ie?.name}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={styles.akmQuestionCountContainer}>{`${
                            ie?.total_question
                          } Soal ${
                            ie?.question_type_id === 1 ? 'PG' : 'Uraian'
                          } ${
                            ie?.user_max_point && !isEssayType
                              ? `• Nilai Tertinggi: ${ie?.user_max_point}`
                              : ''
                          }`}</Text>
                        </View>
                        {ie?.user_max_point && (
                          <View style={styles.akmQuestionArrowIconCOntainer2}>
                            <ChecklistIcon width={23} height={23} />
                          </View>
                        )}
                        <View style={styles.akmQuestionArrowIconCOntainer}>
                          <ArrowBlue />
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          )}
          {/* Asesmen Formatif / Practice */}
          {category === SubjectType?.KPRegular.Practice && (
            <View>
              <KPHeaderProgress category={category} chapterData={chapterData} />
              <View style={styles.lessonListContainer}>
                <KPChapterLesson
                  contentData={contentData}
                  chapterId={chapterData?.chapter?.id}
                  service={returnServiceType()}
                  chapterSubtitle={`${subject_name} \u25CF ${chapterData?.chapter?.name}`}
                  category={category}
                  subjectId={subject_id}
                  navigation={navigation}
                  Coachmarks={Coachmarks}
                  doneCoachMark={doneCoachMark}
                  _handlerCoachmark={_handlerCoachmark}
                  totalCoachmark={totalCoachmark}
                  hasDataPresentation={hasDataPresentation}
                  hasDataAnimation={hasDataAnimation}
                  hasDataEbook={hasDataEbook}
                  scrollView={scrollView}
                  openInstruction={(practiceMaterialData: any) => {
                    handleOpenInstruction(practiceMaterialData);
                  }}
                />
              </View>
              <KPBottom
                isIKM={isIKM}
                classId={classId}
                category={category}
                Coachmarks={Coachmarks}
                doneCoachMark={doneCoachMark}
                _handlerCoachmark={_handlerCoachmark}
                totalCoachmark={totalCoachmark}
                hasDataPresentation={hasDataPresentation}
                hasDataAnimation={hasDataAnimation}
                hasDataEbook={hasDataEbook}
                scrollView={scrollView}
                navigateToPractice={() => {
                  fetchChapter(SubjectType?.KPRegular.Practice);
                }}
                navigateToTest={() => {
                  fetchChapter(SubjectType?.KPRegular.Test);
                }}
                navigateToLearn={() => {
                  fetchChapter(SubjectType?.KPRegular.Learn);
                }}
              />
            </View>
          )}
          {/* Asesmen Sumatif / Test */}
          {category === SubjectType?.KPRegular.Test && (
            <View>
              <KPHeaderProgress category={category} chapterData={chapterData} />
              <View style={styles.lessonListContainer}>
                <KPChapterLesson
                  contentData={contentData}
                  chapterId={chapterData?.chapter?.id}
                  service={returnServiceType()}
                  chapterSubtitle={`${subject_name} \u25CF ${chapterData?.chapter?.name}`}
                  category={category}
                  subjectId={subject_id}
                  navigation={navigation}
                  Coachmarks={Coachmarks}
                  doneCoachMark={doneCoachMark}
                  _handlerCoachmark={_handlerCoachmark}
                  totalCoachmark={totalCoachmark}
                  hasDataPresentation={hasDataPresentation}
                  hasDataAnimation={hasDataAnimation}
                  hasDataEbook={hasDataEbook}
                  scrollView={scrollView}
                  openInstruction={(practiceMaterialData: any) => {
                    handleOpenInstruction(practiceMaterialData);
                  }}
                />
              </View>
              <KPBottom
                isIKM={isIKM}
                classId={classId}
                category={category}
                Coachmarks={Coachmarks}
                doneCoachMark={doneCoachMark}
                scrollView={scrollView}
                _handlerCoachmark={_handlerCoachmark}
                totalCoachmark={totalCoachmark}
                hasDataPresentation={hasDataPresentation}
                hasDataAnimation={hasDataAnimation}
                hasDataEbook={hasDataEbook}
                navigateToPractice={() => {
                  fetchChapter(SubjectType?.KPRegular.Practice);
                }}
                navigateToTest={() => {
                  fetchChapter(SubjectType?.KPRegular.Test);
                }}
                navigateToLearn={() => {
                  fetchChapter(SubjectType?.KPRegular.Learn);
                }}
              />
            </View>
          )}
          {/* Media Ajar / Learn */}
          {category === SubjectType?.KPRegular.Learn && (
            <View>
              <CoachmarkLib
                ref={ref => (Coachmarks[1] = ref)} //prevent not show soon change to 0
                onNext={() => _handlerCoachmark(1)}
                onShow={() => scrollView?.current?.stop()}
                onSkip={doneCoachMark}
                buttonOnContent
                queue={2} //prevent not show soon change to 1
                arrowMiddle
                totalCoachmark={totalCoachmark}
                buttonSkipText={'Lewati'}
                // childrenStyle={styles.borderCard}
                title={'Progres Belajar'}
                message={
                  'Cek progres belajar kamu sesuai bab yang sudah dipelajari di sini.'
                }>
                <View>
                  <KPHeaderProgress
                    category={category}
                    chapterData={chapterData}
                  />
                </View>
              </CoachmarkLib>
              {!isIKM && (
                <CoachmarkLib
                  ref={ref => (Coachmarks[1] = ref)}
                  onNext={() => _handlerCoachmark(2)}
                  onShow={() => scrollView?.current?.stop()}
                  onSkip={doneCoachMark}
                  buttonOnContent
                  queue={2}
                  arrowMiddle
                  totalCoachmark={totalCoachmark}
                  buttonSkipText={'Lewati'}
                  // childrenStyle={styles.borderCard}
                  title={'Konsep Pelajaran'}
                  message={
                    'Lihat konsep materi pelajaran berbasis rangkuman di sini.'
                  }>
                  <KPKonsepPelajaran
                    chapterData={contentData}
                    navigation={navigation}
                  />
                </CoachmarkLib>
              )}
              <View style={styles.lessonListContainer}>
                <KPChapterLesson
                  contentData={contentData}
                  chapterId={chapterData?.chapter?.id}
                  service={returnServiceType()}
                  chapterSubtitle={`${subject_name} \u25CF ${chapterData?.chapter?.name}`}
                  category={category}
                  subjectId={subject_id}
                  navigation={navigation}
                  Coachmarks={Coachmarks}
                  doneCoachMark={doneCoachMark}
                  _handlerCoachmark={_handlerCoachmark}
                  totalCoachmark={totalCoachmark}
                  hasDataPresentation={hasDataPresentation}
                  hasDataAnimation={hasDataAnimation}
                  hasDataEbook={hasDataEbook}
                  scrollView={scrollView}
                  openInstruction={(practiceMaterialData: any) => {
                    handleOpenInstruction(practiceMaterialData);
                  }}
                />
              </View>
              <KPBottom
                isIKM={isIKM}
                classId={classId}
                category={category}
                Coachmarks={Coachmarks}
                doneCoachMark={doneCoachMark}
                totalCoachmark={totalCoachmark}
                _handlerCoachmark={_handlerCoachmark}
                hasDataPresentation={hasDataPresentation}
                hasDataAnimation={hasDataAnimation}
                hasDataEbook={hasDataEbook}
                scrollView={scrollView}
                navigateToPractice={() => {
                  fetchChapter(SubjectType?.KPRegular.Practice);
                }}
                navigateToTest={() => {
                  fetchChapter(SubjectType?.KPRegular.Test);
                }}
                navigateToLearn={() => {
                  fetchChapter(SubjectType?.KPRegular.Learn);
                }}
              />
            </View>
          )}
          {category === SubjectType?.LMS.MateriSekolah &&
            (isLoading ? (
              <ActivityIndicator />
            ) : (
              <View>
                <KPHeaderProgress
                  category={category}
                  chapterData={chapterData}
                />
                {listMaterial.length > 0 && (
                  <View style={styles.lessonListContainer}>
                    <KPChapterLesson
                      contentData={listMaterial}
                      chapterId={chapterData?.id}
                      category={category}
                      subjectId={subject_id}
                      navigation={navigation}
                      Coachmarks={Coachmarks}
                      doneCoachMark={doneCoachMark}
                      _handlerCoachmark={_handlerCoachmark}
                      totalCoachmark={totalCoachmark}
                      hasDataPresentation={hasDataPresentation}
                      hasDataAnimation={hasDataAnimation}
                      hasDataEbook={hasDataEbook}
                      scrollView={scrollView}
                      openInstruction={(practiceMaterialData: any) => {
                        handleOpenInstruction(practiceMaterialData);
                      }}
                    />
                  </View>
                )}
                <KPBottom
                  isIKM={isIKM}
                  classId={classId}
                  category={category}
                  Coachmarks={Coachmarks}
                  doneCoachMark={doneCoachMark}
                  totalCoachmark={totalCoachmark}
                  _handlerCoachmark={_handlerCoachmark}
                  hasDataPresentation={hasDataPresentation}
                  hasDataAnimation={hasDataAnimation}
                  hasDataEbook={hasDataEbook}
                  scrollView={scrollView}
                />
              </View>
            ))}
          {(category === SubjectType?.SOAL.UlanganHarianPractice ||
            category === SubjectType?.SOAL.UlanganHarianTest) && (
            <View>
              <View style={styles.lessonListContainer}>
                <KPChapterLesson
                  contentData={
                    category === SubjectType?.SOAL.UlanganHarianPractice
                      ? getUlanganHarianChapterPracticePackage?.data?.packages
                      : getUlanganHarianChapterTestPackage?.data?.packages
                  }
                  chapterId={chapterData?.id}
                  service={returnServiceType()}
                  category={category}
                  subjectId={subject_id}
                  navigation={navigation}
                  Coachmarks={Coachmarks}
                  doneCoachMark={doneCoachMark}
                  _handlerCoachmark={_handlerCoachmark}
                  totalCoachmark={totalCoachmark}
                  hasDataPresentation={hasDataPresentation}
                  hasDataAnimation={hasDataAnimation}
                  hasDataEbook={hasDataEbook}
                  scrollView={scrollView}
                  openInstruction={(practiceMaterialData: any) => {
                    handleOpenInstruction(practiceMaterialData);
                  }}
                />
              </View>
              <KPBottom
                isIKM={isIKM}
                classId={classId}
                category={category}
                Coachmarks={Coachmarks}
                doneCoachMark={doneCoachMark}
                _handlerCoachmark={_handlerCoachmark}
                totalCoachmark={totalCoachmark}
                hasDataPresentation={hasDataPresentation}
                hasDataAnimation={hasDataAnimation}
                hasDataEbook={hasDataEbook}
                scrollView={scrollView}
                navigateToTest={navigateToTest}
                navigateToWatchVideo={navigateToWatchVideo}
              />
            </View>
          )}
        </ScrollView>
      )}
      <SwipeUp
        height={100}
        onClose={() => setIsOpenInstruction(false)}
        isSwipeLine={true}
        visible={isOpenInstruction}
        children={
          <KPPracticeInstructionContent
            instruction={instructionNotes}
            instructionData={materialData}
            category={category}
            title={instructionTitle}
            navigation={navigation}
            action={(
              _chapterType: MultipleChoiceQuestionScreenParam['serviceTypeName'],
              title?: string,
            ) => handleNavigationContent(_chapterType, title)}
          />
        }
      />
      <KpSwipeupTest
        chapterId={chapterData?.id}
        chapterName={chapterData?.name}
        isOpenPopUp={isOpenPopUp}
        setIsOpenPopUp={setIsOpenPopUp}
        questionPackageId={soalDataDetail?.id}
        questionPackageServiceId={
          soalDataDetail?.question_package_service_id || 0
        }
        questionServiceId={QUESTION_SERVICE_TYPE?.SOAL_PILIHAN_GANDA}
        rules={soalDataDetail?.rules}
        totalQuestion={soalDataDetail?.total_question || 0}
      />
    </>
  );
};

export default KPRegularDetailBab;
