import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {FC, useState} from 'react';
import ArrowUp from '@assets/svg/blueArrowUp.svg';
import Arrow from '@assets/svg/blueArrow.svg';
import GreyArrow from '@assets/svg/greyArrow.svg';

interface mainlistItems {
  id: number;
  title: string;
  image: any;
}
const mainlistItems: mainlistItems[] = [
  {
    id: 1,
    title: 'Bermain & Belajar',
    image: require('@assets/images/round_progress_4.png'),
  },
  {
    id: 2,
    title: 'Latihan Soal & PG',
    image: require('@assets/images/round_progress1.png'),
  },
  {
    id: 3,
    title: 'Latihan Soal Uraian',
    image: require('@assets/images/round_progress2.png'),
  },
  {
    id: 4,
    title: 'Pahami & Beraksi',
    image: require('@assets/images/round_progress3.png'),
  },
];
interface listItems {
  id: number;
  title: string;
  image: any;
  value: boolean;
}

const listItems: listItems[] = [
  {
    id: 1,
    title: 'Cocokan Objek',
    image: require('@assets/images/practice_1.png'),
    value: false,
  },
  {
    id: 2,
    title: 'Benar atau Salah',
    image: require('@assets/images/practice_2.png'),
    value: false,
  },
  {
    id: 3,
    title: 'Pilah Objek',
    image: require('@assets/images/practice_3.png'),
    value: false,
  },
  {
    id: 4,
    title: 'Tangkap & Jawab',
    image: require('@assets/images/practice_4.png'),
    value: false,
  },
  {
    id: 5,
    title: 'Teka - teki silang',
    image: require('@assets/images/practice_5.png'),
    value: false,
  },
];

type Props = {
  list?: {}[];
  showHeader?: boolean;
};
const CardKPProgressDetail: FC<Props> = ({showHeader = true}: any) => {
  const [count, setCount] = useState(null);
  const toggle = (i: any) => {
    if (count === i) {
      return setCount(null);
    }
    setCount(i);
  };

  return (
    <View style={styles.container}>
      {mainlistItems.map((item: any) => (
        <View key={item.id}>
          {showHeader && (
            <Pressable onPress={() => toggle(item.id)} style={styles.header}>
              <Image source={item.image} style={styles.mainImage} />
              <Text style={[styles.title, {fontSize: 16, flex: 1}]}>
                {item.title}
              </Text>
              {count === item.id ? (
                <Arrow width={6} height={12} />
              ) : (
                <ArrowUp width={12} height={16} />
              )}
            </Pressable>
          )}
          {count === item.id ? (
            <View style={[styles.card, styles.shadowProp]}>
              {listItems.map(item => (
                <TouchableOpacity style={styles.box}>
                  <Image source={item.image} style={styles.image} />

                  <Text style={[styles.title, {fontSize: 14, flex: 1}]}>
                    {item.title}
                  </Text>
                  <GreyArrow width={4} height={8} />
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default CardKPProgressDetail;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 265,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  mainImage: {
    width: 64,
    height: 64,
    marginRight: 10,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#E7EBEE',
  },
});
