import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UniversityCard} from '@components/pages/DiagnoticProfessionScreen/components/UniversityCard';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {generalStyles} from '@constants/styles';
import {useRoute} from '@react-navigation/native';
import {MainView} from '@components/atoms';

const TabRekomendasi = () => {
  const [mapping, setMapping] = useState<any>(null);
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [selectedMajorData, setSelectedMajorData] = useState<any>([]);
  const route: any = useRoute();
  const data: any = route?.params?.universityMajorsKp;

  useEffect(() => {
    if (data) {
      const name_major = data?.user_university_major?.map(
        (obj: any) => obj?.university_major?.name,
      );
      const uniqueName: any = Array.from(new Set(name_major));
      setSelectedMajor(uniqueName?.[0]);
      setMapping({
        majors: uniqueName,
      });
    }
  }, [data]);

  useEffect(() => {
    if (selectedMajor) {
      const filteredData = data?.user_university_major?.filter(
        (obj: any) =>
          obj?.university_major?.name?.toLowerCase() ===
          selectedMajor?.toLowerCase(),
      );
      if (filteredData?.length !== 0) {
        setSelectedMajorData(filteredData);
      }
    }
  }, [selectedMajor, data]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.professionLeft}>
          Profesi{' '}
          <Text style={styles.professionRight}>: {data?.profession ?? ''}</Text>
        </Text>
        <Text style={styles.majorChoose}>Pilihan Jurusan </Text>
        <ScrollView
          contentContainerStyle={generalStyles.row}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {mapping?.majors?.map((name: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={
                name === selectedMajor
                  ? styles.chipsContainerSelected
                  : styles.chipsContainer
              }
              onPress={() => setSelectedMajor(name)}>
              <Text
                style={
                  name === selectedMajor
                    ? styles.chipsTextSelected
                    : styles.chipsText
                }>
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <MainView marginBottom={100}>
        <Text style={styles.titleUniv}>Daftar Universitas</Text>
        <Text style={styles.title}>Terbaik Nasional</Text>
        <UniversityCard data={selectedMajorData?.[0]?.university_major} />
        <Text style={styles.title}>Paling banyak diminati</Text>
        <UniversityCard data={selectedMajorData?.[2]?.university_major} />
        <Text style={styles.title}>Terdekat dari domisili</Text>
        <UniversityCard data={selectedMajorData?.[1]?.university_major} />
      </MainView>
    </ScrollView>
  );
};

export {TabRekomendasi};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.background,
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 6,
    paddingBottom: 200,
  },
  contentContainerStyle: {
    backgroundColor: Colors.primary.background,
    flexGrow: 1,
    padding: 16,
    paddingTop: 0,
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
