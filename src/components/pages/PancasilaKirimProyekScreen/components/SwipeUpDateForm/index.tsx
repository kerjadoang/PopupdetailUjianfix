import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Button, DateTimePickerForm} from '@components/atoms';

type Props = {
  valueDate: any;
  setValueDate: any;
  label: any;
  onClose: () => void;
};

const SwipeUpDateForm: FC<Props> = ({
  valueDate,
  setValueDate,
  label,
  onClose,
}) => {
  return (
    <View style={styles.swipeUpChooseDateWrapper}>
      <Text style={styles.swipeUpChooseDateHeaderTitle}>{label}</Text>
      <View style={styles.swipeUpDateContainer}>
        <DateTimePickerForm
          selected={valueDate}
          onChange={setValueDate}
          isActualTime
        />
      </View>
      <View style={styles.swipeUpDateButtonWrapper}>
        <Button
          style={styles.swipeUpButtonConfirm}
          label={'Simpan'}
          action={onClose}
        />
      </View>
    </View>
  );
};

export default SwipeUpDateForm;
