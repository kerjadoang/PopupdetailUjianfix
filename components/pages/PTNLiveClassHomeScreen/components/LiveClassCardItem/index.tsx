import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React, {FC} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import Maskot from '@assets/svg/play_maskot.svg';

import {PTNCardClassSession} from '../PTNCardClassSession';
import {_handlerConvertAllDate} from '@constants/functional';

type Props = {
  data: any;
  emptyText: string;
  isLive?: boolean;
  onRecord?: (item: any) => void;
  onJoin?: (item: any) => void;
  onCardPress?: (item: any) => void;
};

const LiveClassCardItem: FC<Props> = ({
  data,
  emptyText,
  onRecord,
  onJoin,
  onCardPress,
}) => {
  return (
    <>
      <View>
        <FlatList
          horizontal
          data={data}
          keyExtractor={item => item?.ID?.toString()}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Maskot width={70} height={70} style={styles.maskot} />
              <Text style={styles.textEmpty}>{emptyText}</Text>
            </View>
          }
          renderItem={({item, index}) => (
            <Pressable
              key={item?.id || index}
              onPress={() => onCardPress?.(item)}>
              <PTNCardClassSession
                title={item?.subject_ptn?.name || item?.subject?.name || ''}
                keys={item?.ID || item?.id}
                subtitle={item?.description || item?.discussion}
                isLive={item?.status === 'start'}
                isOnGoing={item?.status === 'unstarted'}
                endTime={item?.time_start}
                time={_handlerConvertAllDate(item?.time_start, 9)}
                onRecord={onRecord ? () => onRecord?.(item) : undefined}
                onJoin={() => onJoin?.(item)}
                mentor={item?.user?.full_name}
              />
            </Pressable>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    padding: 16,
    borderRadius: 15,
    elevation: 8,
    flexDirection: 'row',
  },
  textEmpty: {
    color: Colors.dark.neutral80,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 15,
    width: '70%',
    // marginLeft: '5%',
    textAlignVertical: 'center',
    fontFamily: Fonts.RegularPoppins,
  },
  maskot: {marginRight: 12},
});

export default LiveClassCardItem;
