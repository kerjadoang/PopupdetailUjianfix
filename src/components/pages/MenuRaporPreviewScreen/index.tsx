/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '@components/atoms';
import Download from '@assets/svg/downloadBlue.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {ParamList} from 'type/screen';
import {apiGetFile} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import dayjs from 'dayjs';
import Pdf from 'react-native-pdf';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {getHeaders} from '@api/utils';
import Config from 'react-native-config';

const MenuRaporPreviewScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'MenuRaporPreviewScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'MenuRaporPreviewScreen'>>();
  const {raporId, studentName} = route.params;
  const [pdfUri, setPdfUri] = useState({
    header: {},
    uri: '',
  });

  const getDownloadRapor = async () => {
    try {
      showLoading();
      const dateNow = dayjs().format('DDMMYYYY');
      const fileName = `LaporanKehadiranMurid${dateNow}${Math.floor(
        Math.random() * (999 - 100 + 1) + 100,
      )}.pdf`;
      const mime = 'application/pdf';

      const resFile = await apiGetFile({
        fileNameWithExt: fileName,
        mime: mime,
        url: URL_PATH.generate_erapor_murid(raporId),
      });

      if (resFile?.filePath) {
        showSuccessToast('Berhasil unduh rapor murid.');
      }
    } catch (e: any) {
      showErrorToast('Gagal unduh rapor murid.');
    } finally {
      dismissLoading();
    }
  };

  const setPDF = async () => {
    setPdfUri({
      header: await getHeaders(),
      uri: `${Config.BASEURL}/${URL_PATH.generate_erapor_murid(raporId)}`,
    });
  };
  useEffect(() => {
    setPDF();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={`Prantijau Rapor ${studentName || 'Murid'}`}
          iconRight={<Download />}
          onPressIconRight={() => {
            getDownloadRapor();
          }}
        />
      ),
    });
  }, [navigation, studentName]);
  return (
    <View style={{flex: 1}}>
      <Pdf
        renderActivityIndicator={() => <LoadingIndicator />}
        source={{
          headers: pdfUri.header,
          uri: pdfUri.uri,
        }}
        style={{flex: 1}}
      />
    </View>
  );
};

export {MenuRaporPreviewScreen};
