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
import {IRombelData, LMSTeacherClassSessionFilter} from '@services/lms/type';

const classType = ['live', 'record'];
const platformType = ['google_meet', 'zoom'];
const label = {
  google_meet: 'Google Meet',
  zoom: 'Zoom',
  live: 'Langsung',
  record: 'Rekaman',
  rombel_data: 'Kelas',
  subject: 'Mata Pelajaran',
  platform: 'Platform',
  type: 'Tipe Kelas',
  service_data: 'Tipe',
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
  filter: LMSTeacherClassSessionFilter;
  rombelAndSubject: {
    rombel_data?: IRombelData[] | [];
    subject?: IBaseSubject[] | [];
    service_data?: IBaseService[] | [];
    chapter?: IBaseChapter[] | [];
  };
  onChangeFilter: (
    data: IRombelData | IBaseSubject | IBaseChapter | string,
  ) => void;
  onRemoveFilter: () => void;
  onSubmitFilter: () => void;
  onSelectAll: () => void;
} & SwipeUpProps;

const FilterSwipeUp: React.FC<FilterSwipeUpProps> = props => {
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const isPlatformAndClassType =
    props.type === 'platform' || props.type === 'type';
  const data = () => {
    switch (props.type) {
      case 'rombel_data':
        return seeAll
          ? props.rombelAndSubject.rombel_data
          : props.rombelAndSubject.rombel_data?.slice(0, 5);
      case 'subject':
        return seeAll
          ? props.rombelAndSubject.subject
          : props.rombelAndSubject.subject?.slice(0, 5);
      case 'service_data':
        return seeAll
          ? props.rombelAndSubject.service_data
          : props.rombelAndSubject.service_data &&
              props.rombelAndSubject.service_data.slice(0, 5);
      case 'type':
        return seeAll ? classType : classType.slice(0, 5);
      case 'platform':
        return seeAll ? platformType : platformType.slice(0, 5);
      case 'chapter':
        return seeAll
          ? props.rombelAndSubject.chapter
          : props.rombelAndSubject.chapter?.slice(0, 5);

      default:
        return [];
    }
  };
  const renderLabel = useMemo(() => {
    switch (props.type) {
      case 'rombel_data':
        return 'rombel_class_school_name';
      case 'subject':
      case 'service_data':
        return 'name';
      case 'chapter':
        return 'name';
      default:
        return '';
    }
  }, [props.type]);

  const buttonDisabled = () => {
    switch (props.type) {
      case 'rombel_data':
        return props.filter.rombel_data.length < 1;
      case 'subject':
        return props.filter.subject.length < 1;
      case 'service_data':
        return (
          props.filter.service_data && props.filter.service_data?.length < 1
        );
      case 'platform':
        return props.filter.platform.length < 1;
      case 'type':
        return props.filter.type.length < 1;
      default:
        return false;
    }
  };

  const getColorButton = () => {
    var colors = Colors.dark.neutral50;
    if (!buttonDisabled()) {
      colors = Colors.primary.base;
    }
    return colors;
  };

  useEffect(() => {
    if (props.visible) {
      setSeeAll(false);
    }
  }, [props.visible]);

  const isSelected = (
    item: IRombelData | IBaseSubject | IBaseChapter | string,
  ) => {
    switch (props.type) {
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
      case 'service_data':
        return (
          props.filter.service_data &&
          props.filter.service_data.some(
            dataItem => dataItem.id === (item as IBaseService).id,
          )
        );
      case 'chapter':
        return (
          props.filter.chapter &&
          props.filter.chapter.some(
            dataItem => dataItem.id === (item as IBaseChapter).id,
          )
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
          {props?.type !== 'platform' && props?.type !== 'type' ? (
            <TouchableOpacity onPress={props.onSelectAll}>
              <Text style={styles.selectAllLabel}>Pilih semua</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView
          style={styles.svContainer}
          contentContainerStyle={styles.svChipsContainer}>
          {data()?.map((item, index) => {
            return (
              <FilterChips
                label={
                  isPlatformAndClassType
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
        {!isPlatformAndClassType && (
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
            action={props.onRemoveFilter}
            background={Colors.white}
            color={getColorButton()}
            borderColor={getColorButton()}
            borderWidth={1}
          />
          <Button
            style={styles.bottomButton}
            label="Terapkan"
            action={props.onSubmitFilter}
          />
        </View>
      </View>
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
  seeAllButtonContainer: {marginTop: 21},
  seeAllButton: {flexDirection: 'row', alignItems: 'center', gap: 8},
  seeAllButtonLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral60,
  },
  bottomButtonsContainer: {
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  bottomButton: {flexGrow: 1},
});

export default FilterSwipeUp;
