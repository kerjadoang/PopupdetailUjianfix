import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';
import {ProgressCircle} from '@components/atoms/ProgressCircleWithoutAnimation';
import BlueArrowIcon from '@assets/svg/blueArrow.svg';
import GreyArrow from '@assets/svg/greyArrow.svg';
import Colors from '@constants/colors';
import VideoPresentasiIcon from '@assets/svg/videoPresentasi.svg';
import LearnEbookIcon from '@assets/svg/learnEbook.svg';
import PlayIcon from '@assets/svg/ic_play_btn_blue.svg';
import {SCREEN_NAME} from '@constants/screen';
import {
  Button,
  CoachmarkLib,
  HowToPlayGame,
  MainText,
  MainView,
  SwipeUp,
} from '@components/atoms';
import Icon_green_download from '@assets/svg/ic_already_download.svg';
import {SubjectType} from '@constants/subjectType';
import TestPGIcon from '@assets/svg/tes_pg.svg';
import TestAdaptifIcon from '@assets/svg/tes_adaptif.svg';
import TestUraianIcon from '@assets/svg/tes_uraian.svg';
import PracticeBermainIcon from '@assets/svg/practice_bermain.svg';
import PracticeThinkIcon from '@assets/svg/practice_think.svg';
import PracticeHotsIcon from '@assets/svg/practice_hots.svg';
import PracticeSoalBerbasisNilaiIcon from '@assets/svg/practice_soalberbasisnilai.svg';
import PracticeTanyaJawabIcon from '@assets/svg/practice_tanyajawab.svg';
import LockIcon from '@assets/svg/ic24_lock.svg';
import GreenChecklistIcon from '@assets/svg/ic_checklist_green.svg';
import DoneCheckListIcon from '@assets/svg/ic20_check_green.svg';
import CheckIcon from '@assets/svg/ic16_check_green.svg';
import {IChapterMaterialData, IMaterialContentData} from '../type';
import ChecklistIcon from '@assets/svg/ic20_check_green.svg';
import RobotEmpty from '@assets/svg/robot_empty_lpt.svg';
import {fetchMiniGameList} from '@redux';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from '@hooks/useNavigate';
import {PDFViewerIKMScreenParam, PPTViewerIKMScreenParam} from 'type/screen';
import {_handleUserTypeId, isStringContains} from '@constants/functional';
import {useActiveCurriculum} from '@features/IKM/zustand';
import {RootState} from 'src/redux/rootReducer';

let listItems: any = [
  {
    id: 1,
    title: 'Cocokan Objek',
    image: require('@assets/images/practice_1.png'),
    value: false,
    soal: 10,
    step: [
      'Permainan menjodohkan yang terdiri dari gambar dan teks.',
      'Klik objek di sebelah kiri untuk dijodohkan dengan objek di sebelah kanan.',
      'Kamu dapat memperbesar gambar dengan klik tombol zoom.',
      'Kamu dapat mengulang kembali permainan ini kapan saja.',
    ],
    question_service_type_id: 1,
  },
  {
    id: 2,
    title: 'Benar atau Salah',
    image: require('@assets/images/practice_2.png'),
    value: false,
    soal: 10,
    step: [
      'Klik Benar atau Salah untuk memilih jawaban yang paling sesuai dari setiap pertanyaan yang ada di layar.',
      'Setiap pertanyaan memiliki batas waktu untuk menjawab.',
      'Hanya diperbolehkan 1 kali percobaan untuk setiap pertanyaan.',
      'Hasil akan disampaikan setelah semua pertanyaan dijawab.',
    ],
    question_service_type_id: 1,
  },
  {
    id: 3,
    title: 'Pilah Objek',
    image: require('@assets/images/practice_3.png'),
    value: false,
    soal: 10,
    step: [
      'Permainan ini menggunakan metode Drag and Drop.',
      'Tarik kepingan jawaban yang ada di bawah layar, kemudian letakkan jawaban tersebut pada kolom pengelompokkan objek yang paling sesuai.',
      'Untuk setiap jawaban yang benar akan ditampilkan pada kolom yang sesuai. ',
      'Hasil akan disampaikan setelah semua pertanyaan dijawab.',
    ],
    question_service_type_id: 1,
  },
  {
    id: 4,
    title: 'Tangkap & Jawab',
    image: require('@assets/images/practice_4.png'),
    value: false,
    soal: 10,
    step: [
      'Perhatikan setiap pertanyaan yang terdapat di layar.',
      'Dari bawah layar, akan muncul pilihan jawaban dalam bentuk gelembung yang melayang.',
      'Tangkap gelembung dengan pilihan jawaban yang paling tepat untuk menjawab pertanyaan.',
      'Jawaban yang benar akan ditampilkan setelah kamu menyelesaikan setiap pertanyaan.',
    ],
    question_service_type_id: 1,
  },
  {
    id: 5,
    title: 'Teka - teki silang',
    image: require('@assets/images/practice_5.png'),
    value: false,
    soal: 10,
    step: [
      'Pilih salah satu baris/kolom untuk mulai menjawab teka-teki silang.',
      'Jawab setiap pertanyaan yang terdapat pada tiap baris/kolom teka-teki.',
      'Gunakan petunjuk ketersediaan huruf di bawah layar untuk digunakan di setiap baris/kolom teka-teki.',
      'Perhatikan waktu yang berjalan. Jawab semua pertanyaan teka-teki silang sebelum waktu habis.',
    ],
    question_service_type_id: 1,
  },
];

type IChapterLesson = {
  contentData: any;
  category: string;
  navigation: any;
  subjectId: any;
  openInstruction: any;
  chapterId: string;
  chapterSubtitle: string;
  service: string;
  Coachmarks?: any;
  doneCoachMark?: () => void;
  _handlerCoachmark?: (queue: number) => void;
  totalCoachmark?: number;
  scrollView?: any;
  hasDataPresentation?: boolean;
  hasDataAnimation?: boolean;
  hasDataEbook?: boolean;
};

export const KPChapterLesson: any = ({
  contentData,
  category,
  navigation,
  subjectId,
  openInstruction,
  chapterId,
  chapterSubtitle,
  service,
  Coachmarks,
  doneCoachMark,
  _handlerCoachmark,
  totalCoachmark,
  scrollView,
  hasDataAnimation,
  hasDataPresentation,
}: IChapterLesson) => {
  const currentCuriculum = useActiveCurriculum();
  const isIKM = isStringContains(currentCuriculum.name || '', 'merdeka');
  const {navigateScreen} = useNavigate();
  const getUser: any = useSelector((state: RootState) => state.getUser);
  const userRole = _handleUserTypeId(getUser?.data?.user_type?.id);

  const queuePresentation = 3;
  const queueAnimation = hasDataPresentation ? 4 : 3;
  const queueEbook =
    hasDataPresentation && hasDataAnimation
      ? 5
      : hasDataPresentation
      ? 4
      : hasDataAnimation
      ? 4
      : 3;
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [show, setShow] = useState<any>({
    status: false,
    data: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMiniGameList(Number(chapterId)));
  }, [chapterId, dispatch]);

  const handleActionByChapterTypeLesson = (
    _type: any,
    _chapterData: any,
    _materialData?: any,
  ) => {
    switch (_type) {
      case 'presentation':
        if (isIKM) {
          return navigateScreen<PPTViewerIKMScreenParam>('PPTViewerIKMScreen', {
            data: _materialData,
            title: _materialData?.title,
          });
        }
        navigation.navigate('VideoPresentationScreen', {
          contentData: _materialData,
          subjectId: subjectId,
          contentType: category,
        });
        break;
      case 'ebook':
        if (isIKM) {
          return navigateScreen<PDFViewerIKMScreenParam>('PDFViewerIKMScreen', {
            data: _materialData,
            id:
              _materialData?.file_id ||
              _materialData?.media_id ||
              _materialData?.ID,
            title: _materialData.title,
          });
        }
        navigation.navigate('EbookScreen', {
          chapterData: _materialData,
          subjectId: subjectId,
          contentType: category,
        });
        break;
      case 'concept':
        navigation.navigate('ConceptScreen', {
          chapterData: _materialData,
          subjectId: subjectId,
        });
        break;
      case 'video':
        // if (isIKM) {
        //  return navigateScreen<VideoPlayerIkmScreenParam>('VideoPlayerIkmScreen', {
        //     data: _materialData,
        //     title: _materialData.title,
        //   });
        // }
        navigation.navigate('VideoAnimationScreen', {
          chapterData: _materialData,
          subjectId: subjectId,
        });
        break;
      case 'Content 1':
        navigation.navigate('ConceptScreen', {
          chapterData: _materialData,
          subjectId: subjectId,
        });
        break;
      case 'Content 2':
        if (isIKM) {
          return navigateScreen<PPTViewerIKMScreenParam>('PPTViewerIKMScreen', {
            data: _materialData,
            title: _materialData?.title,
          });
        }
        navigation.navigate('VideoPresentationScreen', {
          contentData: _materialData,
          subjectId: subjectId,
          contentType: category,
        });
        break;
      case 'Content 3':
        // if (isIKM) {
        //   return navigateScreen<VideoPlayerIkmScreenParam>('VideoPlayerIkmScreen', {
        //     data: _materialData,
        //     title: _materialData.title,
        //   });
        // }
        navigation.navigate('VideoAnimationScreen', {
          chapterData: _materialData,
          subjectId: subjectId,
        });
        break;
      case 'Content 4':
        if (isIKM) {
          return navigateScreen<PDFViewerIKMScreenParam>('PDFViewerIKMScreen', {
            data: _materialData,
            id:
              _materialData?.file_id ||
              _materialData?.media_id ||
              _materialData?.ID,
            title: _materialData.title,
          });
        }
        navigation.navigate('EbookScreen', {
          chapterData: _materialData,
          subjectId: subjectId,
        });
        break;
      case 1:
        navigation.navigate(SCREEN_NAME.MultipleChoiceQuestionScreen, {
          chapter_id: chapterId,
          question_service_id: _chapterData.id,
          title: _chapterData.name,
          number_of_attempts: _chapterData.rules?.number_of_attempts ?? 1,
          subTitle: chapterSubtitle,
          is_done: _chapterData.user_progress?.[0]?.is_done ?? false,
          service,
          rules: _chapterData.rules,
        });
        break;
      case 2:
        navigation.navigate(SCREEN_NAME.EssayScreen, {
          chapter_id: chapterId,
          question_service_id: _chapterData.id,
          title: _chapterData.name,
          number_of_attempts: _chapterData.rules?.number_of_attempts ?? 1,
          subTitle: chapterSubtitle,
          is_done: _chapterData.user_progress?.[0]?.is_done ?? false,
          service,
          rules: _chapterData.rules,
        });
        break;
      default:
        break;
    }
  };

  const handleActionByChapterTypeTest = (
    _index: any,
    _levelData: any,
    _chapterData: any,
  ) => {
    _chapterData.index = _index;
    _chapterData.level_id = _levelData?.id;
    _chapterData.level_name = _levelData?.name;
    _chapterData.level_question_service_type_id =
      _levelData?.question_service_type_id;
    openInstruction(_chapterData);
  };

  const handleChapterIcon = (icon: any) => {
    switch (icon) {
      case 'presentation':
        return <VideoPresentasiIcon />;
      case 'video':
        return <PlayIcon width={65} height={65} />;
      case 1:
        return <VideoPresentasiIcon />;
      case 2:
        return <VideoPresentasiIcon />;
      case 3:
        return <PlayIcon width={65} height={65} />;
      case 4:
        return <LearnEbookIcon />;
      case 'ebook':
        return <LearnEbookIcon />;
      case 'Bermain & Belajar':
        return <PracticeBermainIcon />;
      case 'Latihan Soal PG':
        return <TestPGIcon />;
      case 'Latihan Soal Uraian':
        return <TestUraianIcon />;
      case 'Pahami dan Beraksi':
        return <PracticeThinkIcon />;
      case 'Test Adaptif':
        return <TestAdaptifIcon />;
      case 'Soal Pilihan Ganda':
        return <TestPGIcon />;
      case 'Soal Uraian ':
        return <TestUraianIcon />;
      case 'Soal HOTS':
        return <PracticeHotsIcon />;
      case 'Tanya Jawab':
        return <PracticeTanyaJawabIcon />;
      case 'Soal Berbasis Nilai':
        return <PracticeSoalBerbasisNilaiIcon />;
      default:
        break;
    }
  };

  const handleLessonTitle = (type: any) => {
    switch (type) {
      case 'presentation':
        return isIKM ? 'PPT' : 'Video Presentasi';
      case 'video':
        return isIKM ? 'Animasi' : 'Video Animasi';
      case 1:
        return isIKM ? 'PPT' : 'Video Presentasi';
      case 2:
        return isIKM ? 'PPT' : 'Video Presentasi';
      case 3:
        return isIKM ? 'Animasi' : 'Video Animasi';
      case 4:
        return 'E-book';
      case 'ebook':
        return 'E-book';
      default:
        break;
    }
  };
  const handleActionByChapterTypePractice = (_chapterData: any) => {
    openInstruction(_chapterData);
  };

  const isShowCheckIcon: any = (_contentData: IMaterialContentData) => {
    if (_contentData?.name !== 'Bermain & Belajar') {
      return _contentData?.user_progress?.[0]?.is_done;
    }
    return _contentData?.user_progress?.length === listItems?.length;
  };

  const renderScreen = contentData?.map(
    (_contentData: IMaterialContentData, index: number) => {
      switch (category) {
        case SubjectType.KPRegular.Learn:
          if (
            _contentData?.type !== 'concept' &&
            _contentData?.chapter_material
          ) {
            let renderCard: any = _contentData?.chapter_material?.map(
              (_chapterMaterialData: IChapterMaterialData) => {
                return (
                  <View
                    key={
                      _chapterMaterialData?.chapter_id *
                      _chapterMaterialData?.id *
                      Math.random()
                    }>
                    <View style={styles.separatorContainer}>
                      <View style={styles.separatorLineContainer}>
                        <View style={styles.separatorLine} />
                      </View>
                      <View style={styles.separatorPadding} />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        handleActionByChapterTypeLesson(
                          _contentData?.type,
                          _contentData,
                          _chapterMaterialData,
                        )
                      }
                      style={styles.lessonPresentastionContainer}>
                      <View style={styles.lessonProgressContainer}>
                        <ProgressCircle
                          progress={_chapterMaterialData?.is_done ? 99.9 : 0.5}
                          size={65}
                          strokeWidth={3}
                          color={Colors.primary.base}
                          children={handleChapterIcon(_contentData?.type)}
                        />
                        {_chapterMaterialData?.is_done && (
                          <View style={styles.kpRegularCheckListIcon}>
                            <DoneCheckListIcon />
                          </View>
                        )}
                      </View>
                      <View style={styles.lessonTitleContainer}>
                        <Text
                          allowFontScaling={false}
                          style={styles.lessonTitle}>
                          {`${handleLessonTitle(_contentData?.type)} ${
                            _chapterMaterialData?.duration_formatted
                              ? ` | ${_chapterMaterialData?.duration_formatted} `
                              : ''
                          }`}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          numberOfLines={2}
                          style={styles.lessonTitle2}>
                          {_chapterMaterialData?.title}
                        </Text>
                      </View>
                      <View style={styles.lessonArrowContainer}>
                        <BlueArrowIcon height={14} width={8} />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              },
            );

            if (_contentData?.type === 'presentation') {
              renderCard = (
                <CoachmarkLib
                  key={`Presentation${index}`}
                  ref={ref => (Coachmarks[queuePresentation - 1] = ref)}
                  onNext={() =>
                    _handlerCoachmark && _handlerCoachmark(queuePresentation)
                  }
                  onShow={() => scrollView?.current?.stop()}
                  onSkip={doneCoachMark}
                  buttonOnContent
                  queue={queuePresentation}
                  arrowMiddle
                  totalCoachmark={totalCoachmark}
                  buttonSkipText={'Lewati'}
                  // childrenStyle={styles.borderCard}
                  title={'Video Presentasi'}
                  message={
                    'Pelajari berbagai mata pelajaran dengan materi berbasis video presentasi.'
                  }>
                  <View style={{backgroundColor: Colors.white}}>
                    {renderCard}
                  </View>
                </CoachmarkLib>
              );
            } else if (_contentData?.type === 'video') {
              renderCard = (
                <CoachmarkLib
                  key={`Video${index}`}
                  ref={ref => (Coachmarks[queueAnimation - 1] = ref)}
                  onNext={() =>
                    _handlerCoachmark && _handlerCoachmark(queueAnimation)
                  }
                  onShow={() => scrollView?.current?.stop()}
                  onSkip={doneCoachMark}
                  buttonOnContent
                  queue={queueAnimation}
                  arrowMiddle
                  totalCoachmark={totalCoachmark}
                  buttonSkipText={'Lewati'}
                  // childrenStyle={styles.borderCard}
                  title={'Video Animasi'}
                  message={
                    'Belajar lebih mudah dengan materi pelajaran berbasis video animasi.'
                  }>
                  <View style={{backgroundColor: Colors.white}}>
                    {renderCard}
                  </View>
                </CoachmarkLib>
              );
            } else if (_contentData?.type === 'ebook') {
              renderCard = (
                <CoachmarkLib
                  key={`Ebook${index}`}
                  ref={ref => (Coachmarks[queueEbook - 1] = ref)}
                  onNext={() =>
                    _handlerCoachmark && _handlerCoachmark(queueEbook)
                  }
                  onShow={() => scrollView?.current?.stop()}
                  onSkip={doneCoachMark}
                  buttonOnContent
                  queue={queueEbook}
                  arrowMiddle
                  totalCoachmark={totalCoachmark}
                  buttonSkipText={'Lewati'}
                  // childrenStyle={styles.borderCard}
                  title={'E-book'}
                  message={
                    'Akses materi pelajaran berbasis teks dengan buku pelajaran elektronik.'
                  }>
                  <View style={{backgroundColor: Colors.white}}>
                    {renderCard}
                  </View>
                </CoachmarkLib>
              );
            }

            return renderCard;
          }
          break;
        case SubjectType.LMS.MateriSekolah:
          return (
            <View key={`LMSMateriPelajaran${_contentData?.id}${Math.random()}`}>
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLineContainer}>
                  <View style={styles.separatorLine} />
                </View>
                <View style={styles.separatorPadding} />
              </View>
              <TouchableOpacity
                onPress={() =>
                  handleActionByChapterTypeLesson(
                    `Content ${_contentData?.learning_method_id}`,
                    _contentData,
                    _contentData,
                  )
                }
                style={styles.lessonPresentastionContainer}>
                <View style={styles.lessonProgressContainer}>
                  <ProgressCircle
                    progress={_contentData?.is_done ? 99.9 : 10}
                    size={65}
                    strokeWidth={3}
                    color={Colors.primary.base}
                    children={handleChapterIcon(
                      _contentData?.learning_method_id,
                    )}
                  />
                  {_contentData?.is_done && (
                    <View style={styles.kpRegularCheckListIcon}>
                      <DoneCheckListIcon />
                    </View>
                  )}
                </View>
                <View style={styles.lessonTitleContainer}>
                  <Text allowFontScaling={false} style={styles.lessonTitle}>
                    {_contentData?.learning_method?.name}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={2}
                    style={styles.lessonTitle2}>
                    {_contentData?.title}
                  </Text>
                </View>
                <View
                  style={[
                    styles.lessonArrowContainer,
                    {justifyContent: 'flex-end', flex: 0.05},
                  ]}>
                  {_contentData?.learning_method_id == '3' && (
                    <Icon_green_download width={24} />
                  )}
                </View>
                <View style={styles.lessonArrowContainer}>
                  <BlueArrowIcon height={14} width={8} />
                </View>
              </TouchableOpacity>
            </View>
          );
        case SubjectType.KPRegular.Practice:
          return (
            <View key={`${_contentData?.id}${Math.random()}`}>
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLineContainer}>
                  <View style={styles.separatorLine} />
                </View>
                <View style={styles.separatorPadding} />
              </View>
              <Pressable
                onPress={() => {
                  _contentData?.name === 'Bermain & Belajar'
                    ? setIsCollapse(!isCollapse)
                    : handleActionByChapterTypePractice(_contentData);
                }}
                style={styles.lessonPresentastionContainer}>
                <View style={styles.lessonProgressContainer}>
                  <ProgressCircle
                    progress={
                      _contentData?.user_progress?.[0]?.is_done ? 99.9 : 10
                    }
                    size={65}
                    strokeWidth={3}
                    color={Colors.primary.base}
                    children={handleChapterIcon(_contentData?.name)}
                  />
                  {isShowCheckIcon(_contentData) && (
                    <View style={styles.kpRegularCheckListIcon}>
                      <DoneCheckListIcon />
                    </View>
                  )}
                </View>
                <View style={styles.lessonTitleContainer}>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={2}
                    style={styles.lessonTitle2}>
                    {_contentData?.name}
                  </Text>
                </View>
                <View
                  style={[
                    styles.lessonArrowContainer,
                    _contentData?.name === 'Bermain & Belajar' &&
                      isCollapse && {transform: [{rotate: '90deg'}]},
                  ]}>
                  <BlueArrowIcon height={14} width={8} />
                </View>
              </Pressable>
              {_contentData?.name === 'Bermain & Belajar' && isCollapse && (
                <View style={styles.gamesContentContainer}>
                  <View style={styles.gamesLineContainer}>
                    <View
                      style={[
                        styles.separatorLineContainer,
                        styles.gamesLineInnerContainer,
                      ]}>
                      <View style={styles.separatorLine} />
                    </View>
                  </View>
                  <View style={styles.gameSublistItemContainer}>
                    <View style={[styles.card, styles.shadowProp]}>
                      {_contentData?.service_content?.map(
                        (item: any, index: number) => {
                          const tempItem: any = (listItems as [])?.find(
                            (i: any) => i?.id === item?.id,
                          );

                          return (
                            <TouchableOpacity
                              style={styles.box}
                              key={index}
                              onPress={() => {
                                setShow({
                                  ...show,
                                  status: true,
                                  data: tempItem,
                                });
                              }}>
                              <Image
                                source={tempItem?.image}
                                style={styles.image}
                              />

                              <Text
                                allowFontScaling={false}
                                style={[styles.title, styles.gamesTitle2]}>
                                {item?.name}
                              </Text>

                              {_contentData?.service_content?.[index]
                                ?.user_progress?.is_done && (
                                <CheckIcon style={styles.checkItem} />
                              )}

                              <GreyArrow width={4} height={8} />
                            </TouchableOpacity>
                          );
                        },
                      )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        case SubjectType.KPRegular.Test:
          return (
            <View key={`${_contentData?.id}${Math.random()}`}>
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLineContainer}>
                  <View style={styles.separatorLine} />
                </View>
                <View style={styles.separatorPadding} />
              </View>
              <Pressable
                onPress={() => {
                  !_contentData?.level
                    ? handleActionByChapterTypePractice(_contentData)
                    : setIsCollapse(!isCollapse);
                }}
                style={styles.lessonPresentastionContainer}>
                <View style={styles.lessonProgressContainer}>
                  <ProgressCircle
                    progress={_contentData?.user_history?.[0]?.percentage ?? 10}
                    size={65}
                    strokeWidth={3}
                    color={Colors.primary.base}
                    children={handleChapterIcon(_contentData?.name)}
                  />
                  {_contentData?.user_history?.[0]?.percentage === 100 && (
                    <View style={styles.kpRegularCheckListIcon}>
                      <DoneCheckListIcon />
                    </View>
                  )}
                </View>
                <View style={styles.lessonTitleContainer}>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={2}
                    style={styles.lessonTitle2}>
                    {_contentData?.name}
                  </Text>
                </View>
                <View
                  style={[
                    styles.lessonArrowContainer,
                    _contentData?.name === 'Soal Pilihan Ganda' &&
                      isCollapse && {transform: [{rotate: '90deg'}]},
                  ]}>
                  <BlueArrowIcon height={14} width={8} />
                </View>
              </Pressable>
              {_contentData?.name === 'Soal Pilihan Ganda' && isCollapse && (
                <View style={styles.soalContentContainer}>
                  <View style={styles.gamesLineContainer}>
                    <View
                      style={[
                        styles.separatorLineContainer,
                        styles.gamesLineInnerContainer,
                      ]}>
                      <View style={styles.separatorLine} />
                    </View>
                  </View>
                  <View style={styles.soalSublistItemContainer}>
                    <View style={[styles.card2, styles.shadowProp]}>
                      {_contentData?.level?.map((item: any, index: any) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              item?.unlocked
                                ? handleActionByChapterTypeTest(
                                    index,
                                    item,
                                    _contentData,
                                  )
                                : null;
                            }}>
                            <View style={styles.box2}>
                              {/* <Image source={item.image} style={styles.image} /> */}
                              <View style={styles.flex1}>
                                {item?.unlocked ? (
                                  <>
                                    <Text
                                      allowFontScaling={false}
                                      style={[styles.title, styles.soalTitle2]}>
                                      {item?.name || ''}
                                    </Text>
                                    {item?.user_history?.[0]?.point ? (
                                      <Text
                                        allowFontScaling={false}
                                        style={[
                                          styles.title2,
                                          styles.soalTitle2,
                                        ]}>
                                        {`Nilai: ${
                                          item?.user_history?.[0]?.point ?? 0
                                        }`}
                                      </Text>
                                    ) : null}
                                  </>
                                ) : (
                                  <Text
                                    allowFontScaling={false}
                                    style={[styles.title2, styles.soalTitle2]}>
                                    {item?.name || ''}
                                  </Text>
                                )}
                              </View>
                              {item?.unlocked ? (
                                <View style={styles.rowCenter}>
                                  {item?.user_history?.[0]?.point >= 70 ? (
                                    <GreenChecklistIcon />
                                  ) : null}
                                  <View style={styles.greyArrowContainer}>
                                    <GreyArrow width={4} height={8} />
                                  </View>
                                </View>
                              ) : (
                                <View style={styles.mr5p}>
                                  <LockIcon width={15} height={15} />
                                </View>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        case SubjectType.SOAL.UlanganHarianPractice ||
          SubjectType.SOAL.UlanganHarianTest:
          return (
            <View key={`${_contentData?.id}${Math.random()}`}>
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLineContainer}>
                  <View style={styles.separatorLine} />
                </View>
                <View style={styles.separatorPadding} />
              </View>
              <TouchableOpacity
                onPress={() => handleActionByChapterTypePractice(_contentData)}
                style={styles.lessonPresentastionContainer}>
                <View style={styles.lessonProgressContainer}>
                  <ProgressCircle
                    progress={_contentData?.user_history ? 99.9 : 0}
                    size={65}
                    strokeWidth={2}
                    color={Colors.primary.base}
                    children={handleChapterIcon('presentation')}
                  />
                  {_contentData?.user_history && (
                    <View style={styles.checkListIcon}>
                      <ChecklistIcon />
                    </View>
                  )}
                </View>
                <View style={styles.lessonTitleContainer}>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={2}
                    style={styles.lessonTitle2}>
                    {_contentData?.name}
                  </Text>
                </View>
                <View style={styles.lessonArrowContainer}>
                  <BlueArrowIcon height={14} width={8} />
                </View>
              </TouchableOpacity>
            </View>
          );
        default:
          break;
      }
    },
  );

  const renderEmptyComponent = () => {
    if (!isIKM) {
      return;
    }
    return (
      <MainView alignItems="center" paddingVertical={50}>
        <RobotEmpty />
        <MainText
          type="Bold"
          fontSize={16}
          lineHeight={20}
          color={Colors.dark.neutral100}
          paddingBottom={6}
          paddingTop={12}>
          Konten akan segera tersedia
        </MainText>
        <MainText
          textAlign="center"
          color={Colors.dark.neutral50}
          paddingBottom={20}>
          {'Sambil menunggu, yuk jelajahi konten\nmenarik lainnya!'}
        </MainText>

        <Button
          label="Kembali ke Beranda"
          padding={16}
          action={() => {
            if (userRole?.role === 'MURID') {
              navigateScreen('BottomTabNavigator');
            } else {
              navigateScreen('BottomTabNavigatorGuru');
            }
          }}
        />
      </MainView>
    );
  };

  return (
    <>
      {contentData?.length > 0 ? renderScreen : renderEmptyComponent()}
      <SwipeUp
        height={400}
        visible={show.status}
        onClose={() => setShow({...show, status: false, data: ''})}
        children={<HowToPlayGame data={show?.data} chapterId={chapterId} />}
      />
    </>
  );
};
