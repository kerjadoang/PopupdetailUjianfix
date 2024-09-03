import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../style';
import {Button} from '@components/atoms';
import Star from '@assets/svg/ic_tanya_star.svg';
import Star2 from '@assets/svg/ic_tanya_star_orange.svg';
import Star3 from '@assets/svg/ic_tanya_star_purple.svg';
import Colors from '@constants/colors';
import {data_modal} from '../useDummy';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';

type Props = {
  action?: any;
  actionPlus?: any;
  actionPrio?: any;
  isActive?: any;
};
const RenderChildSwipe = ({
  action,
  actionPlus,
  isActive,
  actionPrio,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };
  const renderItem = ({index}: {index: number}) => {
    let backgroundColor = '#D6EBFF';
    let starIcon = <Star width={32} />;
    let type = 'regular';
    let status = true;

    if (index === 1) {
      backgroundColor = '#FFEACC';
      starIcon = <Star2 width={32} />;
      type = 'prioritas';
      status =
        isActive?.type === 'prioritas' ||
        (isActive?.type === 'plus' && isActive?.status === 'Aktif')
          ? true
          : false;
    } else if (index === 2) {
      backgroundColor = '#E5E0FF';
      starIcon = <Star3 width={32} />;
      type = 'plus';
      status = status =
        isActive?.type === 'plus' && isActive?.status === 'Aktif'
          ? true
          : false;
    }
    return (
      <View style={[styles.contentProgress, {backgroundColor}]}>
        <View style={[styles.row, {width: '100%'}]}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            {starIcon}
            <View style={{marginLeft: 5}}>
              <Text style={styles.coin}>Tanya {type}</Text>
              <Text style={styles.text}>
                {!status ? 'Tidak Aktif' : 'Aktif'}
              </Text>
            </View>
          </View>
          {!status && (
            <TouchableOpacity
              style={styles.buttonActive}
              onPress={type === 'plus' ? actionPlus : actionPrio}>
              <Text style={[styles.text, {color: Colors.white}]}>Aktifkan</Text>
            </TouchableOpacity>
          )}
        </View>
        {data_modal?.map((item: any, i: any) => (
          <View style={{flexDirection: 'row'}} key={i}>
            <Text style={[styles.txtTanya, {marginRight: 10}]}>{i + 1}</Text>
            <Text style={styles.txtTanya}>
              {type === 'plus'
                ? item?.descPlus
                : type === 'regular'
                ? item?.descReguler
                : item?.descPrio}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{padding: 16}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Carousel
          data={data_modal}
          renderItem={renderItem}
          sliderWidth={350}
          itemWidth={350}
          onSnapToItem={handleSlideChange}
        />
        <Pagination
          dotsLength={data_modal?.length}
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

export {RenderChildSwipe};
