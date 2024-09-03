import {View, Text, Pressable, FlatList, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import Arrow from '@assets/svg/ic_arrow_bottom_blue.svg';
import Arrow_up from '@assets/svg/ic24_chevron_down_blue.svg';
import Arrow_grey from '@assets/svg/ic_arrow_bottom_grey.svg';
import {Button, SwipeUp} from '@components/atoms';
import UseFormScoreKDSection from '../UseFormScoreKDSection';
import Pencil from '@assets/svg/ic_edit.svg';
import Colors from '@constants/colors';

type Props = {
  data?: any;
  student_data?: any;
  class_id?: any;
  years?: any;
  years_id?: any;
};
const ScoreKDSection = ({student_data, class_id, years, years_id}: Props) => {
  const [showSwipe, setShowSwipe] = useState(false);

  const [dropwDown, setDropdown] = useState(false);
  const [chooseList, setChooseList] = useState(null);
  const {
    allContent,
    selectedSubject,
    submit,
    showSwipeEdit,
    setShowSwipeEdit,
    chooseSubject,
    handleSetSubject,
    handleSetChoose,
    firstId,
  } = UseFormScoreKDSection(student_data, class_id, years, years_id);
  const [valueDaily, setValueDaily] = useState('');
  const [valueMidle, setValueMidle] = useState('');
  const [valueFinal, setValueFinal] = useState('');
  const [getAlertDaily, setGetAlertDaily] = useState(false);
  const [getAlertMidle, setGetAlertMidle] = useState(false);
  const [getAlertFinal, setGetAlertFinal] = useState(false);

  const isDisabled =
    !valueDaily ||
    !valueMidle ||
    !valueFinal ||
    getAlertDaily ||
    getAlertMidle ||
    getAlertFinal;
  const backgroundColor = isDisabled
    ? Colors.dark.neutral50
    : Colors.primary.base;

  const handleDailyInputChange = text => {
    handleInputChange(text, setValueDaily, setGetAlertDaily);
  };

  const handleMidleInputChange = text => {
    handleInputChange(text, setValueMidle, setGetAlertMidle);
  };

  const handleFinalInputChange = text => {
    handleInputChange(text, setValueFinal, setGetAlertFinal);
  };

  const handleInputChange = (text, setValue, setGetAlert) => {
    const numericValue = Number(text);

    if (isNaN(numericValue)) {
      setValue(text);
      setGetAlert(false);
      return;
    }

    if (numericValue > 100) {
      setValue(text);
      setGetAlert(true);
      return;
    }

    setValue(text);
    setGetAlert(false);
  };
  const renderItem = ({item}: {item: ItemData}) => {
    return (
      <View style={styles.containerList}>
        <Pressable
          style={[styles.listKD, {paddingHorizontal: 16}]}
          onPress={() => {
            setDropdown(!dropwDown);
            setChooseList(item);
          }}>
          <Text style={styles.textTitle}>{'Kompetensi Dasar ' + item?.no}</Text>
          {chooseList?.id === item?.id && dropwDown ? (
            <Arrow_up width={20} height={20} />
          ) : (
            <Arrow width={20} height={20} />
          )}
        </Pressable>
        {chooseList?.id === item?.id && dropwDown ? (
          <View style={{padding: 16}}>
            <View style={[styles.listContent]}>
              <View style={styles.content}>
                <Text style={styles.textSubTitle}>BAB {item?.no}</Text>
                <Text style={styles.textTitle}>{item?.name}</Text>
              </View>
              <Pressable onPress={() => setShowSwipeEdit(true)}>
                <Pencil width={24} height={24} />
              </Pressable>
            </View>
            <View>
              <Text style={styles.textSubTitle}>Penilaian Harian</Text>
              <Text style={styles.textTitle}>{item?.daily_assessment}</Text>
              <Text style={styles.textSubTitle}>Penilaian Tengah Semester</Text>
              <Text style={styles.textTitle}>{item?.midterm_assessment}</Text>
              <Text style={styles.textSubTitle}>Penilaian Akhir Semester</Text>
              <Text style={styles.textTitle}>{item?.final_assessment}</Text>
              <View style={styles.lineStrap} />
              <Text style={styles.textSubTitle}>Rata - rata</Text>
              <Text style={styles.textTitle}>
                {(
                  (item?.daily_assessment +
                    item?.midterm_assessment +
                    item?.final_assessment) /
                  3
                ).toFixed(2)}
              </Text>
              <View style={styles.line} />
              <Text style={styles.textSubTitle}>Catatan</Text>
              <Text style={styles.textTitle}>{item?.notes ?? '-'}</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.containerContent}>
      <Pressable
        style={styles.buttonDropdown}
        onPress={() => setShowSwipe(true)}>
        <Text style={styles.textDropdown}>
          {selectedSubject?.subject_name
            ? selectedSubject?.subject_name
            : firstId?.subject_name}
        </Text>
        <Arrow width={20} height={20} />
      </Pressable>
      <FlatList
        renderItem={renderItem}
        data={
          selectedSubject
            ? selectedSubject?.basic_competency_student_assessment_detail
            : firstId?.basic_competency_student_assessment_detail
        }
        keyExtractor={item => item?.id}
        style={{marginTop: 20}}
        extraData={
          selectedSubject
            ? selectedSubject?.basic_competency_student_assessment_detail
            : firstId?.basic_competency_student_assessment_detail
        }
      />
      <SwipeUp
        visible={showSwipe}
        height={200}
        onClose={() => setShowSwipe(false)}
        children={
          <View style={styles.swipeContainer}>
            <Text style={styles.textTitleSwipe}>Filter</Text>
            <View>
              <Text style={styles.textSubTitleSwipe}>Mata Pelajaran</Text>
              <View style={styles.row}>
                {allContent?.data?.map((item, key) => (
                  <Pressable
                    style={
                      chooseSubject?.subject_id === item?.subject_id
                        ? styles.buttonChoose
                        : styles.buttonUnchoose
                    }
                    key={key}
                    onPress={() => handleSetChoose(item)}>
                    <Text
                      style={
                        chooseSubject?.subject_id === item?.subject_id
                          ? styles.textChoose
                          : styles.textUnchoose
                      }>
                      {item?.subject_name}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Pressable style={styles.buttonDisplay}>
                <Text style={styles.textSubTitleSwipe}>Tampilkan Semua</Text>
                <Arrow_grey width={16} style={{marginLeft: 5}} />
              </Pressable>
            </View>
            <Button
              label="Terapkan"
              action={() => {
                setShowSwipe(false);
                handleSetSubject(chooseSubject);
              }}
            />
          </View>
        }
      />
      <SwipeUp
        height={200}
        visible={showSwipeEdit}
        onClose={() => setShowSwipeEdit(false)}
        children={
          <View style={styles.swipeContainer}>
            <Text style={styles.textTitleSwipe}>
              Input Nilai KD {chooseList?.no}
            </Text>
            <Text
              style={[
                styles.textSubTitleSwipe,
                {color: Colors.dark.neutral100, textAlign: 'center'},
              ]}>
              {selectedSubject?.subject_name} • {chooseList?.chapter}
            </Text>
            <View style={{marginTop: 20}}>
              <Text style={styles.textSubTitle}>Penilaian Harian</Text>
              <TextInput
                placeholder="Masukkan Nilai"
                style={styles.input}
                keyboardType="numeric"
                value={valueDaily}
                onChangeText={handleDailyInputChange}
              />
              {getAlertDaily && (
                <Text style={styles.textAlert}>
                  Nilai harian tidak boleh melebihi 100.
                </Text>
              )}

              <Text style={styles.textSubTitle}>Penilaian Tengah Semester</Text>
              <TextInput
                placeholder="Masukkan Nilai"
                style={styles.input}
                keyboardType="numeric"
                value={valueMidle}
                onChangeText={handleMidleInputChange}
              />
              {getAlertMidle && (
                <Text style={styles.textAlert}>
                  Nilai tengah semester tidak boleh melebihi 100.
                </Text>
              )}

              <Text style={styles.textSubTitle}>Penilaian Akhir Semester</Text>
              <TextInput
                placeholder="Masukkan Nilai"
                style={styles.input}
                keyboardType="numeric"
                value={valueFinal}
                onChangeText={handleFinalInputChange}
              />
              {getAlertFinal && (
                <Text style={styles.textAlert}>
                  Nilai akhir semester tidak boleh melebihi 100.
                </Text>
              )}
            </View>
            <View style={[styles.row, {justifyContent: 'space-around'}]}>
              <Button
                label="Batal"
                style={styles.button}
                background={Colors.white}
                borderWidth={1}
                color={Colors.primary.base}
                // action={() => setSelectedSubject(chooseSubject)}
              />
              <Button
                label="Simpan"
                style={styles.button}
                background={backgroundColor}
                isDisabled={isDisabled}
                action={() =>
                  submit(chooseList, valueDaily, valueMidle, valueFinal)
                }
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default ScoreKDSection;
