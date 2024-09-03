/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Button, MainView, PopUp} from '@components/atoms';
import IconAcademic from '@assets/svg/ic20_academic_cap.svg';
import {styles} from './style';
import useActivePackageWidget from './useActivePackageWidget';
import {Maskot1, CopyWhite} from '@assets/images';
import Clipboard from '@react-native-clipboard/clipboard';
import SnackbarResult from '@components/atoms/SnackbarResult';
import dayjs from 'dayjs';
import RenderImage from '@components/atoms/RenderImage';

const ActivePackageWidget = (data: any) => {
  const [snakbar, setSnakbar] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const {packageDetail}: any = useActivePackageWidget(data?.token);
  const _renderContent = (packageDetail: any) => {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <IconAcademic width={20} height={20} style={{marginRight: 10}} />
          <Text style={styles.groupMentorTitle}>{'Paket Aktif'}</Text>
        </View>

        <FlatList
          horizontal
          data={packageDetail?.data?.package}
          renderItem={(items: any) => {
            items = items?.item;
            return (
              <TouchableOpacity style={styles.cardContentConnected}>
                <RenderImage
                  imageUrl={items?.path_url}
                  width={50}
                  height={30}
                  svgStyle={styles.connectedImage}
                />

                <MainView flex={1}>
                  <Text style={styles.connectedTitle}>{items?.name}</Text>
                  <Text style={styles.connectedSubtitle}>
                    {`Berlaku sampai ${dayjs(items?.EndTime).format(
                      'DD MMMM YYYY',
                    )}`}
                  </Text>
                </MainView>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.cardContentNotConnected}>
                <View>
                  <Text style={styles.notConnectedTitle}>
                    {'Belum Berlangganan'}
                  </Text>
                  <Text style={styles.notConnectedSubtitle}>
                    {'Beli paket Kelas Pintar sekarang'}
                  </Text>
                </View>

                <Button
                  style={styles.notConnectedButton}
                  label={'Beli Paket'}
                  action={() => setShowPopUp(true)}
                />
              </View>
            );
          }}
        />

        <PopUp
          show={showPopUp}
          close={() => setShowPopUp(false)}
          png={Maskot1}
          title={'Beli Paket Belajar'}
          desc={
            'Saat ini pembelian paket hanya dapat dilakukan di website Kelas Pintar. \n(kelaspintar.id/berlangganan/)'
          }
          titleConfirm={'Salin Tautan Pembelian'}
          actionConfirm={() => {
            Clipboard.setString('kelaspintar.id/berlangganan/');
            setShowPopUp(false);
            setSnakbar(true);
            setTimeout(() => {
              setSnakbar(false);
            }, 1500);
          }}
          iconConfirm={CopyWhite}
        />

        <SnackbarResult
          label={'Tautan Berhasil Disalin'}
          visible={snakbar}
          onPressClose={() => {
            setSnakbar(false);
          }}
        />
      </View>
    );
  };

  /*
  USER_TYPE_ID
  1. Murid
  2. Parent
  3. Mentor
  4. Kepsek
  5. Guru
  6. Admin
 */

  const isHideWidget = data?.userTypeId == 2;
  return <>{isHideWidget ? null : _renderContent(packageDetail)}</>;
};

export {ActivePackageWidget};
