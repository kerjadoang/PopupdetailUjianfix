/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import useAnnouncement from './useAnnouncement';
import {convertDateTime} from '@constants/functional';
import {EmptyCard} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {Carousel, Pagination} from 'react-native-snap-carousel-v4';
import Fonts from '@constants/fonts';
const window = Dimensions.get('window');

const Anouncement = ({type, token}: {type: string; token: string}) => {
  const navigation: any = useNavigation();
  const {announcement} = useAnnouncement(token);
  const [activeSlide, setActiveSlide] = useState(0);
  const renderItem = ({item}: {item: any}) => (
    <View style={[styles.card, styles.shadowProp]}>
      <View>
        <Text style={styles.titleClass}>{item?.title}</Text>
      </View>
      <View style={styles.flexDirection}>
        <Text style={styles.time}>{convertDateTime(item?.time_start)}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('AnnouncementDetailScreen', {
              id: item.id,
              isLMS: true,
            });
          }}>
          <Text style={styles.next}>Lihat selengkapnya</Text>
        </Pressable>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengumuman</Text>
      {announcement?.data === null || announcement?.data?.length === 0 ? (
        <View />
      ) : (
        <View>
          <Carousel
            data={announcement?.data}
            renderItem={renderItem}
            onSnapToItem={index => setActiveSlide(index)}
            sliderWidth={window.width * 0.92}
            itemWidth={window.width * 0.92}
            layout="default"
          />
          <Pagination
            dotsLength={announcement?.data.length}
            activeDotIndex={activeSlide}
            containerStyle={{marginTop: '-5%'}}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
            inactiveDotOpacity={0.5}
            inactiveDotScale={0.5}
          />
        </View>
      )}

      {announcement?.data?.length === 0 && (
        <View style={[styles.card, styles.shadowProp]}>
          <EmptyCard
            image={require('@assets/images/robot_empty_announcement.png')}
            title={'Belum ada pengumuman'}
          />
        </View>
      )}

      {type === 'Kepsek' && (
        <View style={styles.centering}>
          <Pressable
            onPress={() => navigation.navigate('AnnouncementManageScreen')}
            style={styles.button}>
            <Text style={styles.textBtn}>Buat & Kelola Pengumuman {'>'}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export {Anouncement};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.light4,
    paddingTop: 16,
    borderRadius: 20,
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
    padding: 16,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    marginBottom: 8,
  },
  titleClass: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: Fonts.SemiBoldPoppins,
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
    marginRight: 20,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    gap: 16,
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
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    fontWeight: '800',
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.primary.base,
  },
  inactiveDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
});
