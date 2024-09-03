import {View} from 'react-native';
import React, {useEffect} from 'react';
import {CardPTN} from '../CardPTN';
import IconLaporanTryOut from '@assets/svg/ic40_laporan_tryout.svg';
import IconLatihan from '@assets/svg/ic40_latihan.svg';
import useDiagnoticTestResult from '@components/pages/DiagnoticTestResultScreen/useDiagnoticTestResult';
import {useDispatch} from 'react-redux';
import {fetchCheckDiagnostic} from '@redux';

const RenderLaporanPTN = ({data, navigation}: any) => {
  const dispatch: any = useDispatch();
  const {checkHasDoneMinatBakat} = useDiagnoticTestResult();

  useEffect(() => {
    dispatch(fetchCheckDiagnostic(data));
  }, []);

  return (
    <View>
      <CardPTN
        label={'Laporan Try Out'}
        img={<IconLaporanTryOut width={40} height={40} />}
        onPress={() =>
          navigation.navigate('PTNReportScreen', {
            data: data,
            isFromParent: true,
          })
        }
      />
      <CardPTN
        label={'Laporan Minat Bakat'}
        img={<IconLatihan width={40} height={40} />}
        onPress={() => {
          checkHasDoneMinatBakat(data, navigation);
        }}
      />
    </View>
  );
};

export {RenderLaporanPTN};
