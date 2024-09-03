import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import Coin from '@assets/svg/ic_coin.svg';

type Props = {
  image: any;
  imageSize: string;
  title: any;
  coin: string;
  action: any;
  date: string;
  mainData: any;
  data: {}[];
};

const CardItem: FC<Props> = ({mainData, data, coin, action}) => {
  return (
    <View style={{flex: 1}}>
      <View style={[styles.card, {marginBottom: 10}]}>
        <View style={[styles.container]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Coin width={35} height={36} />
            <View style={{alignItems: 'flex-start', marginLeft: 10}}>
              <Text style={[styles.title, {fontWeight: 'bold', fontSize: 16}]}>
                {coin}
              </Text>
              <Text style={styles.title}>Koin Kelas Pintar</Text>
            </View>
          </View>
          <Pressable style={styles.cart} onPress={action}>
            <Image
              source={require('@assets/images/ic_cart.png')}
              style={styles.image}
            />
            <Text
              style={[styles.title, {fontWeight: 'bold', color: Colors.white}]}>
              Beli Koin
            </Text>
          </Pressable>
        </View>
      </View>
      {mainData.map((item: any, idx: number) => (
        <View key={idx} style={[styles.card, {borderRadius: 10}]}>
          <View style={[styles.container]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Coin width={35} height={36} />
              <View style={{alignItems: 'flex-start', marginLeft: 10}}>
                <Text
                  style={[styles.title, {fontWeight: 'bold', fontSize: 16}]}>
                  {item?.title}
                </Text>
                <Text style={styles.title}>{item.date}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.title,
                {
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: item.type ? Colors.success.base : Colors.danger.base,
                },
              ]}>
              {item.coins}
            </Text>
          </View>
        </View>
      ))}
      {data.map((item: any, idx: number) => (
        <View
          key={idx}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Image style={{width: 55, height: 52}} source={item.image} />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={[styles.title, {fontFamily: 'Poppins-Bold'}]}>
              {item.title}
            </Text>
            <Text style={styles.title}>{item.desc}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cart: {
    backgroundColor: Colors.primary.base,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
});
