import React, {FC, memo} from 'react';
import {Pressable, Text, View} from 'react-native';

import styles from '../style';
import Colors from '@constants/colors';
import IconDown from '@assets/svg/ic24_chevron_down.svg';
import {makePrefixUppercaseRestLowercase} from '@constants/functional';

type Props = {
  label: string;
  selectedItem: any;
  isDisabled?: boolean;
  rightIcon?: any;
  isValueExist?: boolean;
  isSubmit?: boolean;
  isTypeSelected?: boolean;
  onPress: () => void;
};

const FormSelect: FC<Props> = ({
  label,
  selectedItem,
  isDisabled,
  rightIcon,
  isValueExist,
  isSubmit,
  isTypeSelected,
  onPress,
}) => (
  <View style={styles.MB_24}>
    <View style={styles.row}>
      <Text style={styles.titleInputForm}>{label}</Text>
    </View>

    <View style={[styles.row, styles.MT_8]}>
      <Pressable
        disabled={isDisabled}
        onPress={onPress}
        style={[
          styles.formSelectButton,
          isDisabled && {backgroundColor: Colors.dark.neutral20},
        ]}>
        <Text
          style={[
            styles.formSelectTextButton,
            !isValueExist && {color: Colors.dark.neutral50},
          ]}>
          {selectedItem.name || selectedItem}
        </Text>

        {rightIcon ? (
          rightIcon
        ) : (
          <IconDown
            width={24}
            height={24}
            color={isDisabled ? Colors.dark.neutral50 : Colors.primary.base}
          />
        )}
      </Pressable>
    </View>

    {isSubmit ? (
      <Text style={styles.textError}>{`${makePrefixUppercaseRestLowercase(
        label,
      )} wajib ${isTypeSelected ? 'dipilih' : 'diisi'}.`}</Text>
    ) : null}
  </View>
);

export default memo(FormSelect);
