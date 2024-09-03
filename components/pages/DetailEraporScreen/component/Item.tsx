import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  title: string;
  contain?: any;
};

const Item = ({title, contain}: Props) => {
  const [isCollaps, setIsCollaps] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsCollaps(!isCollaps)}
        style={styles.btn}>
        <Text style={styles.title}>{title || '--'}</Text>
        {isCollaps ? (
          <Icon name="chevron-down" size={16} color={Colors.primary.base} />
        ) : (
          <Icon name="chevron-up" size={16} color={Colors.primary.base} />
        )}
      </TouchableOpacity>
      {isCollaps ? null : (
        <View style={styles.contain}>
          {contain || <Text>{'Tidak Ada Data'}</Text>}
        </View>
      )}
    </View>
  );
};

export {Item};
const styles = StyleSheet.create({
  contain: {
    backgroundColor: Colors.primary.light4,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  container: {},
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
});
