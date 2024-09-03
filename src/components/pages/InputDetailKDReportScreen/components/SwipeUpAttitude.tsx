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

const SwipeUpAttitude = ({
  action,
  data,
  actionCancel,
  formState,
  setFormState,
}: Props) => {
  const [newForm, setNewForm] = useState({
    title: data?.title,
    description: data?.description,
  });
  const handleChangeText = (key, value) => {
    setNewForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedAttitude = formState.attitude.map(item => {
      if (data?.title === item.title) {
        return {
          ...item,
          title: newForm.title,
          description: newForm.description,
        };
      }
      return item;
    });

    const updatedFormState = {
      ...formState,
      attitude: updatedAttitude,
    };
    setFormState(updatedFormState);
    action(updatedFormState);
  };

  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.textTitleSwipe}>Input Nilai Sikap</Text>
      <Text style={styles.textSubTitle}>Judul Sikap</Text>
      <TextInput
        style={styles.input}
        placeholder={data?.title}
        placeholderTextColor={'grey'}
        onChangeText={text => {
          handleChangeText('title', text);
        }}
      />
      <Text style={styles.textSubTitle}>Catatan/Deskripsi (opsional)</Text>
      <TextInput
        style={[styles.input, {height: 150}]}
        placeholder="Tulis deskripsi di sini..."
        placeholderTextColor={'grey'}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        onChangeText={text => {
          handleChangeText('description', text);
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
          action={
            handleSubmit
            // action(formState);
          }
        />
      </View>
    </View>
  );
};

export default SwipeUpAttitude;
