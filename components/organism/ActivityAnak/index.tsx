import {StyleSheet, View, Text, Pressable} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import useActivityAnak from './useActivityAnak';
import {convertDateTime} from '@constants/functional';
import {EmptyCard} from '@components/atoms';
import IconActivities from '@assets/svg/ic24_activitas.svg';

const ActivityAnak = ({token, user}: {token: string; user?: any}) => {
  const {activities, onPress} = useActivityAnak(token, user);

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconActivities width={24} height={24} style={{marginRight: 8}} />
          <Text style={styles.title}>Aktivitas Terakhir</Text>
        </View>

        <Pressable onPress={() => onPress()}>
          <Text style={styles.next}>Lihat semua</Text>
        </Pressable>
      </View>

      {activities === null || activities?.length === 0 ? (
        <View style={[{flex: 1, marginVertical: 16}]}>
          <EmptyCard
            image={require('@assets/images/robot_empty_announcement.png')}
            title={'Belum ada aktivitas'}
          />
        </View>
      ) : (
        <View style={{marginTop: 8}}>
          <View>
            <Text style={styles.titleClass}>
              {activities?.[0]?.description}
            </Text>
          </View>
          <View style={styles.flexDirection}>
            <Text style={styles.time}>
              {convertDateTime(activities?.[0]?.timestamp)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export {ActivityAnak};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 16,
    flex: 1,
    marginRight: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  titleClass: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
  },
  next: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    gap: 8,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
});
