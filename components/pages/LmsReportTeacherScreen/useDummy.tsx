import Icon_1 from '@assets/svg/ic48_laporan_nilai_kkm.svg';
import Icon_2 from '@assets/svg/ic48_laporan_nilai_murid.svg';
import Icon_3 from '@assets/svg/ic48_laporan_bagikan_rapor.svg';
import Icon_4 from '@assets/svg/ic48_laporan_kehadiran_murid.svg';
import Hat_red from '@assets/svg/ic_hat_red.svg';
import Hat_blue from '@assets/svg/ic_hat_blue.svg';
import Hat_grey from '@assets/svg/ic_hat_grey.svg';

export const data_list = [
  {
    id: 1,
    name: 'Input Nilai KKM',
    icon: <Icon_1 width={48} height={48} />,

    class: [
      {
        name: 'Kelas 1',
        icon_hat: <Hat_red width={20} height={20} />,
        allClass: [
          {
            name: 'Kelas 1 - A',
          },
          {
            name: 'Kelas 1 -B',
          },
          {
            name: 'Kelas 1 - C',
          },
          {
            name: 'Kelas 1 - D',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Input Nilai Murid',
    icon: <Icon_2 width={48} height={48} />,

    class: [
      {
        name: 'Kelas 8',
        icon_hat: <Hat_blue width={20} height={20} />,
        allClass: [
          {
            name: 'Kelas 1 - A',
          },

          {name: 'Kelas 1 -B'},
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Bagikan e-Raport',
    icon: <Icon_3 width={48} height={48} />,

    class: [
      {
        name: 'Kelas 12',
        icon_hat: <Hat_grey width={20} height={20} />,
        allClass: [
          {
            name: 'Kelas 1 - A',
          },
          {
            name: 'Kelas 1 -B',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Kehadiran Murid',
    icon: <Icon_4 width={48} height={48} />,

    class: [],
  },
];
