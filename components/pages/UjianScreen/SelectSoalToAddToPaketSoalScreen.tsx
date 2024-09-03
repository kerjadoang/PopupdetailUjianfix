/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  useAddSoalToPaketSoalUjian,
  useGetDetailPaketSoalList,
} from '@services/lms';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {View, StyleSheet} from 'react-native';
import SoalListItem from './components/SoalListItem';
import {Button} from '@components/atoms';
import {IAddToPaketSoalPayload} from '@services/lms/type';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ParamList} from 'type/screen';

const SelectSoalToAddToPaketSoalScreen: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ParamList, 'SelectSoalToAddToPaketSoalScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'SelectSoalToAddToPaketSoalScreen'>>();

  const {
    package_id,
    subtitle,
    title,
    subject_id,
    package_id_to_be_add,
    class_id,
    chapter_id,
  } = route.params;
  const {data, refetch} = useGetDetailPaketSoalList();
  const {mutate: addSoalToPaketSoal} = useAddSoalToPaketSoalUjian();

  const [selectedSoal, setSelectedSoal] = useState<IBasePackageQuestion[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={title} subLabel={subtitle} />,
    });
  }, []);

  useEffect(() => {
    refetch(package_id);
  }, []);

  const onPressSoalItem = (item: IBasePackageQuestion) => {
    if (selectedSoal.some(soal => soal.id === item.id)) {
      setSelectedSoal(prevState =>
        [...prevState].filter(soal => soal.id !== item.id),
      );
    } else {
      setSelectedSoal(prevState => [...prevState, item]);
    }
    return;
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: IBasePackageQuestion;
    index: number;
  }) => {
    return (
      <SoalListItem
        data={item}
        index={index}
        isAddMode
        selected={selectedSoal.some(soal => soal.id === item.id)}
        onPress={() => onPressSoalItem(item)}
      />
    );
  };

  useEffect(() => {
    refetch(package_id);
  }, []);

  const onAddSoalToPaketSoal = async () => {
    try {
      const payloadData: IAddToPaketSoalPayload['questions'] = selectedSoal.map(
        soal => {
          return {
            question_id: soal.question_id,
            orders: soal.orders,
          };
        },
      );
      await addSoalToPaketSoal(package_id_to_be_add, {questions: payloadData});
      navigation.navigate('DetailPaketSoalListScreen', {
        subject_id,
        package_id: package_id_to_be_add,
        title,
        chapter_id,
        subtitle,
        mode: 'detail',
        class_id,
      });
      Toast.show({type: 'success', text1: 'Soal berhasil disimpan.'});
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.data?.package_question}
        renderItem={renderItem}
        contentContainerStyle={{gap: 16, padding: 16}}
      />

      <View style={{padding: 16, backgroundColor: Colors.white}}>
        <Button
          label={`Simpan ${selectedSoal.length ?? ''} Pilihan`}
          action={onAddSoalToPaketSoal}
          isDisabled={selectedSoal.length < 1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default SelectSoalToAddToPaketSoalScreen;
