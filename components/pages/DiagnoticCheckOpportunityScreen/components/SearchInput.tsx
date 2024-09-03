import Colors from '@constants/colors';
import React from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import Fonts from '@constants/fonts';

type SearchInputProps = {
  query: string;
  setModalVisible?: (_value: boolean) => void;
  cancelable?: boolean;
  onClear?: () => void;
  onPressCancel?: PressableProps['onPress'];
  placeholder?: string;
  leftOnPressIcon?: TouchableOpacityProps['onPress'];
};

const SearchInput: React.FC<SearchInputProps> = props => {
  return (
    <Pressable style={styles.containerSearch} onPress={props?.leftOnPressIcon}>
      <TouchableOpacity onPress={props?.leftOnPressIcon}>
        <SearchIcon width={24} height={24} />
      </TouchableOpacity>
      {props?.query !== '' && props?.query !== undefined ? (
        <Text style={styles.label}>{props?.query}</Text>
      ) : (
        <Text style={styles.title}>{props?.placeholder}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.neutral10,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 5,
  },
  label: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.1,
    color: Colors.dark.neutral100,
    paddingLeft: 8,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.1,
    color: Colors.dark.neutral50,
    paddingLeft: 8,
  },
});

export default SearchInput;
