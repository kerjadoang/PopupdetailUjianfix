import {InputText} from '@components/atoms';
import Colors from '@constants/colors';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import ResetIcon from '@assets/svg/close_x.svg';
import Fonts from '@constants/fonts';
const SearchHeader = (props: any) => {
  return (
    <View style={styles.headerSearch}>
      <View style={{flex: 5}}>
        <InputText
          backgroundColor={Colors.dark.neutral10}
          returnKeyType="search"
          value={props.query}
          onSubmitEditing={() => props.setQueryVal(props.query)}
          maxLength={60}
          ref={props.searchInputRef}
          onChangeText={text => props.setQuery(text)}
          leftIcon={SearchIcon}
          rightIcon={props.query && ResetIcon}
          onPressIcon={() => {
            props.setQuery('');
            props.setQueryVal('');
          }}
          placeholder="Cari judul, pelajaran, guru"
          placeholderTextColor={Colors.dark.neutral50}
          inputTextStyle={{
            fontSize: 14,
            fontWeight: '400',
            letterSpacing: 0.25,
            fontFamily: Fonts.RegularPoppins,
          }}
        />
      </View>
      <Pressable
        style={styles.cancelLabelContainter}
        onPress={() => {
          props.setQuery('');
          props.setQueryVal('');
          props.navigation();
        }}>
        <Text style={styles.cancelLabel}>Batal</Text>
      </Pressable>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  headerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  cancelLabelContainter: {
    justifyContent: 'center',
  },
  cancelLabel: {
    textAlign: 'center',
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    color: Colors.primary.base,
    marginLeft: 12,
    marginRight: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
});
