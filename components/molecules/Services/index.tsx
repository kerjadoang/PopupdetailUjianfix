import {View, StyleSheet} from 'react-native';
import React from 'react';
import {WidgetService} from '@components/atoms/WidgetService';
import Guru from '@assets/svg/ic51_guru.svg';
import Soal from '@assets/svg/ic51_soal.svg';
import Tanya from '@assets/svg/ic51_tanya.svg';
import PTN from '@assets/svg/LOGO_PTN_Menu.svg';
import {CoachmarkLib} from '@components/atoms';
import {generalStyles} from '@constants/styles';

type IServicesProps = {
  scrollViewRef?: any;
  selectedServices?: any;
  setServicesView: any;
  Coachmarks: any[];
  doneCoachMark: () => void;
  setSelectedServices: any;
  totalCoachmark: number;
  _handlerCoachmark: (queue: number) => void;
};

const Services = ({
  scrollViewRef,
  setSelectedServices,
  setServicesView,
  Coachmarks,
  doneCoachMark,
  totalCoachmark,
  _handlerCoachmark,
}: IServicesProps) => {
  return (
    <View
      onLayout={event => {
        setServicesView(event.nativeEvent.layout.y);
      }}
      style={styles.container}>
      <CoachmarkLib
        ref={ref => (Coachmarks[3] = ref)}
        onNext={() => _handlerCoachmark(4)}
        onShow={() => scrollViewRef?.current?.stop()}
        onSkip={doneCoachMark}
        buttonOnContent
        queue={4}
        totalCoachmark={totalCoachmark}
        contentContainerStyle={generalStyles.contentFlex}
        buttonSkipText={'Lewati'}
        title={'GURU'}
        maxWidth={96}
        childrenStyle={styles.borderCard}
        message={
          'Belajar langsung dengan guru pendamping yang tersertifikasi.'
        }>
        <WidgetService
          action={() => {
            setSelectedServices('GURU');
          }}
          title="GURU"
          svg={<Guru height={51} width={51} />}
        />
      </CoachmarkLib>
      <CoachmarkLib
        ref={ref => (Coachmarks[4] = ref)}
        onNext={() => _handlerCoachmark(5)}
        onShow={() => scrollViewRef?.current?.stop()}
        onSkip={doneCoachMark}
        buttonOnContent
        queue={5}
        totalCoachmark={totalCoachmark}
        contentContainerStyle={generalStyles.contentFlex}
        buttonSkipText={'Lewati'}
        title={'SOAL'}
        maxWidth={96}
        childrenStyle={styles.borderCard}
        message={
          'Akses ribuan soal latihan untuk lebih siap menghadapi ujian.'
        }>
        <WidgetService
          action={() => {
            setSelectedServices('SOAL');
          }}
          title="SOAL"
          svg={<Soal height={51} width={51} />}
        />
      </CoachmarkLib>
      <CoachmarkLib
        ref={ref => (Coachmarks[5] = ref)}
        onNext={() => _handlerCoachmark(6)}
        onShow={() => scrollViewRef?.current?.stop()}
        onSkip={doneCoachMark}
        buttonOnContent
        queue={6}
        totalCoachmark={totalCoachmark}
        contentContainerStyle={generalStyles.contentFlex}
        buttonSkipText={'Lewati'}
        title={'TANYA'}
        maxWidth={96}
        childrenStyle={styles.borderCard}
        message={
          'BerTANYA semua pelajaran secara GRATIS kepada guru tersertifikasi.'
        }>
        <WidgetService
          action={() => {
            setSelectedServices('TANYA');
          }}
          title="TANYA"
          svg={<Tanya height={51} width={51} />}
        />
      </CoachmarkLib>
      <CoachmarkLib
        ref={ref => (Coachmarks[6] = ref)}
        onNext={() => _handlerCoachmark(7)}
        onShow={() => scrollViewRef?.current?.stop()}
        onSkip={doneCoachMark}
        buttonOnContent
        queue={7}
        totalCoachmark={totalCoachmark}
        contentContainerStyle={generalStyles.contentFlex}
        buttonSkipText={'Lewati'}
        title={'PTN'}
        maxWidth={96}
        childrenStyle={styles.borderCard}
        message={'Jadi makin yakin hadapi ujian masuk PTN.'}>
        <WidgetService
          action={() => {
            setSelectedServices('PTN');
          }}
          title="PTN"
          svg={<PTN height={51} width={51} />}
        />
      </CoachmarkLib>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  widgetService: {
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    borderRadius: 10,
  },
  borderCard: {
    borderRadius: 15,
  },
});

export default Services;
