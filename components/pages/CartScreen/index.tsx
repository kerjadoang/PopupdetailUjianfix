/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import {CardPackage, CoachmarkLib, MainView, PopUp} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import CardCoin from '@components/atoms/CardCoin';
import {IconCartHistory, Maskot1, CopyWhite} from '@assets/images';
import Colors from '@constants/colors';
import useCartScreen from './useCartScreen';
import Clipboard from '@react-native-clipboard/clipboard';
import {generalStyles} from '@constants/styles';
import BannerPackageWeb from '@assets/svg/banner_package_web.svg';
import RobotCry from '@assets/svg/Robot_cry.svg';

const CartScreen = () => {
  const {
    coin,
    filteredPackagesHaveProductId,
    navigation,
    setSnakbar,
    showPopUp,
    setShowPopUp,
    showPopUpBlock,
    setShowPopUpBlock,
    Coachmarks,
    doneCoachMark,
    _handlerCoachmark,
    link_langgqanan,
  } = useCartScreen();

  const renderCardPackage = useCallback((item: any) => {
    item = item?.item;
    const price = item?.package?.price;
    return (
      <CardPackage
        key={item.id}
        image={item?.path_url}
        title={item?.name}
        priceBefore={price}
        price={item?.package?.price_after_discount}
        action={() =>
          navigation.navigate('PackageScreen', {
            package_id: item?.id,
          })
        }
        labelAction={'Beli Paket'}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <Header
        label="Pembelian"
        iconRight={
          <CoachmarkLib
            ref={ref => (Coachmarks[0] = ref)}
            onNext={() => _handlerCoachmark(1)}
            onSkip={doneCoachMark}
            buttonOnContent
            queue={1}
            buttonFinishText="OK"
            totalCoachmark={1}
            contentContainerStyle={generalStyles.contentFlex}
            childrenStyle={styles.historyIcon}
            maxWidth={24}
            title={'Riwayat Pembelian'}
            message={'Cek status pembelian paket kamu di sini'}>
            <View style={styles.historyIcon}>
              <Image
                source={IconCartHistory}
                style={{width: 18, height: 18, resizeMode: 'contain'}}
              />
            </View>
          </CoachmarkLib>
        }
        onPressIconRight={() => navigation.navigate('CartHistoryScreen')}
        iconLeft={<></>}
      />
      {/* <ScrollView> */}
      <View style={styles.body}>
        <FlatList
          nestedScrollEnabled
          contentContainerStyle={{paddingBottom: 100}}
          ListHeaderComponent={
            <View>
              <Text style={styles.title}>Koin Saya</Text>
              <CardCoin
                coins={coin?.data?.balance}
                action={() => navigation.navigate('HomeCoinScreen')}
              />
              {/* Flash Sale BE is not ready yet */}
              {/* <Text style={styles.titleBanner}>Flash Sale</Text>
          <View style={{flexDirection: 'row'}}>
            <ScrollView horizontal>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PackageScreen', {
                    package_id: 5,
                  })
                }>
                <Image
                  source={require('@assets/images/bannerFlashSale.png')}
                  style={styles.flashsaleImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PackageScreen', {
                    package_id: 1,
                  })
                }>
                <Image
                  source={require('@assets/images/bannerFlashSale_2.png')}
                  style={styles.flashsaleImage}
                />
              </TouchableOpacity>
            </ScrollView>
          </View> */}

              {Platform.OS === 'android' ? (
                <MainView marginTop={24} marginBottom={8}>
                  <BannerPackageWeb width={'100%'} height={140} />
                </MainView>
              ) : null}

              <Text style={styles.titleBanner}>Katalog Paket</Text>
            </View>
          }
          data={filteredPackagesHaveProductId}
          numColumns={2}
          renderItem={renderCardPackage}
        />
      </View>
      {/* </ScrollView> */}
      <PopUp
        show={showPopUp}
        close={() => setShowPopUp(false)}
        png={Maskot1}
        title={'Beli Paket Belajar'}
        desc={`Saat ini pembelian paket hanya dapat dilakukan di website Kelas Pintar. \n(${link_langgqanan})`}
        titleConfirm={'Salin Tautan Pembelian'}
        actionConfirm={() => {
          Clipboard.setString(`${link_langgqanan}`);
          setShowPopUp(false);
          setSnakbar(true);
          setTimeout(() => {
            setSnakbar(false);
          }, 1500);
        }}
        iconConfirm={CopyWhite}
      />
      <PopUp
        show={showPopUpBlock}
        Icon={RobotCry}
        title={'Oops, pembelian paket belum tersedia'}
        styleTitle={generalStyles.textAlignCenter}
        desc={
          'Saat ini pembelian paket hanya dapat dilakukan di website Kelas Pintar'
        }
        titleConfirm={'Tutup'}
        actionConfirm={() => {
          navigation.goBack();
          setShowPopUpBlock(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  body: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '3%',
  },
  title: {
    fontFamily: 'Poppins-Light',
    fontSize: 17,
    marginVertical: 10,
  },
  titleBanner: {
    fontFamily: 'Poppins-Bold',
    fontSize: 19,
    marginVertical: 10,
  },
  banner: {
    alignSelf: 'center',
  },
  flashsaleImage: {
    width: 350,
    height: 150,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  catalogContainer: {
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    paddingBottom: '25%',
    justifyContent: 'space-around',
  },
  historyIcon: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default CartScreen;
