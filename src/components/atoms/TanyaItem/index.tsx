import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

type Props = {
  title?: string;
  description?: string;
  Image?: any;
};

const TanyaItem = ({title, description, Image}: Props) => {
  return (
    <View style={styles.viewContainer}>
      <View>
        <Image />
      </View>
      <View style={styles.viewText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
  },
  viewText: {
    width: '90%',
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 16,
    fontStyle: 'normal',
    color: Colors.dark.neutral100,
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    fontStyle: 'normal',
    color: Colors.dark.neutral80,
  },
});

export {TanyaItem};
