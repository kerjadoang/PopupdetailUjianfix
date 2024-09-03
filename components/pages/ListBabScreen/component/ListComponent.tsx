import {Text, Pressable, FlatList, View} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Right from '@assets/svg/ic_arrow_right_blue.svg';
import {Button} from '@components/atoms';
import Ic_empty_pr from '@assets/svg/ic_empty_PR.svg';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type Props = {
  action?: any;
  data?: any;
  selectedBab?: any;
};

const ListComponent = ({data, selectedBab}: Props) => {
  const route = useRoute<RouteProp<ParamList, 'ListBabScreen'>>();
  const {params}: any = route;
  const subject = params?.subject;
  const classes = params?.classes;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ListBabScreen'>>();
  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={[styles.card, styles.shadowProp]}
        key={item?.chapter?.id}
        onPress={() =>
          navigation.navigate('ListMaterialScreen', {
            id: item?.chapter?.id,
            subject: item?.chapter,
            classes: classes,
            subjects: subject,
            selectedBab: selectedBab,
          })
        }>
        <Text style={styles.titleBlack}>{item?.chapter?.name}</Text>
        <Right width={24} />
      </Pressable>
    );
  };

  const renderEmpty = ({}: any) => {
    return (
      <View style={styles.emptyDataContainer}>
        <Ic_empty_pr width={100} height={100} />
        <Text style={[styles.notFoundTitle, styles.pt12]}>
          Belum Ada Materi Sekolah
        </Text>
        <Text style={[styles.notFoundTitle, styles.pb12]}>Ditambahkan</Text>
        <Button
          label={'+ Tambah Materi Sekolah'}
          style={styles.buttonNotFound}
          action={() =>
            navigation.navigate('AddSchoolMaterialsScreen', {
              materialsParams: {
                subject: subject,
                classes: classes,
                curriculum: subject?.curriculum,
              },
            })
          }
        />
      </View>
    );
  };
  return (
    <FlatList
      renderItem={renderItem}
      data={data}
      ListEmptyComponent={renderEmpty}
      keyExtractor={item => item?.chapter?.id}
    />
  );
};

export default ListComponent;
