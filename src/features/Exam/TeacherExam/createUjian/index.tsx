import {StyleSheet, SafeAreaView} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Stepper, Header} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import CreateInfoDetail from '@components/pages/UjianScreen/CreateJadwalUjianScreen';
import Colors from '@constants/colors';
import {ParticipantExam} from '../components';
import ExamTypeTab from './ExamTypeTab';

export default function CreateUjian() {
  const navigation = useNavigation();
  const [activeStep, setActiveStep] = useState(1);

  const handleNextStep = () => {
    setActiveStep(step => step + 1);
  };

  const handlePrevStep = () => {
    setActiveStep(step => step - 1);
  };

  const RenderCurrentComponent = useCallback(() => {
    switch (activeStep) {
      case 1:
        return (
          <CreateInfoDetail
            HeaderComponent={
              <Stepper
                active={activeStep}
                labels={['Detail', 'Peserta', 'Soal', 'Preview Jadwal Ujain']}
              />
            }
            nextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <ParticipantExam
            HeaderComponent={
              <Stepper
                active={activeStep}
                labels={['Detail', 'Peserta', 'Soal', 'Preview Jadwal Ujain']}
              />
            }
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
          />
        );

      case 3:
        return (
          <ExamTypeTab
            HeaderComponent={
              <Stepper
                active={activeStep}
                labels={['Detail', 'Peserta', 'Soal', 'Preview Jadwal Ujain']}
              />
            }
          />
        );

      default:
        return <CreateInfoDetail nextStep={handleNextStep} />;
    }
  }, [activeStep]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header styleLabel={styles.leftLabel} label="Buat Jadwal Ujian" />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <RenderCurrentComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.background,
  },
  leftLabel: {textAlign: 'left', fontWeight: 'bold', fontSize: 16},
});
