import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UniversityCard} from '@components/pages/DiagnoticProfessionScreen/components/UniversityCard';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {useRoute} from '@react-navigation/native';
import {EmptyState, MainView} from '@components/atoms';

const TabPilihanPribadi = () => {
  const route: any = useRoute();
  const data: any = route?.params?.universityMajors;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleUniv}>Daftar Universitas</Text>
      <MainView marginBottom={200}>
        {data?.user_university_major?.length !== 0 ? (
          data?.user_university_major?.map((obj: any, index: number) => (
            <View key={index}>
              <Text style={styles.title}>Pilihan {index + 1}</Text>
              <UniversityCard data={obj?.university_major} />
            </View>
          ))
        ) : (
          <MainView flex={1} height={700}>
            <EmptyState
              type="empty_sad"
              title="Belum Ada Hasil Pilihan Pribadi"
            />
          </MainView>
        )}
      </MainView>
    </ScrollView>
  );
};

export {TabPilihanPribadi};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.background,
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 16,
  },
  titleUniv: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    marginTop: 12,
  },
  majorChoose: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
  },
  professionLeft: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
  },
  professionRight: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
  },
  chipsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
    marginRight: 8,
    marginTop: 4,
  },
  chipsText: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
  },
  chipsContainerSelected: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: Colors.primary.base,
    marginRight: 8,
    marginTop: 4,
  },
  chipsTextSelected: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.white,
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
  },
});
