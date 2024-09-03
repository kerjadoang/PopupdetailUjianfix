import MateriSekolah from '@assets/svg/ic48_materi_sekolah.svg';
import Tugas from '@assets/svg/ic48_pr_tugas_alert.svg';
import Ujian from '@assets/svg/ic48_akm_alert.svg';
import AKM from '@assets/svg/ic48_akm.svg';

import React from 'react';

const menuLMS = [
  {
    name: 'Materi Sekolah',
    image: <MateriSekolah height={48} width={48} />,
  },
  {
    name: 'PR. Projek & Tugas',
    image: <Tugas height={48} width={48} />,
  },
  {
    name: 'Ujian / Ulangan',
    image: <Ujian height={48} width={48} />,
  },
  {
    name: 'AKM',
    image: <AKM height={48} width={48} />,
  },
];

export default menuLMS;
