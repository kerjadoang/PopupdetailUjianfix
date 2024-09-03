/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import ScrollPicker from 'react-native-wheel-scrollview-picker';
import React, {useState, useEffect} from 'react';
import Maskot1 from '@assets/svg/maskot_1.svg';
import FotoSoal from '@assets/svg/foto_soal.svg';
import SiapkanSoal from '@assets/svg/siapkan_soal.svg';
import TungguJawaban from '@assets/svg/tunggu_jawaban.svg';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SafeAreaView, ScrollView, StyleSheet, View, Alert} from 'react-native';

import {
  DatePicker,
  DateTimePicker,
  Button,
  InputText,
  SelectBox,
  BigCalendar,
  OTP,
  Banner,
  ListItem,
  ContactItem,
  HistoryItem,
  Widget,
  PopUp,
  ListNotification,
  CardParentAction,
  TanyaItem,
  ProfileItem,
  CardReport,
  BSMCQResult,
  CardMCQ,
  BottomSheetBSKP,
  CardEmptyState,
  CardPackage,
  BSNavigationKP,
  Gender,
  RadioButton,
} from '@components/atoms';
import dayjs from 'dayjs';
import HighScoreItem from '@components/atoms/HighScoreItem';
import Colors from '@constants/colors';
import Trophy from '@assets/svg/trophy.svg';
import PlayMaskot from '@assets/svg/play_maskot.svg';
import Card from '@components/atoms/Card';
import CardMateri from '@components/atoms/CardMateri';
import Title from '@components/atoms/Title';
import Snakbar from '@components/atoms/Snakbar';
import TopNavigation from '@components/atoms/TopNavigation';
import QA from '@components/atoms/QA';
import CardKPRegular from '@components/atoms/CardKPRegular';
import CardKPProgress from '@components/atoms/CardKPProgress';
import CardKPProgressDetail from '@components/atoms/CardKPProgressDetail';
import ListGroup from '@components/atoms/ListGroup';
import CardItem from '@components/atoms/CardItem';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}
interface IDateTimePicker {
  date: any;
  hour: any;
  minute: any;
}

interface mainCardList {
  id: number;
  title: string;
  date: string;
  coins: any;
  type: boolean;
}
const mainCardList: mainCardList[] = [
  {
    id: 1,
    title: 'Tugas Perlu dikerjakan',
    date: '10 Ferbruari 2023',
    coins: 1,
    type: true,
  },
  {
    id: 2,
    title: 'Pesan Baru',
    date: '11 Februari 2023',
    coins: 2,
    type: false,
  },
];

interface cardItemList {
  id: number;
  title: string;
  desc: string;
  image: any;
}
const cardItemList: cardItemList[] = [
  {
    id: 1,
    title: 'Belajar Secara Langsung',
    desc: 'Bersama Guru Ahli Kelas Pintar yang berpengalaman dan tersertifikasi.',
    image: require('@assets/images/ic_cardItem.png'),
  },
  {
    id: 2,
    title: 'Siapkan Soal',
    desc: 'Buka menu TANYA, pilih mata pelajaran dan bab/materi yang ingin ditanyakan.',
    image: require('@assets/images/ic_cardItem2.png'),
  },
];

interface mainGroupList {
  id: number;
  title: string;
  image: any;
}
const mainGroupList: mainGroupList[] = [
  {
    id: 1,
    title: 'Tugas Perlu dikerjakan',
    image: require('@assets/images/ic_task.png'),
  },
  {
    id: 2,
    title: 'Pesan Baru',
    image: require('@assets/images/ic_chat.png'),
  },
];

const AllComponents = () => {
  const [value, setValue] = useState<IDatePicker>({
    date: dayjs().get('date'),
    month: dayjs().get('month') + 1,
    year: dayjs().get('year'),
  });

  const [dateTimePicker, setDateTimePicker] = useState<IDateTimePicker>({
    date: 0,
    hour: 1,
    minute: 1,
  });

  const [inputTextValue, setInputTextValue] = useState('');
  const [selectBoxValue, setSelectBoxValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const items = ['Laki-Laki', 'Perempuan'];
  useEffect(() => {
    console.log('dateTimePicker', dateTimePicker);
  }, [dateTimePicker]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Gender action={e => console.log(e)} data={items} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}>
            <CardPackage
              image={
                'https://img.tek.id/share/content/2020/10/21/33869/kelas-pintar-rilis-fitur-guru-sebagai-solusi-belajar-di-rumah-83yvxnmkvf.jpg'
              }
              title={'Kelas Pintar Regular'}
              price={'Rp79.000'}
              description={'Mulai dari Rp99.000'}
              action={() => console.log('log')}
              labelAction={'Beli Paket'}
            />
            <CardPackage
              image={
                'https://img.tek.id/share/content/2020/10/21/33869/kelas-pintar-rilis-fitur-guru-sebagai-solusi-belajar-di-rumah-83yvxnmkvf.jpg'
              }
              title={'Kelas Pintar Regular'}
              price={'Rp79.000'}
              description={'Mulai dari Rp99.000'}
              action={() => console.log('log')}
              labelAction={'Beli Paket'}
            />
          </View>
          <ProfileItem
            title={'Orang Tua'}
            description={'Joko Santoso'}
            Image={SiapkanSoal}
            arrow={false}
            type={1}
            action={() => console.log('log')}
          />
          <ProfileItem
            title={'Papan Peringkat'}
            description={'2350XP'}
            Image={SiapkanSoal}
            arrow={true}
            type={2}
            action={() => console.log('log')}
            value={100}
          />
          <ProfileItem
            title={'Laporan Belajar'}
            Image={SiapkanSoal}
            arrow={true}
            type={3}
            action={() => console.log('log')}
          />
          <TanyaItem
            title={'Siapkan Soal'}
            description={
              'Buka menu TANYA, pilih mata pelajaran dan bab/materi yang ingin ditanyakan.'
            }
            Image={SiapkanSoal}
          />
          <TanyaItem
            title={'Foto Soal'}
            description={'Foto dan kirimkan soal yang ingin kamu tanyakan.'}
            Image={FotoSoal}
          />
          <TanyaItem
            title={'Tunggu Jawaban'}
            description={
              'Guru Ahli akan segera mengirimkan jawaban beserta penjelasannya.'
            }
            Image={TungguJawaban}
          />
          <CardParentAction
            title={'Akun sudah terhubung dengan Orang Tua'}
            action={() => console.log('hello')}
          />
          <ListNotification
            title={'Pertanyaanmu sudah dijawab nih!'}
            desc={
              'Pertanyaan Matematika sudah dijawab oleh guru ahli. Yuk cek jawabannya disini!'
            }
            date={'Hari ini, 13:50'}
            image={
              'https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg'
            }
            read={true}
            action={() => console.log('hello')}
          />
          <ListNotification
            title={'Pertanyaanmu sudah dijawab nih!'}
            desc={
              'Pertanyaan Matematika sudah dijawab oleh guru ahli. Yuk cek jawabannya disini!'
            }
            date={'Hari ini, 13:50'}
            image={
              'https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg'
            }
            read={false}
            action={() => console.log('hello')}
          />
          <BigCalendar
            value={selectedDate}
            action={setSelectedDate}
            type="MONTH"
          />
          <Button
            action={() => setPopUp(true)}
            label="Lanjut"
            background="#0055B8"
            color="#FFFFFF"
            icon=""
            width=""
          />
          <Button
            action={() => console.log('lanjut')}
            label="Lanjut"
            background="#CED4DA"
            color="#868E96"
            icon=""
            width=""
          />
          <Button
            action={() => console.log('Keluar')}
            label="Keluar"
            background="#D92037"
            color="#FEE6E9"
            icon=""
            width=""
          />
          <PopUp
            show={popUp}
            close={() => setPopUp(false)}
            Icon={Maskot1}
            title={'Nomor Sudah Terdaftar'}
            desc={
              'Silakan masuk ke akun menggunakan nomor handphone yang terdaftar.'
            }
            titleCancel={'Kembali'}
            titleConfirm={'Masuk'}
            actionCancel={() => setPopUp(false)}
            actionConfirm={() => setPopUp(false)}
          />
          <Widget
            type={1}
            title="type 1"
            backgroundColor={'yellow'}
            action={() => console.log('hello')}
            remove={true}
            add={false}
            image={'https://cdn-icons-png.flaticon.com/512/3884/3884851.png'}
          />
          <Widget
            type={2}
            title="type 2"
            backgroundColor={'yellow'}
            action={() => console.log('hello')}
            remove={false}
            add={true}
            image={'https://cdn-icons-png.flaticon.com/512/3884/3884851.png'}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}>
            <Widget
              type={3}
              title="type 3"
              backgroundColor={'yellow'}
              action={() => console.log('hello')}
              remove={false}
              add={false}
              image={'https://cdn-icons-png.flaticon.com/512/3884/3884851.png'}
            />
            <Widget
              type={3}
              title="type 3"
              backgroundColor={'yellow'}
              action={() => console.log('hello')}
              remove={false}
              add={false}
              image={'https://cdn-icons-png.flaticon.com/512/3884/3884851.png'}
            />
          </View>

          <DatePicker selected={value} onChange={setValue} />
          <DateTimePicker
            selected={dateTimePicker}
            onChange={setDateTimePicker}
          />
          <InputText
            label="Label adalah optional"
            error={true}
            errorMessage="Error message adalah optional."
            placeholder="Placeholder adalah optional"
            onChangeText={() => {}}
          />
          <InputText
            icon="close"
            iconColor={Colors.dark.neutral60}
            onPressIcon={() => setInputTextValue('')}
            onChangeText={setInputTextValue}
            value={inputTextValue}
          />
          <View style={{zIndex: 1}}>
            <SelectBox
              searchable={true}
              value={selectBoxValue}
              setValue={setSelectBoxValue}
              items={[
                {label: 'Kelas', value: 'kelas'},
                {label: 'Pintar', value: 'pintar'},
              ]}
            />
          </View>
          <HighScoreItem
            photo={undefined}
            rank={undefined}
            exp={''}
            name={''}
          />
          {/* <Stepper
            active={1}
            labels={['Data Diri', 'Kelas', 'Kata Sandi', 'Verifikasi']}
          />
          <Stepper
            active={2}
            labels={['Data Diri', 'Kelas', 'Kata Sandi', 'Verifikasi']}
          />
          <Stepper
            active={4}
            labels={['Data Diri', 'Kelas', 'Kata Sandi', 'Verifikasi']}
          /> */}
          <OTP length={4} onCodeChanged={otp => console.log(otp)} />
          <OTP
            length={4}
            onCodeChanged={otp => console.log(otp)}
            errorMessage="Kode OTP salah. Silakan coba lagi."
          />
          <Banner
            height={122}
            backgroundImage={require('@assets/images/ic_close.png')}
            action={() => Alert.alert('Pressed')}
          />
          <Banner
            height={122}
            backgroundImage={{
              uri: 'https://cdn.extramarks.id/web/images/website_v7/v8/hp.png',
            }}
            action={() => Alert.alert('Pressed')}
          />
          <Banner
            height={122}
            backgroundSVG={<Trophy width="100%" height="100%" />}
            action={() => Alert.alert('Pressed')}
          />
          <ListItem
            title="Edit Profil"
            titleColor={Colors.dark.neutral80}
            action={() => Alert.alert('Pressed')}
            isArrow={true}
          />
          <ListItem
            title="Ambil dari Galeri"
            titleColor={Colors.dark.neutral100}
            action={() => Alert.alert('Pressed')}
            icon="image"
          />
          <ContactItem
            icon="facebook"
            title="Facebook"
            description="Kelaspintarid"
            action={() => Alert.alert('Pressed')}
          />
          <HistoryItem
            status="Menunggu Pembayaran"
            dateTime="14 Jul 2022 13:00"
            title="1 Paket"
            description="Kelas Pintar Regular 12 Bulan (Kelas 8)"
            price="Rp625.000"
            action={() => Alert.alert('Pressed')}
          />
          <CardReport correct={8} wrong={2} skip={0} time="14 Menit" />
          <BSMCQResult
            title="Jawaban Benar"
            labelButton="Lanjut"
            actionButton={() => Alert.alert('Pressed')}
            status={true}
          />
          <BSMCQResult
            title="Jawaban Salah"
            labelButton="Lanjut"
            actionButton={() => Alert.alert('Pressed')}
            status={false}
            description="Kamu masih punya 1 kesempatan lagi untuk menjawab."
          />
          <CardMCQ
            title="A."
            subTitle="1 dan 3"
            status={true}
            action={() => Alert.alert('Pressed')}
          />
          <CardMCQ
            title="B."
            subTitle="2 dan 4"
            status={false}
            action={() => Alert.alert('Pressed')}
          />
          <BottomSheetBSKP
            title="Cocokan Objek"
            category="10 Soal"
            titleList="Cara Pengerjaan:"
            lists={[
              'Permainan menjodohkan yang terdiri dari gambar dan teks.',
              'Klik objek di sebelah kiri untuk dijodohkan dengan objek di sebelah kanan.',
              'Kamu dapat memperbesar gambar dengan klik tombol zoom.',
              'Kamu dapat mengulang kembali permainan ini kapan saja.',
            ]}
            action={() => Alert.alert('Pressed')}
          />
          <CardEmptyState
            description="Belum ada sesi kelas berlangsung atau yang akan datang"
            image={<PlayMaskot />}
          />
          <HighScoreItem
            photo={require('@assets/images/ic_pp.png')}
            rank={undefined}
            exp={''}
            name={''}
          />
          <Card
            title={'Tips supaya belajar cepat'}
            description={'2 menit baca'}
            image={require('@assets/images/Card.png')}
            action={() => Alert.alert('Press Card')}
          />
          <CardMateri
            title={'Buat Sesi Kelas'}
            image={require('@assets/images/koin.png')}
            action={() => Alert.alert('press cardMateri')}
          />
          <Title
            title={'Group dengan mentor'}
            icon={require('@assets/images/koin.png')}
          />
          <Snakbar message={'Perubahan berhasil di simpan'} />
          <TopNavigation
            message="Koin Hadiah"
            action={() => Alert.alert('Press Top Navigation')}
          />
          <QA
            title={'Apa itu koin kelas pintar'}
            description={
              'Koin Kelas Pintar adalah alat tukar berupa koin yang digunakan untuk melakukan transaksi di platform Kelas Pintar'
            }
          />
          <CardKPRegular
            label={'Tanya'}
            action={() => Alert.alert('press')}
            description={'Ada soal yang sulit? Tanyakan ke guru ini'}
            background={'#FFF7D7'}
          />
          <CardKPProgress
            title={'Bab 1. Pola Bilangan'}
            progressbar={'100 %'}
          />
          <CardKPProgressDetail list={[]} />
          <ListGroup action={() => Alert.alert('Press')} data={mainGroupList} />
          <CardItem
            mainData={mainCardList}
            data={cardItemList}
            image={undefined}
            imageSize={''}
            title={undefined}
            coin={'10'}
            action={() => Alert.alert('Press Beli Koin')}
            date={''}
          />
          <BSNavigationKP />
          <BSNavigationKP pause={true} preview={true} />
          <RadioButton
            type="VERTICAL_WITH_IMAGE"
            label="Pilih Jenjang"
            data={[
              {
                value: 'SD/MI',
                image: (
                  <Trophy width={64} height={64} style={{marginBottom: 8}} />
                ),
              },
              {
                value: 'SMP/MTs',
                image: (
                  <Trophy width={64} height={64} style={{marginBottom: 8}} />
                ),
              },
              {
                value: 'SMA/MA',
                image: (
                  <Trophy width={64} height={64} style={{marginBottom: 8}} />
                ),
              },
            ]}
            onSelect={_value => Alert.alert(_value)}
          />
          <RadioButton
            type="VERTICAL"
            label="Pilih Kelas"
            data={[
              {value: '1'},
              {value: '2'},
              {value: '3'},
              {value: '4'},
              {value: '5'},
              {value: '6'},
            ]}
            onSelect={_value => Alert.alert(_value)}
          />
          <RadioButton
            type="HORIZONTAL"
            label=""
            data={[
              {
                value: 'Belajar',
                icon: (
                  <Icons name="book" color={Colors.dark.neutral50} size={24} />
                ),
              },
              {
                value: 'Latihan',
                icon: (
                  <Icons name="book" color={Colors.dark.neutral50} size={24} />
                ),
              },
              {
                value: 'Persiapan Ujian',
                icon: (
                  <Icons name="book" color={Colors.dark.neutral50} size={24} />
                ),
              },
            ]}
            onSelect={_value => Alert.alert(_value)}
          />
          <View style={{height: 15}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 10,
    flex: 1,
    gap: 10,
    paddingHorizontal: 24,
  },
});

export {AllComponents};
