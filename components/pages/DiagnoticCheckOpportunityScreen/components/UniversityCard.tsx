import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import RenderImage from '@components/atoms/RenderImage';

interface Iprops {
  data: IResMatchUniversity;
}
const UniversityCard = (props: Iprops) => {
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.topCard}>
        <RenderImage
          imageUrl={props?.data?.university?.logo}
          style={styles.icon}
        />
        <View style={styles.topRightCard}>
          <Text style={styles.topTitle}>
            {props?.data?.university?.name ?? '-'}
          </Text>
          <Pressable
            onPress={() =>
              Linking.openURL(props?.data?.university?.website ?? '')
            }>
            <Text style={styles.topLabel}>
              {props?.data?.university?.website ?? '-'}
            </Text>
          </Pressable>
          <Text style={styles.topSubject}>{props?.data?.name ?? '-'}</Text>
        </View>
      </View>
      <View style={styles.botCard}>
        <View style={styles.botColumn}>
          <View style={styles.botColumn}>
            <Text style={styles.botTitle}>Provinsi</Text>
            <Text style={styles.botLabel}>
              {props?.data?.university?.province ?? '-'}
            </Text>
          </View>
          <View style={styles.botColumn}>
            <Text style={styles.botTitle}>Tingkat Keketatan</Text>
            <Text style={styles.botLabel}>
              {Number(props?.data?.strictness)?.toFixed?.(2) ?? '0'}%
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
    borderRadius: 20,
    padding: 12,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    marginTop: 6,
    marginBottom: 16,
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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
    paddingBottom: 4,
  },
  topRightCard: {
    flexDirection: 'column',
    marginLeft: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  botColumn: {
    flexDirection: 'column',
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
    width: 40,
    height: 40,
  },
  topSubject: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral80,
    letterSpacing: 0.25,
    lineHeight: 16,
  },
});
