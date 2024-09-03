import React, {useState} from 'react';
import {Text, View, Pressable, Dimensions} from 'react-native';
import {styles} from './style';
import useAnnouncementWidget from './useAnnouncementWidget';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import {convertDateTime} from '@constants/functional';
import Colors from '@constants/colors';
import {EmptyCard} from '@components/atoms';

const AnnouncementWidget = (data: any) => {
  const {announcement, onPress}: any = useAnnouncementWidget(data?.token);

  const width = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item}: {item: any}) => (
    <View style={[styles.card, styles.shadowProp]}>
      <View>
        <Text style={styles.titleClass}>{item.title}</Text>
      </View>
      <View style={styles.flexDirection}>
        <Text style={styles.time}>{convertDateTime(item.time_start)}</Text>
        <Pressable onPress={() => onPress(item?.id)}>
          <Text style={styles.next}>Lihat selengkapnya</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerContainer,
          {alignItems: 'center', flexDirection: 'row'},
        ]}>
        {/* <IconAnnouncement width={20} height={20} style={{marginRight: 10}} /> */}
        <Text style={styles.groupMentorTitle}>{'Pengumuman'}</Text>
      </View>
      {announcement?.data === null || announcement?.data?.length === 0 ? (
        <View style={[{flex: 1, marginTop: 16}]}>
          <EmptyCard
            image={require('@assets/images/robot_empty_announcement.png')}
            title={'Belum ada pengumuman'}
          />
        </View>
      ) : (
        <>
          <Carousel
            data={announcement?.data}
            renderItem={renderItem}
            onSnapToItem={index => setActiveSlide(index)}
            sliderWidth={width - 32}
            itemWidth={width - 32}
            layout="default"
          />
          <Pagination
            dotsLength={announcement?.data.length}
            activeDotIndex={activeSlide}
            containerStyle={{marginTop: '-5%'}}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              backgroundColor: Colors.primary.base,
            }}
            inactiveDotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            }}
            inactiveDotOpacity={0.5}
            inactiveDotScale={0.5}
          />
        </>
      )}
    </View>
  );
};

export {AnnouncementWidget};
