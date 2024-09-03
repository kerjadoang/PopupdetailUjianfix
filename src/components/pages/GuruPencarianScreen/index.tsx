import Colors from '@constants/colors';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import SearchIcon from '@assets/svg/ic_search.svg';
import CloseIcon from '@assets/svg/close_x.svg';
import MaskotEmpty from '@assets/svg/robot_empty_search.svg';
import MaskotDownload from '@assets/svg/maskot_16.svg';
import Fonts from '@constants/fonts';
import {useNavigation} from '@react-navigation/native';
import {EmptyDisplay, CardClassSession, PopUp} from '@components/atoms';

const GuruPencarianScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'GuruPencarianScreen'>>();
  const [keyword, setKeyword] = useState();
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.inputbar}>
          <SearchIcon width={16} height={16} style={styles.iconbar} />
          <TextInput
            style={[
              styles.cancelText,
              {width: '75%', color: Colors.dark.neutral100},
            ]}
            value={keyword}
            onChangeText={text => setKeyword(text)}
          />
          <Pressable
            onPress={() =>
              keyword ? setKeyword('') : navigation.navigate('GuruScreen')
            }
            style={styles.alignCenter}>
            <CloseIcon width={16} height={16} style={styles.iconbar} />
          </Pressable>
        </View>
        <Pressable style={styles.alignCenter}>
          <Text style={styles.cancelText}>Batal</Text>
        </Pressable>
      </View>
      {keyword ? (
        <CardClassSession
          bodyWidth={'100%'}
          title={'Math'}
          keys={1}
          subtitle={'Pola 1 Bilangan'}
          time={'Rabu, 11 Jun 2022 • 13:30 - 14:30'}
          downloadable
          typeVideo="Sesi Kelas"
          mentor={'Kak Fajar'}
          onDownload={() => setShow(true)}
        />
      ) : (
        <View style={{paddingVertical: 100}}>
          <EmptyDisplay
            imageSvg={<MaskotEmpty width={100} height={100} />}
            title={'Pencarian Tidak Ditemukan'}
            desc={`Hasil pencarian “${keyword}” nihil. \nCoba masukkan kata kunci lainnya!`}
          />
        </View>
      )}
      <PopUp
        show={show}
        Icon={MaskotDownload}
        title="Unduh Video"
        desc="Apakah kamu yakin untuk mengunduh? Video dapat ditonton tanpa koneksi internet setelah selesai diunduh."
        close={() => setShow(false)}
        titleCancel="Batal"
        titleConfirm="Unduh"
        actionCancel={() => {
          setShow(false);
        }}
        actionConfirm={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    height: '100%',
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  inputbar: {
    backgroundColor: Colors.primary.light4,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconbar: {
    alignSelf: 'center',
  },
  cancelText: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },
  alignCenter: {alignSelf: 'center', alignItems: 'center'},
});

export {GuruPencarianScreen};
