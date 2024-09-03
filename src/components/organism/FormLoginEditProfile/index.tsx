import {StyleSheet, ScrollView, Text, View, Image} from 'react-native';
import React from 'react';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '@constants/colors';
import {Button, Gender, InputText} from '@components/atoms';

const FormLoginEditProfile = () => {
  const items = ['Laki-Laki', 'Perempuan'];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Bg width={'100%'} height={298} style={{position: 'absolute'}} />
        <View style={styles.header}>
          <Icons name={'chevron-left'} size={24} color={Colors.white} />
          <Text style={styles.title}>Edit Profile</Text>
        </View>
        <View style={styles.boxTitle}>
          <View style={{justifyContent: 'flex-end'}}>
            <Image
              source={require('@assets/images/ic_pp.png')}
              style={styles.photo}
            />
            <View style={styles.icon}>
              <Icons name="camera" size={16} color={Colors.white} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.form}>
        <InputText
          label="Nama Lengkap *"
          top={10}
          labelColor={Colors.dark.neutral100}
          backgroundColor={Colors.dark.neutral10}
          maxLength={undefined}
          leftIcon={'account'}
          leftOnPressIcon={undefined}
          leftIconColor={Colors.primary.base}
          disabled={true}
          inputMode={undefined}
        />
        <InputText
          label="Kelas *"
          top={10}
          labelColor={Colors.dark.neutral100}
          backgroundColor={Colors.dark.neutral20}
          maxLength={undefined}
          leftIcon={'school'}
          leftOnPressIcon={undefined}
          leftIconColor={Colors.primary.base}
          disabled={true}
          inputMode={undefined}
        />
        <InputText
          label="Sekolah *"
          top={10}
          bottom={15}
          labelColor={Colors.dark.neutral100}
          backgroundColor={Colors.dark.neutral20}
          maxLength={undefined}
          leftIcon={'town-hall'}
          leftOnPressIcon={undefined}
          leftIconColor={Colors.primary.base}
          disabled={true}
          inputMode={undefined}
        />
        <Gender data={items} />
        {/* <Snakbar message="No. HP Berhasil di Simpan" /> */}
        <InputText
          label="No. HP *"
          top={10}
          labelColor={Colors.dark.neutral100}
          backgroundColor={Colors.dark.neutral20}
          maxLength={undefined}
          leftIcon={'cellphone'}
          leftOnPressIcon={undefined}
          leftIconColor={Colors.primary.base}
          disabled={true}
          inputMode={undefined}
        />
        <Button label={'Simpan'} action={undefined} top={26} />
      </View>
    </ScrollView>
  );
};

export default FormLoginEditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  box: {
    flex: 1,
    // alignItems: 'center',
    // height: '40%',
  },
  title: {
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  boxTitle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  subTitle: {fontSize: 14, fontFamily: 'Poppins-Regular'},
  photo: {width: 88, height: 88},
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: Colors.primary.base,
    borderRadius: 100,
    width: 32,
    height: 32,
  },
  header: {
    paddingTop: 50,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
