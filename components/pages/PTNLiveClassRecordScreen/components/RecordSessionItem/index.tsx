import {ProgressCircle} from '@components/atoms';
import Colors from '@constants/colors';
import React, {FC} from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import IconCheck from '@assets/svg/ic_play_btn_light.svg';
import IconCheckBlue from '@assets/svg/ic_play_btn_blue.svg';
import IcChecklist from '@assets/svg/ic_checklist_white.svg';
import {IResponsePTNRecordSession} from '../../type';
import {parseDateTime} from '@components/pages/PTNLiveClassHomeScreen/utils';
import RenderImage from '@components/atoms/RenderImage';
import {generalStyles} from '@constants/styles';

type Props = {
  item: IResponsePTNRecordSession;
  onPress: () => void;
  keys: any;
};

const RecordSessionItem: FC<Props> = ({item, onPress, keys}) => {
  const isDone = item.academi_show_recording_class_session?.length !== 0;
  const renderPlayButton = isDone ? (
    <IconCheckBlue width={52} height={52} />
  ) : (
    <IconCheck width={52} height={52} />
  );
  return (
    <Pressable
      key={keys}
      style={[styles.card, styles.shadowProp]}
      onPress={onPress}>
      <View style={styles.row}>
        <Text style={[styles.textType]}>Live Class</Text>
      </View>
      <Text style={styles.textTitle}>{item.subject_ptn?.module || ''}</Text>
      <Text style={[styles.textTitle, {fontSize: 14}]}>
        {item.subject_ptn?.name || ''}
      </Text>
      <Text style={styles.textSubTitle}>
        {parseDateTime(item.time_start, item.time_finish)}
      </Text>
      <View style={styles.row}>
        <View style={styles.rowPp}>
          <View style={styles.pp}>
            <RenderImage
              imageUrl={item.user?.user_type?.icon_mobile ?? ''}
              placeholder={
                <Image
                  source={require('@assets/images/placeholder_avatar.png')}
                  style={[generalStyles.cardAvatar, {width: 32, height: 32}]}
                />
              }
              style={[generalStyles.cardAvatar, {width: 32, height: 32}]}
            />
          </View>

          <Text style={[styles.textSubTitle, {fontSize: 14}]}>
            {item.user?.full_name}
          </Text>
        </View>

        <View>
          <View style={styles.progressCircle}>
            <ProgressCircle
              progress={isDone ? 100 : 0}
              size={56}
              strokeWidth={3}
              color={Colors.primary.base}
              children={renderPlayButton}
            />
          </View>
          {isDone && (
            <View style={styles.icChecklist}>
              <IcChecklist height={12} width={12} />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '99%',
    padding: 16,
    marginVertical: 10,
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textType: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    paddingVertical: 2,
    color: Colors.primary.base,
    fontSize: 12,
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
    fontSize: 16,
    borderRadius: 10,
  },
  textSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    borderRadius: 10,
  },
  rowPp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pp: {
    marginRight: 10,
    // backgroundColor: Colors.yellow,
    padding: 6,
    borderRadius: 22,
  },
  icChecklist: {
    top: -3,
    left: -23,
    position: 'absolute',
    backgroundColor: Colors.success.light1,
    padding: 4,
    borderRadius: 20,
  },
  progressCircle: {
    position: 'absolute',
    top: -40,
    left: -60,
  },
});

export default RecordSessionItem;
