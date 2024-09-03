import React, {FC, useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {ItemDataRaport} from './ItemDataRaport';
import {formSettings} from '../utils';

type Props = {
  logoSekolah: any;
  schoolName?: string;
  schoolAddress?: string;
  penilaianRaport?: string;
  dateIssue?: string;
  kertas?: string;
  year: any;
  listFormSettings: formSettings[];
  onAturTahunAjaran: () => void;
  onAturPenilaianRaport: () => void;
  onAturTanggalTerbit: () => void;
  onAturKertas: () => void;
};

const DetailRaport: FC<Props> = ({
  logoSekolah,
  schoolName,
  schoolAddress,
  penilaianRaport,
  dateIssue,
  kertas,
  year,
  listFormSettings,
  onAturTahunAjaran,
  onAturPenilaianRaport,
  onAturTanggalTerbit,
  onAturKertas,
}) => {
  const [formTahunAjaran, setFormTahunAjaran] = useState<any>();
  const [formPenilaianRapor, setFormPenilaianRapor] = useState<any>();
  const [formTanggalTerbit, setFormTanggalTerbit] = useState<any>();
  const [formKertas, setFormKertas] = useState<any>();
  useEffect(() => {
    setFormTahunAjaran(
      listFormSettings.find(item => item?.name === 'tahun ajaran'),
    );
    setFormPenilaianRapor(
      listFormSettings.find(item => item?.name === 'penilaian raport'),
    );
    setFormTanggalTerbit(
      listFormSettings.find(item => item?.name === 'tanggal terbit'),
    );
    setFormKertas(listFormSettings.find(item => item?.name === 'kertas'));
    return () => {
      setFormTahunAjaran(false);
      setFormPenilaianRapor(false);
      setFormTanggalTerbit(false);
      setFormKertas(false);
    };
  }, [listFormSettings]);

  return (
    <View style={{paddingLeft: 16}}>
      <Text style={styles.title}>Pengaturan e-Rapor</Text>
      <View style={[styles.row, {marginRight: 14}]}>
        {logoSekolah ? (
          <Image source={{uri: logoSekolah}} style={styles.logo} />
        ) : null}
        <View style={styles.schoolDetailContainer}>
          <Text style={styles.schoolName}>{schoolName}</Text>
          <Text style={styles.schoolAdd}>{schoolAddress}</Text>
        </View>
      </View>
      <View>
        <ItemDataRaport
          title="Tahun Ajaran"
          errorMessage={formTahunAjaran?.errorMessage || ''}
          value={year || 'Belum Diatur'}
          action={onAturTahunAjaran}
        />
        <ItemDataRaport
          title="Penilaian Rapor"
          isDisable={year ? false : true}
          errorMessage={formPenilaianRapor?.errorMessage || ''}
          value={penilaianRaport || 'Belum diatur'}
          action={onAturPenilaianRaport}
        />
        <ItemDataRaport
          title="Tanggal Terbit"
          isDisable={year ? false : true}
          errorMessage={formTanggalTerbit?.errorMessage || ''}
          value={dateIssue || 'Belum diatur'}
          action={onAturTanggalTerbit}
        />
        <ItemDataRaport
          title="Kertas"
          isDisable={year ? false : true}
          errorMessage={formKertas?.errorMessage || ''}
          value={kertas || 'Belum diatur'}
          action={onAturKertas}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  schoolAdd: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 5,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.BoldPoppins,
    textAlign: 'left',
    fontSize: 20,
    color: Colors.black,
  },

  text: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
  },
  schoolName: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  schoolDetailContainer: {flex: 1},
});

export default DetailRaport;
