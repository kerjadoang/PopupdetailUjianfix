import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TopContainer from './topContainer';
import {useDispatch, useSelector} from 'react-redux';
import {fetchImage} from '@redux';
import BottomContainer from './bottomContainer';
import Details from './details';
import HowToPayment from './howToDoPayment';
import dayjs from 'dayjs';
import CTimer from '@components/atoms/CTimer';
import Fonts from '@constants/fonts';
import {convertDate} from '@constants/functional';
import {RootState} from 'src/redux/rootReducer';

const CartHistoryDetailScreen = ({route}: any) => {
  const text =
    'Paket kamu akan aktif otomatis setelah melakukan pembayaran, harap selesaikan pembayaran sebelum :';
  const text2 =
    'Kami telah mengirimkan rincian pesanan dan tata cara pembayaran ke email kamu. Kamu juga bisa melihat riwayat pembelian paket di halaman Berlangganan.';
  const {image} = useSelector((state: RootState) => state);
  const {data} = route.params;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchPurchaseDetail(payment_id));
  // }, [payment_id]);
  // console.log(purchaseDetail?.data);
  // const data = purchaseDetail?.data;
  const namaPaket = data?.payment_package[0]?.package?.category?.name;

  useEffect(() => {
    if (data) {
      dispatch(fetchImage(data?.payment_method?.image));
    }
  }, [data]);
  const navigation: any = useNavigation();
  const imgUrl = image?.path_url;
  const dummyImgUrl =
    'https://tse3.mm.bing.net/th?id=OIP.z7LSN3nuR3FXoFdHkJoOrAHaHa&pid=Api&P=0';

  const expireDate = dayjs(data?.expire_time)
    .locale('ID')
    .format('dddd, DD MMMM YYYY HH:mm');

  const countdownTimer =
    convertDate(data?.created_at)
      .add(data?.expired_duration, 'seconds')
      .unix() - convertDate(data?.created_at).unix();

  return (
    <SafeAreaView style={{paddingVertical: 10, backgroundColor: Colors.white}}>
      <Header
        label="Detail Pembelian"
        onPressIconLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.body}>
          <TopContainer
            status={data?.status}
            orderId={data?.gateway_reference}
          />
          <View style={styles.detail}>
            <Details
              count={1}
              name={data?.user?.full_name}
              role={'murid'}
              email={data?.user?.email}
              phone={data?.user?.phone_number}
              packageName={namaPaket}
              pricePackage={data?.sub_total}
              priceDiscount={data?.total_discount}
              orderId={data?.gateway_reference}
              priceTotal={data?.total}
              paymentMethod={data?.payment_method?.category?.name}
              payment={data?.payment_method?.name}
              icon={{uri: imgUrl ? imgUrl : dummyImgUrl}}
              transactionDate={data?.created_at}
              paymentDate={data?.updated_at}
              status={data?.status}
            />

            {data?.status === 'pending' ? (
              <>
                <View style={styles.detailPayment}>
                  <Text style={styles.desc}>{text}</Text>
                  <Text style={styles.textBold}>{expireDate}</Text>

                  <CTimer
                    containerStyle={styles.cTimer}
                    time={countdownTimer}
                    // time={dayjs(data?.expire_time).unix() - dayjs().unix()}
                    type={{
                      hours: true,
                      minutes: true,
                      seconds: true,
                    }}
                  />
                  <Text style={styles.desc}>Jumlah yang Harus Dibayarkan</Text>
                  <Text style={styles.textBold}>Rp. {data?.total}</Text>
                  <Text>{data?.payment_method?.name} Virtual Account</Text>
                  <Text style={styles.textBold}>{data?.gateway_code}</Text>
                  <Text>{text2}</Text>
                </View>
                <HowToPayment />
              </>
            ) : null}
          </View>

          <BottomContainer
            action={() => {
              navigation.navigate('PusatBantuanScreen', {
                type: 'CONTACT_US',
                title: 'Hubungi Kami',
              });
            }}
            leftText={() => {
              navigation.navigate('PusatBantuanScreen', {
                type: 'WEBVIEW',
                webviewUrl: 'https://www.kelaspintar.id/syarat-dan-ketentuan',
                title: 'Syarat & Ketentuan',
              });
            }}
            rightText={() => {
              navigation.navigate('PusatBantuanScreen', {
                type: 'WEBVIEW',
                webviewUrl: 'https://www.kelaspintar.id/kebijakan-privasi',
                title: 'Kebijakan Privasi',
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export {CartHistoryDetailScreen};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
  },
  detail: {
    marginHorizontal: '5%',
    marginVertical: 25,
  },
  container: {
    padding: 10,
    borderRadius: 15,
    elevation: 8,
    backgroundColor: 'white',
  },
  detailPayment: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    elevation: 9,
    marginVertical: 15,
    width: '100%',
    height: 'auto',
    alignItems: 'center',
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  textBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginVertical: 20,
  },
  cTimer: {
    alignSelf: 'center',
    marginBottom: 4,
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 28,
  },
});
