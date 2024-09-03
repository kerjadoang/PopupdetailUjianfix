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

const SwipeUpKnowledge = ({
  action,
  data,
  actionCancel,
  formState,
  setFormState,
}: Props) => {
  const [newForm, setNewForm] = useState({
    ...data,
  });

  const handleChangeText = (key, value) => {
    setNewForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedKnowledge = formState.knowledge.map(item => {
      if (data?.id_kkm === item?.id_kkm) {
        return {
          ...item,
          description: newForm.description,
        };
      }
      return item;
    });

    const updatedFormState = {
      ...formState,
      knowledge: updatedKnowledge,
    };
    setFormState(updatedFormState);
    action(updatedFormState);
  };

  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.textTitleSwipe}>Input Nilai Pengetahuan</Text>
      <View style={[styles.rowCenter, {marginVertical: 12}]}>
        <Text style={[styles.textTitle, {fontSize: 16}]}>Mata Pelajaran: </Text>
        <Text style={[styles.textTitle, {fontSize: 16}]}>
          {data?.subject_name}
        </Text>
      </View>
      <Text style={[styles.textSubTitle, {marginBottom: 8}]}>
        Catatan/Deskripsi (opsional)
      </Text>
      <TextInput
        style={[styles.input, {height: 150}]}
        defaultValue={newForm?.description}
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

export default SwipeUpKnowledge;
