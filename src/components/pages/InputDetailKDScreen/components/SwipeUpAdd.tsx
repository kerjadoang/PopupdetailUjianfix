import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import Arrow from '@assets/svg/blue_arrow_down.svg';
import Arrow_left from '@assets/svg/leftArrow.svg';
import Arrow_down from '@assets/svg/ic16_chevron_down.svg';
import {Button, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import InputKDForm from './InputKDForm';
type Props = {
  data?: any;
  type?: any;
  setType?: any;
  handleSubmit?: any;
  allKnowledge?: any;
  selectedItem?: any;
  setSelectedItem?: any;
  setShowSwipe?: any;
};

const SwipeUpAdd = ({
  data,
  type,
  setType,
  handleSubmit,
  allKnowledge,
  selectedItem,
  setSelectedItem,
  setShowSwipe,
}: Props) => {
  useEffect(() => {
    if (selectedItem && data) {
      try {
      } catch (error) {
        // console.error('Error filtering data:', error);
      }
    } else {
    }
  }, [selectedItem, data]);
  const [showAllKnowledge, setShowAllKnowledge] = useState<boolean>(false);
  const [basic_competency_detail, setBasic_competency_detail] = useState<any[]>(
    [],
  );

  const handleSelectedItemChange = (item: any) => {
    try {
      const filteredResult = data.filter(
        (dataItem: any) => dataItem?.subject_id === item?.subject_id,
      );

      const updatedBasicCompetencyDetail =
        filteredResult[0]?.basic_competency_student_assessment_detail?.map(
          (item: any, index: number) => ({
            no: index + 1,
            name: item?.name || '',
            chapter: item?.chapter,
            title: item?.name,
            notes: item?.notes,
          }),
        );

      setBasic_competency_detail(updatedBasicCompetencyDetail);
    } catch (error) {
      setBasic_competency_detail([]);
    }
  };
  const addBasicCompetencyDetail = () => {
    const newObject = {
      no: (basic_competency_detail || [])?.length + 1,
      name: '',
      chapter: selectedItem?.subject_name || '',
      title: '',
      notes: '',
    };

    setBasic_competency_detail([...(basic_competency_detail || []), newObject]);
  };
  const deleteBasicCompetencyDetail = (no: number) => {
    const updatedArray = basic_competency_detail.filter(item => item.no !== no);

    setBasic_competency_detail(updatedArray);
  };
  const handleTitleChange = (text: string, index: number) => {
    const updatedArray = basic_competency_detail.map((item, idx) => {
      if (idx === index) {
        return {...item, title: text, name: text};
      }
      return item;
    });

    setBasic_competency_detail(updatedArray);
  };

  const handleNotesChange = (text: string, index: number) => {
    const updatedArray = basic_competency_detail.map((item, idx) => {
      if (idx === index) {
        return {...item, notes: text};
      }
      return item;
    });

    setBasic_competency_detail(updatedArray);
  };
  return (
    <ScrollView>
      {!type ? (
        // Start select mapel
        // Mapel params : selectedItem
        <View style={styles.modalAdd}>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-between', marginBottom: 20},
            ]}>
            <Pressable onPress={() => setType(true)}>
              <Arrow_left />
            </Pressable>
            <Text style={[styles.textTitle, {textAlign: 'center'}]}>
              Pilih Mapel
            </Text>
            <Text style={[styles.textTitle, {textAlign: 'center'}]}>{''}</Text>
          </View>
          <View>
            <Text style={[styles.textSubTitle, {color: '#868E96'}]}>
              Mata Pelajaran
            </Text>
            <View style={[styles.row, {flexWrap: 'wrap', marginVertical: 16}]}>
              {allKnowledge?.map((item: any, i: number) => {
                if (i >= 3 && !showAllKnowledge) {
                  return <></>;
                }
                return (
                  <Pressable
                    style={
                      selectedItem?.subject_id === item?.subject_id
                        ? styles.choosenItem
                        : styles.unChooseItem
                    }
                    onPress={() => {
                      setSelectedItem(item);
                      handleSelectedItemChange(item);
                    }}>
                    <Text
                      style={[
                        selectedItem?.subject_id === item?.subject_id
                          ? styles.textChoosenItem
                          : styles.textUnchooseItem,
                      ]}>
                      {item?.subject_name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable onPress={() => setShowAllKnowledge(!showAllKnowledge)}>
              <View style={styles.row}>
                <Text style={[styles.textSubTitle, {color: '#868E96'}]}>
                  Tampilkan {showAllKnowledge ? 'Sedikit' : 'Semua'}
                </Text>
                <Arrow_down
                  width={16}
                  height={16}
                  style={{
                    marginLeft: 10,
                    transform: [{rotate: showAllKnowledge ? '180deg' : '0deg'}],
                  }}
                />
              </View>
            </Pressable>
            <MainView marginTop={24}>
              <Button
                label="Pilih"
                isDisabled={!selectedItem}
                style={{width: '100%'}}
                action={() => {
                  setType(true);
                }}
              />
            </MainView>
          </View>
        </View>
      ) : (
        // Main Modal Add KD
        <View style={styles.modalAdd}>
          <Text style={[styles.textTitle, {textAlign: 'center'}]}>
            Tambah KD
          </Text>
          <View>
            <Text style={[styles.textSubTitle, {marginBottom: 12}]}>Mapel</Text>
            <Pressable
              style={styles.buttonDropDown}
              onPress={() => setType(false)}>
              <Text
                style={[
                  styles.placeholder,
                  {
                    color: selectedItem?.subject_name
                      ? Colors.black
                      : undefined,
                    fontFamily: selectedItem?.subject_name
                      ? Fonts.SemiBoldPoppins
                      : undefined,
                  },
                ]}>
                {selectedItem?.subject_name ?? 'Pilih Mapel'}
              </Text>
              <Arrow width={16} height={16} />
            </Pressable>
            {basic_competency_detail?.length == 0 && (
              <View style={[styles.addKD, {marginVertical: 12}]}>
                <Text style={styles.textSubTitle}>Judul KD</Text>
                <Pressable
                  disabled={selectedItem ? false : true}
                  onPress={() => {
                    addBasicCompetencyDetail();
                  }}>
                  <Text
                    style={[
                      styles.textEdit,
                      {
                        fontFamily: 'Poppins-Bold',
                        color: selectedItem
                          ? Colors.primary.base
                          : Colors.dark.neutral60,
                      },
                    ]}>
                    + Tambah
                  </Text>
                </Pressable>
              </View>
            )}
            {basic_competency_detail?.length != 0 ? (
              <View>
                {basic_competency_detail?.map((item, key) => (
                  <InputKDForm
                    addBasicCompetencyDetail={addBasicCompetencyDetail}
                    deleteBasicCompetencyDetail={no =>
                      deleteBasicCompetencyDetail(no)
                    }
                    handleNotesChange={(text, key) =>
                      handleNotesChange(text, key)
                    }
                    handleTitleChange={(text, key) =>
                      handleTitleChange(text, key)
                    }
                    item={item}
                    key={key}
                    index={key}
                  />
                ))}
              </View>
            ) : null}
          </View>
          <View style={[styles.addKD, {margin: 5}]}>
            <Button
              label="Batal"
              style={{width: '47%'}}
              background={Colors.white}
              color={Colors.primary.base}
              borderWidth={1}
              action={() => setShowSwipe(false)}
            />
            <Button
              label="Simpan"
              style={{width: '47%'}}
              isDisabled={basic_competency_detail?.length == 0 && !selectedItem}
              action={() => {
                handleSubmit(basic_competency_detail, selectedItem?.subject_id);
                setBasic_competency_detail([]);
                setType(false);
                setShowSwipe(false);
              }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export {SwipeUpAdd};
