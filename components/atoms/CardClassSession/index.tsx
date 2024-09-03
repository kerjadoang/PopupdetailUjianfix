/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import ProfileMentor from '@assets/svg/guru_1.svg';
import LiveIcon from '@assets/svg/ic16_live.svg';
import PlayBtn from '@assets/svg/ic_play_btn_blue.svg';
import {Countdown} from '../Countdown';

type Props = {
  onRecord?: () => void;
  onJoin?: () => void;
  onDownload?: () => void;
  isLive?: boolean;
  isOnGoing?: boolean;
  downloadable?: boolean;
  title: string;
  subtitle: string;
  time: any;
  img?: any;
  mentor: string;
  keys: number;
  typeVideo?: string;
  bodyWidth?: any;
  endTime?: any;
  button?: boolean;
};

const windowWidth = Dimensions.get('window').width;

const CardClassSession = ({
  title,
  subtitle,
  time,
  isLive,
  downloadable = false,
  isOnGoing = false,
  img,
  onJoin,
  onRecord,
  mentor,
  keys,
  bodyWidth,
  endTime,
  button = true,
}: Props) => {
  return (
    <Pressable onPress={() => button && onRecord?.()}>
      <View
        style={[
          styles.container,
          bodyWidth ? bodyWidth : {width: windowWidth * 0.8},
        ]}
        key={keys}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.title, {fontSize: 14}]} numberOfLines={1}>
          {subtitle}
        </Text>
        <Text style={styles.time}>{time}</Text>

        {downloadable ? (
          <View style={styles.row2}>
            <View style={styles.contentDownloadAbleContainer}>
              <View style={styles.imageContainer}>
                {img ? img : <ProfileMentor />}
              </View>
              <Text
                style={[
                  styles.time,
                  {fontSize: 14, textAlignVertical: 'center'},
                ]}>
                dengan {mentor}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              {img ? img : <ProfileMentor />}
            </View>
            <Text
              style={[
                styles.time,
                {fontSize: 14, textAlignVertical: 'center'},
              ]}>
              dengan {mentor}
            </Text>
          </View>
        )}

        <View
          style={
            downloadable
              ? {paddingTop: 0}
              : {
                  paddingTop: 20,
                }
          }>
          {isLive && button && (
            <View style={styles.afterCountdown}>
              <View style={styles.justRow}>
                <LiveIcon width={14} height={14} />
                <Text style={styles.redText}>Sedang berlangsung</Text>
              </View>
              <Pressable style={styles.btn} onPress={onJoin}>
                <Text style={styles.btnLabel}>Gabung</Text>
              </Pressable>
            </View>
          )}

          {isOnGoing && button && (
            <>
              <Countdown
                endTime={endTime}
                renderAfterTimeOver={
                  <View style={styles.afterCountdown}>
                    <View style={styles.justRow}>
                      <LiveIcon width={14} height={14} />
                      <Text style={styles.redText}>Sedang berlangsung</Text>
                    </View>
                    <Pressable style={styles.btn} onPress={onJoin}>
                      <Text style={styles.btnLabel}>Gabung</Text>
                    </Pressable>
                  </View>
                }
              />
            </>
          )}

          {downloadable && (
            <>
              <View style={{flexDirection: 'row'}}>
                <PlayBtn width={19.2} height={19.2} />
                <Text
                  style={[
                    styles.redText,
                    {color: Colors.dark.neutral80, fontSize: 14},
                  ]}>
                  Tonton rekaman sesi kelas
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    margin: 6,
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.black,
  },
  time: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    color: Colors.black,
  },
  contentDownloadAbleContainer: {
    flexDirection: 'row',
    width: '60%',
  },
  contentContainer: {
    flexDirection: 'row',
    paddingBottom: 16,
    borderBottomColor: Colors.dark.neutral20,
    flexWrap: 'wrap',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 16,
    borderBottomColor: Colors.dark.neutral20,
    borderBottomWidth: 1,
  },
  row2: {
    flexDirection: 'row',
    paddingBottom: 16,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  justRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  redText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    color: Colors.danger.base,
    marginLeft: 10,
  },
  btn: {
    backgroundColor: Colors.primary.base,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  btnLabel: {
    color: Colors.white,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
  },
  typevideo: {
    backgroundColor: Colors.primary.light2,
    fontSize: 12,
    fontFamily: Fonts.RegularPoppins,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: Colors.primary.base,
  },
  afterCountdown: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export {CardClassSession};
