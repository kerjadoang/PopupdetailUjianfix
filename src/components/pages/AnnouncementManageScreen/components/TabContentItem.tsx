/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, memo, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import {CardListItem, TabContentItemNotFound} from './';
import {TAB_NAMES, useAnnouncementManageScreen} from '../utils';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  type: (typeof TAB_NAMES)[keyof typeof TAB_NAMES];
};

const TabContentItem: FC<Props> = ({type}) => {
  const {
    navigation,
    setIsLoading,
    aktifPagination,
    setAktifPagination,
    aktifs,
    dijadwalkanPagination,
    setDijadwalkanPagination,
    dijadwalkans,
    isLoadNewData,
    //
    __getAnnouncements,
    __deleteAnnouncement,
    __onEndReachedAktif,
    __onEndReachedDijadwalkan,
  } = useAnnouncementManageScreen();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (type === 'Aktif') {
      setIsLoading(true);

      __getAnnouncements({
        status: 'active',
        offset: aktifPagination.offset,
        limit: aktifPagination.limit,
      }).finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);

      __getAnnouncements({
        status: 'scheduled',
        offset: dijadwalkanPagination.offset,
        limit: dijadwalkanPagination.limit,
      }).finally(() => setIsLoading(false));
    }
  }, [isFocused, isLoadNewData, aktifPagination, dijadwalkanPagination]);

  if (type === 'Aktif') {
    return (
      <>
        {aktifs.length > 0 ? (
          <FlatList
            data={aktifs}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, id): any => id}
            onEndReached={__onEndReachedAktif}
            renderItem={({item, index}) => (
              <CardListItem
                isFirstItem={index === 0}
                data={item}
                handleCallbackData={({id}) => __deleteAnnouncement(id)}
                setPagination={setAktifPagination}
                isFrom="Aktif"
              />
            )}
          />
        ) : (
          <TabContentItemNotFound
            title="Belum Ada Pengumuman"
            description={'Pengumuman yang sedang aktif akan\ntampil di sini.'}
          />
        )}

        <View style={styles.containerBottomShadow}>
          <Button
            label={'+ Buat Pengumuman'}
            action={() =>
              navigation.navigate('AnnouncementManageCreateScreen', {})
            }
            fontSize={16}
          />
        </View>

        {/* {isLoading ? <LoadingIndicator /> : null} */}
      </>
    );
  } else {
    return (
      <>
        {dijadwalkans.length > 0 ? (
          <FlatList
            data={dijadwalkans}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, id): any => id}
            onEndReached={__onEndReachedDijadwalkan}
            renderItem={({item, index}) => (
              <CardListItem
                isFirstItem={index === 0}
                data={item}
                handleCallbackData={({id}) => __deleteAnnouncement(id)}
                setPagination={setDijadwalkanPagination}
                isFrom="Dijadwalkan"
              />
            )}
          />
        ) : (
          <TabContentItemNotFound
            title="Belum Ada Pengumuman"
            description={
              'Pengumuman yang telah dijadwalkan akan\ntampil di sini.'
            }
          />
        )}

        <View style={styles.containerBottomShadow}>
          <Button
            label={'+ Buat Pengumuman'}
            action={() =>
              navigation.navigate('AnnouncementManageCreateScreen', {})
            }
            fontSize={16}
          />
        </View>

        {/* {isLoading ? <LoadingIndicator /> : null} */}
      </>
    );
  }
};

const styles = StyleSheet.create({
  containerBottomShadow: {
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: Colors.dark.neutral40,
  },
});

export default memo(TabContentItem);
