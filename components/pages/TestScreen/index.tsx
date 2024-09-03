import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import styles from './styles';

const TestScreen = () => {
  return (
    <SafeAreaView>
      {/* Header */}
      <ScrollView>
        <View style={styles.cardContainer}>
          {/* Body */}
          {/* <InAppPurchase /> */}

          {/* <ParticipantExam /> */}
          {/* <QuestionPackageCard title="Paket Soal 1" />
        <MainView marginVertical={4} />
        <QuestionCard questionNumber={1} />
        <MainView marginVertical={4} />
        <StepperQuestion
          onPressQuestion={() => {}}
          totalQuestion={10}
          onPressLeftPlus={() => {}}
        />

        <SoundPlayer source="https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg" />
      </View>
    </View>
        /> */}
          {/* <UploadFileExam /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {TestScreen};
