import {View, Text, Pressable, FlatList} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';
import {styles} from './styles';
import Hat_red from '@assets/svg/ic_hat_red.svg';
import Hat_blue from '@assets/svg/ic_hat_blue.svg';
import Hat_grey from '@assets/svg/ic_hat_grey.svg';
import Right from '@assets/svg/ic_arrow_right_grey.svg';
import useFormChooseClass from './useChooseClass';
import {ParamList} from 'type/screen';
const ChooseClassScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ChooseClassScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Pilih Kelas'} backgroundColor="white" />,
    });
  }, []);
  const {listClass} = useFormChooseClass();
  return (
    <View style={styles.container}>
      <FlatList
        data={listClass}
        contentContainerStyle={styles.listContent}
        renderItem={({item, index: key}: any) => {
          return (
            <Pressable key={key}>
              <View style={{margin: 1}}>
                <View style={styles.contentHeader} key={key}>
                  {key % 3 === 0 ? (
                    <Hat_red width={20} height={20} />
                  ) : key % 3 === 1 ? (
                    <Hat_blue width={20} height={20} />
                  ) : (
                    <Hat_grey width={20} height={20} />
                  )}
                  <Text style={[styles.title, {fontSize: 14, marginLeft: 5}]}>
                    {item?.name}
                  </Text>
                </View>
                <View style={styles.contentClass}>
                  {item?.rombel_class_school?.map((i: any, key: number) => (
                    <Pressable
                      onPress={() =>
                        navigation.navigate('InputScoreStudentScreen', {
                          rombel_id: i,
                        })
                      }
                      key={key}
                      style={[styles.buttonClass, styles.shadowProp]}>
                      <Text
                        style={[styles.title, {fontSize: 14, marginLeft: 5}]}>
                        {i.name}
                      </Text>
                      <Right width={16} height={16} />
                    </Pressable>
                  ))}
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export {ChooseClassScreen};
