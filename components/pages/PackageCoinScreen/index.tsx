import React from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import styles from './styles';
import usePackageCoin from './usePackageCoin';
import {bgBlueOrnament} from '@assets/images';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import IconCoin from '@assets/svg/ic_coin.svg';
import RobotGembira from '@assets/svg/robot_gembira.svg';
import {Header, MainView, PopUp, SwipeUp} from '@components/atoms';
import Colors from '@constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import {currencyFormat, isPlatformIOS} from '@constants/functional';
import PackageCoinSwipeUp from './components/PackageCoinSwipeUp';
import {withIAPContext} from 'react-native-iap';
import BannerPackageWeb from '@assets/svg/banner_package_web.svg';

const PackageCoinScreen = withIAPContext(() => {
  const {
    navigation,
    userRole,
    detailPayment,
    isShowDetailPayment,
    showDetailPayment,
    hideDetailPayment,
    showSuccessPayment,
    setShowSuccessPayment,
    packageCoin,
    handlingPurchase,
    toggleDetailPayment,
    checkDiscount,
    promoStatus,
    setPromoStatus,
    promoVoucher,
    resetPromo,
  } = usePackageCoin();

  const renderItems = (items: Packages) => {
    return (
      <View style={styles.listCoinContainer}>
        <MainView flexDirection="row" alignItems="center">
          <IconCoin />
          <Text style={styles.coinTitle}>
            Paket {items?.total_coin ?? 0} Koin
          </Text>
        </MainView>
        <MainView>
          {items?.price_after_discount ? (
            <Text style={styles.priceBeforeDiscount}>
              {currencyFormat(items?.price ?? 0)}
            </Text>
          ) : null}
          <Text style={styles.priceAfterDiscount}>
            {currencyFormat(
              items?.price_after_discount
                ? items?.price_after_discount
                : items?.price ?? 0,
            )}
          </Text>
        </MainView>
      </View>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Header
          iconLeft={<IconArrowLeftWhite width={24} height={24} />}
          label={'Beli Paket'}
          styleLabel={styles.styleLabel}
          colorLabel={Colors.white}
          backgroundColor={'transparent'}
          onPressIconLeft={() => navigation.pop()}
        />
        <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
        <View style={styles.cardContainer}>
          <FlatList
            data={packageCoin?.packages}
            ListHeaderComponent={() => (
              <Text style={styles.titleHeader}>Pilih Paket Koin</Text>
            )}
            ItemSeparatorComponent={() => <MainView height={12} />}
            ListFooterComponent={() => {
              return Platform.OS === 'android' ? (
                <MainView marginVertical={20}>
                  <BannerPackageWeb width={'100%'} height={140} />
                </MainView>
              ) : null;
            }}
            renderItem={(items: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    showDetailPayment(items?.item);
                  }}>
                  {renderItems(items?.item)}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      <SwipeUp
        visible={isShowDetailPayment}
        onClose={() => {
          resetPromo();
          return hideDetailPayment();
        }}>
        <PackageCoinSwipeUp
          checkDiscount={checkDiscount}
          promoStatus={promoStatus}
          promoVoucher={promoVoucher}
          setPromoStatus={setPromoStatus}
          selectedPackage={detailPayment}
          onPayment={() => {
            toggleDetailPayment();
            if (isPlatformIOS) {
              return handlingPurchase(detailPayment?.apple_product_id);
            }
            return handlingPurchase(detailPayment?.google_play_product_id);
          }}
        />
      </SwipeUp>

      <PopUp
        show={showSuccessPayment}
        Icon={RobotGembira}
        title={'Hore! Pembelian koin telah berhasil'}
        titleConfirm={
          userRole?.name !== 'Orang tua' ? 'TANYA Sekarang' : 'Tutup'
        }
        styleTitle={{textAlign: 'center'}}
        actionConfirm={() => {
          setShowSuccessPayment(false);
          navigation.pop();
        }}
      />
    </>
  );
});

export {PackageCoinScreen};
