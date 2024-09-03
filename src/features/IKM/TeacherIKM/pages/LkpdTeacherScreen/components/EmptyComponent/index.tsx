import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import RobotEmpty from '@assets/svg/robot_empty_state.svg';
import {Button} from '@components/atoms';
import {capitalizeEachWord} from '@constants/functional';
import {useNavigate} from '@hooks/useNavigate';

type Props = {
  type: 'perlu diperiksa' | 'dijadwalkan';
};

const EmptyComponent: FC<Props> = ({type}) => {
  const {navigateScreen} = useNavigate();
  return (
    <View style={styles.container}>
      <RobotEmpty />
      <View>
        <Text style={styles.title}>
          Belum Ada Tugas LKPD{'\n'}
          {capitalizeEachWord(type)}
        </Text>
        <Text style={styles.subtitle}>
          Tugas LKPD yang {type}
          {'\n'}akan tampil di sini.
        </Text>
      </View>
      <Button
        label="+ Buat Lembar Kerja"
        action={() => {
          navigateScreen('CreateLkpdScreen');
        }}
        style={styles.button}
      />
    </View>
  );
};

export default EmptyComponent;
