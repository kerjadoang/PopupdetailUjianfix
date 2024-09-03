import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {Button} from '@components/atoms';
import Colors from '@constants/colors';

type Props = {
  handleCancel?: any;
  handleSubmit?: any;
  academic_year_id?: any;
  class_id?: any;
  data?: any;
};
const SwipeUpAddExtra = ({
  handleCancel,
  handleSubmit,
  class_id,
  academic_year_id,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [formState, setFormState] = useState({
    academic_year_id: academic_year_id?.academic_phase[0]?.academic_year_id,
    class_id: class_id?.id,
    extracurricular_name: null,
    extracurricular_grade: null,
    extracurricular_predicate: null,
    description: null,
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
  return (
    <View style={styles.modal}>
      <Text style={styles.textTitleModal}>Input KKM Ekstrakurikuler </Text>
      <View style={{marginTop: 10}}>
        <Text style={styles.textSubAdd}>Nama Ekstrakurikuler</Text>
        <TextInput
          style={[styles.inputTitle, isFocused && styles.inputFocused]}
          placeholder="Masukan Nama Ekstrakurikulerl"
          onFocus={handleFocus}
          placeholderTextColor={'grey'}
          onBlur={handleBlur}
          onChangeText={text => {
            handleChangeText('extracurricular_name', text);
          }}
        />
        <View style={styles.rowAdd}>
          <View style={styles.containerInput}>
            <Text style={styles.textSubAdd}>Angka</Text>
            <TextInput
              style={[styles.inputExtra]}
              placeholder="Angka KKM"
              placeholderTextColor={'grey'}
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
              placeholderTextColor={'grey'}
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
          placeholderTextColor={'grey'}
          multiline
          textAlignVertical="top"
          numberOfLines={5}
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

export default SwipeUpAddExtra;
