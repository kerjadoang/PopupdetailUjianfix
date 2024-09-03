import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Button, InputText} from '@components/atoms';
import Colors from '@constants/colors';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import ResetIcon from '@assets/svg/close_x.svg';
import useDebounce from '@hooks/useDebounce';

type Props = {
  query: string;
  handleSearch: () => void;
  setQuery: (_value: string) => void;
  setModalVisible: (_value: boolean) => void;
  timeoutQuery?: number;
};

const SearchInput: FC<Props> = ({
  handleSearch,
  query,
  setModalVisible,
  setQuery,
  timeoutQuery,
}) => {
  const [currentQuery, setCurrentQuery] = useState(query);
  const queryDebounce = useDebounce(currentQuery, timeoutQuery || 200);
  useEffect(() => {
    setQuery(queryDebounce);
  }, [queryDebounce]);
  return (
    <View style={styles.containerSearch}>
      <View style={{flex: 3}}>
        <InputText
          backgroundColor={Colors.dark.neutral10}
          returnKeyType="search"
          value={currentQuery}
          onSubmitEditing={handleSearch}
          maxLength={60}
          onChangeText={text => {
            setCurrentQuery(text);
          }}
          leftIcon={SearchIcon}
          rightIcon={query && ResetIcon}
          onPressIcon={() => {
            return setCurrentQuery('');
          }}
          placeholder="Cari judul, pelajaran"
        />
      </View>
      <Button
        style={{flex: 1, justifyContent: 'center', borderColor: 'transparent'}}
        label="Batal"
        textStyle={styles.containerSearchCancelLabel}
        outline
        action={() => {
          setCurrentQuery('');
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default SearchInput;
