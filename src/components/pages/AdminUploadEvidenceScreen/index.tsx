import React, {useLayoutEffect} from 'react';
import {
  Button,
  Header,
  InputText,
  MainText,
  MainView,
  PopUp,
  SwipeUp,
} from '@components/atoms';
import {styleProps, styles} from './style';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {_handlerSubstringText} from '@constants/functional';
import useAdminUploadEvidenceScreen from './useAdminUploadEvidenceScreen';
import IconSearchGrey from '@assets/svg/ic_search_grey.svg';
import IconUploadBlue from '@assets/svg/ic_upload_blue.svg';
import IconCheckBlue from '@assets/svg/ic24_check_blue.svg';
import ProgressBar from '@components/atoms/ProgressBar';
import IconClose from '@assets/svg/x.svg';
import Colors from '@constants/colors';
import dayjs from 'dayjs';
import {NewDateTimePickerForm} from '@components/atoms/NewDateTimePickerForm';

const AdminUploadEvidenceScreen = () => {
  const {
    isShowPopup,
    popupData,
    navigation,
    searchQuery,
    textInputData,
    isShowSwipeUpRegistrationNumber,
    isShowSwipeUpChooseDate,
    isShowSwipeUpPaymentMethod,
    isShowSwipeUpSchoolBankAccount,
    isShowSwipeUpPaymentCategory,
    listRegistrationNumber,
    listPaymentMethod,
    listSchoolBankAccount,
    listPaymentCategory,
    selectedRegistrationNumberTemporary,
    selectedRegistrationNumber,
    selectedPaymentMethodTemporary,
    selectedSchoolBankAccount,
    selectedSchoolBankAccountTemporary,
    otherSchoolBankDescription,
    selectedPaymentCategory,
    selectedPaymentCategoryTemporary,
    otherPaymentDescription,
    paymentAmount,
    seletedAttachment,
    userType,
    paymentDate,
    _handlerHideSwipeUpRegistrationNumber,
    _handlerHideSwipeUpChooseDate,
    _handlerOnPressSelectedDatePicker,
    _handlerHideSwipeUpPaymentMethod,
    _handlerHideSwipeUpSchoolBankAccount,
    _handlerHideSwipeUpPaymentCategory,
    _handlerOnChangeSearchingRegistrationNumber,
    _handlerOnSubmitSearchRegistrationNumber,
    _handlerOnPressSelectedRegistrationNumber,
    _handlerOnPressSelectedPaymentMethod,
    _handlerOnPressSelectedSchoolBankAccount,
    _handlerOnPressSelectedPaymentCategory,
    _handlerOnPressSaveRegistrationNumber,
    _handlerOnPressApplyPaymentMethod,
    _handlerOnPressApplySchoolBankAccount,
    _handlerOnPressApplyPaymentCategory,
    _handlerValidateAllField,
    _handlerBackButton,
    _handlerDocumentSelection,
    _handlerOnCloseAttachmentUpload,
    _handlerReUploadImage,
    _handlerOnChangePaymentAmount,
    _handlerOnChangeOtherPaymentDescription,
    _handlerOnChangeOtherSchoolBanktDescription,
  } = useAdminUploadEvidenceScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => _renderHeader(),
    });
  }, []);

  const _renderHeader = () => {
    return (
      <Header
        label={'Unggah Bukti Pembayaran'}
        onPressIconLeft={() => {
          _handlerBackButton();
        }}
      />
    );
  };

  const _renderSwipeUpRegistrationNumber = () => {
    return (
      <View style={styles.swipeupContainer}>
        <Text style={styles.swipeupRegistrationNumberHeaderTitle}>
          {'Cari NIS Murid'}
        </Text>

        <InputText
          bottom={16}
          width={'100%'}
          backgroundColor={Colors.dark.neutral10}
          placeholderTextColor={Colors.dark.neutral50}
          returnKeyType={'search'}
          value={searchQuery}
          maxLength={60}
          onChangeText={(val: any) => {
            _handlerOnChangeSearchingRegistrationNumber(val);
          }}
          onSubmitEditing={() => {
            _handlerOnSubmitSearchRegistrationNumber();
          }}
          leftIcon={IconSearchGrey}
          placeholder={'Cari'}
        />

        <ScrollView
          contentContainerStyle={
            styles.swipeupRegistrationNumberContentContainerStyle
          }
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.swipeUpContainer}>
            {listRegistrationNumber &&
              listRegistrationNumber?.map((item: any, index: number) =>
                _renderCardRegistrationNumber(item, index),
              )}
          </View>
        </ScrollView>

        <View style={styles.swipeupRegistrationNumberButtonContainer}>
          <Button
            outline
            label={'Batal'}
            action={() => {
              _handlerHideSwipeUpRegistrationNumber();
            }}
            style={styles.swipeupRegistrationNumberButton}
          />
          <Button
            label={'Simpan'}
            action={() => {
              _handlerOnPressSaveRegistrationNumber();
            }}
            style={styles.swipeupRegistrationNumberButton}
          />
        </View>
      </View>
    );
  };

  const _renderCardRegistrationNumber = (item: any, index: number) => {
    const {id, student} = item || false;
    const isSeletedItem = selectedRegistrationNumberTemporary?.id == id;
    const cardTitleStyle = isSeletedItem
      ? styles.swipeupRegistrationNumberCardActiveTitle
      : styles.swipeupRegistrationNumberCardNotActiveTitle;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          _handlerOnPressSelectedRegistrationNumber(item);
        }}
        style={styles.swipeupRegistrationNumberCard}>
        <Text style={cardTitleStyle}>{_handlerSubstringText(student, 30)}</Text>
        {isSeletedItem ? <IconCheckBlue width={24} height={24} /> : null}
      </TouchableOpacity>
    );
  };

  const _renderCardRadioButton = (
    item: any,
    index: number,
    type: 'PAYMENT_METHOD' | 'SCHOOL_BANK_ACCOUNT' | 'PAYMENT_CATEGORY',
  ) => {
    const isTypePaymentMethod = type == 'PAYMENT_METHOD';
    const isTypeSchoolBankAccount = type == 'SCHOOL_BANK_ACCOUNT';
    const {id, name} = item || false;

    const isSeletedItem = isTypePaymentMethod
      ? selectedPaymentMethodTemporary?.id == id
      : isTypeSchoolBankAccount
      ? selectedSchoolBankAccountTemporary?.id == id
      : selectedPaymentCategoryTemporary?.id == id;

    const buttonStyle = isSeletedItem
      ? styles.swipeupPaymentMethodActiveButton
      : styles.swipeupPaymentMethodNotActiveButton;

    const titleStyle = isSeletedItem
      ? styles.swipeupPaymentMethodActiveTitle
      : styles.swipeupPaymentMethodNotActiveTitle;

    const onPressSelect = isTypePaymentMethod
      ? () => _handlerOnPressSelectedPaymentMethod(item)
      : isTypeSchoolBankAccount
      ? () => _handlerOnPressSelectedSchoolBankAccount(item)
      : () => _handlerOnPressSelectedPaymentCategory(item);

    return (
      <View key={index} style={styles.swipeupPaymentMethodItemContainer}>
        <TouchableOpacity onPress={onPressSelect} style={buttonStyle}>
          <Text style={titleStyle}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderSwipeUpChooseDate = () => {
    return (
      <NewDateTimePickerForm
        title={'Pilih Tanggal'}
        monthBefore={1}
        onSaveChange={_handlerOnPressSelectedDatePicker}
        currentDate={paymentDate.valueDatePicker || dayjs().toObject()}
      />
    );
  };

  const _renderSwipeUpList = (
    type: 'PAYMENT_METHOD' | 'SCHOOL_BANK_ACCOUNT' | 'PAYMENT_CATEGORY',
  ) => {
    const isTypePaymentMethod = type == 'PAYMENT_METHOD';
    const isTypeSchoolBankAccount = type == 'SCHOOL_BANK_ACCOUNT';

    const title = isTypePaymentMethod
      ? 'Metode Pembayaran'
      : isTypeSchoolBankAccount
      ? 'Rekening Sekolah'
      : 'Kategori Pembayaran';

    const subtitle = isTypePaymentMethod
      ? 'Pilih Metode'
      : isTypeSchoolBankAccount
      ? 'Pilih Rekening'
      : 'Pilih Kategori';

    const listData = isTypePaymentMethod
      ? listPaymentMethod
      : isTypeSchoolBankAccount
      ? listSchoolBankAccount
      : listPaymentCategory;

    const onPressApply = isTypePaymentMethod
      ? () => _handlerOnPressApplyPaymentMethod()
      : isTypeSchoolBankAccount
      ? () => _handlerOnPressApplySchoolBankAccount()
      : () => _handlerOnPressApplyPaymentCategory();

    return (
      <View style={styles.swipeupListContainer}>
        <Text style={styles.swipeupHeaderTitle}>{title}</Text>
        <Text style={styles.swipeupHeaderSubtTitle}>{subtitle}</Text>
        <View style={styles.swipeupList}>
          {listData &&
            listData?.map((item: any, index: number) =>
              _renderCardRadioButton(item, index, type),
            )}
        </View>

        <View style={styles.swipeupListButtonContainer}>
          <Button
            label={'Terapkan'}
            action={onPressApply}
            style={styles.swipeupListApplyButton}
          />
        </View>
      </View>
    );
  };

  const _renderTextInput = (item: any, index: number) => {
    if (item === undefined) {
      return <View key={index} />;
    }

    const {
      label,
      value,
      placeholder,
      errorMessage,
      onPress,
      backgroundColor,
      leftIcon,
      rightIcon,
      isDisabled,
    } = item;
    const labelTitleStyles = value
      ? styles.inpuTextTitle
      : styles.inpuTextPlaceholder;
    const labelTitle = value || placeholder;
    const isSelecetedOtherSchoolBankAccount =
      selectedSchoolBankAccount?.name === 'Lainnya';
    const isLabelOtherSchoolBankAccount = label == 'Deskripsi Rekening Lainnya';

    return (
      <View key={index}>
        {isLabelOtherSchoolBankAccount ? (
          <>
            {isSelecetedOtherSchoolBankAccount ? (
              <InputText
                label={label}
                width={'100%'}
                bottom={16}
                errorMessageStyle={{marginTop: 8}}
                errorMessage={otherSchoolBankDescription?.errorMessage}
                backgroundColor={Colors.dark.neutral10}
                placeholderTextColor={Colors.dark.neutral50}
                value={otherSchoolBankDescription?.value}
                onChangeText={(val: any) => {
                  _handlerOnChangeOtherSchoolBanktDescription(val);
                }}
                placeholder={'Deskripsi Rekening Lainnya'}
              />
            ) : null}
          </>
        ) : (
          <View style={styles.inputTextContainer}>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity
              disabled={isDisabled}
              onPress={onPress}
              style={styleProps(backgroundColor, errorMessage).inputText}>
              <View style={styles.row}>
                {leftIcon ? (
                  <View style={{marginRight: 8}}>{leftIcon}</View>
                ) : null}

                <Text style={labelTitleStyles}>{labelTitle}</Text>
              </View>

              {rightIcon ? rightIcon : null}
            </TouchableOpacity>

            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
          </View>
        )}
      </View>
    );
  };

  const _renderUploadEvidence = () => {
    return (
      <>
        {seletedAttachment?.data?.uri ? (
          <View style={{marginBottom: 16}}>
            <Text style={styles.label}>{'Unggah Bukti Pembayaran'}</Text>

            <ImageBackground
              source={{uri: seletedAttachment?.data?.uri}}
              imageStyle={styles.imageBackground}>
              <View style={styles.attachmentImageContainer}>
                <TouchableOpacity
                  onPress={() => {
                    _handlerOnCloseAttachmentUpload();
                  }}>
                  <IconClose width={8} height={8} style={styles.iconClose} />
                </TouchableOpacity>
                <View />

                {seletedAttachment?.progressUpload == '100%' ? (
                  <TouchableOpacity
                    onPress={() => {
                      _handlerReUploadImage();
                    }}
                    style={styles.attachmentResendContainer}>
                    <Text style={styles.attachmentResendTitle}>
                      {'Unggah ulang'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <ProgressBar progress={seletedAttachment?.progressUpload} />
                )}
              </View>
            </ImageBackground>
          </View>
        ) : (
          <View>
            <Text style={styles.label}>{'Unggah Bukti Pembayaran'}</Text>

            <Button
              primaryLight
              label={'Unggah Gambar'}
              action={() => {
                _handlerDocumentSelection();
              }}
              iconLeft={<IconUploadBlue width={24} height={24} />}
              style={styles.uploadEvidenceButton}
            />

            <Text style={styles.uploadEvidenceNote}>
              {'Maksimal Ukuran File 230 MB'}
            </Text>

            {seletedAttachment?.errorMessage ? (
              <Text style={styles.errorMessage}>
                {seletedAttachment?.errorMessage}
              </Text>
            ) : null}
          </View>
        )}
      </>
    );
  };

  const _renderContent = () => {
    return (
      <>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.container}>
            {userType.role === 'ORANG-TUA' && (
              <MainView style={styles.userCard}>
                <MainText type="SemiBold">
                  {selectedRegistrationNumber?.full_name}
                </MainText>
                <MainText>
                  {selectedRegistrationNumber?.class_name} •{' '}
                  {selectedRegistrationNumber?.school_name}
                </MainText>
              </MainView>
            )}
            {textInputData &&
              textInputData?.map((item: any, index: number) =>
                _renderTextInput(item, index),
              )}

            {selectedPaymentCategory?.id == 5 ? (
              <InputText
                label={'Deskripsi Pembayaran Lainnya'}
                bottom={16}
                width={'100%'}
                errorMessage={otherPaymentDescription?.errorMessage}
                backgroundColor={Colors.dark.neutral10}
                placeholderTextColor={Colors.dark.neutral50}
                value={otherPaymentDescription?.value}
                onChangeText={(val: any) => {
                  _handlerOnChangeOtherPaymentDescription(val);
                }}
                placeholder={'Deskripsi pembayaran'}
              />
            ) : null}

            <InputText
              label={'Nominal Pembayaran'}
              bottom={16}
              width={'100%'}
              keyboardType={'numeric'}
              errorMessageStyle={{marginTop: 8}}
              errorMessage={paymentAmount?.errorMessage}
              backgroundColor={Colors.dark.neutral10}
              placeholderTextColor={Colors.dark.neutral50}
              value={paymentAmount?.value}
              onChangeText={(val: any) => {
                _handlerOnChangePaymentAmount(val);
              }}
              placeholder={'Rp'}
            />

            {_renderUploadEvidence()}

            <Button
              label={'Simpan'}
              action={_handlerValidateAllField}
              style={styles.swipeupListApplyButton}
            />
          </View>
        </ScrollView>

        {/* {isLoading ? <LoadingIndicator /> : null} */}

        <SwipeUp
          visible={isShowSwipeUpRegistrationNumber}
          onClose={_handlerHideSwipeUpRegistrationNumber}
          children={_renderSwipeUpRegistrationNumber()}
        />

        <SwipeUp
          visible={isShowSwipeUpChooseDate}
          onClose={_handlerHideSwipeUpChooseDate}
          children={_renderSwipeUpChooseDate()}
        />

        <SwipeUp
          visible={isShowSwipeUpPaymentMethod}
          onClose={_handlerHideSwipeUpPaymentMethod}
          children={_renderSwipeUpList('PAYMENT_METHOD')}
        />

        <SwipeUp
          visible={isShowSwipeUpSchoolBankAccount}
          onClose={_handlerHideSwipeUpSchoolBankAccount}
          children={_renderSwipeUpList('SCHOOL_BANK_ACCOUNT')}
        />

        <SwipeUp
          visible={isShowSwipeUpPaymentCategory}
          onClose={_handlerHideSwipeUpPaymentCategory}
          children={_renderSwipeUpList('PAYMENT_CATEGORY')}
        />

        <PopUp
          show={isShowPopup}
          Icon={popupData?.icon}
          title={popupData?.title}
          desc={popupData?.description}
          titleConfirm={popupData?.labelConfirm}
          actionConfirm={popupData?.onPressConfirm}
          titleCancel={popupData?.labelCancel}
          actionCancel={popupData?.onPressCancel}
        />
      </>
    );
  };

  return _renderContent();
};

export {AdminUploadEvidenceScreen};
