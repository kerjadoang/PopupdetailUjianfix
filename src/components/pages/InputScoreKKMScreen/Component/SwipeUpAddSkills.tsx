import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import Left from '@assets/svg/ic16_chevron_left.svg';

type Props = {
  handleCancel?: any;
  handleSubmit?: any;
  data?: any;
  academic_year_id?: any;
  class_id?: any;
  handleCount?: any;
  allKKMValue?: any;
  setAllKKMValue?: any;
};

const SwipeUpAddSkills = ({
  handleCancel,
  handleSubmit,
  data,
  class_id,
  academic_year_id,
  handleCount,
  allKKMValue,
  setAllKKMValue,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [formState, setFormState] = useState({
    academic_year_id: academic_year_id?.academic_phase[0]?.academic_year_id,
    class_id: class_id?.id,
    subject_name: '',
    kkm: 0,
    excelent_start: 0,
    excelent_end: 0,
    very_good_end: 0,
    very_good_start: 0,
    good_start: 0,
    good_end: 0,
    failed: 0,
  });
  const handleChangeText = (key: any, value: any) => {
    let intValue = value !== '' ? parseInt(value) : 0;
    let updateState = {};

    switch (key) {
      case 'excelent_end':
        updateState = {[key]: intValue, excelent_end: intValue};
        break;
      case 'excelent_start':
        updateState =
          intValue > formState.excelent_end
            ? {excelent_start: ''}
            : {[key]: intValue, excelent_start: intValue};
        break;

      case 'very_good_end':
        updateState =
          intValue > formState.excelent_start
            ? {very_good_end: ''}
            : {[key]: intValue, very_good_end: intValue};
        break;

      case 'very_good_start':
        updateState =
          intValue > formState.very_good_end
            ? {very_good_start: ''}
            : {[key]: intValue, very_good_start: intValue};
        break;

      case 'good_end':
        updateState =
          intValue > formState.very_good_start
            ? {good_end: ''}
            : {[key]: intValue, good_end: intValue};
        break;

      case 'good_start':
        updateState =
          intValue > formState.good_end
            ? {good_start: ''}
            : {[key]: intValue, good_start: intValue};
        break;

      case 'failed':
        updateState =
          intValue > formState.good_start
            ? {failed: ''}
            : {[key]: intValue, failed: intValue};
        break;

      default:
        updateState = {[key]: intValue};
        break;
    }

    setFormState(prevState => ({
      ...prevState,
      ...updateState,
    }));
  };

  const handleChangeTextTitle = (key: any, value: any) => {
    let intValue = value;
    let updateState = {};
    updateState = {[key]: intValue};
    setFormState(prevState => ({
      ...prevState,
      ...updateState,
    }));
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    setFormState(prevState => ({
      ...prevState,
      excelent_start: allKKMValue?.excelent_start,
      excelent_end: allKKMValue?.excelent_end,
      very_good_end: allKKMValue?.very_good_end,
      very_good_start: allKKMValue?.very_good_start,
      good_start: allKKMValue?.good_start,
      good_end: allKKMValue?.good_end,
      failed: allKKMValue?.failed,
    }));
  }, [allKKMValue, data, data?.kkm]);
  return (
    <View style={styles.modal}>
      <Text style={styles.textTitleModal}>Input KKM KETERAMPILAN</Text>
      <View style={{marginTop: 10}}>
        <Text style={styles.textSubAdd}>Mata Pelajaran</Text>
        <TextInput
          style={[styles.inputTitle, isFocused && styles.inputFocused]}
          placeholder="Masukkan Nama mapel"
          placeholderTextColor={'grey'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={text => {
            handleChangeTextTitle('subject_name', text);
          }}
        />
      </View>
      <View style={styles.modal}>
        <Text style={styles.textTitleModal}>Input KKM</Text>
        <View style={[styles.row]}>
          <View style={styles.contentInput}>
            <Text style={[styles.textSubTitle, {color: 'black'}]}>KKM</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              textAlign="center"
              value={formState?.kkm?.toString() ?? ''}
              placeholder="0"
              onChangeText={text => {
                handleChangeText('kkm', text);
                handleCount('kkm', text);
              }}
            />
          </View>
          <View style={styles.contentInput}>
            <Text style={[styles.textSubTitle, {color: 'black'}]}>Rentang</Text>
            <TextInput
              keyboardType="numeric"
              style={[styles.input, {backgroundColor: '#E7EBEE'}]}
              textAlign="center"
              editable={false}
              placeholder="0"
              value={(allKKMValue?.range ?? 0)?.toFixed(1)}
            />
          </View>
          <View style={styles.contentInput}>
            <Text style={[styles.textSubTitle, {color: 'black'}]}>
              Rentang dibulatkan
            </Text>
            <TextInput
              style={[styles.input, , {backgroundColor: '#E7EBEE'}]}
              textAlign="center"
              editable={false}
              keyboardType="numeric"
              placeholder="0"
              value={allKKMValue?.range_rounded?.toString()}
            />
          </View>
        </View>
        <View style={styles.dashed} />
        <View style={[styles.row, {flexWrap: 'wrap'}]}>
          <View style={styles.contentInput}>
            <Text style={[styles.textSubTitle, {color: 'black'}]}>
              Execellent
            </Text>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <TextInput
                keyboardType="numeric"
                style={[styles.input, {backgroundColor: '#E7EBEE'}]}
                textAlign="center"
                editable={false}
                placeholder="0"
                placeholderTextColor={'black'}
                value={allKKMValue?.excelent_start?.toString()}
                onChangeText={text => {
                  handleChangeText('excelent_start', text);
                  handleCount('exelent_start', text);
                }}
              />
              <Text
                style={{
                  color: Colors.dark.neutral60,
                  textAlignVertical: 'center',
                  fontSize: 16,
                }}>
                {' '}
                -{' '}
              </Text>
              <TextInput
                keyboardType="numeric"
                style={[styles.input, {backgroundColor: '#E7EBEE'}]}
                textAlign="center"
                editable={false}
                placeholder="0"
                placeholderTextColor={'black'}
                value={allKKMValue?.excelent_end?.toString()}
                onChangeText={text => {
                  handleChangeText('excelent_end', text);
                }}
              />
            </View>
          </View>
          <View style={styles.contentInput}>
            <Text style={[styles.textSubTitle, {color: 'black'}]}>
              Very Good
            </Text>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <TextInput
                keyboardType="numeric"
                style={[styles.input, {backgroundColor: '#E7EBEE'}]}
                textAlign="center"
                editable={false}
                placeholder="0"
                placeholderTextColor={'black'}
                value={allKKMValue?.very_good_start?.toString()}
                onChangeText={text => {
                  handleChangeText('very_good_start', text);
                }}
              />
              <Text
                style={{
                  color: Colors.dark.neutral60,
                  textAlignVertical: 'center',
                  fontSize: 16,
                }}>
                {' '}
                -{' '}
              </Text>

              <TextInput
                keyboardType="numeric"
                style={[styles.input, {backgroundColor: '#E7EBEE'}]}
                textAlign="center"
                editable={false}
                placeholder="0"
                placeholderTextColor={'black'}
                value={formState?.very_good_end?.toString()}
                onChangeText={text => {
                  handleChangeText('very_good_end', text);
                }}
              />
            </View>
          </View>
          <View style={styles.contentInput}>
            <Text style={[styles.textSubTitle, {color: 'black'}]}>Good</Text>
            <View style={styles.row}>
              <TextInput
                keyboardType="numeric"
                style={[styles.input, {backgroundColor: '#E7EBEE'}]}
                textAlign="center"
                editable={false}
                placeholder="0"
                placeholderTextColor={'black'}
                value={allKKMValue?.good_start?.toString()}
                onChangeText={text => {
                  handleChangeText('good_start', text);
                }}
              />
              <Text
                style={{
                  color: Colors.dark.neutral60,
                  textAlignVertical: 'center',
                  fontSize: 16,
                }}>
                {' '}
                -{' '}
              </Text>

              <TextInput
                keyboardType="numeric"
                style={[styles.input, {backgroundColor: '#E7EBEE'}]}
                textAlign="center"
                editable={false}
                placeholder="0"
                placeholderTextColor={'black'}
                value={allKKMValue?.good_end?.toString()}
                onChangeText={text => {
                  handleChangeText('good_end', text);
                }}
              />
            </View>
          </View>
          <View style={styles.contentInput}>
            <Text style={[styles.textSubTitle, {color: 'black'}]}>Failed</Text>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <Left width={20} style={{alignSelf: 'center'}} />
              <TextInput
                keyboardType="numeric"
                style={[styles.input, {backgroundColor: '#E7EBEE'}]}
                textAlign="center"
                editable={false}
                placeholder="0"
                placeholderTextColor={'black'}
                value={allKKMValue?.failed?.toString()}
                onChangeText={text => {
                  handleChangeText('failed', text);
                }}
              />
            </View>
          </View>
        </View>

        <View style={[styles.row, {alignSelf: 'center', marginVertical: 10}]}>
          <Button
            label="Batal"
            background="white"
            color={Colors.primary.base}
            borderWidth={1}
            style={{width: '40%', height: 40, marginRight: 10}}
            action={() => {
              handleCancel();
              setAllKKMValue(null);
            }}
          />
          <Button
            label="Simpan"
            style={[{width: '40%', height: 40}]}
            background={Colors.primary.base}
            isDisabled={!formState.subject_name || !formState.kkm}
            action={() => {
              handleSubmit(formState);
              setAllKKMValue(null);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SwipeUpAddSkills;
