import {InputText, InputTextProps} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  PressableProps,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';
import ResetIcon from '@assets/svg/close_x.svg';
import SearchIcon from '@assets/svg/ic_search_blue.svg';

type SearchInputProps = {
  query: string;
  setModalVisible?: (_value: boolean) => void;
  cancelable?: boolean;
  onClear?: () => void;
  onPressCancel?: PressableProps['onPress'];
  onSubmit?: () => void;
  placeholder?: string;
  customRightText?: React.JSX.Element;
  hideRightIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
} & InputTextProps;

const SearchInput: React.FC<SearchInputProps> = props => {
  return (
    <View style={[styles.containerSearch, props.containerStyle]}>
      <View style={[{flex: 5}, props.inputContainerStyle]}>
        <InputText
          placeholder={props.placeholder || 'Cari'}
          returnKeyType="search"
          backgroundColor={Colors.dark.neutral10}
          value={props.query}
          maxLength={60}
          leftIcon={SearchIcon}
          customRightText={props.customRightText}
          rightIcon={
            !props.hideRightIcon &&
            !props.customRightText &&
            props.query &&
            ResetIcon
          }
          onPressIcon={props.onClear}
          onSubmitEditing={props.onSubmit}
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
  cancelLabelContainter: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
  },
  cancelLabel: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primary.base,
  },
});

export default SearchInput;
