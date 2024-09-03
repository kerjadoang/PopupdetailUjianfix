import {Button, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ScrollView,
} from 'react-native';
import ChevronUpIcon from '@assets/svg/ic24_chevron_up_grey.svg';
import ChevronDownIcon from '@assets/svg/ic16_chevron_down.svg';
import IconCalendar from '@assets/svg/ic_calendar.svg';
import {IRombelData, LMSTeacherClassSessionFilter} from '@services/lms/type';

const dateType = ['today', 'lastSevenDays', 'lastThirtyDays', 'chooseDate'];
const classType = ['live', 'record'];
const platformType = ['google_meet', 'zoom'];
const label = {
  today: 'Hari ini',
  lastSevenDays: '7 Hari Terakhir',
  lastThirtyDays: '30 Hari Terakhir',
  chooseDate: 'Pilih Tanggal',
  google_meet: 'Google Meet',
  zoom: 'Zoom',
  live: 'Langsung',
  record: 'Rekaman',
  rombel_data: 'Kelas',
  subject: 'Mata Pelajaran',
  platform: 'Platform',
  type: 'Tipe Kelas',
  date: 'Tanggal',
};

type FilterChipsProps = {
  label: string;
  onPress?: TouchableOpacityProps['onPress'];
  selected?: boolean;
};

const FilterChips: React.FC<FilterChipsProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          filterChipsStyle.container,
          props.selected && filterChipsStyle.containerActive,
        ]}>
        <Text
          style={[
            filterChipsStyle.label,
            props.selected && filterChipsStyle.labelActive,
          ]}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const filterChipsStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
  },
  containerActive: {backgroundColor: Colors.primary.base},
  label: {fontFamily: 'Poppins-Regular', color: Colors.primary.base},
  labelActive: {color: Colors.white},
});

type FilterSwipeUpProps = {
  type: keyof LMSTeacherClassSessionFilter | '';
  isChooseDate: boolean;
  filter: LMSTeacherClassSessionFilter;
  rombelAndSubject: {
    rombel_data: IRombelData[] | [];
    subject: IBaseSubject[] | [];
  };
  onChangeFilter: (data: IRombelData | IBaseSubject | string) => void;
  onRemoveFilter: () => void;
  onSubmitFilter: () => void;
  onSelectAll: () => void;
  isShowSwipeUpDate: boolean;
  swipeUpDateChildren: any;
  onCloseSwipeUpDate: () => void;
  onPressChooseStartDate: () => void;
  onPressChooseEndDate: () => void;
  datePickerUntil: string;
  datePickerFrom: string;
} & SwipeUpProps;

const FilterSwipeUp: React.FC<FilterSwipeUpProps> = props => {
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const isPlatformAndClassAndDateType =
    props.type === 'platform' || props.type === 'type' || props.type === 'date';
  const data = () => {
    switch (props.type) {
      case 'date':
        return seeAll ? dateType : dateType.slice(0, 5);
      case 'rombel_data':
        return seeAll
          ? props.rombelAndSubject.rombel_data
          : props.rombelAndSubject.rombel_data.slice(0, 5);
      case 'subject':
        return seeAll
          ? props.rombelAndSubject.subject
          : props.rombelAndSubject.subject.slice(0, 5);
      case 'type':
        return seeAll ? classType : classType.slice(0, 5);
      case 'platform':
        return seeAll ? platformType : platformType.slice(0, 5);

      default:
        return [];
    }
  };
  const renderLabel = useMemo(() => {
    switch (props.type) {
      case 'rombel_data':
        return 'rombel_class_school_name';
      case 'subject':
        return 'name';
      default:
        return '';
    }
  }, [props.type]);

  const buttonDisabled = () => {
    switch (props.type) {
      case 'date':
        return props.filter.date.length < 1;
      case 'rombel_data':
        return props.filter.rombel_data.length < 1;
      case 'subject':
        return props.filter.subject.length < 1;
      case 'platform':
        return props.filter.platform.length < 1;
      case 'type':
        return props.filter.type.length < 1;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (props.visible) {
      setSeeAll(false);
    }
  }, [props.visible]);

  const isSelected = (item: IRombelData | IBaseSubject | string) => {
    switch (props.type) {
      case 'date':
        return props.filter.date.includes(item as never);
      case 'rombel_data':
        return props.filter.rombel_data.some(
          dataItem =>
            dataItem.rombel_class_school_id ===
            (item as IRombelData).rombel_class_school_id,
        );
      case 'subject':
        return props.filter.subject.some(
          dataItem => dataItem.id === (item as IBaseSubject).id,
        );
      case 'platform':
        return props.filter.platform.includes(item as never);
      case 'type':
        return props.filter.type.includes(item as never);
      default:
        return false;
    }
  };

  return (
    <SwipeUp {...props} onClose={props.onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Filter</Text>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label[props.type as keyof typeof label]}
          </Text>
          {props?.type !== 'date' ? (
            <TouchableOpacity onPress={props.onSelectAll}>
              <Text style={styles.selectAllLabel}>Pilih semua</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView
          style={styles.svContainer}
          contentContainerStyle={styles.svChipsContainer}>
          {data().map((item, index) => {
            return (
              <FilterChips
                label={
                  isPlatformAndClassAndDateType
                    ? label[item as keyof typeof label]
                    : item[renderLabel as never]
                }
                key={index}
                selected={isSelected(item)}
                onPress={() => props.onChangeFilter(item)}
              />
            );
          })}
        </ScrollView>
        {props.isChooseDate ? (
          <View style={styles.swipeUpDateWrapperField}>
            <View style={styles.swipeUpDateContainer}>
              <View style={styles.swipeUpdateLeftField}>
                <Text style={styles.swipeUpDateTitle}>{'Dari'}</Text>
                <TouchableOpacity
                  onPress={props.onPressChooseStartDate}
                  style={styles.swipeUpDateButton}>
                  <Text style={styles.swipeUpDateLabelButton}>
                    {props.datePickerFrom}
                  </Text>

                  <IconCalendar width={24} height={24} />
                </TouchableOpacity>
              </View>

              <View style={styles.swipeUpdateLeftField}>
                <Text style={styles.swipeUpDateTitle}>{'Sampai'}</Text>
                <TouchableOpacity
                  onPress={props.onPressChooseEndDate}
                  style={styles.swipeUpDateButton}>
                  <Text style={styles.swipeUpDateLabelButton}>
                    {props.datePickerUntil}
                  </Text>

                  <IconCalendar width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
        {!isPlatformAndClassAndDateType && (
          <TouchableOpacity
            onPress={() => setSeeAll(!seeAll)}
            style={styles.seeAllButtonContainer}>
            <View style={styles.seeAllButton}>
              <Text style={styles.seeAllButtonLabel}>
                Tampilkan {seeAll ? 'sedikit' : 'lebih banyak'}
              </Text>
              {seeAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.bottomButtonsContainer}>
          <Button
            style={styles.bottomButton}
            label="Atur Ulang"
            customDisabled={buttonDisabled()}
            isDisabled={buttonDisabled()}
            action={props.onRemoveFilter}
          />
          <Button
            style={styles.bottomButton}
            label="Terapkan"
            action={props.onSubmitFilter}
          />
        </View>
      </View>

      <SwipeUp
        height={100}
        visible={props.isShowSwipeUpDate}
        onClose={props.onCloseSwipeUpDate}
        children={props.swipeUpDateChildren}
      />
    </SwipeUp>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral60,
    fontSize: 14,
  },
  selectAllLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.primary.base,
  },
  svContainer: {maxHeight: 300},
  svChipsContainer: {
    flexDirection: 'row',
    rowGap: 16,
    columnGap: 8,
    flexWrap: 'wrap',
  },
  seeAllButtonContainer: {marginVertical: 21},
  seeAllButton: {flexDirection: 'row', alignItems: 'center', gap: 8},
  seeAllButtonLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral60,
  },
  bottomButtonsContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  bottomButton: {flexGrow: 1},
  swipeUpDateWrapperField: {
    marginTop: 12,
    height: 85,
  },
  swipeUpDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swipeUpdateLeftField: {
    flex: 1,
    marginRight: 8,
  },
  swipeUpdateRightField: {
    flex: 1,
  },
  swipeUpDateTitle: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  swipeUpDateButton: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: Colors.dark.neutral10,
    borderRadius: 30,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  swipeUpDateLabelButton: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FilterSwipeUp;
