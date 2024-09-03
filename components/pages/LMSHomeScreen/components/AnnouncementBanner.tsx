import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import useAnnouncementWidget from './useAnnouncementWidget';
import {Carousel, Pagination} from 'react-native-snap-carousel-v4';
import {convertDateTime} from '@constants/functional';

const AnnouncementBanner = () => {
  const {announcement, navigation}: any = useAnnouncementWidget();

  const [activeSlide, setActiveSlide] = useState(0);
  const renderItem = ({item}: {item: any}) => (
    <View style={styles.cardContainer}>
      <View style={styles.chips}>
        <Text style={styles.announcementChips}>Pengumuman</Text>
      </View>
      <View
        style={{
          width: '80%',
          marginTop: 8,
        }}>
        <Text style={styles.announcementTitle}>{item?.title}</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.date}>{convertDateTime(item.time_start)}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AnnouncementDetailScreen', {
              id: item.id,
              isLMS: true,
            });
          }}>
          <Text style={styles.viewMore}>Lihat selengkapnya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      {announcement?.data === null || announcement?.data?.length === 0 ? (
        <View />
      ) : (
        <View>
          <Carousel
            data={announcement?.data}
            renderItem={renderItem}
            onSnapToItem={index => setActiveSlide(index)}
            sliderWidth={window.width}
            itemWidth={window.width}
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
    </View>
  );
};

export default AnnouncementBanner;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  cardContainer: {
    width: window.width * 0.9,
    backgroundColor: Colors.white,
    padding: 16,
    paddingBottom: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderRadius: 10,
    marginRight: 6,
    elevation: 3,
    margin: 1,
  },
  chips: {
    backgroundColor: Colors.secondary.light2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    borderRadius: 20,
  },
  announcementChips: {
    color: Colors.orange.dark1,
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  announcementTitle: {
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 0.25,
    paddingBottom: 4,
  },
  date: {
    color: Colors.dark.neutral80,
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  viewMore: {
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.25,
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
