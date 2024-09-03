import {Button, CheckboxInput, SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {IAllRombelClassResponse} from '@services/global/type';
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {IJadwalkanUjianFormValues} from '../CreateJadwalUjianScreen';

type InputClassProps = {
  inputs?: IAllRombelClassResponse;
  onSelect?: (name: keyof IJadwalkanUjianFormValues, val: any) => void;
  selectedOption?: IBaseRombelClass[];
} & SwipeUpProps;

const InputClass: React.FC<InputClassProps> = props => {
  const [selectedRombel, setSelectedRombel] = useState<IBaseRombelClass[]>(
    props.selectedOption || [],
  );
  const onSelect = (val: IBaseRombelClass) => {
    const isExist = selectedRombel?.some(
      rombel => rombel?.rombel_class_school_id === val?.rombel_class_school_id,
    );
    if (isExist) {
      const filterRombel = selectedRombel?.filter(
        rombel =>
          rombel?.rombel_class_school_id !== val?.rombel_class_school_id,
      );
      setSelectedRombel(filterRombel);
    } else {
      const finalSelectedRombel = [...(selectedRombel ?? []), val];
      setSelectedRombel(finalSelectedRombel);
    }
  };

  return (
    <SwipeUp {...props}>
      <View
        style={{
          paddingHorizontal: 16,
          padding: 16,
          // paddingBottom: 8,
          gap: 16,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: Colors.dark.neutral100,
            textAlign: 'center',
          }}>
          Pilih Kelas
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 16}}
          style={{maxHeight: 400}}>
          {/* <CheckboxInput
            label={'Semua Kelas'}
            // containerStyle={{paddingVertical: 12}}
            onPress={() => {
              setSelectedRombel(!isSelectAll ? plainData : []);
              setIsSelectAll(!isSelectAll);
            }}
            selected={isSelectAll}
          /> */}
          {props.inputs?.data?.map(item => {
            return (
              <View
                style={{height: 32, width: '100%'}}
                key={`${item.rombel_class_school_id}`}>
                {/* <RadioInput
                  label={item.rombel_class_school_name}
                  radioContainerStyle={{
                    width: '100%',
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => props.onSelect?.('rombel_class_school', item)}
                  selected={
                    item.rombel_class_school_id ===
                    props.selectedOption?.rombel_class_school_id
                  }
                /> */}
                <CheckboxInput
                  label={item.rombel_class_school_name}
                  // disabled={isDisabled}
                  onPress={() => onSelect(item)}
                  selected={selectedRombel?.some(
                    selected =>
                      selected?.rombel_class_school_id ===
                      item?.rombel_class_school_id,
                  )}
                />
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            paddingTop: 16,
            backgroundColor: Colors.white,
          }}>
          <Button
            label="Simpan"
            action={() => {
              props.onSelect?.('list_rombel_class_school', selectedRombel);
              props.onClose?.();
            }}
            isDisabled={
              (selectedRombel && selectedRombel.length < 1) ||
              !props.inputs?.data
            }
          />
        </View>
      </View>
    </SwipeUp>
  );
};

export default InputClass;
