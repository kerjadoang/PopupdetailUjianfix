import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';

type Props = {
  action: any;
  data: any;
};
const ListGroup: FC<Props> = ({data, action}) => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <View style={[styles.box, {backgroundColor: '#EFF7FF', padding: 10}]}>
        <Pressable
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={action}>
          <Image
            source={require('@assets/images/ex_pp.png')}
            style={styles.image}
          />
          <View>
            <Text style={[styles.title, {fontFamily: 'Poppins-Bold'}]}>
              Group Belajar X
            </Text>
            <Text style={[styles.title, {fontSize: 12}]}>123</Text>
          </View>
        </Pressable>
        <Image
          source={require('@assets/images/arrowRight.png')}
          style={{width: 4, height: 8}}
        />
      </View>
      {data.map((item: any, idx: number) => (
        <Pressable
          key={idx}
          onPress={action}
          style={[
            styles.box,
            {
              backgroundColor: '#ffff',
              marginTop: 10,
              borderBottomWidth: 1,
              borderColor: Colors.dark.neutral10,
              padding: 10,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
            <Image source={item.image} style={styles.icon} />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.title,
                  {fontWeight: 'bold', marginHorizontal: 5, color: '#0055B8'},
                ]}>
                {item.id}
              </Text>
              <Text style={[styles.title, {fontWeight: 'bold'}]}>
                {item.title}
              </Text>
            </View>
          </View>
          <Image
            source={require('@assets/images/arrowRight.png')}
            style={{width: 4, height: 8}}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default ListGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
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
    backgroundColor: 'white',
    borderRadius: 10,
    width: 265,
  },
  icon: {
    width: 15,
    height: 16,
  },
});
