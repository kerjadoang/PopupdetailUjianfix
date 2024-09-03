import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import Colors from '@constants/colors';
import LogoKelasPintarRegular from '@assets/svg/logo_kelas_pintar_regular.svg';
import {
  AllSubjects,
  CoachmarkLib,
  Widget,
  WidgetHorizontal,
} from '@components/atoms';
import LogoLearn from '@assets/svg/ic24_logo_learn.svg';
import LogoMediaAjar from '@assets/svg/ic_media_ajar.svg';
import Edit from '@assets/svg/ic16_edit.svg';
import Practice from '@assets/svg/ic32_practice.svg';
import AsesmenFormatif from '@assets/svg/ic_asesmen_formatif.svg';
import AsesmenSumatif from '@assets/svg/ic_asesmen_sumatif.svg';
import Test from '@assets/svg/ic32_test.svg';
import Akm from '@assets/svg/akm.svg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGetAllAkm} from '@redux';

import {StackNavigationProp} from '@react-navigation/stack';
import {SubjectType} from '@constants/subjectType';
import {generalStyles} from '@constants/styles';
import {ParamList} from 'type/screen';
import FilterChip from './components/FilterChip';
import {isStringContains} from '@constants/functional';
import {RootState} from 'src/redux/rootReducer';
import {FlatList} from 'react-native-gesture-handler';

type ISubjectsProps = {
  ref3?: any;
  scrollViewRef?: any;
  subjectData?: any;
  onSwipeUp?: any;
  onSetting?: any;
  onSwipeUpPractice?: () => void;
  onSwipeUpForbiddenAccess?: any;
  onSwipeUpTest?: any;
  Coachmarks: any[];
  doneCoachMark: () => void;
  totalCoachmark: number;
  onNextSubjects: () => void;
  _handlerCoachmark: (queue: number) => void;
  activeCuriculum: ICurriculum;
  onPressActiveCuriculum: CallBack<void>;
  activePhase: IPhaseClass;
  onPressActivePhase: CallBack<void>;
  userRole?: 'guru' | 'murid';
};

const Subjects = ({
  scrollViewRef,
  subjectData,
  onSwipeUp,
  onSetting,
  onSwipeUpForbiddenAccess,
  onSwipeUpPractice,
  onSwipeUpTest,
  Coachmarks,
  doneCoachMark,
  totalCoachmark,
  onNextSubjects,
  _handlerCoachmark,
  activeCuriculum,
  onPressActiveCuriculum,
  activePhase,
  onPressActivePhase,
  userRole = 'murid',
}: ISubjectsProps) => {
  const isIKM = isStringContains(activeCuriculum.name || '', 'merdeka');
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'GuruScreen'>>();
  const dispatch: any = useDispatch();
  const user: IBaseUser = useSelector(
    (state: RootState) => (state.getUser as any)?.data,
  );
  const isB2B = !!user?.school_id;
  const canAccessAKM: number[] = [5, 8, 11, 15, 16, 18];
  const renderSubjectFavorites = useCallback(
    ({item, index}: any) => {
      return (
        <Widget
          key={item?.id || item?._id || index}
          type={1}
          title={item?.subject?.name || item?.name}
          action={() => {
            navigation.navigate('ChapterKPRegularScreen', {
              subject_data: item?.subject,
              subject_type: SubjectType?.KPRegular?.Learn,
            });
          }}
          remove={false}
          add={false}
          imageId={item?.subject?.icon_mobile}
          svg={
            item?.subject?.icon_mobile
              ? undefined
              : item?.subject?.path_url || item?.path_url
          }
          image={'https://cdn-icons-png.flaticon.com/512/3884/3884851.png'}
          backgroundColor={'white'}
        />
      );
    },
    [navigation],
  );

  return (
    <View style={[styles.container, styles.shadowProp]}>
      {userRole === 'murid' ? (
        <View>
          {isB2B && (
            <View style={styles.rowCurriculum}>
              <FilterChip
                activeData={activeCuriculum}
                onPress={onPressActiveCuriculum}
                title={activeCuriculum?.name || 'Pilih Kurikulum'}
              />
              {isStringContains(activeCuriculum?.name || '', 'merdeka') && (
                <FilterChip
                  activeData={activePhase}
                  onPress={onPressActivePhase}
                  title={activePhase?.name || 'Fase A'}
                />
              )}
            </View>
          )}
          <View style={styles.LogoKelasPintarContainer}>
            <LogoKelasPintarRegular width={'100%'} height={48} />
          </View>
        </View>
      ) : null}
      <CoachmarkLib
        ref={ref => (Coachmarks[2] = ref)}
        onNext={() => {
          onNextSubjects();
          _handlerCoachmark(3);
        }}
        onShow={() => scrollViewRef?.current?.stop()}
        onSkip={doneCoachMark}
        buttonOnContent
        queue={3}
        arrowMiddle
        totalCoachmark={totalCoachmark}
        contentContainerStyle={generalStyles.contentFlex}
        buttonSkipText={'Lewati'}
        title={'Kelas Pintar Regular'}
        childrenStyle={styles.borderCard}
        message={
          'Learn: Pelajari materi dari berbagai mata pelajaran di Kelas Pintar. Practice: Kerjakan latihan soal dari materi yang telah dipelajari. Test: Uji pemahaman belajarmu dengan mengerjakan tes.'
        }>
        <View style={styles.subjectContainer}>
          <View style={[styles.flex, styles.justifyBetween]}>
            <View style={styles.flex}>
              {isIKM ? (
                <LogoMediaAjar width={24} height={24} />
              ) : (
                <LogoLearn width={24} height={24} />
              )}
              <Text style={styles.learn}>{isIKM ? 'Media Ajar' : 'Learn'}</Text>
            </View>
            <TouchableOpacity
              onPress={() => onSetting && onSetting()}
              style={[styles.flex, styles.align]}>
              <Edit
                width={16}
                height={16}
                color={Colors.primary.base}
                style={styles.editIcon}
              />
              <Text style={styles.setting}>Atur</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{flexDirection: 'row', alignContent: 'center'}}> */}
          {/* <AllSubjects action={() => onSwipeUp && onSwipeUp()} />
            <View style={{marginRight: 10}} /> */}
          <FlatList
            horizontal
            ListHeaderComponent={
              <AllSubjects action={() => onSwipeUp && onSwipeUp()} />
            }
            keyExtractor={(item, idx) => item?.id || idx}
            data={subjectData}
            renderItem={renderSubjectFavorites}
          />
          {/* {subjectData?.map((item: any, index: number) => {
              return (
                <View key={index}>
                  <Widget
                    key={index}
                    type={1}
                    title={item?.subject?.name || item?.name}
                    action={() => {
                      navigation.navigate('ChapterKPRegularScreen', {
                        subject_data: item?.subject,
                        subject_type: SubjectType?.KPRegular?.Learn,
                      });
                    }}
                    remove={false}
                    add={false}
                    imageId={item?.subject?.icon_mobile}
                    svg={
                      item?.subject?.icon_mobile
                        ? undefined
                        : item?.subject?.path_url || item?.path_url
                    }
                    image={
                      'https://cdn-icons-png.flaticon.com/512/3884/3884851.png'
                    }
                    backgroundColor={'white'}
                  />
                </View>
              );
            })} */}
          {/* </View> */}
          <View style={styles.col}>
            <WidgetHorizontal
              title={isIKM ? 'Asesmen Formatif' : 'Practice'}
              action={onSwipeUpPractice}
              svg={isIKM ? <AsesmenFormatif /> : <Practice />}
            />
            <WidgetHorizontal
              title={isIKM ? 'Asesmen Sumatif' : 'Test'}
              action={onSwipeUpTest}
              svg={isIKM ? <AsesmenSumatif /> : <Test />}
            />
          </View>
        </View>
      </CoachmarkLib>
      <View style={styles.widgetHorizontalContainer}>
        <WidgetHorizontal
          title="AKM"
          akm={true}
          action={async () => {
            if (canAccessAKM.includes(user?.class_id ?? 0)) {
              await dispatch(
                fetchGetAllAkm((res: any) => {
                  if (res?.status !== 401 && res?.status !== undefined) {
                    navigation.navigate('ChapterAKMScreen', {
                      subject_type: SubjectType?.AKM.AKM,
                      subject_data: {},
                    });
                  } else {
                    onSwipeUpForbiddenAccess(true);
                  }
                }),
              );
            } else {
              onSwipeUpForbiddenAccess(true);
            }
          }}
          svg={<Akm />}
        />
      </View>
    </View>
  );
};

export default Subjects;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  LogoKelasPintarContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    // marginTop: 16,
  },
  widgetHorizontalContainer: {paddingHorizontal: 16, paddingBottom: 16},
  CMContainer: {flex: 1},
  editIcon: {marginBottom: 2, marginRight: -5},
  subjectContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  borderCard: {borderRadius: 15},
  card: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    zIndex: 2,
    borderRadius: 10,
    elevation: 1,
  },
  learn: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  setting: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    color: Colors.primary.base,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  align: {
    alignItems: 'center',
  },
  col: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 5,
    marginTop: 16,
  },
  rowCurriculum: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  kurikulum: {
    gap: 4,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 8,
    flexFlow: 'column wrap',
    borderRadius: 25,
    marginTop: 16,
  },
  activeCuriculum: {color: Colors.primary.base, fontWeight: '600'},
});
