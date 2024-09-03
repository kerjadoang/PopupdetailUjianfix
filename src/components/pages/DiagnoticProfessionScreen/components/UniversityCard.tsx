import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {SvgUri} from 'react-native-svg';

type university = {
  id: number;
  name: string;
  province: string;
  website: string;
  logo: string;
  latitude: any;
  longitude: any;
  logo_path_url: string;
};
interface Data {
  id: number;
  name: string;
  university_id: number;
  accreditation: string;
  capacity: number;
  enthusiast: number;
  strictness: string;
  passing_grade: number;
  university: university;
}
interface Iprops {
  data: Data;
}
const UniversityCard = (props: Iprops) => {
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.topCard}>
        {props?.data?.university?.logo_path_url?.endsWith('.svg') ? (
          <SvgUri
            uri={props?.data?.university?.logo_path_url}
            style={styles.icon}
            width={32}
            height={32}
          />
        ) : (
          <Image
            style={styles.icon}
            source={{
              uri: props?.data?.university?.logo_path_url,
            }}
          />
        )}
        <View style={styles.topRightCard}>
          <Text style={styles.topTitle}>
            {props?.data?.university?.name ?? '-'}
          </Text>
          <Pressable
            onPress={() => Linking.openURL(props?.data?.university?.website)}>
            <Text style={styles.topLabel}>
              {props?.data?.university?.website ?? '-'}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.botCard}>
        <View style={styles.botColumn}>
          <View style={[styles.botColumn, {marginRight: 12}]}>
            <Text style={styles.botTitle}>Provinsi</Text>
            <Text style={styles.botLabel} numberOfLines={1}>
              {props?.data?.university?.province ?? '-'}
            </Text>
          </View>
          <View style={[styles.botColumn, {marginRight: 12}]}>
            <Text style={styles.botTitle}>Tingkat Keketatan</Text>
            <Text style={styles.botLabel}>
              {Number(props?.data?.strictness ?? '0')?.toFixed?.(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.botColumn}>
          <View style={styles.botColumn}>
            <Text style={styles.botTitle}>Peminat</Text>
            <Text style={styles.botLabel}>{props?.data?.enthusiast ?? 0}</Text>
          </View>
          <View style={styles.botColumn}>
            <Text style={styles.botTitle}>Daya Tampung</Text>
            <Text style={styles.botLabel}>{props?.data?.capacity ?? 0}</Text>
          </View>
        </View>
        <View style={styles.botColumn}>
          <View style={styles.botColumn}>
            <Text style={styles.botTitle}>Akreditasi</Text>
            <Text style={styles.botLabel}>
              {props?.data?.accreditation ?? '-'}
            </Text>
          </View>
          <View style={styles.botColumn}>
            <Text style={styles.botTitle}>Passing Grade</Text>
            <Text style={styles.botLabel}>
              {props?.data?.passing_grade ?? '-'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export {UniversityCard};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    padding: 12,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
  },
  topCard: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
    paddingBottom: 4,
    paddingRight: 4,
  },
  topRightCard: {
    flexDirection: 'column',
    marginLeft: 16,
    flex: 1,
  },
  topTitle: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.dark1,
    letterSpacing: 0.25,
    lineHeight: 16,
  },
  topLabel: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
    letterSpacing: 0.25,
    lineHeight: 16,
    paddingTop: 2,
  },
  botCard: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 4,
  },
  botColumn: {
    flexDirection: 'column',
    flex: 1,
  },
  botLabel: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral80,
    letterSpacing: 0.25,
    lineHeight: 16,
    paddingTop: 2,
  },
  botTitle: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
    letterSpacing: 0.25,
    lineHeight: 16,
    paddingTop: 2,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
