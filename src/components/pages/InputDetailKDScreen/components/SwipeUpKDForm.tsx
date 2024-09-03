import {View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import Arrow from '@assets/svg/blue_arrow_down.svg';
import Arrow_left from '@assets/svg/leftArrow.svg';
import Arrow_down from '@assets/svg/ic16_chevron_down.svg';
import {Button, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import InputKDForm from './InputKDForm';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

type Props = {
  data?: any;
  type?: any;
  setType?: any;
  handleSubmit?: any;
  allKnowledge?: any;
  selectedItem?: any;
  setSelectedItem?: any;
  setShowSwipe?: any;
  swipeUpType?: SwipeUpKDFormType;
  onButtonCancelClick?: VoidCallBack;
};

const SwipeUpKDForm = ({
  data,
  handleSubmit,
  allKnowledge,
  selectedItem,
  setSelectedItem,
  setShowSwipe,
  swipeUpType,
  onButtonCancelClick,
}: Props) => {
  const [isChooseMapel, setIsChooseMapel] = useState<boolean>(false);
  const [showAllKnowledge, setShowAllKnowledge] = useState<boolean>(false);
  const [tempSubject, setTempSubject] = useState<any>(selectedItem);
  const [basic_competency_detail, setBasic_competency_detail] = useState<any[]>(
    [],
  );
  // const basiccompetency = basic_competency_detail?.firstItem?.();
  const totalHeight = showAllKnowledge ? 200 : 100;
  const subjectId = tempSubject?.subject_id || tempSubject?.id;
  const subjectName = tempSubject?.subject_name || tempSubject?.name;

  useEffect(() => {
    if (selectedItem && data) {
      try {
        if (selectedItem?.basic_competency_student_assessment_detail) {
          setBasic_competency_detail(
            selectedItem.basic_competency_student_assessment_detail,
          );
        }
      } catch (error) {}
    }
  }, [selectedItem, data]);

  const handleSelectedItemChange = (subject: any) => {
    // if (swipeUpType === 'edit') {
    //   return;
    // }

    setTempSubject(subject);

    const updatedBasicCompetencyDetail = basic_competency_detail?.map(
      basiccompetency => ({...basiccompetency, name: subject?.name}),
    );

    setBasic_competency_detail(updatedBasicCompetencyDetail || []);
  };
  const addBasicCompetencyDetail = () => {
    const nextBasicCompetencyNumber =
      (basic_competency_detail || [])?.length + 1;
    const newObject = {
      no: nextBasicCompetencyNumber,
      name: subjectName || '',
      chapter: '',
      title: 'Kompetensi Dasar ' + nextBasicCompetencyNumber,
      notes: '',
    };
    setBasic_competency_detail([...(basic_competency_detail || []), newObject]);
  };
  const deleteBasicCompetencyDetail = (no: number) => {
    const updatedArray = basic_competency_detail.filter(item => item.no !== no);

    setBasic_competency_detail(updatedArray || []);
  };
  const handleTitleChange = (text: string, index: number) => {
    const updatedArray = basic_competency_detail.map((item, idx) => {
      if (idx === index) {
        return {...item, chapter: text};
      }
      return item;
    });

    setBasic_competency_detail(updatedArray || []);
  };

  const handleNotesChange = (text: string, index: number) => {
    const updatedArray = basic_competency_detail.map((item, idx) => {
      if (idx === index) {
        return {...item, notes: text};
      }
      return item;
    });

    setBasic_competency_detail(updatedArray || []);
  };

  return (
    <MainView
      maxHeight={WINDOW_HEIGHT * 0.6}
      paddingBottom={basic_competency_detail?.length != 0 ? 40 : 0}>
      {/* <ScrollView style={{maxHeight: WINDOW_HEIGHT * 0.7}}> */}
      {isChooseMapel ? (
        // Start select mapel
        // Mapel params : selectedItem
        <View style={[styles.modalAdd, {maxHeight: WINDOW_HEIGHT * 0.7}]}>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-between', marginBottom: 20},
            ]}>
            <Pressable onPress={() => setIsChooseMapel(false)}>
              <Arrow_left />
            </Pressable>
            <Text style={[styles.textTitle, {textAlign: 'center'}]}>
              {isChooseMapel || !subjectName ? 'Pilih Mapel' : subjectName}
            </Text>
            <Text style={[styles.textTitle, {textAlign: 'center'}]}>{''}</Text>
          </View>
          <View>
            <Text style={[styles.textSubTitle, {color: '#868E96'}]}>
              Mata Pelajaran
            </Text>
            <FlatList
              scrollEnabled={showAllKnowledge}
              style={{maxHeight: totalHeight}}
              contentContainerStyle={{flexGrow: 1}}
              columnWrapperStyle={{flexWrap: 'wrap'}}
              numColumns={3}
              data={allKnowledge}
              renderItem={({item}) => {
                return (
                  <Pressable
                    key={item?.id}
                    style={
                      subjectId === item?.id
                        ? styles.choosenItem
                        : styles.unChooseItem
                    }
                    onPress={() => {
                      // setBasic_competency_detail([]);
                      handleSelectedItemChange(item);
                    }}>
                    <Text
                      style={[
                        subjectId === item?.id
                          ? styles.textChoosenItem
                          : styles.textUnchooseItem,
                      ]}>
                      {item?.name}
                    </Text>
                  </Pressable>
                );
              }}
              keyExtractor={item => item.id || item.subject_id}
            />
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
                isDisabled={!subjectId}
                style={{width: '100%'}}
                action={() => {
                  // setType(true);
                  setIsChooseMapel(false);
                }}
              />
            </MainView>
          </View>
        </View>
      ) : (
        // Main Modal Add KD
        <View style={styles.modalAdd}>
          <Text style={[styles.textTitle, {textAlign: 'center'}]}>
            {swipeUpType === 'add' ? 'Tambah' : 'Edit'} KD
          </Text>
          <ScrollView>
            <View>
              <Text style={[styles.textSubTitle, {marginBottom: 12}]}>
                Mapel
              </Text>
              <Pressable
                style={styles.buttonDropDown}
                onPress={() => setIsChooseMapel(true)}>
                <Text
                  style={[
                    styles.placeholder,
                    {
                      color: tempSubject?.name ? Colors.black : undefined,
                      fontFamily: tempSubject?.name
                        ? Fonts.SemiBoldPoppins
                        : undefined,
                    },
                  ]}>
                  {subjectName ?? 'Pilih Mapel'}
                </Text>
                <Arrow width={16} height={16} />
              </Pressable>
              {basic_competency_detail?.length == 0 && (
                <View style={[styles.addKD, {marginVertical: 12}]}>
                  <Text style={styles.textSubTitle}>Judul KD</Text>
                  <Pressable
                    disabled={tempSubject ? false : true}
                    onPress={() => {
                      addBasicCompetencyDetail();
                    }}>
                    <Text
                      style={[
                        styles.textEdit,
                        {
                          fontFamily: 'Poppins-Bold',
                          color: tempSubject
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
            <View style={[styles.addKD, {marginHorizontal: 5, marginTop: 8}]}>
              <Button
                label="Batal"
                style={{width: '47%'}}
                background={Colors.white}
                color={Colors.primary.base}
                borderWidth={1}
                action={() => {
                  onButtonCancelClick?.();
                  return setShowSwipe(false);
                }}
              />
              <Button
                label="Simpan"
                style={{width: '47%'}}
                isDisabled={
                  basic_competency_detail?.length === 0 ||
                  basic_competency_detail.some(KD => {
                    return KD.chapter === '';
                  })
                }
                action={() => {
                  handleSubmit(
                    basic_competency_detail,
                    swipeUpType === 'edit' ? selectedItem?.id : null,
                    subjectId,
                  );

                  setBasic_competency_detail([]);
                  // setType(true);
                  setSelectedItem(undefined);
                  setShowSwipe(false);
                }}
              />
            </View>
          </ScrollView>
        </View>
      )}
      {/* </ScrollView> */}
    </MainView>
  );
};

export {SwipeUpKDForm};
