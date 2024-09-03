/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Colors from '@constants/colors';

type Props = {
  type: 'CLASS' | 'SDCLASS' | 'VERTICAL_WITH_IMAGE' | 'HORIZONTAL' | 'MAJOR';
  label: string;
  bottom?: number;
  top?: number;
  data: any[];
  onSelect: (value: any) => void;
};

const RadioButton: FC<Props> = ({type, label, bottom, top, data, onSelect}) => {
  const [option, setOption] = useState(null);

  const selectHandler = (value: any) => {
    onSelect(value);
    setOption(value);
  };

  return (
    <View style={styleProps(top, bottom).container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.container,
          type === 'HORIZONTAL' && {
            gap: 12,
          },
          type === 'SDCLASS' && {
            gap: 16,
          },
          (type === 'VERTICAL_WITH_IMAGE' ||
            type === 'CLASS' ||
            type === 'SDCLASS' ||
            type === 'MAJOR') && {
            justifyContent: 'space-between',
          },
        ]}>
        {data.map((item, id) => (
          <Pressable
            key={id}
            style={[
              type === 'VERTICAL_WITH_IMAGE'
                ? styles.optionVerticalWithImage
                : type === 'HORIZONTAL'
                ? styles.optionHorizontal
                : type === 'MAJOR'
                ? styles.optionMajor
                : type === 'CLASS'
                ? styles.optionClass
                : type === 'SDCLASS'
                ? styles.optionClassSd
                : styles.option,
              option !== item.value
                ? {borderColor: Colors.dark.neutral40}
                : styles.option__selected,
            ]}
            onPress={() => selectHandler(item.value)}>
            {type === 'VERTICAL_WITH_IMAGE'
              ? item?.image
              : type === 'HORIZONTAL' && item?.icon}

            <Text
              style={[
                styles.option_text,
                option === item.value && {color: Colors.primary.base},
              ]}>
              {item.value}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    lineHeight: 22,
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  option: {
    width: 88,
    height: 44,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionClassSd: {
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  optionClass: {
    paddingHorizontal: 36,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionMajor: {
    width: '48%',
    height: 44,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionVerticalWithImage: {
    width: 96,
    height: 120,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionHorizontal: {
    borderWidth: 1,
    flexGrow: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  option__selected: {
    borderWidth: 3,
    borderColor: Colors.primary.base,
    backgroundColor: Colors.primary.light2,
  },
  option_text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.neutral80,
  },
});

const styleProps = (top?: number, bottom?: number) =>
  StyleSheet.create({
    container: {
      marginTop: top,
      marginBottom: bottom,
    },
  });

export {RadioButton};
