import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../style';
import Colors from '@constants/colors';
import {Button, InputText} from '@components/atoms';
interface IProps {
  title?: string;
  data?: any;
  onCancel?: any;
  onSaved?: any;
  error?: boolean;
  setError?: any;
  value?: string;
}

const SwipeUpActionSubject = (props: IProps) => {
  const [subjectName, setSubjectName] = useState<string>('');

  useEffect(() => {
    props?.setError(false);
  }, [subjectName]);

  useEffect(() => {
    if (props?.value) {
      setSubjectName(props?.value?.name);
    }
  }, [props?.value]);
  return (
    <View style={styles.swipeUpContainer}>
      <Text style={styles.swipeUpTitle}>{props.title}</Text>
      <Text style={styles.titleButton}>Judul Mata Pelajaran</Text>
      <InputText
        placeholder="Judul Mata Pelajaran"
        placeholderTextColor={Colors.dark.neutral50}
        onChangeText={setSubjectName}
        inputTextStyle={styles.inputText}
        value={subjectName}
        error={props?.error}
        borderWidth={props?.error ? 1 : 0}
      />
      {props?.error ? (
        <Text
          style={[
            styles.titleButton,
            {
              color: Colors.danger.base,
              fontSize: 12,
              lineHeight: 16,
              marginTop: -20,
              marginBottom: 32,
            },
          ]}>
          Judul {subjectName} sudah ada. Gunakan judul lain.
        </Text>
      ) : null}
      <View style={styles.bottomSwipeUpContainer}>
        <Button
          label={'Batal'}
          style={[styles.buttonSwipeUp, {marginRight: 6}]}
          fontSize={18}
          outline
          borderWidth={1}
          action={props?.onCancel}
        />
        <Button
          label={'Simpan'}
          style={[styles.buttonSwipeUp]}
          fontSize={18}
          isDisabled={subjectName === ''}
          action={() => props?.onSaved(subjectName, props?.value?.id)}
        />
      </View>
    </View>
  );
};

export default SwipeUpActionSubject;
