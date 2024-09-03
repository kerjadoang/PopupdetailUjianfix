import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {bgBlueOrnament} from '@assets/images';
import {SvgUri} from 'react-native-svg';
import ProgressBar from '@components/atoms/ProgressBar';
import {ButtonIconColor} from '@components/atoms';
import VideoCamera from '@assets/svg/video-camera.svg';
import RightIcon from '@assets/svg/ic16_chevron_right_green.svg';
import Fonts from '@constants/fonts';
import useQuestionDetail from './useQuestionDetail';
import {CoachmarkLib} from '@components/atoms';

const QuestionDetailScreen = ({route}: any) => {
  const {category, subjectData} = route.params;
  const {
    setButtonSelected,
    navigation,
    isSuscribedToSubjectsServices,
    user_progress,
    total_question,
    progress_percentage,
    exerciseType,
    Coachmarks,
    scrollView,
    doneCoachMark,
    _handlerCoachmark,
  } = useQuestionDetail(subjectData);

  return (
    <View style={{flex: 1}}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        backgroundColor={'transparent'}
      />
      <View style={styles.headerWrapperSecond}>
        <View>
          {subjectData?.icon_path_url ? (
            <View style={styles.iconContainer}>
              <SvgUri uri={subjectData?.icon_path_url} width={40} height={40} />
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={{paddingLeft: 12}}>
          <Text style={styles.headerWrapperSecondSubTitle}>
            {category ? category : 'Soal'}
          </Text>
          <View
            style={{
              width: window.width * 0.6,
            }}>
            <Text style={styles.headerWrapperSecondTitle}>
              {subjectData?.name}
            </Text>
          </View>
        </View>
      </View>
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View
        style={[
          styles.cardContainer,
          // {marginTop: isSuscribedToSubjectsServices ? 80 : 70},
          {flex: 10},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={[styles.container]}>
            <View style={styles.progressContainer}>
              <Text style={styles.progressSubTitle}>Progress Latihan Soal</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.progressTitle}>
                  {user_progress}/{total_question} soal ({progress_percentage})
                </Text>
                <View style={styles.progressBarContainer}>
                  <ProgressBar progress={progress_percentage} height={6} />
                </View>
              </View>
            </View>
            <View style={styles.rectangle} />
            <View style={styles.middleContainer} />
            {!isSuscribedToSubjectsServices && (
              <ButtonIconColor
                rightIconCustom={<RightIcon style={styles.rightIcon} />}
                title={'Kamu Belum Berlangganan SOAL'}
                subTitle={
                  'Berlangganan Paket Soal untuk bisa akses lebih banyak soal latihan dan ujian!'
                }
                subTitleStyle={{color: Colors.secondary.dark1}}
                backgroundColor={Colors.orange.light1}
                borderDashed
                borderColor={Colors.secondary.base}
                onPress={() => {
                  navigation.navigate('Cart');
                }}
              />
            )}
            <CoachmarkLib
              ref={ref => (Coachmarks[0] = ref)}
              onNext={() => _handlerCoachmark(1)}
              onShow={() => scrollView?.current?.stop()}
              onSkip={doneCoachMark}
              buttonOnContent
              queue={1}
              arrowMiddle
              totalCoachmark={4}
              buttonSkipText={'Lewati'}
              childrenStyle={styles.borderCard}
              title={'Video Animasi'}
              message={
                'Tonton video materi pembelajaran untuk persiapan latihan soal'
              }>
              <ButtonIconColor
                setButtonSelected={setButtonSelected}
                noGap
                rightIcon
                leftIcon={<VideoCamera />}
                title={'Video Animasi'}
                subTitle={'Tonton video materi pelajaran'}
                onPress={() => {
                  navigation.navigate('QuestionBabScreen', {
                    chapterData: subjectData,
                    category: 'Soal',
                    subject_id: subjectData?.id,
                    subject_name: subjectData?.name,
                    path_url: subjectData?.icon_path_url,
                  });
                }}
              />
            </CoachmarkLib>
            <View style={styles.gap16} />
            <Text style={styles.bottomTitle}>Pilih Jenis latihan</Text>
            <View style={styles.bottomContainer}>
              {exerciseType?.map((item: any, index: any) => (
                <View key={index}>
                  <CoachmarkLib
                    ref={ref => (Coachmarks[index + 1] = ref)}
                    onNext={() => _handlerCoachmark(index + 2)}
                    onSkip={doneCoachMark}
                    buttonOnContent
                    queue={index + 2}
                    totalCoachmark={4}
                    arrowMiddle
                    buttonSkipText={'Lewati'}
                    title={item.coachmarkTitle}
                    childrenStyle={styles.borderCard}
                    message={item.coachmarkMessage}>
                    <ButtonIconColor
                      setButtonSelected={setButtonSelected}
                      key={index}
                      rightIcon
                      noGap
                      leftIcon={item.leftIcon}
                      subTitle={item.subTitle}
                      title={item.title}
                      backgroundColor={item.colors}
                      onPress={() =>
                        item?.onPress ? item?.onPress(subjectData) : null
                      }
                    />
                  </CoachmarkLib>
                  <View style={styles.gap16} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export {QuestionDetailScreen};
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#F9FCFF',
  },
  cardContainer: {
    marginTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    backgroundColor: Colors.white,
    paddingBottom: 32,
  },
  container: {
    paddingBottom: 120,
    backgroundColor: Colors.white,
  },
  topTitle: {
    marginLeft: '1%',
    fontFamily: Fonts.RegularPoppins,
    color: Colors.white,
    marginTop: '2%',
    fontSize: 14,
    lineHeight: 18,
  },
  headerWrapperSecond: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
  },
  headerWrapperSecondSubTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.white,
  },
  headerWrapperSecondTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    marginTop: 1,
    letterSpacing: 1,
    color: Colors.white,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  progressContainer: {
    flexDirection: 'column',
  },
  progressSubTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  progressTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  rectangle: {
    backgroundColor: Colors.dark.neutral10,
    height: 2,
    marginTop: 8,
    width: '100%',
    padding: 0,
    shadowRadius: 1,
  },
  middleContainer: {
    marginTop: 16,
  },
  bottomContainer: {
    marginVertical: 16,
    marginBottom: 50,
  },
  bottomTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  progressBarContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: '20%',
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
    width: 50,
    height: 50,
    color: Colors.dark.neutral50,
  },
  gap16: {
    marginBottom: 16,
  },
  borderCard: {
    borderRadius: 14,
  },
});
