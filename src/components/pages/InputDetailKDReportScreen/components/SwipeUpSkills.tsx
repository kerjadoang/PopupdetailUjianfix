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

const SwipeUpSkills = ({
  action,
  data,
  actionCancel,
  formState,
  setFormState,
}: Props) => {
  const [getAlert, setGetAlert] = useState(false);
  const [newForm, setNewForm] = useState({
    score: data?.score,
    description: data?.description,
  });
  const handleChangeText = (key, value) => {
    if (key === 'score') {
      const numericValue = Number(value);

      if (isNaN(numericValue)) {
        setGetAlert(false);
        setNewForm(prevState => ({
          ...prevState,
          [key]: value,
        }));
        return;
      }

      if (numericValue > 100) {
        setGetAlert(true);
        return;
      }
    }

    setGetAlert(false);
    setNewForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedSkills = formState.skills.map(item => {
      if (data?.id_kkm === item?.id_kkm) {
        return {
          ...item,
          score: parseInt(newForm.score),
          description: newForm.description,
        };
      }
      return item;
    });

    const updatedFormState = {
      ...formState,
      skills: updatedSkills,
    };
    setFormState(updatedFormState);
    action(updatedFormState);
  };

  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.textTitleSwipe}>Input Nilai Keterampilan</Text>
      <View style={styles.rowCenter}>
        <Text style={styles.textTitle}>Mata Pelajaran: </Text>
        <Text style={styles.textTitle}>{data?.subject_name}</Text>
      </View>
      <Text style={styles.textSubTitle}>Nilai</Text>
      <TextInput
        style={styles.input}
        placeholder={'Masukan Nilai'}
        placeholderTextColor={'grey'}
        onChangeText={text => {
          handleChangeText('score', text);
        }}
      />
      {getAlert && (
        <Text style={styles.textAlert}>Nilai tidak boleh melebihi 100.</Text>
      )}
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
          action={handleSubmit}
          isDisabled={getAlert}
        />
      </View>
    </View>
  );
};

export default SwipeUpSkills;
