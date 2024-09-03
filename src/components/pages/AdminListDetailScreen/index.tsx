import React, {useLayoutEffect} from 'react';
import {Button, Header, InputText, SwipeUp} from '@components/atoms';
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconArrowRightBlue from '@assets/svg/ic_arrow_right_blue.svg';
import IconUploadWhite from '@assets/svg/ic24_upload_white.svg';
import {styles} from './style';
import {Maskot1, Maskot12, Maskot13} from '@assets/images';
import {
  _handlerCapitalizeFirstLetter,
  _handlerConvertAllDate,
  _handlerSubstringText,
  convertToRupiah,
} from '@constants/functional';
import {PopUpCustom} from '@components/atoms/PopUpCustom';
import Colors from '@constants/colors';
import {useRoute} from '@react-navigation/native';
import useAdminListDetailScreen from './useAdminListDetailScreen';
import RenderImage from '@components/atoms/RenderImage';

const AdminListDetailScreen = () => {
  const {
    listData,
    tabData,
    navigation,
    selectedTab,
    isShowPopupApproved,
    isShowPopupRejected,
    isShowSwipeUpEvidence,
    evidenceData,
    popupDeclineData,
    getUser,
    _handlerNavigateToAdminUploadEvidenceScreen,
    _handlerOnPressCancelPopup,
    _handlerOnPressTab,
    _handlerShowPopupApproved,
    _handlerShowPopupRejected,
    _handlerShowHideSwipeUpEvidence,
    _handlerHideSwipeUpEvidence,
    _handlerOnPressAccept,
    _handlerOnPressDecline,
    _handlerOnChangeApproved,
    _handlerOnChangeRejected,
  } = useAdminListDetailScreen();
  const route = useRoute();
  const {full_name, rombel_class_school_name}: any = route?.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => _renderHeader(),
    });
  }, []);

  const _renderSwipeUpApproved = () => {
    return (
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <Image source={Maskot1} style={styles.popupIcon} />
        <Text style={styles.popupTitle}>{'Terima Bukti Pembayaran'}</Text>
        <Text style={styles.popupSubtitle}>
          {'Kamu bisa masukkan keterangan untuk\nmenerima pembayaran ini'}
        </Text>
        <View>
          <InputText
            multiline={true}
            borderRadius={10}
            placeholderTextColor={Colors.dark.neutral50}
            inputTextStyle={styles.popupInputText}
            backgroundColor={Colors.dark.neutral10}
            onChangeText={text => {
              _handlerOnChangeApproved(text);
            }}
            placeholder={'Tulis keterangan penerimaan di sini... (opsional)'}
          />
        </View>
        <View style={styles.popupButtonContainer}>
          <Button
            outline
            label={'Kembali'}
            style={styles.popupButton}
            action={_handlerOnPressCancelPopup}
          />
          <Button
            success
            label={'Terima'}
            style={styles.popupButton}
            action={() => {
              _handlerOnPressAccept();
            }}
          />
        </View>
      </Pressable>
    );
  };

  const _renderSwipeUpRejected = () => {
    return (
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <Image source={Maskot13} style={styles.popupIcon} />
        <Text style={styles.popupTitle}>{'Tolak Bukti Pembayaran'}</Text>
        <Text style={styles.popupSubtitle}>
          {'Apakah Anda yakin untuk menolak\nbukti pembayaran ini?'}
        </Text>
        <View>
          <InputText
            multiline={true}
            borderRadius={10}
            errorMessageStyle={{marginTop: -8}}
            placeholderTextColor={Colors.dark.neutral50}
            inputTextStyle={styles.popupInputText}
            backgroundColor={Colors.dark.neutral10}
            onChangeText={text => {
              _handlerOnChangeRejected(text);
            }}
            errorMessage={popupDeclineData?.note?.errorMessage}
            placeholder={'Tulis keterangan penolakan di sini...'}
          />
        </View>
        <View style={styles.popupButtonContainer}>
          <Button
            outline
            label={'Kembali'}
            style={styles.popupButton}
            action={_handlerOnPressCancelPopup}
          />
          <Button
            isDisabled={!popupDeclineData?.note?.isValid}
            label={'Tolak'}
            style={styles.popupButton}
            action={() => {
              _handlerOnPressDecline();
            }}
          />
        </View>
      </Pressable>
    );
  };

  const _renderSwipeUpEvidence = () => {
    const {
      full_name,
      payment_code,
      rombel_class_school_name,
      payment_date,
      status,
      payment_notes,
      payment_category,
      payment_method,
      payment_confirm_date,
      registration_number,
      payment_proof_pict_path_url,
    } = evidenceData || false;
    const paymentEvidenceImage = payment_proof_pict_path_url;

    const paymentConfirmDate: any = _handlerConvertAllDate(
      payment_confirm_date,
      11,
    );
    const paymentDate: any = _handlerConvertAllDate(payment_date, 13);
    const isStatusAvailable = status?.toLowerCase() != 'belum diverifikasi';
    const dataEvidenceWithStatus = [
      {
        label: 'No Transaksi',
        description: payment_code,
      },
      {
        label: 'NIS',
        description: registration_number,
      },
      {
        label: 'Nama',
        description: full_name,
      },
      {
        label: 'Tanggal Pembayaran',
        description: paymentDate,
      },
      {
        label: 'Kelas',
        description: rombel_class_school_name,
      },
      {
        label: 'Metode Pembayaran',
        description: payment_category?.name,
      },
      {
        label: 'Rekening Sekolah',
        description: payment_method?.name,
      },
      {
        label: 'Status Pembayaran',
        description: status,
      },
      {
        label: 'Catatan',
        description: payment_notes?.notes_status || '-',
      },
    ];

    const dataEvidenceWithoutStatus = [
      {
        label: 'No Transaksi',
        description: payment_code,
      },
      {
        label: 'NIS',
        description: registration_number,
      },
      {
        label: 'Nama',
        description: full_name,
      },
      {
        label: 'Tanggal Pembayaran',
        description: paymentDate,
      },
      {
        label: 'Kelas',
        description: rombel_class_school_name,
      },
      {
        label: 'Metode Pembayaran',
        description: payment_category?.name,
      },
      {
        label: 'Rekening Sekolah',
        description: payment_method?.name,
      },
    ];

    const dataEvidence = isStatusAvailable
      ? dataEvidenceWithStatus
      : dataEvidenceWithoutStatus;

    return (
      <View style={styles.swipeUpEvidenceContainer}>
        <Text style={styles.swipeUpEvidenceHeaderTitle}>
          {'Bukti Pembayaran'}
        </Text>

        {payment_confirm_date ? (
          <View style={styles.swipeUpConfirmDateContainer}>
            <Text style={styles.swipeUpConfirmDateTitle}>
              {'Dikonfirmasi pada: '}
            </Text>
            <Text style={styles.swipeUpConfirmDateDescription}>
              {paymentConfirmDate}
            </Text>
          </View>
        ) : null}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}
          contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <View>
            {dataEvidence?.map((value: any, index: number) => {
              const {label, description} = value;
              const isStatusApprovedOrRejected =
                description === 'diterima' || description === 'ditolak';
              const isStatusApproved = description === 'diterima';
              const styleBadgeContainer = isStatusApproved
                ? styles.swipeUpEvidenceBadgeSuccessContainer
                : styles.swipeUpEvidenceBadgeErrorContainer;
              const styleBadgeTitle = isStatusApproved
                ? styles.swipeUpEvidenceBadgeSuccessTitle
                : styles.swipeUpEvidenceBadgeErrorTitle;

              return (
                <View key={index} style={styles.row}>
                  <Text style={styles.swipeUpEvidenceTitle}>{label}</Text>
                  {!isStatusApprovedOrRejected ? (
                    <Text style={styles.swipeUpEvidenceDecription}>
                      {`: ${description}`}
                    </Text>
                  ) : (
                    <View style={styles.row}>
                      <Text style={styles.swipeUpEvidenceDecription}>
                        {': '}
                      </Text>

                      <View style={styleBadgeContainer}>
                        <Text style={styleBadgeTitle}>
                          {_handlerCapitalizeFirstLetter(description)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {paymentEvidenceImage ? <View style={styles.greyLine} /> : null}

          <RenderImage
            imageUrl={paymentEvidenceImage}
            style={styles.swipeUpEvidenceImage}
            showPreviewImage
          />
        </ScrollView>

        <View style={styles.swipeUpEvidenceButtonContainer}>
          <Button
            label={'Tutup'}
            action={() => {
              _handlerHideSwipeUpEvidence();
            }}
          />
        </View>
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <Header
        label={'Detail Administrasi'}
        subLabel={`${_handlerSubstringText(
          full_name,
          22,
        )} • ${rombel_class_school_name}`}
      />
    );
  };

  const _renderEmptyContent = () => {
    const isTabHistory = selectedTab === 'riwayat';
    const emptyTitle = isTabHistory
      ? 'Belum Ada Riwayat Administrasi'
      : 'Belum Ada Verifikasi Administrasi';
    const emptySubtitle = isTabHistory
      ? 'Administrasi yang diterima atau ditolak akan tampil di sini.'
      : 'Administrasi yang perlu proses verifikasi akan tampil di sini.';

    return (
      <View style={styles.emptyContentContainer}>
        <View>
          <Image source={Maskot12} style={styles.emptyContentIcon} />
          <Text style={styles.emptyContentTitle}>{emptyTitle}</Text>
          <Text style={styles.emptyContentSubtitle}>{emptySubtitle}</Text>
        </View>
      </View>
    );
  };

  const _renderTab = (item: any, index: number) => {
    const isSelectedTab = item === selectedTab;
    const verifikasiTabNames =
      getUser?.data?.user_type_id === 2
        ? 'Belum Diverifikasi'
        : 'Perlu Verifikasi';
    const tabTitle =
      item == 'perlu_verifikasi' ? verifikasiTabNames : 'Riwayat';

    return (
      <TouchableOpacity
        key={index}
        style={{flex: 1}}
        onPress={() => {
          _handlerOnPressTab(item);
        }}>
        <View style={styles.tabContainer}>
          <Text
            style={
              isSelectedTab ? styles.tabTitleActive : styles.tabTitlePassive
            }>
            {tabTitle}
          </Text>
        </View>

        {isSelectedTab ? <View style={styles.tabBottomLineActive} /> : null}
      </TouchableOpacity>
    );
  };

  const _renderCard = (item: any, index: number) => {
    const {id, payment_date, payment_for_name, status, payment_notes, nominal} =
      item || false;

    const paymentDate: any = _handlerConvertAllDate(payment_date);
    const nominalInRupiah = convertToRupiah(nominal);
    const statusPayment = _handlerCapitalizeFirstLetter(status);

    const isAccepted = status == 'diterima';
    const isRejected = status == 'ditolak';
    const stylingCardStatusContainer = isAccepted
      ? styles.cardStatusContainerAccepted
      : isRejected
      ? styles.cardStatusContainerRejected
      : styles.cardStatusContainerWaiting;
    const stylingCardStatusTitle = isAccepted
      ? styles.cardStatusTitleAccepted
      : isRejected
      ? styles.cardStatusTitleRejected
      : styles.cardStatusTitleWaiting;

    return (
      <View key={index}>
        <View style={styles.card}>
          <View style={styles.cardTopSection}>
            <View>
              <Text style={styles.cardTitle}>{payment_for_name}</Text>
              <Text style={styles.cardNisTitle}>{`Rp${nominalInRupiah}`}</Text>
            </View>

            <View>
              <Text style={styles.cardDateTitle}>{paymentDate}</Text>
              <View style={styles.cardStatusContainer}>
                <View style={stylingCardStatusContainer}>
                  <Text style={stylingCardStatusTitle}>{statusPayment}</Text>
                </View>
              </View>
            </View>
          </View>

          {selectedTab == 'riwayat' ? (
            <Text style={styles.cardPaymentForTitle}>{`Catatan: ${
              payment_notes?.notes_status || '-'
            }`}</Text>
          ) : null}

          {selectedTab != 'riwayat' && getUser?.data?.user_type_id !== 2 ? (
            <View style={styles.cardButtonContainer}>
              <Button
                outline
                label={'Tolak'}
                action={() => {
                  _handlerShowPopupRejected(id);
                }}
                style={styles.cardButton}
              />

              <Button
                success
                label={'Terima'}
                action={() => {
                  _handlerShowPopupApproved(id);
                }}
                style={styles.cardButton}
              />
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.cardBottomSection}
            onPress={() => {
              _handlerShowHideSwipeUpEvidence(id);
            }}>
            <Text style={styles.evidenceTitle}>{'Lihat bukti pembayaran'}</Text>
            <IconArrowRightBlue width={24} height={24} />
          </TouchableOpacity>
        </View>

        {index != listData?.length - 1 ? <View style={styles.gap} /> : null}
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <>
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.contentContainerStyleTab}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.contentStyleTab}>
              {tabData &&
                tabData?.map((item: any, index: number) =>
                  _renderTab(item, index),
                )}
            </View>
          </ScrollView>
          <View style={styles.tabBottomLineGrey} />
        </View>

        <View style={styles.contentContainer}>
          {listData && listData.length != 0 ? (
            <ScrollView
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}
              bounces={false}>
              {listData &&
                listData?.map((item: any, index: number) =>
                  _renderCard(item, index),
                )}
            </ScrollView>
          ) : (
            _renderEmptyContent()
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            action={() => {
              _handlerNavigateToAdminUploadEvidenceScreen();
            }}
            iconLeft={<IconUploadWhite width={24} height={24} />}
            label={'Unggah Bukti Pembayaran'}
          />
        </View>

        <SwipeUp
          visible={isShowSwipeUpEvidence}
          children={_renderSwipeUpEvidence()}
          onClose={() => _handlerHideSwipeUpEvidence()}
        />

        <PopUpCustom
          visible={isShowPopupApproved}
          onPressCancel={() => {
            _handlerOnPressCancelPopup();
          }}
          children={_renderSwipeUpApproved()}
        />

        <PopUpCustom
          visible={isShowPopupRejected}
          onPressCancel={() => {
            _handlerOnPressCancelPopup();
          }}
          children={_renderSwipeUpRejected()}
        />
      </>
    );
  };

  return <View style={styles.rootContainer}>{_renderContent()}</View>;
};

export {AdminListDetailScreen};
