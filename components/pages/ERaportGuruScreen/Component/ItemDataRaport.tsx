import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EditIcon from '@assets/svg/ic_edit.svg';
import EditDisabled from '@assets/svg/edit_disabled.svg';

type Props = {
  key?: number;
  title: string;
  errorMessage?: string;
  value: any;
  isDisable?: boolean;
  action?: () => void;
};

const ItemDataRaport = ({
  key,
  title,
  value,
  action,
  errorMessage,
  isDisable = false,
}: Props) => {
  return (
    <View style={styles.container} key={key}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.errorTitle}>{errorMessage}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity
          onPress={action}
          style={styles.btn}
          disabled={isDisable}>
          {isDisable ? (
            <EditDisabled width={15} height={15} />
          ) : (
            <EditIcon width={20} height={20} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  value: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
  },
  btn: {
    width: 50,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.danger.base,
  },
});

export {ItemDataRaport};
