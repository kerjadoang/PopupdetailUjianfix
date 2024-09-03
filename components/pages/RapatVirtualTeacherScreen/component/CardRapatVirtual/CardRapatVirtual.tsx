import React from 'react';
import {View, Text, Pressable} from 'react-native';
import People from '@assets/svg/people.svg';
import dayjs from 'dayjs';
import IconLive from '@assets/svg/ic16_live.svg';
import {Countdown, MainText, MainView} from '@components/atoms';
import {styles} from './styles';
import Colors from '@constants/colors';
import IconMore from '@assets/svg/ic24_more_blue.svg';

type Props = {
  data: any;
  action?: () => void;
  actionMore?: () => void;
};

const CardRapatVirtual = ({data, action, actionMore}: Props) => {
  const startTime = data?.time_start.substring(11, 16);
  const endTime = data?.time_end.substring(11, 16);
  const scheduled = data?.status === 'on_going' || data?.status === 'unstarted';
  const history = data?.status === 'finish' || data?.status === 'canceled';

  const renderOnGoing = () => {
    return (
      <View style={styles.onGoingContainer}>
        <View style={styles.alignCenter}>
          <IconLive width={16} height={16} />
          <Text style={styles.live}>Sedang berlangsung</Text>
        </View>
        <Pressable onPress={action} style={styles.buttonGabung}>
          <Text style={styles.textBtnGabung}>Gabung</Text>
        </Pressable>
      </View>
    );
  };

  const renderCountdown = () => {
    return (
      <Countdown
        containerStyle={styles.countdownContainer}
        endTime={data?.time_start}
        renderAfterTimeOver={renderOnGoing()}
        useLocalTime
      />
    );
  };

  const generateDateTime = () => {
    return `${dayjs(data?.time_start)
      .locale('id')
      .format('dddd, DD MMM YYYY')} • ${startTime} - ${endTime}`;
  };

  const renderTextStatus = (status: any) => {
    switch (status) {
      case 'finish':
        return 'Selesai';

      case 'canceled':
        return 'Dibatalkan';

      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      {history ? (
        <MainView
          marginLeft={16}
          marginTop={16}
          paddingHorizontal={8}
          paddingVertical={4}
          alignSelf="flex-start"
          borderRadius={20}
          backgroundColor={
            data?.status === 'finish'
              ? Colors.success.light2
              : Colors.dark.neutral10
          }>
          <MainText
            fontSize={12}
            color={
              data?.status === 'finish'
                ? Colors.success.base
                : Colors.dark.neutral80
            }>
            {renderTextStatus(data?.status)}
          </MainText>
        </MainView>
      ) : null}
      <View style={[styles.row, styles.titleContainer]}>
        <View style={styles.titleSubContainer}>
          <Text style={styles.title}>{data?.title || '-'}</Text>
        </View>
        {data?.is_creator && data?.status === 'unstarted' ? (
          <Pressable onPress={actionMore}>
            <IconMore />
          </Pressable>
        ) : null}
      </View>
      <View style={[styles.row, styles.peopleContainer]}>
        <People />
        <Text style={styles.greyText}>{data?.participant?.join(', ')}</Text>
      </View>
      <View style={styles.dateTimeLabel}>
        <Text>{generateDateTime()}</Text>
      </View>
      {scheduled ? (
        <View style={styles.horizontalDivider}>
          {data?.status === 'on_going' ? (
            renderOnGoing()
          ) : data?.status === 'unstarted' ? (
            renderCountdown()
          ) : (
            <></>
          )}
        </View>
      ) : null}
    </View>
  );
};
export {CardRapatVirtual};
