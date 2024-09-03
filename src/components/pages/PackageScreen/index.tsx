/* eslint-disable react-native/no-inline-styles */
import React, {Suspense} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '@constants/colors';
import {Header} from '@components/atoms/Header';
import {Button, MainText, MainView, PopUp, SwipeUp} from '@components/atoms';
import CardFeaturesPackage from '@components/atoms/CardFeaturesPackage';
import Fonts from '@constants/fonts';
import IconLeft from '@assets/svg/ic24_chevron_left_white.svg';
import IconArrowBottomBlue from '@assets/svg/ic_arrow_bottom_blue.svg';
import RobotGembira from '@assets/svg/robot_gembira.svg';
import {generalStyles} from '@constants/styles';
import RenderImage from '@components/atoms/RenderImage';
import {currencyFormat, isPlatformIOS} from '@constants/functional';
import PackageDetailSwipeUp from './components/PackageDetailSwipeUp';
import usePackage from './usePackage';
import {withIAPContext} from 'react-native-iap';
import ClassDetailSwipeUp from './components/ClassDetailSwipeUp';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PackageScreen = withIAPContext(() => {
  const {
    popScreen,
    userRole,
    detail,
    showSelectClass,
    setShowSelectClass,
    handlingPurchase,
    selectedClass,
    setSelectedClass,
    selectedPackage,
    setSelectedPackage,
    showDetailPayment,
    setShowDetailPayment,
    showSuccessPayment,
    setShowSuccessPayment,
    checkDiscount,
    promoStatus,
    setPromoStatus,
    promoVoucher,
    filteredPackageHaveProductId,
    resetPromo,
    listClass,
  } = usePackage();

  return (
    <>
      <SafeAreaView style={generalStyles.container}>
        <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
          <ImageBackground
            source={require('@assets/images/header_background.png')}
            style={styles.topContainer}>
            <Header
              iconLeft={<IconLeft width={24} height={24} />}
              label={'Detail Paket'}
              colorLabel={Colors.white}
              backgroundColor="transparent"
            />
          </ImageBackground>
          <Suspense fallback={<LoadingIndicator />}>
            <>
              <View style={styles.container}>
                <View style={styles.bannercontainer}>
                  <RenderImage
                    imageUrl={detail?.path_url}
                    style={styles.banner}
                    width={213}
                    height={120}
                    placeholder={
                      <Image
                        source={require('@assets/images/img_placeholder.png')}
                        style={styles.banner}
                      />
                    }
                  />
                </View>
                <Text style={styles.title}>{detail?.name || ''}</Text>
                <View style={styles.row}>
                  <Text style={styles.startfrom}>
                    Mulai Dari{' '}
                    <Text style={styles.priceBefore}>
                      {selectedPackage?.price_after_discount !== 0
                        ? `${currencyFormat(selectedPackage?.price ?? 0)}`
                        : ''}
                    </Text>
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.price}>
                    {currencyFormat(
                      (selectedPackage?.price_after_discount !== 0
                        ? selectedPackage?.price_after_discount
                        : selectedPackage?.price) ?? 0,
                    )}
                  </Text>
                  <View style={styles.discountChips}>
                    <Text
                      style={
                        selectedPackage?.discount_percentage !== 0
                          ? styles.discountText
                          : {display: 'none'}
                      }>{`Diskon ${
                      selectedPackage?.discount_percentage || 0
                    }%`}</Text>
                  </View>
                </View>
                <Text style={styles.availableFor}>
                  Tersedia Untuk : {selectedPackage?.class_available}
                </Text>
              </View>
              <MainView
                height={4}
                width={windowWidth}
                backgroundColor={Colors.dark.neutral10}
              />
              <View
                style={[
                  styles.container,
                  {
                    borderTopStartRadius: 0,
                    borderTopEndRadius: 0,
                    marginTop: 5,
                  },
                ]}>
                {/* {userRole?.name === 'Orang tua' ? (
                  <MainView>
                    <MainView
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center">
                      <Text style={styles.selectChildren}>Anak Saya:</Text>
                      <TouchableOpacity onPress={onAddChilren}>
                        <Text style={styles.addChildren}>+ Tambah Akun</Text>
                      </TouchableOpacity>
                    </MainView>
                    <ScrollView
                      showsHorizontalScrollIndicator={true}
                      horizontal={true}>
                      {notPending?.map((items: any, index: any) => {
                        return (
                          <View key={items?.id || index}>
                            <CardAnak
                              onPress={() => setUser(items)}
                              id={user?.user_id}
                              data={items}
                              cstmWidth={180}
                              isPackageScreen
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                  </MainView>
                ) : null} */}
                <Text style={styles.selectClass}>Kelas</Text>
                <TouchableOpacity onPress={() => setShowSelectClass(true)}>
                  <MainView
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    backgroundColor={Colors.dark.neutral10}
                    paddingHorizontal={16}
                    paddingVertical={10}
                    borderRadius={30}
                    marginBottom={10}>
                    <MainText
                      fontWeight="600"
                      fontSize={16}
                      color={Colors.dark.neutral100}
                      lineHeight={24}>
                      Kelas {selectedClass ?? 0}
                    </MainText>
                    <IconArrowBottomBlue />
                  </MainView>
                </TouchableOpacity>

                <Text style={styles.selectRange}>Pilih Masa Berlaku :</Text>
                <FlatList
                  // horizontal
                  nestedScrollEnabled
                  numColumns={2}
                  showsHorizontalScrollIndicator={false}
                  data={filteredPackageHaveProductId}
                  renderItem={({item, index}) => {
                    return (
                      <View key={item?.id || index}>
                        <Button
                          label={item?.duration === 30 ? '1 Bulan' : '12 Bulan'}
                          style={styles.btn}
                          background={
                            selectedPackage?.id === item?.id
                              ? Colors.primary.light2
                              : Colors.white
                          }
                          color={
                            item?.id === selectedPackage?.id
                              ? Colors.primary.base
                              : Colors.dark.neutral80
                          }
                          action={() => {
                            setSelectedPackage(item);
                          }}
                          textStyle={styles.selectMonth}
                          borderWidth={
                            selectedPackage?.id !== item?.id ? 0.5 : 0
                          }
                          borderColor={Colors.dark.neutral20}
                        />
                      </View>
                    );
                  }}
                />
              </View>
              <MainView
                height={4}
                width={windowWidth}
                backgroundColor={Colors.dark.neutral10}
              />
              <View
                style={[
                  styles.container,
                  {
                    borderTopStartRadius: 0,
                    borderTopEndRadius: 0,
                    marginTop: 5,
                    marginBottom: 10,
                  },
                ]}>
                <Text style={styles.getFeatures}>Fitur yang didapat :</Text>
                {selectedPackage?.package_feature?.map(
                  (item: any, index: any) => {
                    return (
                      <CardFeaturesPackage
                        key={index}
                        label={item.description}
                      />
                    );
                  },
                )}
              </View>
            </>
          </Suspense>
        </ScrollView>
        {/* <View style={snakbar === false ? {display: 'none'} : null}>
          <SnackbarResult
            label={'Tautan Berhasil Disalin'}
            visible={snakbar}
            onPressClose={() => setSnakbar(false)}
          />
        </View> */}
        <View style={styles.buttonBottom}>
          <Button
            label="Beli Paket"
            action={() => setShowDetailPayment(true)}
          />
        </View>
      </SafeAreaView>

      <SwipeUp
        height={400}
        visible={showSelectClass}
        onClose={() => setShowSelectClass(false)}>
        <ClassDetailSwipeUp
          listClass={listClass}
          // listGradeToShow={isPTN ? ['SMA'] : undefined}
          // hideClass={isGURU ? [1, 2, 3] : undefined}
          selectedClass={selectedClass}
          onClassSelected={id => {
            setSelectedClass(id);
            setShowSelectClass(false);
          }}
        />
      </SwipeUp>

      <SwipeUp
        visible={showDetailPayment}
        onClose={() => {
          resetPromo();
          return setShowDetailPayment(false);
        }}>
        <PackageDetailSwipeUp
          selectedPackage={selectedPackage}
          checkDiscount={checkDiscount}
          promoStatus={promoStatus}
          promoVoucher={promoVoucher}
          setPromoStatus={setPromoStatus}
          onPayment={() => {
            setShowDetailPayment(false);
            if (isPlatformIOS) {
              return handlingPurchase(selectedPackage.apple_product_id ?? '');
            }

            return handlingPurchase(
              selectedPackage.google_play_product_id || '',
            );
          }}
        />
      </SwipeUp>

      <PopUp
        show={showSuccessPayment}
        Icon={RobotGembira}
        title={
          userRole?.name !== 'Orang tua'
            ? `Hore! Paket ${detail?.name ?? ''} kamu telah aktif`
            : `Hore! Paket ${detail?.name ?? ''} Anakmu telah aktif`
        }
        titleConfirm={
          userRole?.name !== 'Orang tua' ? 'Mulai Belajar' : 'Tutup'
        }
        styleTitle={{textAlign: 'center'}}
        actionConfirm={() => {
          setShowSuccessPayment(false);
          popScreen();
        }}
      />
    </>
  );
});

const styles = StyleSheet.create({
  topContainer: {
    height: windowHeight / 4.4,
  },
  container: {
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    backgroundColor: Colors.white,
    padding: 16,
    marginTop: -30,
  },
  // btnContainer: {
  //   bottom: 0,
  //   height: 50,
  // },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    paddingTop: 16,
  },
  priceBefore: {
    textDecorationLine: 'line-through',
    fontFamily: Fonts.LightPoppins,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 28,
    color: Colors.dark.neutral60,
    letterSpacing: 0.25,
    marginTop: 4,
  },
  startfrom: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 28,
    color: Colors.dark.neutral60,
    letterSpacing: 0.25,
    marginTop: 4,
  },
  price: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    alignItems: 'baseline',
    color: Colors.dark.neutral80,
    lineHeight: 28,
    letterSpacing: 0.25,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
  btn: {
    width: windowWidth - 32,
    marginRight: 16,
  },
  desc: {
    fontSize: 17,
    fontFamily: Fonts.RegularPoppins,
    color: 'black',
  },
  iconHeader: {
    transform: [{rotate: '180deg'}],
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  bannercontainer: {
    overflow: 'hidden',
    marginTop: -100,
    borderRadius: 15,
    alignSelf: 'center',
  },
  banner: {
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  discountChips: {
    backgroundColor: Colors.yellow,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  discountText: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldPoppins,
    paddingHorizontal: 8,
  },
  availableFor: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
    paddingTop: 6,
  },
  selectChildren: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: Fonts.BoldPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    paddingBottom: 10,
  },
  addChildren: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    paddingBottom: 10,
  },
  selectClass: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    paddingBottom: 10,
  },
  selectRange: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    paddingBottom: 10,
  },
  studyingSolution: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    paddingBottom: 8,
  },
  getFeatures: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    paddingBottom: 4,
  },
  selectMonth: {
    fontSize: 14,
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  buttonBottom: {
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    marginBottom: 16,
  },
});

export default PackageScreen;
