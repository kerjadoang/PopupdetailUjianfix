import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Button, MainText, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import IconMore from '@assets/svg/ic24_more_blue.svg';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import IconUsers from '@assets/svg/ic16_users.svg';
import {convertDate} from '@constants/functional';

type Props = {
  items: LKPDCardData;
  onPressMore: () => void;
  onPressDetail: () => void;
  isPerluDiperiksa?: boolean;
  isDijadwalkan?: boolean;
  hideButton?: boolean;
  userRole?: UserRole;
  label?: string;
};

const CardLkpd: FC<Props> = ({
  items,
  onPressMore,
  onPressDetail,
  isPerluDiperiksa,
  isDijadwalkan,
  hideButton = false,
  userRole,
  label,
}) => {
  return (
    <View style={styles.shadowItem}>
      <MainView padding={16} borderRadius={8} backgroundColor={Colors.white}>
        {/* MARK: START Header */}
        <MainView
          width={'100%'}
          flexDirection="row"
          alignSelf="flex-start"
          justifyContent="space-between">
          <MainView flexDirection="row" gap={4}>
            <View style={styles.phaseNameWrapper}>
              <MainText fontSize={12} color={Colors.primary.base}>
                {items?.class?.name}
              </MainText>
            </View>

            {userRole !== 'MURID' && (
              <View style={styles.rombelClassWrapper}>
                <MainText fontSize={12} color={Colors.orange.dark1}>
                  {items?.rombel_class_school?.name}
                </MainText>
              </View>
            )}
          </MainView>

          {userRole !== 'MURID' && (
            <TouchableOpacity onPress={onPressMore}>
              <IconMore />
            </TouchableOpacity>
          )}
        </MainView>
        {/* MARK: END Header */}

        {/* MARK: START Body */}
        <MainView
          paddingTop={12}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <MainView flex={1}>
            <MainText
              fontSize={14}
              color={Colors.dark.neutral100}
              paddingBottom={4}>
              {items?.subject?.name}
            </MainText>
            <Text numberOfLines={2} style={styles.title}>
              {items?.title}
            </Text>
          </MainView>

          {!hideButton && !isDijadwalkan ? (
            <Button
              outline
              action={onPressDetail}
              label={label ? label : isPerluDiperiksa ? 'Periksa' : 'Detail'}
              style={styles.ph12}
            />
          ) : null}
        </MainView>

        {isPerluDiperiksa ? (
          <MainView
            flexDirection="row"
            gap={6}
            alignItems="center"
            marginTop={4}>
            <IconUsers />
            <MainText fontSize={12} color={Colors.dark.neutral80}>
              {items?.student_info}
            </MainText>
          </MainView>
        ) : null}
        {/* MARK: END Body */}

        {/* MARK: START Divider */}
        <MainView
          height={2}
          backgroundColor={Colors.dark.neutral10}
          marginVertical={12}
        />
        {/* MARK: END Divider */}

        {/* MARK: START Footer */}
        <MainView flexDirection="row" flex={1} gap={6}>
          <MainView flex={1 / 2}>
            <MainText
              fontSize={12}
              color={Colors.dark.neutral60}
              paddingBottom={4}>
              Diberikan
            </MainText>
            <MainView flexDirection="row" gap={2}>
              <IconCalendar />
              <MainText
                fontSize={14}
                color={Colors.dark.neutral80}
                paddingRight={6}>
                {convertDate(items?.time_start).format(
                  'ddd, DD MMM YYYY • HH:mm',
                )}
              </MainText>
            </MainView>
          </MainView>

          <MainView flex={1 / 2}>
            <MainText
              fontSize={12}
              color={Colors.dark.neutral60}
              paddingBottom={4}>
              Batas Dikumpulkan
            </MainText>
            <MainView flexDirection="row" gap={2}>
              <IconCalendar />
              <MainText
                fontSize={14}
                color={Colors.dark.neutral80}
                paddingRight={6}>
                {convertDate(items?.time_finish).format(
                  'ddd, DD MMM YYYY • HH:mm',
                )}
              </MainText>
            </MainView>
          </MainView>
        </MainView>
        {/* MARK: END Footer */}
      </MainView>
    </View>
  );
};

export default CardLkpd;
