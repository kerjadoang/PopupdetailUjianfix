import React from 'react';
import {View} from 'react-native';
import {ChildrenSwipeUpServices} from '@components/molecules/ChildrenSwipeUpServices';
import TanyaIcon1 from '@assets/svg/logo_tanya1.svg';
import TanyaIcon2 from '@assets/svg/logo_tanya2.svg';
import TanyaIcon3 from '@assets/svg/logo_tanya3.svg';
import LogoTanya from '@assets/svg/logo_tanya.svg';
import {Button} from '@components/atoms';
type Props = {
  action?: any;
};
const RenderChildSwipeInfo = ({action}: Props) => {
  const data = [
    {
      icon: <TanyaIcon1 />,
      text: 'Siapkan Soal',
      textSubject:
        'Buka menu TANYA, pilih mata pelajaran dan bab/materi yang ingin ditanyakan.',
    },
    {
      icon: <TanyaIcon2 />,
      text: 'Foto Soal',
      textSubject: 'Foto dan kirimkan soal yang ingin kamu tanyakan.',
    },
    {
      icon: <TanyaIcon3 />,
      text: 'Tunggu Jawaban',
      textSubject:
        'Guru Ahli akan segera mengirimkan jawaban beserta penjelasannya.',
    },
  ];
  return (
    <View style={{padding: 16}}>
      <ChildrenSwipeUpServices
        data={data}
        logo={<LogoTanya />}
        title={'Cara Menggunakan TANYA'}
      />
      <Button label="Mulai Bertanya" action={action} />
    </View>
  );
};

export {RenderChildSwipeInfo};
