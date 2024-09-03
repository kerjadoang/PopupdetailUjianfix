import {View, Text, Pressable, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import Arrow from '@assets/svg/blue_arrow_down.svg';
import {Button} from '@components/atoms';
import Colors from '@constants/colors';
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

const SwipeUpEdit = ({
  data,
  handleSubmit,
  selectedItem,
  setShowSwipe,
}: Props) => {
  useEffect(() => {
    if (data) {
      try {
        const filteredResult = data?.filter(
          (item: any) => item?.subject_id === selectedItem?.subject_id,
        );
        handleSelectedItemChange(filteredResult);
      } catch (error) {}
    } else {
    }
  }, [selectedItem, data]);

  const [basic_competency_detail, setBasic_competency_detail] = useState<any[]>(
    [],
  );

  const handleSelectedItemChange = (item: any) => {
    try {
      const filteredResult = data?.filter(
        (dataItem: any) => dataItem?.subject_id === item[0].subject_id,
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
      no: basic_competency_detail?.length + 1,
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
    <View style={{marginHorizontal: 16}}>
      <Text style={[styles.textTitle, {textAlign: 'center'}]}>Edit KD</Text>
      <View>
        <View>
          <Text style={styles.textSubTitle}>Mapel</Text>
          <Pressable style={styles.buttonDropDown}>
            <Text style={styles.textTitle}>
              {selectedItem?.subject_name
                ? selectedItem?.subject_name
                : 'Pilih Mapel'}
            </Text>
            <Arrow width={16} height={16} />
          </Pressable>
          <View style={{marginTop: 16}}>
            <FlatList<any>
              data={basic_competency_detail}
              renderItem={({item, index: key}) => {
                return (
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
                );
              }}
            />
            {/* {basic_competency_detail?.map((item, key) => (
            ))} */}
          </View>
        </View>
      </View>
      <View style={[styles.addKD]}>
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
          action={() => {
            setShowSwipe(false);
            handleSubmit(basic_competency_detail, selectedItem?.subject_id);
            setBasic_competency_detail([]);
          }}
        />
      </View>
    </View>
  );
};

export {SwipeUpEdit};
