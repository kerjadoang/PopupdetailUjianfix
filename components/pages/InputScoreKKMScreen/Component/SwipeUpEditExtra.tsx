import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import {Button, MainView} from '@components/atoms';
import Colors from '@constants/colors';

type Props = {
  handleCancel?: any;
  handleSubmit?: any;
  academic_year_id?: any;
  class_id?: any;
  data?: any;
};
const SwipeUpEditExtra = ({handleCancel, handleSubmit, data}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [formState, setFormState] = useState({
    extracurricular_name: data?.extracurricular_name,
    extracurricular_grade: data?.extracurricular_grade,
    extracurricular_predicate: data?.extracurricular_predicate,
    description: data?.description,
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleChangeText = (key, value) => {
    let intValue = value;
    let updateState = {};
    updateState = {[key]: intValue};
    setFormState(prevState => ({
      ...prevState,
      ...updateState,
    }));
  };
  useEffect(() => {
    setFormState(prevState => ({
      ...prevState,
      extracurricular_name: formState?.extracurricular_name,
      extracurricular_grade: formState?.extracurricular_grade,
      extracurricular_predicate: formState?.extracurricular_predicate,
      description: formState?.description,
    }));
  }, [
    formState?.description,
    formState?.extracurricular_grade,
    formState?.extracurricular_name,
    formState?.extracurricular_predicate,
  ]);
  return (
    <View style={styles.modal}>
      <Text style={styles.textTitleModal}>Input KKM Ekstrakurikuler </Text>
      <View style={{marginTop: 10}}>
        <MainView marginBottom={12}>
          <Text style={styles.textSubAdd}>Nama Ekstrakurikuler</Text>
          <TextInput
            style={[styles.inputTitle, isFocused && styles.inputFocused]}
            placeholder="Masukan Nama Ekstrakurikuler"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={formState?.extracurricular_name}
            onChangeText={text => {
              handleChangeText('extracurricular_name', text);
            }}
          />
        </MainView>
        <View style={styles.rowAdd}>
          <View style={styles.containerInput}>
            <Text style={styles.textSubAdd}>Angka</Text>
            <TextInput
              style={[styles.inputExtra]}
              placeholderTextColor={'black'}
              placeholder={data?.extracurricular_grade?.toString()}
              keyboardType="numeric"
              onChangeText={text => {
                handleChangeText('extracurricular_grade', parseInt(text));
              }}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.textSubAdd}>Predikat</Text>
            <TextInput
              style={[styles.inputExtra]}
              placeholder="Predikat Murid"
              value={formState?.extracurricular_predicate}
              onChangeText={text => {
                handleChangeText('extracurricular_predicate', text);
              }}
            />
          </View>
        </View>
        <Text style={styles.textSubAdd}>Deskripsi</Text>
        <TextInput
          style={[styles.inputExtra, {height: 120}]}
          placeholder="Masukan Deskripsi"
          multiline
          textAlignVertical="top"
          numberOfLines={5}
          value={formState?.description}
          onChangeText={text => {
            handleChangeText('description', text);
          }}
        />
        <View style={[styles.row, {alignSelf: 'center', marginVertical: 10}]}>
          <Button
            label="Batal"
            background="white"
            color={Colors.primary.base}
            borderWidth={1}
            style={{width: '40%', height: 40, marginRight: 10}}
            action={handleCancel}
          />
          <Button
            label="Simpan"
            style={[{width: '40%', height: 40}]}
            background={Colors.primary.base}
            action={() => handleSubmit(formState)}
            isDisabled={
              formState?.description &&
              formState?.extracurricular_name &&
              formState?.extracurricular_grade &&
              formState?.extracurricular_predicate
                ? false
                : true
            }
          />
        </View>
      </View>
    </View>
  );
};

export default SwipeUpEditExtra;
