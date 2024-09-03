import React, {FC} from 'react';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import IconCloseBlack from '@assets/svg/ic16_x_black.svg';
import IconCloseWhite from '@assets/svg/ic_close_white.svg';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  label: string;
  visible: boolean;
  onPressClose?: () => void;
  type?: 'SUCCESS' | 'FAILED' | 'WARNING' | string;
};

const SnackbarResult: FC<Props> = ({
  label,
  visible,
  onPressClose,
  type = 'SUCCESS',
}) => {
  const _renderContent = () => {
    return (
      <View style={styles(type).container}>
        <Text style={styles(type).title}>{label}</Text>

        <TouchableOpacity onPress={onPressClose}>
          {type === 'WARNING' ? (
            <IconCloseBlack width={24} height={24} />
          ) : (
            <IconCloseWhite width={24} height={24} />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return <>{visible ? _renderContent() : null}</>;
};

export default SnackbarResult;

const styles = (type: string) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 9,
      bottom: 16,
      right: 16,
      left: 16,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor:
        type === 'SUCCESS'
          ? Colors.success.light1
          : type === 'FAILED'
          ? Colors.danger.base
          : Colors.secondary.base,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: Fonts.SemiBoldPoppins,
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 16,
      color: type === 'WARNING' ? Colors.dark.neutral100 : Colors.white,
    },
  });
