import React, {FC, useEffect} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
import {EmptyDisplay, MainText, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {fetchPerluDiperiksa} from '@redux';
import {useIsFocused} from '@react-navigation/native';
import {convertDate} from '@constants/functional';
import useAsesmenMurid from '../../useAsesmenMurid';
import {CardListItem} from '@components/pages/LMSTeacherTaskScreen/components';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import {useDuplicateTask} from '@services/lms';
import {IDataDuplicateTask} from 'type/screen';
import MaskotIconEmptyState from '@assets/svg/robot_sedih.svg';

type Props = {};

const SectionTugas: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const guruPRProjekTugasStore = useSelector(
    (store: RootState) => store.guruPRProjekTugas,
  );
  const {mutate: duplicateTask} = useDuplicateTask();
  const isFocused = useIsFocused();
  const {navigation, navigateScreen, index, setIndex} = useAsesmenMurid();

  useEffect(() => {
    if (isFocused) {
      dispatch(
        fetchPerluDiperiksa({
          search: '',
          limit: 3,
          offset: 0,
          class_id: [],
          subject_id: [],
          type: ['PR', 'Projek', 'Tugas'],
        }),
      );
    }
  }, [isFocused]);

  return (
    <MainView paddingTop={24} paddingBottom={50}>
      {/* MARK: START Header */}
      <MainView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <MainText
          type="Bold"
          fontSize={18}
          fontWeight="600"
          color={Colors.dark.neutral100}
          lineHeight={24}>
          Tugas
        </MainText>
        <TouchableOpacity
          onPress={() => navigateScreen('LMSTeacherTaskScreen')}>
          <MainText
            fontSize={14}
            fontWeight="400"
            color={Colors.primary.base}
            lineHeight={18}>
            Lihat Semua
          </MainText>
        </TouchableOpacity>
      </MainView>
      {/* MARK: END Header */}

      {/* MARK: START Carousel */}
      {guruPRProjekTugasStore?.perluDiperiksaDatas?.length >= 1 ? (
        <View>
          <Carousel
            data={guruPRProjekTugasStore.perluDiperiksaDatas}
            renderItem={({item}: any) => (
              <CardListItem
                id={item?.id}
                navigation={navigation}
                category={item?.type}
                rombelName={item?.rombel_class_school?.name}
                mapel={item?.subject?.name}
                title={item?.title}
                givenDate={convertDate(item?.time_start).format(
                  'ddd, D MMM YYYY • hh:mm',
                )}
                collectionDate={convertDate(item?.time_finish).format(
                  'ddd, D MMM YYYY • hh:mm',
                )}
                studentInfo={item?.student_info}
                type="PERLU_DIPERIKSA"
                buttonTitle="Periksa"
                buttonOnPress={() => {
                  navigation.navigate('TaskDetailTeacherScreen', {
                    id: item?.id,
                  });
                }}
                buttonOnPressDuplicate={() => {
                  duplicateTask(item?.id).then((res: IDataDuplicateTask) => {
                    navigation.navigate('LMSTeacherTaskCreateScreen', {
                      duplicateTask: res,
                      isFrom: 'TaskScreen',
                    });
                  });
                }}
              />
            )}
            itemWidth={Dimensions.get('screen').width - 32}
            sliderWidth={Dimensions.get('screen').width - 32}
            loop={true}
            vertical={false}
            useScrollView={true}
            onSnapToItem={index => setIndex(index)}
          />

          <Pagination
            containerStyle={{paddingVertical: 16}}
            dotsLength={guruPRProjekTugasStore.perluDiperiksaDatas?.length}
            activeDotIndex={index}
            dotColor={Colors.primary.base}
            dotStyle={styles.dotStyle}
            inactiveDotColor={Colors.dark.neutral40}
          />
        </View>
      ) : (
        <EmptyDisplay
          title={'Belum Ada Tugas Diperiksa'}
          desc={'Tugas yang perlu diperiksa\nakan tampil di sini.'}
          btnLabel="+ Buat Tugas"
          titleStyle={{fontSize: 16, textAlign: 'center'}}
          descStyle={{fontSize: 14}}
          btnLabelStyle={{fontSize: 16}}
          btnContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
          action={() => {
            navigateScreen('LMSTeacherTaskCreateScreen');
          }}
          imageSvg={<MaskotIconEmptyState />}
        />
      )}
      {/* MARK: END Carousel */}
    </MainView>
  );
};

export default SectionTugas;
