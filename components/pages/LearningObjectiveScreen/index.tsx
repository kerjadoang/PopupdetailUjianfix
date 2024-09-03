import {Header} from '@components/atoms';
import React from 'react';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import useLearningObjective from './useLearningObjective';
import {styles} from './styles';

const LearningObjectiveScreen = () => {
  const {route} = useLearningObjective();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header label="Objektif Pelajaran" />
      <ScrollView style={styles.scrollViewStyle}>
        {route?.params?.contentData?.points?.map((_desc: string) => {
          return (
            <View style={styles.cardDataContainerStyle}>
              <View style={styles.cardDataInnerContainerStyle}>
                <Text style={styles.carDataTitleStyle}>{_desc}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
export default LearningObjectiveScreen;
