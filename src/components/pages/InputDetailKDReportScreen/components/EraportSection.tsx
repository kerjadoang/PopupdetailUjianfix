import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import Robot from '@assets/svg/robot_sedih.svg';
import {styles} from '../styles';
import Arrow from '@assets/svg/ic_arrow_bottom_blue.svg';
import Arrow_up from '@assets/svg/ic24_chevron_up_blue.svg';
import {dataList} from '../useDummy';
import {PopUp, SwipeUp} from '@components/atoms';
import DropdownAttitude from './DropdownAttitude';
import DropdownKnowledge from './DropdownKnowledge';
import DropdownSkills from './DropdownSkills';
import DropdownExtra from './DropdownExtra';
import DropdownGrow from './DropdownGrow';
import DropdownResult from './DropdownResult';
import DropdownAbsent from './DropdownAbsent';
import SwipeUpAttitude from './SwipeUpAttitude';
import DropdownNotes from './DropdownNotes';
import {ScrollView} from 'react-native-gesture-handler';
import UseFormScoreKDSection from '../UseFormScoreKDSection';
import SwipeUpKnowledge from './SwipeUpKnowledge';
import SwipeUpSkills from './SwipeUpSkills';
import SwipeUpExtra from './SwipeUpExtra';
import SwipeUpGrow from './SwipeUpGrow';
import SwipeUpNotes from './SwipeUpNotes';
import SwipeUpAbsent from './SwipeUpAbsent';
import SwipeUpResult from './SwipeUpResult';

type Props = {
  data?: any;
  student_data?: any;
  class_id?: any;
  years?: any;
  years_id?: any;
};

const EraportSection = ({student_data, class_id, years, years_id}: Props) => {
  const [dropwDown, setDropdown] = useState(false);
  const [chooseList, setChooseList] = useState(null);
  const [showSwipeEdit, setShowSwipeEdit] = useState(false);
  const [section, setSection] = useState(1);
  const [selected, setSelected] = useState([]);
  const [alertDelete, setAlertDelete] = useState(false);
  const [alertDeleteGrow, setAlertDeleteGrow] = useState(false);
  const [selectDelete, setSelectDelete] = useState();
  const [type, setType] = useState('');
  const {
    raportEnable,
    allRaport,
    submitAddExtra,
    submitEdit,
    formState,
    setFormState,
  } = UseFormScoreKDSection(student_data, class_id, years, years_id);
  const renderItem = ({item, index}: {item: ItemData; index: number}) => {
    return (
      <View style={styles.containerList}>
        <Pressable
          style={styles.listKD}
          onPress={() => {
            setDropdown(!dropwDown);
            setChooseList(item);
          }}>
          <Text style={styles.textTitle}>{item?.title}</Text>
          {chooseList?.id === item?.id && dropwDown ? (
            <Arrow_up width={20} height={20} />
          ) : (
            <Arrow width={20} height={20} />
          )}
        </Pressable>
        {chooseList?.id === item?.id && dropwDown ? (
          <ScrollView style={{height: index === 5 ? 100 : 300}}>
            {index === 0 && (
              <DropdownAttitude
                data={allRaport?.data}
                action={item => {
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(1);
                }}
              />
            )}
            {index === 1 && (
              <DropdownKnowledge
                data={allRaport?.data}
                action={item => {
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(2);
                }}
              />
            )}
            {index === 2 && (
              <DropdownSkills
                data={allRaport?.data}
                action={item => {
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(3);
                }}
              />
            )}
            {index === 3 && (
              <DropdownExtra
                data={allRaport?.data}
                action={item => {
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(4);
                }}
                actionDelete={item => {
                  setAlertDelete(true);
                  setSelectDelete(item);
                }}
                handleSwipeAddExtra={status => {
                  setType(status);
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(4);
                }}
              />
            )}
            {index === 4 && (
              <DropdownGrow
                data={allRaport?.data}
                action={item => {
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(5);
                }}
                handleSwipeAddGrow={status => {
                  setType(status);
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(5);
                }}
                actionDelete={item => {
                  setAlertDeleteGrow(true);
                  setSelectDelete(item);
                }}
              />
            )}
            {index === 5 && (
              <DropdownNotes
                data={allRaport?.data}
                action={item => {
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(6);
                }}
              />
            )}
            {index === 6 && (
              <DropdownAbsent
                data={allRaport?.data}
                action={item => {
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(7);
                }}
              />
            )}
            {index === 7 && (
              <DropdownResult
                data={allRaport?.data}
                action={item => {
                  setShowSwipeEdit(true);
                  setSelected(item);
                  setSection(8);
                }}
              />
            )}
          </ScrollView>
        ) : null}
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.textTitle}>NIS: 123456</Text>
        <Text style={styles.textSubTitle}>SMA Kelas Pintar Indonesia</Text>
        <Text style={styles.textSubTitle}>Jl. Masjid Terboyo</Text>
        <Text style={styles.textSubTitle}>Semester Genap • 2021-2022</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.containerEmpty}>
        <Robot width={100} height={100} />
        <Text style={styles.textTitle}>Belum Ada Nilai e-Rapor</Text>
        <Text style={[styles.textSubTitle, {color: '#868E96'}]}>
          e-Rapor yang sudah dicatat akan muncul disini.
        </Text>
      </View>
    );
  };
  const handleSubmitDelete = () => {
    const updatedExtracurricular = formState?.extracurricular?.map(item => {
      const isSameName =
        selectDelete?.extracurricular_name == item?.extracurricular_name;
      const isSameScore = selectDelete?.score == item?.score;
      if (isSameName && isSameScore) {
        return {};
      }
      return item;
    });

    const updatedFormState = {
      ...formState,
      extracurricular: updatedExtracurricular,
    };
    setFormState(updatedFormState);
    setAlertDelete(false);
    submitEdit(updatedFormState, 'delete');
  };

  const handleSubmitDeleteGrow = () => {
    const updatedPhysicalDevelopmentRecord =
      formState?.physical_development_record?.filter(
        item => item?.title !== selectDelete?.title,
      );

    const updatedFormState = {
      ...formState,
      physical_development_record: updatedPhysicalDevelopmentRecord,
    };

    setFormState(updatedFormState);
    setAlertDeleteGrow(false);
    submitEdit(updatedFormState, 'delete');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataList}
        renderItem={raportEnable?.download ? renderItem : renderEmpty}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={raportEnable?.download ? renderHeader : null}
        style={styles.flatList}
      />
      <SwipeUp
        height={200}
        visible={showSwipeEdit}
        onClose={() => setShowSwipeEdit(false)}
        children={
          section === 1 ? (
            <SwipeUpAttitude
              data={selected}
              formState={formState}
              setFormState={setFormState}
              action={item => {
                setShowSwipeEdit(false);
                submitEdit(item);
              }}
              actionCancel={() => {
                setShowSwipeEdit(false);
              }}
            />
          ) : section === 2 ? (
            <SwipeUpKnowledge
              data={selected}
              formState={formState}
              setFormState={setFormState}
              action={item => {
                setShowSwipeEdit(false);
                submitEdit(item);
              }}
              actionCancel={() => {
                setShowSwipeEdit(false);
              }}
            />
          ) : section === 3 ? (
            <SwipeUpSkills
              data={selected}
              formState={formState}
              setFormState={setFormState}
              action={item => {
                setShowSwipeEdit(false);
                item;
              }}
              actionCancel={() => {
                setShowSwipeEdit(false);
              }}
            />
          ) : section === 4 ? (
            <SwipeUpExtra
              data={selected}
              formState={formState}
              setFormState={setFormState}
              action={item => {
                setShowSwipeEdit(false);
                submitEdit(item);
              }}
              actionCancel={() => {
                setShowSwipeEdit(false);
                setType('');
              }}
              actionAdd={item => {
                submitAddExtra(item);
                setShowSwipeEdit(false);
              }}
              type={type}
              class_id={class_id?.class_id}
              years_id={years_id?.id}
            />
          ) : section === 5 ? (
            <SwipeUpGrow
              data={selected}
              formState={formState}
              setFormState={setFormState}
              action={item => {
                setShowSwipeEdit(false);
                submitEdit(item);
              }}
              actionCancel={() => {
                setShowSwipeEdit(false);
                setType('');
              }}
              type={type}
              actionAdd={item => {
                submitEdit(item);
                setShowSwipeEdit(false);
              }}
            />
          ) : section === 6 ? (
            <SwipeUpNotes
              data={selected}
              formState={formState}
              setFormState={setFormState}
              action={item => {
                setShowSwipeEdit(false);
                submitEdit(item);
              }}
              actionCancel={() => {
                setShowSwipeEdit(false);
              }}
            />
          ) : section === 7 ? (
            <SwipeUpAbsent
              data={selected}
              formState={formState}
              setFormState={setFormState}
              action={item => {
                setShowSwipeEdit(false);
                submitEdit(item);
              }}
              actionCancel={() => {
                setShowSwipeEdit(false);
              }}
            />
          ) : (
            <SwipeUpResult
              data={selected}
              formState={formState}
              setFormState={setFormState}
              action={item => {
                setShowSwipeEdit(false);
                submitEdit(item);
              }}
              actionCancel={() => {
                setShowSwipeEdit(false);
              }}
            />
          )
        }
      />
      <PopUp
        show={alertDelete}
        title={'Hapus KD Ekstrakulikuler'}
        desc={
          <Text style={styles.textSubTitle}>
            Apakah Anda yakin untuk menghapus{' '}
            <Text style={styles.textTitle}>
              {selectDelete?.extracurricular_name}
            </Text>{' '}
            dari daftar ekstrakulikuler?
          </Text>
        }
        titleConfirm={'Batalkan'}
        actionConfirm={() => setAlertDelete(false)}
        titleCancel={'Hapus'}
        actionCancel={() => handleSubmitDelete()}
      />
      <PopUp
        show={alertDeleteGrow}
        title={'Hapus Perkembangan Fisik'}
        desc={
          <Text style={styles.textSubTitle}>
            Apakah Anda yakin untuk menghapus{' '}
            <Text style={styles.textTitle}>{selectDelete?.title}</Text> ?
          </Text>
        }
        titleConfirm={'Batalkan'}
        actionConfirm={() => setAlertDeleteGrow(false)}
        titleCancel={'Hapus'}
        actionCancel={() => handleSubmitDeleteGrow()}
      />
    </View>
  );
};

export default EraportSection;
