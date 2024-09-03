import React, {useLayoutEffect} from 'react';
import {Text, View, Pressable} from 'react-native';
import {
  ScaleDecorator,
  RenderItemParams,
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';
import {styles} from './styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Header} from '@components/atoms/Header';
import Info from '@assets/svg/ic16_info.svg';
import Colors from '@constants/colors';
import Icon_drag from '@assets/svg/ic24_drag.svg';
import {Button} from '@components/atoms';
import useFormSortbab from './useFormSortBab';

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
};

const SortBabScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'SortBabScreen'>>();
  const {
    params: {dataList, id},
  } = route;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'SortBabScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Atur Urutan Bab'} iconLeft />,
    });
  }, [navigation]);
  const {submit, data, setData} = useFormSortbab(dataList, id);

  const renderItemDraggable = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <Pressable
          style={[
            styles.card,
            styles.shadowProp,
            isActive && {backgroundColor: Colors.dark.neutral10},
          ]}>
          <View style={styles.rowText}>
            <Text style={styles.text}>{item?.chapter?.name}</Text>
          </View>
          {item?.chapter?.editable ? (
            <Pressable onPressIn={drag} disabled={isActive}>
              <Icon_drag width={24} />
            </Pressable>
          ) : null}
        </Pressable>
      </ScaleDecorator>
    );
  };

  const dataDraggable = data?.filter((obj: any) => obj?.chapter?.editable);
  const dataRegular = data?.filter((obj: any) => !obj?.chapter?.editable);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Info width={20} />
        <Text style={styles.textInfo}>Geser untuk mengatur urutan bab.</Text>
      </View>
      <View style={{height: '80%'}}>
        <NestableScrollContainer>
          <NestableDraggableFlatList
            data={dataRegular}
            keyExtractor={item => `${item?.chapter?.id}`}
            renderItem={renderItemDraggable}
            scrollEnabled={false}
          />
          <NestableDraggableFlatList
            data={dataDraggable}
            onDragEnd={({data}) => setData([...dataRegular, ...data])}
            keyExtractor={item => item?.chapter?.id}
            renderItem={renderItemDraggable}
          />
        </NestableScrollContainer>
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

export {SortBabScreen};
