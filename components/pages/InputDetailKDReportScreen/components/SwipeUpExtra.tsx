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
  type?: any;
  actionAdd?: any;
  class_id?: any;
  years_id: any;
};

const SwipeUpExtra = ({
  action,
  data,
  actionCancel,
  formState,
  setFormState,
  type,
  actionAdd,
}: Props) => {
  const [getAlert, setGetAlert] = useState(true);
  const [newForm, setNewForm] = useState({
    extracurricular_name: data?.extracurricular_name,
    score: data?.score,
    description: data?.description,
    predicate: data?.predicate,
  });
  const handleChangeText = (key, value) => {
    if (key === 'score') {
      const numericValue = value;
      if (!numericValue) {
        setGetAlert(true);
        return;
      }

      if (numericValue) {
        setGetAlert(numericValue > 100);
        setNewForm(prevState => ({
          ...prevState,
          [key]: value,
        }));
        return;
      }
    }

    setGetAlert(!value);
    setNewForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedExtracurricular = formState.extracurricular.map(item => {
      const isSameName =
        data?.extracurricular_name == item?.extracurricular_name;
      const isSameScore = data?.score == item?.score;
      if (isSameScore && isSameName) {
        return {
          ...item,
          extracurricular_name: newForm.extracurricular_name,
          score: parseInt(newForm.score),
          description: newForm.description,
        };
      }
      return item;
    });

    const updatedFormState = {
      ...formState,
      extracurricular: updatedExtracurricular,
    };
    setFormState(updatedFormState);
    action(updatedFormState);
  };

  const handleSubmitAdd = () => {
    const newExtracurricular = {
      extracurricular_name: newForm.extracurricular_name,
      description: newForm.description ?? '',
      score: parseInt(newForm.score),
      id_kkm: 0,
      kkm: 0,
      predicate: newForm.predicate ?? '',
    };
    actionAdd(newExtracurricular);
  };

  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.textTitleSwipe}>Input Nilai Ekstrakulikuler</Text>
      <Text style={styles.textSubTitle}>Judul</Text>
      <TextInput
        style={styles.input}
        placeholder={'Masukan Judul'}
        placeholderTextColor={'grey'}
        defaultValue={newForm?.extracurricular_name}
        onChangeText={text => {
          handleChangeText('extracurricular_name', text);
        }}
        editable={type ? true : false}
      />
      <Text style={styles.textSubTitle}>Nilai</Text>
      <TextInput
        style={styles.input}
        placeholder={'Masukan Nilai'}
        placeholderTextColor={'grey'}
        defaultValue={newForm?.score?.toString()}
        keyboardType="number-pad"
        onChangeText={text => {
          handleChangeText('score', text);
        }}
      />
      {getAlert && newForm.score > 100 && (
        <Text style={styles.textAlert}>Nilai tidak boleh melebihi 100.</Text>
      )}
      <Text style={styles.textSubTitle}>Predikat</Text>
      <TextInput
        style={styles.input}
        placeholder={'Masukan Predikat'}
        placeholderTextColor={'grey'}
        defaultValue={newForm?.predicate?.toString()}
        onChangeText={text => {
          handleChangeText('predicate', text);
        }}
      />
      <Text style={styles.textSubTitle}>Catatan/Deskripsi (opsional)</Text>
      <TextInput
        style={[styles.input, {height: 150}]}
        placeholder="Tulis deskripsi di sini..."
        defaultValue={newForm?.description}
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
          action={type ? handleSubmitAdd : handleSubmit}
          isDisabled={!newForm.extracurricular_name || !newForm.score}
        />
      </View>
    </View>
  );
};

export default SwipeUpExtra;
