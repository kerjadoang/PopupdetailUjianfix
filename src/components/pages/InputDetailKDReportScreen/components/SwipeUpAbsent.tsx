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

const SwipeUpAbsent = ({
  action,
  data,
  actionCancel,
  formState,
  setFormState,
}: Props) => {
  const [newForm, setNewForm] = useState({
    sick: formState?.sick,
    alpha: formState?.alpha,
    permission: formState?.permission,
  });

  const handleChangeText = (key, value) => {
    setNewForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedFormState = {
      ...formState,
      sick: parseInt(newForm?.sick),
      alpha: parseInt(newForm?.alpha),
      permission: parseInt(newForm?.permission),
    };
    setFormState(updatedFormState);
    action(updatedFormState);
  };
  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.textTitleSwipe}>Input Ketidakhadiran</Text>
      <View style={styles.rowAround}>
        <View>
          <Text style={styles.textSubTitle}>Sakit</Text>
          <TextInput
            style={[styles.inputAbsent]}
            defaultValue={data?.sick.toString()}
            placeholderTextColor={'black'}
            textAlignVertical="top"
            onChangeText={text => {
              handleChangeText('sick', text);
            }}
          />
        </View>
        <View>
          <Text style={styles.textSubTitle}>Izin</Text>
          <TextInput
            style={[styles.inputAbsent]}
            defaultValue={data?.permission.toString()}
            placeholderTextColor={'black'}
            textAlignVertical="top"
            onChangeText={text => {
              handleChangeText('permission', text);
            }}
          />
        </View>
        <View>
          <Text style={styles.textSubTitle}>Alpha</Text>
          <TextInput
            style={[styles.inputAbsent]}
            defaultValue={data?.alpha.toString()}
            placeholderTextColor={'black'}
            textAlignVertical="top"
            onChangeText={text => {
              handleChangeText('alpha', text);
            }}
          />
        </View>
      </View>
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
        />
      </View>
    </View>
  );
};

export default SwipeUpAbsent;
