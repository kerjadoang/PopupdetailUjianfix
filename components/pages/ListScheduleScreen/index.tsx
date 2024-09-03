import {View, FlatList, Text, Pressable} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms';
import {styles} from './styles';
import History from '@assets/svg/ic24_history_blue.svg';
import dayjs from 'dayjs';
import Live from '@assets/svg/ic_live.svg';
const ListScheduleScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'ListScheduleScreen'>>();
  const {data, full_name} = route?.params;
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ListScheduleScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Jadwal Sesi Kelas'}
          backgroundColor="white"
          subLabel={full_name}
          iconRight={<History width={24} height={24} />}
          onPressIconRight={() =>
            navigation.navigate('ListScheduleHistoryScreen', {
              id: 1,
              data: data,
              full_name: full_name,
            })
          }
        />
      ),
    });
  }, [full_name, navigation]);
  const formatDateToCustomFormat = dateString => {
    const formattedDate = dayjs(dateString)
      .locale('id')
      .format('dddd, D MMMM YYYY • HH:MM');
    return formattedDate;
  };
  const formatDateToCustomFormatNoDays = dateString => {
    const formattedDate = dayjs(dateString).locale('id').format('HH:MM');
    return formattedDate;
  };
  const renderItem = ({item}: {item: ItemData}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('DetailSessionClassScreen', {
            id: item?.id,
            full_name: full_name,
          })
        }
        style={[styles.shadowProp, styles.card]}>
        <View style={styles.row}>
          <Text style={styles.labelBlue}>{item?.rombel_class?.name}</Text>
          <Text style={styles.labelBlue}>{item?.type}</Text>
          <Text style={styles.labelBlue}>{item?.platform}</Text>
        </View>
        <Text style={styles.textTitleBigBlack}>{item?.subject?.name}</Text>
        <Text style={[styles.textTitleBigBlack, {fontSize: 14, width: '95%'}]}>
          {item?.title}
        </Text>
        <Text style={styles.textSubTitleBigBlack}>
          {formatDateToCustomFormat(item?.time_start)} -{' '}
          {formatDateToCustomFormatNoDays(item?.time_end)}
        </Text>
        <View style={styles.line} />
        <View style={[styles.rowBetween, {alignItems: 'center'}]}>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <Live width={20} style={{marginRight: 5}} />
            <Text style={styles.textRed}>{item?.status}</Text>
          </View>
          <Pressable style={styles.buttonJoin}>
            <Text style={styles.textWhite}>Gabung</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 16}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export {ListScheduleScreen};
