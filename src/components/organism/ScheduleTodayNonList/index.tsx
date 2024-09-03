import {StyleSheet, View, Text, Pressable} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import IconBook from '@assets/svg/ic16_book.svg';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import IconLive from '@assets/svg/ic16_live.svg';

const data = [
  {
    tags: 'Sesi Kelas',
    class: 'Kelas 8-C',
    title: 'Matematika',
    time: 'Hari ini • 09:00 - 11:30',
    live: true,
  },
  {
    tags: 'Sesi Kelas',
    class: 'Kelas 8-C',
    title: 'Matematika IPA',
    time: 'Hari ini • 09:00 - 11:30',
    live: true,
  },
  {
    tags: 'Rapat Virtual',
    class: '',
    title: 'Sosialisasi Penggunaan Google Classroom',
    time: 'Hari ini • 09:00 - 11:30',
    live: true,
  },
];
const ScheduleTodayNonList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jadwal Hari Ini</Text>
      <View style={[styles.card, styles.shadowProp]}>
        {data?.map((item, index) => {
          return (
            <View key={index}>
              <View
                style={[
                  styles.DirectionRow,
                  {justifyContent: 'space-between'},
                ]}>
                <View style={styles.content}>
                  <View style={{flexDirection: 'row', gap: 4}}>
                    <View
                      style={{
                        backgroundColor: Colors.primary.light3,
                        padding: 4,
                        borderRadius: 15,
                        paddingHorizontal: 8,
                      }}>
                      <Text
                        style={{
                          color: Colors.primary.base,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.tags}
                      </Text>
                    </View>
                    {item.class !== '' && (
                      <View
                        style={{
                          backgroundColor: Colors.secondary.light2,
                          padding: 4,
                          borderRadius: 15,
                          paddingHorizontal: 8,
                        }}>
                        <Text
                          style={{
                            color: '#995F0D',
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {item.class}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View>
                    <Text style={styles.courses}>{item.title}</Text>
                  </View>
                  <View />
                  <View style={styles.alignCenter}>
                    <IconBook width={16} height={16} />
                    <Text style={styles.text}>Bab 1. Lorem Ipsum</Text>
                  </View>
                  <View style={styles.alignCenter}>
                    <IconCalendar width={16} height={16} />
                    <Text style={styles.text}>Hari ini • 09:00 - 11:30</Text>
                  </View>
                  {true && (
                    <View style={styles.alignCenter}>
                      <IconLive width={16} height={16} />
                      <Text style={styles.live}>Sedang berlangsung</Text>
                    </View>
                  )}
                </View>
                <Pressable style={styles.buttonGabung}>
                  <Text style={styles.textBtnGabung}>Gabung</Text>
                </Pressable>
              </View>
              <View style={styles.hr} />
            </View>
          );
        })}

        <View style={styles.centering}>
          <Pressable style={styles.button}>
            <Text style={styles.textBtn}>Lihat Semua Jadwal {'>'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export {ScheduleTodayNonList};

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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginBottom: 8,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 4,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },

  DirectionRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    gap: 4,
    marginTop: 8,
    width: '70%',
  },
  courses: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  live: {
    color: Colors.danger.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  alignCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  text: {
    color: Colors.dark.neutral80,
  },
  buttonGabung: {
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  textBtnGabung: {
    backgroundColor: Colors.primary.base,
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  hr: {
    borderWidth: 0.3,
    opacity: 0.5,
    marginVertical: 16,
    backgroundColor: Colors.primary.light3,
  },
});
