import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Button, InputText} from '@components/atoms';
import useFormAuthentication from './useFormAuthentication';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const FormAuthentication = () => {
  const {valid, form, handleuserChange, submit, errorMessage, loading} =
    useFormAuthentication();
  return (
    <View style={styles.form}>
      {loading ? <LoadingIndicator /> : null}
      <InputText
        bottom={24}
        label="No. HP / Email"
        error={!valid && form?.username ? true : false}
        errorMessage={errorMessage}
        placeholder=""
        value={form?.username}
        onChangeText={handleuserChange}
        maxLength={undefined}
        backgroundColor={Colors.dark.neutral10}
        borderWidth={undefined}
        autoCapitalize="none"
        secure={false}
      />
      <Button
        action={() => submit(form?.username)}
        isDisabled={!valid ? true : false}
        label="Lanjut"
        background={!valid ? Colors.dark.neutral40 : Colors.primary.base}
        color={!valid ? Colors.dark.neutral60 : Colors.white}
        icon=""
      />
    </View>
  );
};

export default FormAuthentication;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
