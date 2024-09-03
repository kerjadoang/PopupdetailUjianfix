/* eslint-disable react-native/no-inline-styles */
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
};

interface FormTitle {
  title?: string;
  size?: string;
  description?: string;
}

const SwipeUpGrow = ({
  action,
  data,
  actionCancel,
  formState,
  setFormState,
  type,
  actionAdd,
}: Props) => {
  const [newForm, setNewForm] = useState<FormTitle>({
    title: data?.title,
    size: data?.size,
    description: data?.description,
  });
  const handleChangeText = (key: any, value: any) => {
    setNewForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedPhysical_development_record =
      formState.physical_development_record.map((item: any) => {
        if (data?.title === item?.title) {
          return {
            ...item,
            title: newForm.title,
            size: newForm.size,
            description: newForm.description,
          };
        }
        return item;
      });

    const updatedFormState = {
      ...formState,
      physical_development_record: updatedPhysical_development_record,
    };
    setFormState(updatedFormState);
    action(updatedFormState);
  };

  const handleSubmitAdd = () => {
    const newPhysicalDevelopmentRecord = {
      title: newForm.title,
      size: newForm.size,
      description: newForm.description,
    };

    const updatedPhysicalDevelopmentRecord = [
      ...formState.physical_development_record,
      newPhysicalDevelopmentRecord,
    ];

    const updatedFormState = {
      ...formState,
      physical_development_record: updatedPhysicalDevelopmentRecord,
    };

    setFormState(updatedFormState);
    actionAdd(updatedFormState);
  };

  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.textTitleSwipe}>Input Perkembangan Fisik</Text>
      <Text style={styles.textSubTitle}>Judul</Text>
      <TextInput
        style={styles.input}
        defaultValue={type !== '' || !data?.title ? '' : data?.title}
        placeholder={!data?.title ? 'Masukan Judul' : data?.title}
        placeholderTextColor={type ? 'grey' : 'black'}
        onChangeText={text => {
          handleChangeText('title', text);
        }}
      />
      <Text style={styles.textSubTitle}>Ukuran</Text>
      <TextInput
        style={styles.input}
        defaultValue={data?.size}
        placeholder={data?.size || 'Tulis ukuran di sini...'}
        placeholderTextColor={data.size ? 'black' : 'grey'}
        onChangeText={text => {
          handleChangeText('size', text);
        }}
      />
      <Text style={styles.textSubTitle}>Catatan/Deskripsi (opsional)</Text>
      <TextInput
        style={[styles.input, {height: 150, paddingTop: 14}]}
        placeholder="Tulis deskripsi di sini..."
        placeholderTextColor={'grey'}
        multiline
        defaultValue={data?.description}
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
        />
      </View>
    </View>
  );
};

export default SwipeUpGrow;
