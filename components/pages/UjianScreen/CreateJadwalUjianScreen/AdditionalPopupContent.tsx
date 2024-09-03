import dayjs from 'dayjs';
import {View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IJadwalkanUjianFormValues} from '.';

export const AdditonalPopupContent: React.FC<{
  data: IJadwalkanUjianFormValues;
}> = props => {
  return (
    <View style={{marginVertical: 10}}>
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          color: Colors.dark.neutral60,
          textAlign: 'center',
        }}>
        {props.data.title}
        {'\n'}
        {props.data.rombel_class_school?.rombel_class_school_name}
        {'\n'}
        {props.data.subject?.name}
        {'\n'}
        {props.data.chapters?.map?.(chapter => chapter.name).join(', ')}
        {'\n\n'}
        Pengerjaan:{' '}
        {dayjs(props.data.start_time)
          .locale('id')
          .format('ddd, DD/MM/YYYY')}{' '}
        {'\u2022'} {dayjs(props.data.start_time).format('HH:mm')}
      </Text>
    </View>
  );
};
