import React, {FC, useEffect} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
import {
  EmptyDisplay,
  MainText,
  MainView,
  MenuItemButtonType,
  MoreMenu,
} from '@components/atoms';
import Colors from '@constants/colors';
import {useLMSTeacherGetExamsSchedule} from '@services/lms';
import UjianCardItem from '@components/pages/UjianScreen/components/UjianCardItem';
import useAsesmenMurid from '../../useAsesmenMurid';
import {useIsFocused} from '@react-navigation/native';
import {IListScheduledAndNeedToBeCheckFilter} from '@services/lms/type';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import MaskotIconEmptyState from '@assets/svg/robot_sedih.svg';
import CopyIcon from '@assets/svg/ic24_copy_blue.svg';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {CreateJadwalUjianScreenParam} from 'type/screen';

type Props = {};

const SectionUjian: FC<Props> = ({}) => {
  const {
    navigateScreen,
    index,
    setIndex,
    examId,
    setExamId,
    showMoreMenu,
    setShowMoreMenu,
  } = useAsesmenMurid();
  const {
    mutate,
    data: listExamsData,
    isLoading,
  } = useLMSTeacherGetExamsSchedule();
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      const trasnformFilter: IListScheduledAndNeedToBeCheckFilter = {
        page: 1,
        limit: 3,
        rombel_id: [],
        subject_id: [],
        service_id: [],
        status: ['done', 'on_progress'],
        search: '',
      };
      mutate(trasnformFilter);
    }
  }, [isFocus]);

  const renderItem = (item: any) => {
    return (
      <UjianCardItem
        data={item}
        onPressCheckDetail={() =>
          navigateScreen('ExamDetailGuruScreen', {exam_id: item.id})
        }
        onPressShowMore={() => {
          setExamId(item?.id);
          setShowMoreMenu(true);
        }}
        section="perlu_diperiksa"
      />
    );
  };

  const menuData: MenuItemButtonType[] = [
    {
      icon: <CopyIcon />,
      label: 'Duplikat Jadwal Ujian',
      onPress: async () => {
        setShowMoreMenu(false);
        navigateScreen<CreateJadwalUjianScreenParam>(
          'CreateJadwalUjianScreen',
          {
            schedule_id: examId,
            isDuplicate: true,
          },
        );
      },
    },
  ];

  return (
    <MainView>
      {/* MARK: START Header */}
      <MainView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom={16}>
        <MainText
          type="Bold"
          fontSize={18}
          fontWeight="600"
          color={Colors.dark.neutral100}
          lineHeight={24}>
          Ujian
        </MainText>
        <TouchableOpacity onPress={() => navigateScreen('UjianScreen')}>
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
      {(listExamsData?.data?.length ?? 0) >= 1 ? (
        <View>
          <Carousel
            data={listExamsData?.data ?? []}
            renderItem={({item}) => renderItem(item)}
            itemWidth={Dimensions.get('screen').width - 32}
            sliderWidth={Dimensions.get('screen').width - 32}
            loop={true}
            vertical={false}
            useScrollView={true}
            onSnapToItem={index => setIndex(index)}
          />

          <Pagination
            containerStyle={{paddingVertical: 16}}
            dotsLength={listExamsData?.data?.length ?? 0}
            activeDotIndex={index}
            dotColor={Colors.primary.base}
            dotStyle={styles.dotStyle}
            inactiveDotColor={Colors.dark.neutral40}
          />
        </View>
      ) : (
        <EmptyDisplay
          title={'Belum Ada Ujian Diperiksa'}
          desc="Daftar ujian yang perlu diperiksa
        akan tampil di sini."
          btnLabel="+ Buat Ujian"
          titleStyle={{fontSize: 16, textAlign: 'center'}}
          descStyle={{fontSize: 14}}
          btnLabelStyle={{fontSize: 16}}
          btnContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
          action={() => {
            navigateScreen('CreateJadwalUjianScreen', {
              schedule_id: undefined,
            });
          }}
          imageSvg={<MaskotIconEmptyState />}
        />
      )}
      {/* MARK: END Carousel */}

      <MoreMenu
        height={100}
        visible={showMoreMenu}
        menus={menuData}
        onClose={() => setShowMoreMenu(false)}
      />

      {isLoading ? <LoadingIndicator /> : null}
    </MainView>
  );
};

export default SectionUjian;
