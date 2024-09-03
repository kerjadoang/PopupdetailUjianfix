import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Arrow from '@assets/svg/ic_arrow_right_blue.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {convertDate} from '@constants/functional';
import {TouchableOpacity} from 'react-native';

type Props = {
  status: boolean;
  name: string;
  nis: any;
  shareDate: string;
  action: () => void;
};

const Card = ({status, name, nis, shareDate, action}: Props) => {
  const displayDate = convertDate(shareDate).format('DD MMMM YYYY');
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.container,
        {backgroundColor: status ? Colors.white : Colors.dark.neutral20},
      ]}
      disabled={!status}>
      <View>
        <Text style={styles.name}>{name || '--'}</Text>
        <Text style={styles.nik}>NIS : {nis || '--'}</Text>
        {status ? (
          <Text style={styles.shared}>
            Dibagikan pada {displayDate || '--'}
          </Text>
        ) : null}
      </View>
      <Arrow width={24} height={24} />
    </TouchableOpacity>
  );
};
export {Card};
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  nik: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  shared: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    fontFamily: Fonts.RegularPoppins,
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
});
