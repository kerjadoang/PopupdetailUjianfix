import {InputText} from '@components/atoms';
import Colors from '@constants/colors';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import ResetIcon from '@assets/svg/close_x.svg';
import Fonts from '@constants/fonts';
const SearchHeader = (props: any) => {
  return (
    <View style={styles.headerSearch}>
      <View style={styles.flex5}>
        <InputText
          backgroundColor={Colors.dark.neutral10}
          returnKeyType="search"
          value={props.query}
          onSubmitEditing={() => props.setQueryVal(props.query)}
          maxLength={60}
          ref={props.searchInputRef}
          onChangeText={text => {
            props.setQuery(text);
            props?.setRiwayatPagination((prevState: any) => ({
              ...prevState,
              offset: 0,
            }));
          }}
          leftIcon={SearchIcon}
          rightIcon={props.query && ResetIcon}
          onPressIcon={() => {
            props.setQuery('');
            props.setQueryVal('');
          }}
          placeholder="Cari"
          placeholderTextColor={Colors.dark.neutral50}
          inputTextStyle={styles.inputTextStyle}
        />
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  headerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -16,
  },
  cancelLabelContainter: {
    justifyContent: 'center',
  },
  inputTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
  },
  flex5: {
    flex: 5,
  },
});
