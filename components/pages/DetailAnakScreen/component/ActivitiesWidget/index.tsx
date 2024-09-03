import React from 'react';
import {Text, View, Pressable} from 'react-native';
import IconActivities from '@assets/svg/ic24_activitas.svg';
import IconHistory from '@assets/svg/ic24_history_blue.svg';
import {styles} from './style';
import useActivitiesWidget from './useActivitiesWidget';
import {EmptyCard} from '@components/atoms';
import {convertDateTime} from '@constants/functional';

const ActivitiesWidget = ({userData}) => {
  const {listActivity, onPress}: any = useActivitiesWidget(userData);

  // console.log('List Activity: ' + JSON.stringify(listActivity));
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerContainer,
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconActivities width={24} height={24} style={{marginRight: 8}} />
          <Text style={styles.groupMentorTitle}>{'Aktivitas Terakhir'}</Text>
        </View>

        <Pressable onPress={onPress}>
          <Text style={styles.next}>Lihat semua</Text>
        </Pressable>
      </View>
      <View>
        {listActivity?.data === null || listActivity?.data?.length === 0 ? (
          <View style={[{flex: 1, marginVertical: 16}]}>
            <EmptyCard
              image={require('@assets/images/robot_empty_announcement.png')}
              title={'Belum ada aktivitas'}
            />
          </View>
        ) : (
          <View style={{marginTop: 8}}>
            <View style={[styles.shadowProp, styles.card]}>
              <Text style={styles.service}>
                {listActivity?.data[0].service}
              </Text>
              <Text style={styles.description}>
                {listActivity?.data[0].description}
              </Text>
              <View style={styles.flexDirection}>
                <IconHistory />
                <Text style={styles.time}>
                  {convertDateTime(listActivity?.data[0].created_at)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export {ActivitiesWidget};
