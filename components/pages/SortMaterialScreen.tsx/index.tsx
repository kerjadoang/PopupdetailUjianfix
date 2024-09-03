import React, {useLayoutEffect} from 'react';
import {Text, View, Pressable} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {styles} from './styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Header} from '@components/atoms/Header';
import Info from '@assets/svg/ic16_info.svg';
import Colors from '@constants/colors';
import Icon_drag from '@assets/svg/ic24_drag.svg';
import {Button} from '@components/atoms';
import useFormSortMaterial from './useFormSortMaterial';
import Icon1 from '@assets/svg/roundPorgressBook.svg';
import Icon2 from '@assets/svg/ic_play_btn_blue.svg';
import Icon3 from '@assets/svg/roundProgressBookPurple.svg';

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
};

const SortMaterialScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'SortMaterialScreen'>>();
  const {
    params: {dataList, id},
  } = route;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'SortMaterialScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Atur Urutan Materi'} iconLeft />,
    });
  }, []);
  const {submit, data, setData} = useFormSortMaterial(dataList, id);

  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <Pressable style={[styles.card, styles.shadowProp]} key={item?.id}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item?.learning_method?.type === 'presentation' ? (
              <Icon1 width={64} height={64} />
            ) : item?.learning_method?.type === 'ebook' ? (
              <Icon3 width={64} height={64} />
            ) : (
              <Icon2 width={64} height={64} />
            )}
            <View style={{marginLeft: 10}}>
              <Text style={styles.subTitle}>{item?.learning_method?.name}</Text>
              <Text style={styles.titleBlack}>{item?.title}</Text>
            </View>
          </View>
          <Pressable onPressIn={drag} disabled={isActive}>
            <Icon_drag width={24} />
          </Pressable>
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Info width={20} />
        <Text style={styles.textInfo}>Geser untuk mengatur urutan bab.</Text>
      </View>
      <View style={{height: '80%'}}>
        <DraggableFlatList
          data={data}
          onDragEnd={({data}) => setData(data)}
          keyExtractor={item => item?.id}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.rowButton}>
          <Button
            action={() => navigation.goBack()}
            label="Keluar"
            background={Colors.white}
            color={Colors.primary.base}
            borderWidth={2}
            style={{width: '40%'}}
          />
          <Button label="Simpan" style={{width: '40%'}} action={submit} />
        </View>
      </View>
    </View>
  );
};

export {SortMaterialScreen};
