import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';
import PracticeIcon from '@assets/svg/ic32_practice.svg';
import GreyArrow from '@assets/svg/greyArrow.svg';
import TestIcon from '@assets/svg/ic32_test.svg';
import LearnIcon from '@assets/svg/ic32_learn.svg';
import AssesmenSumatif from '@assets/svg/ic_asesmen_sumatif.svg';
import AssesmenFormatif from '@assets/svg/ic_asesmen_formatif.svg';
import MediaAjar from '@assets/svg/ic_media_ajar.svg';
import VideoIcon from '@assets/svg/ic32_video.svg';
import {SubjectType} from '@constants/subjectType';
import {CoachmarkLib} from '@components/atoms';
import {generalStyles} from '@constants/styles';

type IRenderHeader = {
  classId: any;
  category: string;
  navigateToPractice?: any;
  navigateToTest?: any;
  navigateToLearn?: any;
  navigateToWatchVideo?: any;
  Coachmarks?: any;
  doneCoachMark?: () => void;
  _handlerCoachmark?: (queue: number) => void;
  totalCoachmark?: number;
  scrollView?: any;
  hasDataPresentation?: boolean;
  hasDataAnimation?: boolean;
  hasDataEbook?: boolean;
  isIKM?: boolean;
};

export const KPBottom = ({
  classId,
  category,
  navigateToPractice,
  navigateToTest,
  navigateToLearn,
  navigateToWatchVideo,
  Coachmarks,
  doneCoachMark,
  _handlerCoachmark,
  totalCoachmark,
  scrollView,
  hasDataAnimation,
  hasDataEbook,
  hasDataPresentation,
  isIKM,
}: IRenderHeader) => {
  const queuePractice =
    hasDataAnimation && hasDataPresentation && hasDataEbook
      ? 6
      : hasDataAnimation && hasDataPresentation
      ? 5
      : 4;

  const queueTest =
    hasDataAnimation && hasDataPresentation && hasDataEbook
      ? 7
      : hasDataAnimation && hasDataPresentation
      ? 6
      : 5;

  const renderPracticeCard = () => {
    return (
      <CoachmarkLib
        ref={ref => (Coachmarks[queuePractice - 1] = ref)}
        onNext={() => _handlerCoachmark && _handlerCoachmark(queuePractice)}
        onShow={() => scrollView?.current?.stop()}
        onSkip={doneCoachMark}
        buttonOnContent
        queue={queuePractice}
        arrowMiddle
        totalCoachmark={totalCoachmark}
        buttonSkipText={'Lewati'}
        contentContainerStyle={generalStyles.contentFlex}
        title={isIKM ? 'Asesmen Formatif' : 'Practice'}
        message={
          'Penguatan konsep belajar melalui soal latihan yang bervariasi.'
        }>
        <View style={generalStyles.contentFlex}>
          <TouchableOpacity
            onPress={navigateToPractice}
            style={styles.cardContentLeft}>
            <View style={styles.cardContentInnerLeft}>
              <View style={styles.cardContentTopTextContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.cardContentTopText}>
                  Sudah paham dengan materi di bab ini? Lanjutkan dengan
                  latihan.
                </Text>
              </View>
              <View style={styles.cardInnerBottomContainer}>
                <View style={styles.cardInnerIconContainer}>
                  {isIKM ? <AssesmenFormatif /> : <PracticeIcon />}
                </View>
                <View style={styles.cardInnerTitleContainer}>
                  <Text allowFontScaling={false} style={styles.cardInnerTitle}>
                    {isIKM ? 'Asesmen Formatif' : 'Practice'}
                  </Text>
                </View>
                <View style={styles.cardInnerRightIcon}>
                  <GreyArrow />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </CoachmarkLib>
    );
  };

  const renderTestCard = () => {
    return (
      <CoachmarkLib
        ref={ref => (Coachmarks[queueTest - 1] = ref)}
        onNext={() => _handlerCoachmark && _handlerCoachmark(queueTest)}
        onShow={() => scrollView?.current?.stop()}
        onSkip={doneCoachMark}
        buttonOnContent
        queue={queueTest}
        totalCoachmark={totalCoachmark}
        buttonSkipText={'Lewati'}
        childrenStyle={styles.cardContentLeft}
        contentContainerStyle={generalStyles.contentFlex}
        title={isIKM ? 'Asesmen Sumatif' : 'Test'}
        message={
          'Evaluasi proses pembelajaran melalui soal tes yang bervariasi.'
        }>
        <View style={generalStyles.contentFlex}>
          <TouchableOpacity
            onPress={navigateToTest}
            style={styles.cardContentLeft}>
            <View style={styles.cardContentInnerLeft}>
              <View style={styles.cardContentTopTextContainer}>
                <Text
                  allowFontScaling={false}
                  style={styles.cardContentTopText}>
                  Uji pemahaman belajarmu dengan mengerjakan tes.
                </Text>
              </View>
              <View style={styles.cardInnerBottomContainer}>
                <View style={styles.cardInnerIconContainer}>
                  {isIKM ? <AssesmenSumatif /> : <TestIcon />}
                </View>
                <View style={styles.cardInnerTitleContainer}>
                  <Text allowFontScaling={false} style={styles.cardInnerTitle}>
                    {isIKM ? 'Asesmen Sumatif' : 'Test'}
                  </Text>
                </View>
                <View style={styles.cardInnerRightIcon}>
                  <GreyArrow />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </CoachmarkLib>
    );
  };

  const renderLearnCard = () => {
    return (
      <TouchableOpacity
        onPress={navigateToLearn}
        style={styles.cardContentLeft}>
        <View style={styles.cardContentInnerLeft}>
          <View style={styles.cardContentTopTextContainer}>
            <Text allowFontScaling={false} style={styles.cardContentTopText}>
              Pelajari secara mendalam materi di bab ini.
            </Text>
          </View>
          <View style={styles.cardInnerBottomContainer}>
            <View style={styles.cardInnerIconContainer}>
              {isIKM ? <MediaAjar /> : <LearnIcon />}
            </View>
            <View style={styles.cardInnerTitleContainer}>
              <Text allowFontScaling={false} style={styles.cardInnerTitle}>
                {isIKM ? 'Media Ajar' : 'Learn'}
              </Text>
            </View>
            <View style={styles.cardInnerRightIcon}>
              <GreyArrow />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderWatchVideoCard = () => {
    return (
      <TouchableOpacity
        onPress={navigateToWatchVideo}
        style={styles.cardContentLeft}>
        <View style={styles.cardContentInnerLeft}>
          <View style={styles.cardContentTopTextContainer}>
            <Text allowFontScaling={false} style={styles.cardContentTopText}>
              Pelajari materi di bab ini dengan menonton video.
            </Text>
          </View>
          <View style={styles.cardInnerBottomContainer}>
            <View style={styles.cardInnerIconContainer}>
              <VideoIcon />
            </View>
            <View style={styles.cardInnerTitleContainer}>
              <Text allowFontScaling={false} style={styles.cardInnerTitle}>
                Tonton{'\n'}Video
              </Text>
            </View>
            <View style={styles.cardInnerRightIcon}>
              <GreyArrow />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.cardContainer}>
      {(category === SubjectType.SOAL.UlanganHarian ||
        category === SubjectType.SOAL.UlanganHarianPractice) && (
        <View style={styles.cardBottomContainer}>
          {renderWatchVideoCard()}
          {classId > 3 && renderTestCard()}
        </View>
      )}
      {category === SubjectType.KPRegular.Learn && (
        <View style={styles.cardBottomContainer}>
          {renderPracticeCard()}
          {renderTestCard()}
        </View>
      )}
      {category === SubjectType.KPRegular.Test && (
        <View style={styles.cardBottomContainer}>
          {renderLearnCard()}
          {renderPracticeCard()}
        </View>
      )}
      {category === SubjectType.KPRegular.Practice && (
        <View style={styles.cardBottomContainer}>
          {renderLearnCard()}
          {classId > 3 && renderTestCard()}
        </View>
      )}
    </View>
  );
};
