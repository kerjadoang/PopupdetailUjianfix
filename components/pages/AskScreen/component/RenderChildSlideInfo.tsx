import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../style';
import {Button} from '@components/atoms';
import Tanya1 from '@assets/svg/tanya_info1.svg';
import Tanya2 from '@assets/svg/tanya_info2.svg';
import Tanya3 from '@assets/svg/tanya_info3.svg';
import Carousel, {Pagination} from 'react-native-snap-carousel-v4';
import CheckList from '@assets/svg/ic_checklist_white.svg';
type Props = {
  action?: any;
  handleTips?: any;
};
const RenderChildSlideInfo = ({action, handleTips}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };
  const [check, setCheck] = useState(false);
  const data = [
    {
      id: 1,
      name: ' Crop hanya pada satu soal',
      icon: <Tanya1 style={{marginTop: 20}} />,
    },
    {
      id: 2,
      name: ' Pastikan Gambar Jelas',
      icon: <Tanya2 style={{marginTop: 20}} />,
    },
    {
      id: 3,
      name: ' Pastikan Gambar Lurus',
      icon: <Tanya3 style={{marginTop: 20}} />,
    },
  ];

  const renderItem = ({item}: {item: any; index: number}) => (
    <View style={{alignItems: 'center'}}>
      <Text style={[styles.text, {fontSize: 16, lineHeight: 20}]}>
        {item?.name}
      </Text>
      {item?.icon}
    </View>
  );
  return (
    <View style={{padding: 16}}>
      <Text style={[styles.title, {alignSelf: 'center', marginVertical: 15}]}>
        Tips Foto Soal
      </Text>
      <View style={styles.box}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={300}
          itemHeight={300}
          onSnapToItem={handleSlideChange}
          keyExtractor={item => item?.id}
        />
        <Pagination
          dotsLength={data?.length}
          activeDotIndex={currentIndex}
          containerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
        />
        <View style={styles.check}>
          <Pressable
            style={check ? styles.checkBox : styles.unCheckBox}
            onPress={() => {
              setCheck(!check);
              handleTips(check);
            }}>
            {check ? <CheckList width={18} height={18} /> : null}
          </Pressable>
          <Text style={styles.text}>Jangan perlihatkan selama 14 hari</Text>
        </View>
      </View>
      <Button label="Tanya Sekarang" action={action} />
    </View>
  );
};

export default RenderChildSlideInfo;
