import Colors from '@constants/colors';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {_handleUserTypeId} from '@constants/functional';

type Props = {
  status: string;
  styleStatus: any;
  date: string;
  count: string;
  desc: string;
  price: string;
  action: VoidCallBack;
  onAssign?: VoidCallBack;
  isNotAssigned?: boolean;
};

const CardCartHistory = ({
  status,
  styleStatus,
  date,
  count,
  desc,
  price,
  action,
  onAssign,
  isNotAssigned,
}: Props) => {
  const formatedDate = (x: string) =>
    dayjs(x).utc().format('DD MMM YYYY HH:mm');

  const data: IGetUser = useSelector((state: RootState) => state.getUser);
  const accountRole = _handleUserTypeId(data.data?.user_type_id ?? 0);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={action}
      style={styles.container}>
      <View style={styles.topContainer}>
        <Text
          style={
            styleStatus === 1
              ? styles.statusYellow
              : styleStatus === 2
              ? styles.statusGreen
              : styles.statusRed
          }>
          {status}
        </Text>
        <Text style={styles.date}>{formatedDate(date)}</Text>
      </View>
      <View style={styles.midContainer}>
        <View>
          <Text style={styles.count}>{count} Paket</Text>
          <Text>{desc}</Text>
        </View>
        <View>
          <Icon color={Colors.primary.base} name="angle-right" size={24} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>Rp. {price}</Text>
        {accountRole.role === 'ORANG-TUA' && isNotAssigned && (
          <TouchableOpacity style={styles.btn} onPress={onAssign}>
            <Text
              style={[
                styles.price,
                {color: Colors.primary.base, fontSize: 13},
              ]}>
              Berikan Paket
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
export {CardCartHistory};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    elevation: 8,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 15,
    marginVertical: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  midContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: Colors.dark.neutral100,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: Colors.dark.neutral60,
  },
  desc: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: Colors.dark.neutral60,
  },

  btn: {
    // width: '30%',
    backgroundColor: Colors.primary.light3,
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  statusYellow: {
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: Colors.secondary.dark1,
    backgroundColor: Colors.secondary.light2,
  },
  statusGreen: {
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: Colors.success.base,
    backgroundColor: Colors.success.light2,
  },
  statusRed: {
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    olor: Colors.danger.base,
    backgroundColor: Colors.danger.light2,
  },

  date: {
    width: '40%',
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
});
