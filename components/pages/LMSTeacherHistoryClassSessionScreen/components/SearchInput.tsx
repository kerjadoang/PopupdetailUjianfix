import {InputText} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import ResetIcon from '@assets/svg/close_x.svg';
import SearchIcon from '@assets/svg/ic_search_blue.svg';

type SearchInputProps = {
  query: string;
  setQuery: (_value: string) => void;
  setModalVisible?: (_value: boolean) => void;
  onClear?: () => void;
};

const SearchInput: React.FC<SearchInputProps> = props => {
  return (
    <View style={styles.containerSearch}>
      <View style={{flex: 3}}>
        <InputText
          backgroundColor={Colors.dark.neutral10}
          returnKeyType="search"
          value={props.query}
          maxLength={60}
          onChangeText={props.setQuery}
          leftIcon={SearchIcon}
          rightIcon={props.query && ResetIcon}
          onPressIcon={props.onClear}
          placeholder="Cari"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  containerSearchCancelLabel: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primary.base,
  },
});

export default SearchInput;
