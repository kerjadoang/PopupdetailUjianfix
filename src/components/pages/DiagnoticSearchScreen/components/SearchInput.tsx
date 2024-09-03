import {InputText, InputTextProps} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {View, StyleSheet, Pressable, PressableProps, Text} from 'react-native';
import ResetIcon from '@assets/svg/close_x.svg';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import Fonts from '@constants/fonts';

type SearchInputProps = {
  query: string;
  setModalVisible?: (_value: boolean) => void;
  cancelable?: boolean;
  onClear?: () => void;
  onPressCancel?: PressableProps['onPress'];
} & InputTextProps;

const SearchInput: React.FC<SearchInputProps> = props => {
  return (
    <View style={styles.containerSearch}>
      <View style={styles.container}>
        <InputText
          placeholder="Cari"
          returnKeyType="search"
          backgroundColor={Colors.dark.neutral10}
          value={props.query}
          maxLength={60}
          leftIcon={SearchIcon}
          multiline={true}
          rightIcon={props.query && ResetIcon}
          onPressIcon={props.onClear}
          {...props}
        />
      </View>
      {props.cancelable && (
        <Pressable
          style={styles.cancelLabelContainter}
          onPress={props.onPressCancel}>
          <Text style={styles.cancelLabel}>Batal</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
  },
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cancelLabelContainter: {
    justifyContent: 'center',
    marginLeft: 12,
    alignSelf: 'center',
  },
  cancelLabel: {
    textAlign: 'center',
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    color: Colors.primary.base,
    marginLeft: 12,
    lineHeight: 22,
    letterSpacing: 0.25,
    paddingTop: 6,
  },
});

export default SearchInput;
