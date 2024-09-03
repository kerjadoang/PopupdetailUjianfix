import React, {FC, memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from '../style';
import {makePrefixUppercaseRestLowercase} from '@constants/functional';

type Props = {
  label: string;
  options: string[];
  isSubmit?: boolean;
  selectedItem: string;
  setSelectedItem: (value: any) => void;
};

const FormRadioButton: FC<Props> = ({
  label,
  options,
  isSubmit,
  selectedItem,
  setSelectedItem,
}) => (
  <View style={styles.MB_24}>
    <View style={styles.row}>
      <Text style={styles.titleInputForm}>{label}</Text>
    </View>

    <View style={[styles.row, styles.MT_8]}>
      {options.map((value, index) => {
        const isSelectedItem = selectedItem === value;

        return (
          <TouchableOpacity
            key={index}
            style={styles.swipeUpContentContainer}
            onPress={() => setSelectedItem(value)}>
            <View
              style={
                isSelectedItem
                  ? styles.outterDotActive
                  : styles.outterDotPassive
              }>
              <View style={styles.innerDot} />
            </View>

            <Text
              style={
                isSelectedItem
                  ? styles.descriptionSwipeUpActive
                  : styles.descriptionSwipeUpPasive
              }>
              {value}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

    {isSubmit ? (
      <Text style={styles.textError}>{`${makePrefixUppercaseRestLowercase(
        label,
      )} wajib diisi.`}</Text>
    ) : null}
  </View>
);

export default memo(FormRadioButton);
