import Colors from '@constants/colors';
import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
type Props = {
  data: any;
  top?: any;
  bottom?: any;
  action: (value: any) => void;
  selectedGender?: any;
  disabled?: boolean;
};

const Gender = ({
  data,
  action,
  top,
  bottom,
  selectedGender = 0,
  disabled,
}: Props) => {
  const [option, setOption] = useState(data?.[selectedGender]);
  const selectHandler = (value: any) => {
    action(value);
    setOption(value);
  };
  return (
    <View style={{marginTop: top, marginBottom: bottom}}>
      <Text style={styles.label}>{'Jenis Kelamin'}</Text>
      <View style={styles.box}>
        {data.map((value: string, idx: string) => {
          return (
            <TouchableOpacity
              key={idx}
              disabled={disabled}
              onPress={() => selectHandler(value)}
              style={[
                styles.container,
                {
                  backgroundColor: disabled
                    ? Colors.dark.neutral20
                    : option === value
                    ? Colors.primary.base
                    : Colors.primary.light3,
                },
              ]}>
              <Icons
                name={value === value ? 'gender-male' : 'gender-female'}
                size={24}
                color={
                  disabled
                    ? Colors.dark.neutral50
                    : option === value
                    ? Colors.primary.light3
                    : Colors.primary.base
                }
              />

              <Text
                style={[
                  styles.text,
                  {
                    color: disabled
                      ? Colors.dark.neutral50
                      : option === value
                      ? Colors.primary.light3
                      : Colors.primary.base,
                  },
                ]}>
                {value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 12,
    borderColor: '#C2185B',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 8,
    marginLeft: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginBottom: 8,
  },
});

export {Gender};
