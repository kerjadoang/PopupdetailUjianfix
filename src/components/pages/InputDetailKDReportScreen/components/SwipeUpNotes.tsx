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

const SwipeUpNotes = ({
  action,
  actionCancel,
  formState,
  setFormState,
}: Props) => {
  const [notes, setNotes] = useState(formState?.suggestion ?? '');

  const handleChangeText = (key, value) => {
    setNotes(value);
  };

  const handleSubmit = () => {
    const updatedFormState = {
      ...formState,
      suggestion: notes,
    };
    setFormState(updatedFormState);
    action(updatedFormState);
  };

  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.textTitleSwipe}>Input Saran</Text>
      <Text style={styles.textSubTitle}>Catatan Saran</Text>
      <TextInput
        style={[styles.input, {height: 150}]}
        defaultValue={notes}
        placeholder="Tulis deskripsi di sini..."
        placeholderTextColor={'grey'}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        onChangeText={text => {
          handleChangeText('suggestion', text);
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
          isDisabled={notes ? false : true}
        />
      </View>
    </View>
  );
};

export default SwipeUpNotes;
