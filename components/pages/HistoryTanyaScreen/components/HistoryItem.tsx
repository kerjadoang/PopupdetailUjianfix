import Colors from '@constants/colors';
import {hostEndsWith} from '@constants/functional';
import {IMAGES} from '@constants/image';
import {IHistoryTanyaResponseData} from '@redux';
import dayjs from 'dayjs';
import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  PressableProps,
} from 'react-native';

type HistoryItemProps = {
  data?: IHistoryTanyaResponseData;
  onPress?: PressableProps['onPress'];
};

const HistoryItem: React.FC<HistoryItemProps> = props => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View style={styles.contentContainer}>
        <View style={styles.heroImgContainer}>
          <Image
            source={hostEndsWith(props.data?.path_url ?? '')}
            defaultSource={IMAGES.imgPlaceHolder}
            style={styles.heroImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailContentContainer}>
          <Text style={styles.subjectLabel}>
            {props.data?.Subject?.class?.name} {'\u2022'}{' '}
            {props.data?.Subject?.name}
          </Text>
          <Text style={styles.chapterLabel}>{props.data?.Chapter?.name}</Text>
          <View style={styles.dateContentContainer}>
            <Text style={styles.dateLabel}>
              {props.data?.CreatedAt
                ? `${dayjs(props.data.CreatedAt).format(
                    'D MMM YYYY',
                  )} \u2022 ${dayjs(props.data.CreatedAt).format('HH.mm')}`
                : ''}
            </Text>
          </View>
        </View>
        {!props.data?.is_read && (
          <View style={styles.unreadBadgeContainer}>
            <Text style={styles.unreadLabel}>Baru</Text>
          </View>
        )}
      </View>
      {props.data?.note && (
        <Text style={styles.noteLabel}>{props.data?.note}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  contentContainer: {flexDirection: 'row', alignItems: 'center', gap: 12},
  heroImgContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 70,
    height: 70,
  },
  heroImg: {width: 70, height: 70},
  detailContentContainer: {gap: 3, flexGrow: 1, flex: 1},
  subjectLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark.neutral60,
  },
  chapterLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  dateContentContainer: {flexDirection: 'row', alignItems: 'center'},
  dateLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark.neutral60,
  },
  unreadBadgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: Colors.secondary.base,
  },
  unreadLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.primary.base,
  },
  noteLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginTop: 12,
    fontSize: 12,
  },
});

export default HistoryItem;
