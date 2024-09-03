import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {UniversityCard} from '../components/UniversityCard';
import Colors from '@constants/colors';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import useDiagnoticProfessionResult from '../useDiagnoticProfessionResult';
import Fonts from '@constants/fonts';

const TabScreen = () => {
  const route: any = useRoute();
  const major_id: any = route?.params?.major_id;
  const {_renderUserUniversityRecommendation, dataTab} =
    useDiagnoticProfessionResult();

  useFocusEffect(
    useCallback(() => {
      _renderUserUniversityRecommendation(major_id);
    }, [major_id]),
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator>
        <Text style={styles.title}>Terbaik Nasional</Text>
        <UniversityCard data={dataTab?.best} />
        <Text style={styles.title}>Paling banyak diminati</Text>
        <UniversityCard data={dataTab?.popular} />
        <Text style={styles.title}>Terdekat dari domisili</Text>
        <UniversityCard data={dataTab?.nearest} />
      </ScrollView>
    </View>
  );
};

export {TabScreen};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.background,
    flex: 1,
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
});
