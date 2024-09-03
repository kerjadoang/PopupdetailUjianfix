/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Colors from '@constants/colors';
import {
  Button,
  InputText,
  CCheckBox,
  SwipeUp,
  MainText,
} from '@components/atoms';
import {useScreen} from './useScreen';
import Fonts from '@constants/fonts';
import ArrowDown from '@assets/svg/ic_arrow_bottom_blue.svg';
import SearchInput from '@components/atoms/SearchInput';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {styles} from './styles';

const FormDiagnosticTestScreen = () => {
  // const navigation: any = useNavigation();
  const {
    email,
    fullname,
    student_phone,
    gender,
    classList,
    majorList,
    genderList,
    parent_phone,
    setState,
    className,
    isAgree,
    major,
    domicile,
    validateForm,
    setValidateForm,
    domicileName,
    setDomicileName,
    showDomicile,
    setShowDomicile,
    _handlerSubmitRegister,
    showAgree,
    setShowAgree,
    onPressTermsAndCondition,
    isOnlyPrefixNumber,
    userDomicile,
  } = useScreen();

  const DomicileChildren = () => {
    return (
      <View style={{padding: 16, height: 400}}>
        <Text style={styles.titleSwipe}>Pilih Domisili Kota</Text>
        <View style={styles.row}>
          <SearchInput
            query={domicileName}
            inputContainerStyle={{flex: 6, marginRight: 4}}
            onChangeText={(text: string) => setDomicileName(text)}
            onClear={() => setDomicileName('')}
            onPressCancel={() => {
              setDomicileName(userDomicile);
              return setShowDomicile(!showDomicile);
            }}
            cancelable
          />
        </View>
        <ScrollView>
          {domicile?.data?.data?.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                style={{paddingVertical: 12}}
                key={index}
                onPress={() => {
                  setValidateForm({...validateForm, isDomicileValid: true});
                  setDomicileName(item.name);
                  setState({
                    domicileId: item.id,
                  });
                  setTimeout(() => {
                    setShowDomicile(!showDomicile);
                  }, 500);
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 16,
                    lineHeight: 24,
                    color: Colors.dark.neutral80,
                    fontFamily: Fonts.RegularPoppins,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.itemData}>
            <InputText
              label={'Email'}
              placeholder="Example@kelaspintar.co.id"
              placeholderTextColor={Colors.dark.neutral40}
              backgroundColor={Colors.dark.neutral10}
              value={email}
              onChangeText={text => {
                if (text) {
                  setValidateForm({...validateForm, isEmailValid: true});
                }

                setState({email: text});
              }}
              errorMessage={
                validateForm.isEmailValid ? '' : 'Penulisan email salah.'
              }
              // error={true}
            />
          </View>
          <View style={styles.itemData}>
            <InputText
              label={'Nama Lengkap'}
              placeholder="Masukkan Nama Lengkap"
              placeholderTextColor={Colors.dark.neutral40}
              backgroundColor={Colors.dark.neutral10}
              value={fullname}
              onChangeText={text => {
                if (text) {
                  setValidateForm({...validateForm, isNameValid: true});
                }
                setState({fullname: text});
              }}
              maxLength={30}
              errorMessage={
                validateForm.isNameValid ? '' : 'Minimal 3 karakter.'
              }
            />
          </View>
          <View style={styles.itemData}>
            <InputText
              label={'No. HP Murid'}
              placeholder="+62"
              placeholderTextColor={Colors.dark.neutral40}
              backgroundColor={Colors.dark.neutral10}
              value={student_phone}
              onChangeText={text => {
                if (text) {
                  setValidateForm({...validateForm, isStudentPhoneValid: true});
                }
                if (isOnlyPrefixNumber(text)) {
                  return;
                }
                setState({student_phone: text});
              }}
              keyboardType="number-pad"
              errorMessage={
                validateForm.isStudentPhoneValid
                  ? ''
                  : 'Penulisan nomor HP salah.'
              }
            />
          </View>
          <View style={styles.itemData}>
            <InputText
              label={'No. HP Orang Tua'}
              placeholder="+62"
              placeholderTextColor={Colors.dark.neutral40}
              backgroundColor={Colors.dark.neutral10}
              value={parent_phone}
              onChangeText={text => {
                if (text) {
                  setValidateForm({...validateForm, isParentPhoneValid: true});
                }
                if (isOnlyPrefixNumber(text)) {
                  return;
                }
                setState({parent_phone: text});
              }}
              keyboardType="number-pad"
              errorMessage={
                validateForm.isParentPhoneValid
                  ? ''
                  : 'Penulisan nomor HP salah.'
              }
            />
          </View>
          <View style={styles.itemData}>
            <Text style={styles.label}>Pilih Kelas</Text>
            <View style={styles.row}>
              {classList.map((element: any, index: number) => {
                return (
                  <TouchableOpacity
                    style={
                      className === element
                        ? [styles.btnItemActive, {width: '28%'}]
                        : [
                            styles.btnItem,
                            {
                              width: '28%',
                              borderColor: validateForm.isClassNameValid
                                ? Colors.dark.neutral20
                                : Colors.danger.base,
                            },
                          ]
                    }
                    key={index}
                    onPress={() => {
                      setValidateForm({
                        ...validateForm,
                        isClassNameValid: true,
                      });
                      setState({className: element});
                    }}>
                    <Text
                      style={
                        className === element
                          ? styles.btnItemLabelActive
                          : styles.btnItemLabel
                      }>
                      {element}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {validateForm.isClassNameValid ? null : (
              <MainText color={Colors.danger.base}>Kelas wajib diisi</MainText>
            )}
          </View>
          <View style={styles.itemData}>
            <Text style={styles.label}>Pilih Jurusan</Text>
            <View style={styles.row}>
              {majorList.map((element: any, index: number) => {
                return (
                  <TouchableOpacity
                    style={
                      major === element
                        ? [styles.btnItemActive, {width: '45%'}]
                        : [
                            styles.btnItem,
                            {
                              width: '45%',
                              borderColor: validateForm.isMajorValid
                                ? Colors.dark.neutral20
                                : Colors.danger.base,
                            },
                          ]
                    }
                    key={index}
                    onPress={() => {
                      setValidateForm({...validateForm, isMajorValid: true});
                      setState({major: element});
                    }}>
                    <Text
                      style={
                        major === element
                          ? styles.btnItemLabelActive
                          : styles.btnItemLabel
                      }>
                      {element}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {validateForm.isMajorValid ? null : (
              <MainText color={Colors.danger.base}>
                Jurusan wajib diisi
              </MainText>
            )}
          </View>
          <View style={styles.itemData}>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <View style={styles.row}>
              {genderList.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={
                      gender === item.value
                        ? [styles.btnItemActive, {width: '45%'}]
                        : [
                            styles.btnItem,
                            {
                              width: '45%',
                              borderColor: validateForm.isGenderValid
                                ? Colors.dark.neutral20
                                : Colors.danger.base,
                            },
                          ]
                    }
                    onPress={() => {
                      setValidateForm({...validateForm, isGenderValid: true});
                      setState({gender: item.value});
                    }}>
                    <Text
                      style={
                        gender === item.value
                          ? styles.btnItemLabelActive
                          : styles.btnItemLabel
                      }>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {validateForm.isGenderValid ? null : (
              <Text style={styles.helperText}>Jenis Kelamin wajib diisi</Text>
            )}
          </View>
          <View style={styles.itemData}>
            <Text style={styles.label}>Domisili Kota</Text>
            <TouchableOpacity
              style={[
                styles.domicileBtn,
                {
                  borderWidth: 1,
                  borderColor: validateForm.isDomicileValid
                    ? 'transparent'
                    : Colors.danger.base,
                },
              ]}
              onPress={() => setShowDomicile(!showDomicile)}>
              <Text
                style={[
                  styles.domicileBtnText,
                  {color: domicileName ? Colors.black : Colors.dark.neutral60},
                ]}>
                {domicileName || 'Pilih Domisili'}
              </Text>
              <ArrowDown width={20} height={20} />
            </TouchableOpacity>
            {validateForm.isDomicileValid ? null : (
              <MainText marginTop={4} color={Colors.danger.base}>
                Domisili Kota wajib diisi
              </MainText>
            )}
          </View>

          <View style={styles.itemData}>
            <View style={[styles.row, {justifyContent: 'flex-start'}]}>
              <CCheckBox
                isChecked={isAgree}
                onPressCheck={() => setState({isAgree: !isAgree})}
                right={10}
              />
              <TouchableOpacity onPress={onPressTermsAndCondition}>
                <Text style={styles.label}>
                  Saya setuju dengan{' '}
                  <Text style={styles.blueText}>Syarat & Ketentuan</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.btmbtnContainer}>
        <Button
          label="Selanjutnya"
          action={() => _handlerSubmitRegister()}
          isDisabled={!isAgree}
        />
      </View>
      <SwipeUp
        visible={showDomicile}
        onClose={() => {
          setDomicileName(userDomicile);
          setTimeout(() => {
            setShowDomicile(false);
          }, 2000);
        }}
        children={DomicileChildren()}
      />
      <SnackbarResult
        label={'Harap Setujui Syarat dan Ketentuan'}
        visible={showAgree}
        onPressClose={() => setShowAgree(false)}
        type={'FAILED'}
      />
    </View>
  );
};
export {FormDiagnosticTestScreen};
