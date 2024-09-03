import {StyleSheet, View, Text, Pressable} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';

const Verification = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifikasi Administrasi</Text>
      <View style={[styles.card, styles.shadowProp]}>
        <View style={styles.flexDirection}>
          <Text style={styles.titleClass}>Kelas 1</Text>
          <Text style={styles.verificationStyle}>10 Diverifikasi {'>'}</Text>
        </View>
      </View>

      <View style={styles.centering}>
        <Pressable
          onPress={() => {
            navigation?.navigate('AdminListVerificationScreen');
          }}
          style={styles.button}>
          <Text style={styles.textBtn}>Lihat Semua {'>'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export {Verification};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    marginBottom: 8,
  },
  titleClass: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  verificationStyle: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.light1,
  },
  next: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
});
