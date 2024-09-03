import Colors from '@constants/colors';
import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewTwoColumns = ({data}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Pressable key={index} style={[styles.item]} onPress={item?.action}>
          <View style={[styles.shadowProp, styles.card]}>
            <View>
              <Image source={item.image} style={styles.icon} />
              <Text style={styles.title}>{item.title}</Text>
              {item.description !== '' && (
                <Text style={styles.desc}>{item.description}</Text>
              )}
            </View>
            <View>
              <Text>
                <Icon
                  name="chevron-right"
                  size={12}
                  color={Colors.dark.neutral50}
                />
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    flexBasis: '50%',
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
    margin: 4,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 8,
    minHeight: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.dark.neutral60,
  },
  icon: {
    width: 24,
    height: 24,
    marginVertical: 8,
  },
});

export default ViewTwoColumns;
