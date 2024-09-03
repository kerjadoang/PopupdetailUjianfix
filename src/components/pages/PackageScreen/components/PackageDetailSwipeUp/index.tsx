import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import {MainText, MainView} from '@components/atoms';
import {currencyFormat, isPlatformIOS} from '@constants/functional';
import IconInfo from '@assets/svg/ic24_blue_info.svg';
import IconArrowRight from '@assets/svg/ic48_arrow_right_white.svg';
import Colors from '@constants/colors';

type Props = {
  selectedPackage: ISelectedPackage | Package;
  onPayment: any;
  promoStatus: any;
  setPromoStatus: CallBackWithParams<void, any>;
  checkDiscount: CallBackWithParams<void, string>;
  promoVoucher?: IPromoVoucher;
  feePrice?: number;
};

const PackageDetailSwipeUp: FC<Props> = ({
  selectedPackage,
  onPayment,
  promoStatus,
  promoVoucher,
}) => {
  const currentPrice = promoStatus?.statusSuccess
    ? promoVoucher?.price_after_discount || 0
    : selectedPackage?.price_after_discount || 0;
  const feePrice = promoVoucher?.fee_price || selectedPackage?.fee_price || 0;
  const totalPrice = currentPrice + feePrice;

  return (
    <MainView padding={16}>
      <MainText
        type="Bold"
        fontSize={16}
        fontWeight="600"
        color={Colors.dark.neutral100}
        paddingBottom={16}>
        Detail Pembelian
      </MainText>

      <MainView gap={8}>
        <MainView justifyContent="space-between" flexDirection="row">
          <MainText>Harga Paket</MainText>
          <MainText>
            {currencyFormat(selectedPackage?.price_after_discount ?? 0)}
          </MainText>
        </MainView>
        {promoStatus.statusSuccess ? (
          <MainView justifyContent="space-between" flexDirection="row">
            <MainText>Diskon Kode Promo</MainText>
            <MainText>
              - {currencyFormat(promoVoucher?.total_discount ?? 0)}
            </MainText>
          </MainView>
        ) : null}
        <MainView justifyContent="space-between" flexDirection="row">
          <MainText>{isPlatformIOS ? 'App' : 'Play'}Store Fee</MainText>
          <MainText>{currencyFormat(selectedPackage.fee_price || 0)}</MainText>
        </MainView>
      </MainView>

      <MainView
        paddingHorizontal={8}
        paddingVertical={4}
        backgroundColor={Colors.primary.light3}
        borderRadius={10}
        overflow="hidden"
        flexDirection="row"
        gap={3}
        alignItems="center"
        marginVertical={8}>
        <IconInfo width={20} height={20} />
        <MainText fontSize={12} lineHeight={16}>
          Biaya layanan dari {isPlatformIOS ? 'App' : 'Play'} Store
        </MainText>
      </MainView>

      <MainView height={4} backgroundColor={Colors.dark.neutral10} />

      <MainView
        justifyContent="space-between"
        flexDirection="row"
        marginVertical={8}>
        <MainText type="Bold" fontSize={16} lineHeight={24}>
          Harga Total
        </MainText>
        <MainText type="Bold" fontSize={16} lineHeight={24}>
          {currencyFormat(totalPrice)}
        </MainText>
      </MainView>

      <MainView height={4} backgroundColor={Colors.dark.neutral10} />

      {/* <MainView marginVertical={16}>
        <MainText>Punya Kode Promo?</MainText>
        <InputText
          ref={inputTextRef}
          autoCapitalize={'characters'}
          value={promoTxt}
          onChangeText={(value: any) => {
            if (value === '') {
              setPromoStatus({isUse: false});
            }
            setPromoTxt(value);
          }}
          backgroundColor={Colors.dark.neutral10}
          placeholder="Masukkan kode"
          placeholderTextColor={Colors.neutral.neutral200}
          leftIcon={() => {
            return <IconCoupon />;
          }}
          error={promoStatus?.statusError}
          errorMessage={promoStatus?.messageError}
          success={promoStatus?.statusSuccess}
          successMessage={promoStatus?.messageSuccess}
          customRightText={
            <TextInput.Icon
              icon={() => {
                return (
                  <View
                    style={[
                      styles.promoCodeContainer,
                      {
                        backgroundColor:
                          promoTxt === ''
                            ? Colors.neutral.neutral100
                            : promoStatus.isUse
                            ? Colors.danger.base
                            : Colors.primary.base,
                      },
                    ]}>
                    <Pressable
                      style={{}}
                      disabled={promoTxt === ''}
                      onPress={() => {
                        Keyboard.dismiss();
                        if (promoStatus.isUse) {
                          setPromoTxt('');
                          setPromoStatus({isUse: false});
                        } else {
                          checkDiscount(promoTxt);
                        }
                      }}>
                      <MainText
                        color={
                          promoTxt !== ''
                            ? Colors.white
                            : Colors.neutral.neutral400
                        }
                        fontWeight="600">
                        {!promoStatus?.isUse ? 'Gunakan' : 'Hapus'}
                      </MainText>
                    </Pressable>
                  </View>
                );
              }}
              style={{width: 90, position: 'absolute', right: 0}}
            />
          }
        />
      </MainView> */}

      <TouchableOpacity style={styles.buttonBuyPackage} onPress={onPayment}>
        <MainText type="Bold" color={Colors.white}>
          Lanjut Pembayaran
        </MainText>
        <MainView flexDirection="row" gap={8} alignItems="center">
          <MainText type="Bold" color={Colors.white}>
            {currencyFormat(totalPrice)}
          </MainText>
          <IconArrowRight />
        </MainView>
      </TouchableOpacity>
    </MainView>
  );
};

export default PackageDetailSwipeUp;
