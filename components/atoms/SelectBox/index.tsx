/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {IconButton} from 'react-native-paper';
import Colors from '@constants/colors';

DropDownPicker.setLanguage('ID');

type Props = {
  mode?: 'MODAL' | 'SCROLLVIEW';
  placeholder?: string;
  searchable?: boolean;
  items: {}[];
  value: any;
  setValue: any;
};

const SelectBox: FC<Props> = ({
  mode = 'SCROLLVIEW',
  placeholder,
  searchable,
  items,
  value,
  setValue,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      searchable={searchable}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      listMode={mode}
      placeholder={placeholder}
      style={styles.dropDownPicker}
      labelStyle={styles.dropDownPicker_label}
      ArrowDownIconComponent={({style}) => (
        <IconButton
          icon="chevron-down"
          style={[style]}
          iconColor={Colors.primary.base}
        />
      )}
      ArrowUpIconComponent={({style}) => (
        <IconButton
          icon="chevron-up"
          style={[style]}
          iconColor={Colors.primary.base}
        />
      )}
      TickIconComponent={({style}) => (
        <IconButton
          icon="check"
          style={[style]}
          iconColor={Colors.primary.base}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropDownPicker: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  dropDownPicker_label: {
    fontWeight: 'bold',
  },
});

export {SelectBox};
