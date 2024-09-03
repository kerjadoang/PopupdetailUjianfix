/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ILaporanSoal} from 'type/laporan-soal';
import apiWithoutToken from '@api/withoutToken';
import {Card} from '../Card';
import IconLatihan from '@assets/svg/ic40_latihan.svg';
import IconVideo from '@assets/svg/ic40_video.svg';

const RenderLaporanSoal = ({data}: any) => {
  const [laporanSoal, setLaporanSoal] = useState<ILaporanSoal>();

  useEffect(() => {
    fetchLaporanSoal();
  }, []);

  const fetchLaporanSoal = async () => {
    try {
      const res = await apiWithoutToken.get('/soal/v1/laporan', {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });
      if (res?.data?.code === 100) {
        return setLaporanSoal(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  return (
    <View>
      <Card
        label={`${laporanSoal?.video_watched ?? 0} Video Animasi`}
        subLabel={'telah ditonton'}
        img={<IconVideo width={40} height={40} />}
      />
      <Card
        label={`${laporanSoal?.soal_completed ?? 0} Latihan Soal`}
        subLabel={'telah dikerjakan'}
        img={<IconLatihan width={40} height={40} />}
      />
    </View>
  );
};

export {RenderLaporanSoal};
