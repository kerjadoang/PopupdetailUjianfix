/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {Header} from '@components/atoms/Header';
import React, {useLayoutEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Info} from './component/Info';
import {Item} from './component/Item';
import Download from '@assets/svg/downloadBlue.svg';
import ShareErapor from '@assets/svg/share_erapor.svg';
import {useDetailErapor} from './useDetailErapor';
import {styles} from './styles';

const DetailEraporScreen = () => {
  const {
    navigation,
    eraportData,
    detail,
    KKMandPredicate,
    onShareEraport,
    onDownloadEraport,
  } = useDetailErapor();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Detail e-Rapor'}
          iconRight={
            !eraportData ? undefined : (
              <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity onPress={onDownloadEraport}>
                  <Download />
                </TouchableOpacity>
                <TouchableOpacity onPress={onShareEraport}>
                  <ShareErapor />
                </TouchableOpacity>
              </View>
            )
          }
          onPressIconRight={() => {}}
        />
      ),
    });
  }, [eraportData]);

  const detailItemWithNilai = (
    item: any,
    index: number,
    isExtracurricular?: boolean,
  ) => {
    return (
      <View key={index} style={{paddingVertical: 10}}>
        <Text style={styles.boldText}>
          {!isExtracurricular ? item?.subject_name : item?.extracurricular_name}
        </Text>
        <View style={{flexDirection: 'row', paddingVertical: 2}}>
          {!isExtracurricular ? (
            <View style={{flex: 1}}>
              <Text style={styles.regularText}>KKM</Text>
              <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
                {item?.kkm}
              </Text>
            </View>
          ) : null}
          <View style={{flex: 1}}>
            <Text style={styles.regularText}>Nilai</Text>
            <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
              {item?.score}
            </Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.regularText}>Predikat</Text>
            <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
              {item?.predicate}
            </Text>
          </View>
        </View>
        <Text style={styles.regularText}>Deskripsi</Text>
        <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
          {item?.description || '--'}
        </Text>
      </View>
    );
  };

  const detailItemPhysical = (item: any, index: number) => {
    return (
      <View key={index} style={{paddingVertical: 10}}>
        <Text style={styles.boldText}>{item?.title}</Text>
        <Text style={styles.regularText}>Ukuran</Text>
        <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
          {item?.size}{' '}
          {(item?.title as string).includes('Tinggi') ? 'cm' : 'kg'}
        </Text>
        <Text style={styles.regularText}>Lain-lain</Text>
        <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
          {item?.description || '--'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.body}>
      <ScrollView>
        <Info />
        <View style={styles.primaryContainer}>
          <Text style={styles.boldText}>{detail.full_name || '--'}</Text>
          <Text style={styles.regularText}>{detail.school || '--'}</Text>
          <Text style={styles.regularText}>{detail.address || '--'}</Text>
          <Text style={styles.regularText}>{detail.semester || '--'}</Text>
          <Text style={[styles.regularText, {lineHeight: 16}]}>
            {detail.issueDate || '--'}
          </Text>
        </View>
        <Item
          title={'Sikap'}
          contain={eraportData?.attitude?.map((item: any, index: number) => {
            return (
              <View key={index} style={{paddingVertical: 10}}>
                <Text style={styles.regularText}>{item?.title}</Text>
                <Text style={styles.boldText}>{item?.description}</Text>
              </View>
            );
          })}
        />
        <Item
          title={'Pengetahuan'}
          contain={eraportData?.knowledge?.map((item: any, index: number) => {
            return detailItemWithNilai(item, index, false);
          })}
        />
        <Item
          title={'Keterampilan'}
          contain={eraportData?.skills?.map((item: any, index: number) => {
            return detailItemWithNilai(item, index, false);
          })}
        />
        <Item
          title={'Ekstrakulikuler'}
          contain={eraportData?.extracurricular?.map(
            (item: any, index: number) => {
              return detailItemWithNilai(item, index, true);
            },
          )}
        />
        <Item
          title={'Catatan Pengembangan Fisik'}
          contain={eraportData?.physical_development_record?.map(
            (item: any, index: number) => {
              return detailItemPhysical(item, index);
            },
          )}
        />
        <Item
          title={'Saran'}
          contain={
            <View>
              <Text style={styles.regularText}>Catatan Saran</Text>
              <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
                {eraportData?.suggestion || '--'}
              </Text>
            </View>
          }
        />
        <Item
          title={'Ketidakhadiran'}
          contain={
            <View style={{flexDirection: 'row', paddingVertical: 2}}>
              <View style={{flex: 1}}>
                <Text style={styles.regularText}>Sakit</Text>
                <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
                  {eraportData?.sick}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.regularText}>Izin</Text>
                <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
                  {eraportData?.permission}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.regularText}>Alpha</Text>
                <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
                  {eraportData?.alpha}
                </Text>
              </View>
            </View>
          }
        />
        <Item
          title={'Keputusan'}
          contain={
            <View>
              <Text style={styles.regularText}>
                {eraportData?.introductory_message || '--'}
              </Text>
              <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
                {eraportData?.graduation_status || '--'}
              </Text>
            </View>
          }
        />
        <View style={{padding: 16}}>
          <Text style={[styles.boldText, {paddingBottom: 5}]}>
            Nilai KKM dan Predikat
          </Text>
          {KKMandPredicate.map((item: any, index: number) => (
            <View key={index} style={{paddingVertical: 5}}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text style={styles.regularText}>{item?.title}</Text>
                <Text style={[styles.regularText, {fontWeight: 'bold'}]}>
                  {item?.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export {DetailEraporScreen};
