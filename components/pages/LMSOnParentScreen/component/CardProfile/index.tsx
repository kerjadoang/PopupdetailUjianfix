import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

const CardProfile = ({data}: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data?.path_url,
        }}
        style={styles.imageProfileHeader}
      />
      <View>
        <Text style={styles.title}>{data?.full_name}</Text>
        <Text style={styles.description}>
          {data?.rombel_name} • NIS: {data?.id}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  imageProfileHeader: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    color: Colors.dark.neutral100,
  },
  description: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
  },
});
export default CardProfile;
