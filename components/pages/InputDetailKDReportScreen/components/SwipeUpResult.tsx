import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';

type Props = {
  action?: any;
  data?: any;
  actionCancel?: any;
  formState?: any;
  setFormState?: any;
};

const SwipeUpResult = ({
  action,
  data,
  actionCancel,
  formState,
  setFormState,
}: Props) => {
  const [graduation_status, setGraduation_status] = useState('');

  const handleChangeText = (key, value) => {
    setGraduation_status(value);
  };

  const handleSubmit = () => {
    const updatedFormState = {
      ...formState,
      graduation_status: graduation_status.toLowerCase(),
    };
    setFormState(updatedFormState);
    action(updatedFormState);
  };

  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.textTitleSwipe}>Input Keputusan</Text>
      <Text style={styles.textSubTitle}>Pesan Pengantar</Text>
      <TextInput
        style={[styles.input]}
        defaultValue={`Pada semester ini, Siswa ${data?.rapor_student?.full_name} dinyatakan`}
        placeholderTextColor={'black'}
        textAlignVertical="top"
        multiline
        numberOfLines={3}
      />
      <Text style={styles.textSubTitle}>Hasil Keputusan</Text>
      <TextInput
        style={[styles.input]}
        placeholder="LULUS/TIDAK LULUS"
        placeholderTextColor={'grey'}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        onChangeText={text => {
          handleChangeText('graduation_status', text);
        }}
      />
      <View style={[styles.row, {justifyContent: 'space-around'}]}>
        <Button
          label="Batal"
          style={styles.button}
          background={Colors.white}
          borderWidth={1}
          color={Colors.primary.base}
          action={actionCancel}
        />
        <Button
          label="Simpan"
          style={styles.button}
          background={Colors.primary.base}
          action={handleSubmit}
          isDisabled={graduation_status ? false : true}
        />
      </View>
    </View>
  );
};

export default SwipeUpResult;
