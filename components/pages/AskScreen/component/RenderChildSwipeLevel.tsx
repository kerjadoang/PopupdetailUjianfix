import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../style';
import {Button} from '@components/atoms';
import {slide} from '../useDummy';
import Mascot from '@assets/svg/robot_tanya.svg';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';

type Props = {
  action?: any;
};

const RenderChildSwipeLevel = ({action}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const renderItem = ({item}: {item: any; index: number}) => (
    <View style={{justifyContent: 'center'}}>
      <Mascot width={200} height={200} style={{alignSelf: 'center'}} />
      <Text style={[styles.titleLevel]}>{item.name}</Text>
      <Text style={[styles.subTitleLevel, {textAlign: 'center'}]}>
        Tanya 25 soal lagi untuk naik ke level selanjutnya
      </Text>
    </View>
  );

  return (
    <View style={{padding: 16}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Carousel
          data={slide}
          renderItem={renderItem}
          sliderWidth={350}
          itemWidth={340}
          onSnapToItem={handleSlideChange}
          keyExtractor={item => item?.id}
        />
        <Pagination
          dotsLength={slide?.length}
          activeDotIndex={currentIndex}
          containerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
        />
      </View>
      <Button label="Kembali" action={action} />
    </View>
  );
};

export {RenderChildSwipeLevel};
