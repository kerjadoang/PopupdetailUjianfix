/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import IconDown from '@assets/svg/ic16_chevron_down_blue.svg';
import provider from '@services/ptn/provider';
import {TAB_NAMES, usePTNReportScreen} from '../utils';
import {capitalizeEachWord, showErrorToast} from '@constants/functional';
import {Button, SwipeUp} from '@components/atoms';

const RadioButton: FC<{
  options: {key: any; value: any}[];
  selectedOption: {key: any; value: any};
  setSelectedOption: (value: any) => void;
}> = ({options, selectedOption, setSelectedOption}): any => {
  if (!options?.length) {
    return null;
  }

  return options?.map(({key, value}, index) => (
    <TouchableOpacity
      key={index}
      style={styles.radioButton}
      onPress={() => setSelectedOption({key, value})}>
      <View
        style={
          selectedOption?.value === value
            ? styles.radioButtonOutterDotActive
            : styles.radioButtonOutterDotPassive
        }>
        <View style={styles.radioButtonInnerDot} />
      </View>

      <Text style={styles.radioButtonLabel}>{key}</Text>
    </TouchableOpacity>
  ));
};

const TYPE_TRY_OUTS = [
  {
    key: 'Rekomendasi Kelas Pintar',
    value: 'kp',
  },
  {
    key: 'Pilihan Pribadi',
    value: 'personal',
  },
];

const Filter: FC<{
  type: (typeof TAB_NAMES)[keyof typeof TAB_NAMES];
  setCallbackTypeTryOut: (value: any) => void;
  setCallbackTryOut: (value: any) => void;
  setCallbackMapel: (value: any) => void;
}> = ({type, setCallbackTypeTryOut, setCallbackTryOut, setCallbackMapel}) => {
  const {ptnStore} = usePTNReportScreen();
  const [isShowSwipeUp, setIsShowSwipeUp] = useState(false);
  const [typeTryOut, setTypeTryOut] = useState(TYPE_TRY_OUTS[0].value);
  const [tryOuts, setTryOuts] = useState<any>([]);
  const [tryOut, setTryOut] = useState(null);
  const [mapels, setMapels] = useState<any>([]);
  const [mapel, setMapel] = useState(null);

  const [selectedTypeTryOut, setSelectedTypeTryOut] = useState({
    key: TYPE_TRY_OUTS[0].key,
    value: TYPE_TRY_OUTS[0].value,
  });

  const [selectedTryOut, setSelectedTryOut] = useState({
    key: null,
    value: null,
  });

  const [selectedMapel, setSelectedMapel] = useState({
    key: null,
    value: null,
  });

  const [filterType, setFilterType] = useState<
    '' | 'TYPE_TRY_OUT' | 'TRY_OUT' | 'TYPE_MAPEL'
  >('');

  const FILTER_ITEMS = [
    {
      title: TYPE_TRY_OUTS.find(({value}) => typeTryOut === value)?.key,
      onPress: () => setFilterType('TYPE_TRY_OUT'),
    },
    {
      title: tryOuts?.find(({id}: any) => tryOut === id)?.name,
      onPress: () => setFilterType('TRY_OUT'),
    },
    {
      title:
        mapels?.find(({module}: any) => mapel === module)?.module &&
        capitalizeEachWord(
          mapels?.find(({module}: any) => mapel === module)?.module,
        ),
      onPress: () => setFilterType('TYPE_MAPEL'),
    },
  ];

  const parsingFilterTypeToTitle = useMemo(() => {
    switch (filterType) {
      case 'TYPE_TRY_OUT':
        return 'Tipe Try Out';
      case 'TRY_OUT':
        return 'Try Out';
      case 'TYPE_MAPEL':
        return 'Tipe Mata Pelajaran';
      default:
        return '';
    }
  }, [filterType]);

  const parsingFilterTypeToRadioButton = useMemo(() => {
    let options: any, selected: any, setSelected: (_value: any) => void;

    switch (filterType) {
      case 'TYPE_TRY_OUT':
        options = TYPE_TRY_OUTS;
        selected = selectedTypeTryOut;
        setSelected = (_value: any) => setSelectedTypeTryOut(_value);
        break;
      case 'TRY_OUT':
        options = tryOuts?.map((_value: any) => ({
          key: _value?.name,
          value: _value?.id,
        }));
        selected = selectedTryOut;
        setSelected = (_value: any) => setSelectedTryOut(_value);
        break;
      case 'TYPE_MAPEL':
        options = mapels?.map((_value: any) => ({
          key: capitalizeEachWord(_value?.module),
          value: _value?.module,
        }));

        selected = selectedMapel;
        setSelected = (_value: any) => setSelectedMapel(_value);
        break;
      default:
        break;
    }

    return (
      <RadioButton
        options={options}
        selectedOption={selected}
        setSelectedOption={value => setSelected(value)}
      />
    );
  }, [
    filterType,
    selectedTypeTryOut.value,
    selectedTryOut.value,
    selectedMapel.value,
  ]);

  if (type !== 'Try Out') {
    FILTER_ITEMS.shift();
  }

  useLayoutEffect(() => {
    const __getDropdownListTryOut = async () => {
      try {
        const {
          status,
          data: {data},
        } = await provider.getReportListTryOut(ptnStore.user);

        if (status === 200 && data?.length) {
          setTryOuts(data);
          setTryOut(data?.[0]?.id);
          setSelectedTryOut({key: data?.[0]?.name, value: data?.[0]?.id});
        }
      } catch (error: any) {
        showErrorToast('Terjadi Kesalahan');
      }
    };

    const __getDropdownListMapel = async () => {
      try {
        const {
          status,
          data: {data},
        } = await provider.getListModule(ptnStore?.user);

        if (status === 200 && data?.length) {
          setMapels(data);
          setMapel(data?.[0]?.module);

          setSelectedMapel({
            key: capitalizeEachWord(data?.[0]?.module) as any,
            value: data?.[0]?.module,
          });
        }
      } catch (err: any) {
        showErrorToast('Terjadi Kesalahan');
      }
    };

    __getDropdownListTryOut();
    __getDropdownListMapel();
  }, [ptnStore.user]);

  useLayoutEffect(() => {
    if (filterType && !isShowSwipeUp) {
      setIsShowSwipeUp(true);
    }
  }, [filterType]);

  useLayoutEffect(() => {
    setCallbackTypeTryOut(typeTryOut);
    setCallbackTryOut(tryOut);
    setCallbackMapel(mapel);
  }, [typeTryOut, tryOut, mapel]);

  const __handleActionSwipeUp = useCallback(
    (_type: 'RESET' | 'SAVE') => {
      if (filterType === 'TYPE_TRY_OUT') {
        if (_type === 'RESET') {
          setSelectedTypeTryOut(TYPE_TRY_OUTS[0]);
        } else {
          setTypeTryOut(selectedTypeTryOut.value);
        }
      } else if (filterType === 'TRY_OUT') {
        if (_type === 'RESET') {
          setSelectedTryOut({key: tryOuts?.[0]?.name, value: tryOuts?.[0]?.id});
        } else {
          setTryOut(selectedTryOut?.value);
        }
      } else {
        if (_type === 'RESET') {
          setSelectedMapel({
            key: capitalizeEachWord(mapels?.[0]?.module) as any,
            value: mapels?.[0]?.module,
          });
        } else {
          setMapel(selectedMapel?.value);
        }
      }

      if (_type === 'SAVE') {
        setFilterType('');
        setIsShowSwipeUp(false);
      }
    },
    [
      filterType,
      selectedTypeTryOut.value,
      selectedTryOut.value,
      selectedMapel.value,
    ],
  );
  return (
    <>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 8}}>
          {FILTER_ITEMS.map(({title, onPress}, index) => (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.filterButton,
                {
                  backgroundColor: title
                    ? Colors.primary.base
                    : Colors.primary.light3,
                },
              ]}>
              <Text
                style={[
                  styles.filterTitle,
                  {color: title ? Colors.white : Colors.primary.base},
                ]}>
                {title}
              </Text>
              <IconDown color={title ? Colors.white : Colors.primary.base} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUp}
        height={500}
        onClose={() => {
          setFilterType('');
          setIsShowSwipeUp(false);
        }}
        children={
          <View style={styles.swipeUp}>
            <ScrollView style={styles.maxHeight378}>
              <Text style={styles.swipeUpTitle}>
                Filter {parsingFilterTypeToTitle}
              </Text>

              <View style={styles.mt11}>{parsingFilterTypeToRadioButton}</View>
            </ScrollView>

            <View style={styles.swipeUpBottom}>
              <Button
                label="Atur Ulang"
                style={{flex: 1}}
                borderWidth={1}
                borderColor={Colors.dark.neutral40}
                color={Colors.dark.neutral50}
                background="transparent"
                action={() => __handleActionSwipeUp('RESET')}
              />

              <Button
                label="Terapkan"
                action={() => __handleActionSwipeUp('SAVE')}
                style={{flex: 1}}
              />
            </View>
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  mt11: {
    marginTop: 11,
  },
  maxHeight378: {
    maxHeight: 378,
  },
  filterButton: {
    gap: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  swipeUp: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  swipeUpTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  swipeUpBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    gap: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  radioButtonOutterDotActive: {
    borderRadius: 25,
    width: 24,
    height: 24,
    backgroundColor: Colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonOutterDotPassive: {
    borderRadius: 25,
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.dark.neutral50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonInnerDot: {
    position: 'absolute',
    borderRadius: 25,
    width: 8,
    height: 8,
    backgroundColor: Colors.white,
  },
  radioButtonLabel: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
});

export default Filter;
