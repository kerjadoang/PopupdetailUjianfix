import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import RenderImage from '@components/atoms/RenderImage';
import {MainView} from '@components/atoms';

type Data = {
  id: number;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
  university_major: any;
  logo_path_url?: string;
  logo?: string;
};
interface Iprops {
  data: Data;
  action: any;
}
const UniversityItem = (props: Iprops) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props?.action}>
      <MainView alignSelf="center">
        <RenderImage imageUrl={props?.data?.logo} style={styles.icon} />
      </MainView>
      <View style={styles.cardRight}>
        <Text style={styles.title}>{props?.data?.name ?? ''}</Text>
        <View style={styles.detail}>
          <View style={styles.subDetail}>
            <Text style={styles.subLabel}>Passing Grade</Text>
            <Text style={styles.subTitle}>
              {props?.data?.university_major
                ? props?.data?.university_major[0]?.passing_grade
                : 0}
            </Text>
          </View>
          <View style={styles.subDetail}>
            <Text style={styles.subLabel}>Provinsi</Text>
            <Text style={styles.subTitle}>{props?.data?.province ?? ''}</Text>
          </View>
          <View style={styles.subDetail}>
            <Text style={styles.subLabel}>Peminat</Text>
            <Text style={styles.subTitle}>
              {props?.data?.university_major
                ? props?.data?.university_major[0]?.enthusiast
                : 0}
            </Text>
          </View>
          <View style={styles.subDetail}>
            <Text style={styles.subLabel}>Akreditasi</Text>
            <Text style={styles.subTitle}>
              {props?.data?.university_major
                ? props?.data?.university_major[0]?.accreditation
                : '-'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {UniversityItem};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderBottomColor: Colors.dark.neutral20,
    borderBottomWidth: 2,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  cardRight: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
  },
  titleSelected: {
    color: Colors.primary.base,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subDetail: {
    flexDirection: 'column',
    marginRight: 18,
    flex: 1,
  },
  subLabel: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  subTitle: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral80,
  },
});
