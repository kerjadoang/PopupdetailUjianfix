import {rdxDispatch} from '@constants/functional';
import {
  fetchGetSubjectsByClass,
  fetchGetSubjectsByUserClass,
  fetchGetSubjectsFavorite,
} from '@redux';
import TanyaIcon1 from '@assets/svg/logo_tanya1.svg';
import TanyaIcon2 from '@assets/svg/logo_tanya2.svg';
import TanyaIcon3 from '@assets/svg/logo_tanya3.svg';
import LogoTanya from '@assets/svg/logo_tanya.svg';
import GuruIcon1 from '@assets/svg/guru_1.svg';
import GuruIcon2 from '@assets/svg/guru_2.svg';
import GuruIcon3 from '@assets/svg/guru_3.svg';
import GuruIcon4 from '@assets/svg/guru_4.svg';
import LogoGuru from '@assets/svg/logo_guru.svg';
import SoalIcon1 from '@assets/svg/ic_soal1.svg';
import SoalIcon2 from '@assets/svg/ic_soal2.svg';
import SoalIcon3 from '@assets/svg/ic_soal3.svg';
import SoalIcon4 from '@assets/svg/ic_soal4.svg';
import LogoSoal from '@assets/svg/logo_soal.svg';
import LMSIcon from '@assets/svg/il_lms.svg';

export const getHomeSubject = async (class_id?: number) => {
  try {
    rdxDispatch(fetchGetSubjectsByClass(class_id));
    rdxDispatch(fetchGetSubjectsByUserClass());
    rdxDispatch(fetchGetSubjectsFavorite());
  } catch (error) {}
};

export const dataTanya = {
  data: [
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
  ],
  logo: <LogoTanya />,
  title: 'TANYAkan soal sulit ke Guru Ahli.',
  subTitle: undefined,
  ButtonLabel1: 'Mulai Bertanya',
  ButtonLabel2: undefined,
};

export const dataGuru = {
  data: [
    {
      icon: <GuruIcon1 />,
      text: 'Belajar Secara Langsung',
      textSubject:
        'Bersama Guru Ahli Kelas Pintar yang berpengalaman dan tersertifikasi.',
    },
    {
      icon: <GuruIcon2 />,
      text: 'Dapat Dipelajari Kembali',
      textSubject:
        'Melalui rekaman sesi kelas bagi kamu yang melewatkan atau ingin mengulang materi.',
    },
    {
      icon: <GuruIcon3 />,
      text: 'Lebih Interaktif',
      textSubject:
        'Karena dapat langsung bertanya kepada Guru Ahli selama kelas berlangsung.',
    },
    {
      icon: <GuruIcon4 />,
      text: 'Materi Lebih Menarik',
      textSubject:
        'Sesuai dengan pelajaran di sekolah yang dikemas secara menarik dan bervariasi.',
    },
  ],
  logo: <LogoGuru />,
  title: 'Live class Interaktif bersama Guru Ahli.',
  subTitle: undefined,
  ButtonLabel1: 'Berlangganan Sekarang',
  ButtonLabel2: undefined,
};

export const dataSoal = {
  data: [
    {
      icon: <SoalIcon1 />,
      text: 'Learn, Practice, Test',
      textSubject:
        'Menyajikan materi, soal latihan, dan tes pembelajaran secara interaktif.',
    },
    {
      icon: <SoalIcon2 />,
      text: 'Kuis',
      textSubject:
        'Kumpulan soal latihan yang dapat digunakan untuk mengukur tingkat pemahaman kamu.',
    },
    {
      icon: <SoalIcon3 />,
      text: 'Try Out',
      textSubject: 'Uji kemampuan dan kesiapan kamu dalam menghadapi ujian.',
    },
    {
      icon: <SoalIcon4 />,
      text: 'Laporan',
      textSubject:
        'Mengetahui progres belajar murid pada setiap mata pelajaran yang telah dipelajari.',
    },
  ],
  logo: <LogoSoal />,
  title: 'Puluhan ribu soal latihan persiapan berbagai ujian.',
  subTitle: undefined,
  ButtonLabel1: 'Berlangganan',
  ButtonLabel2: 'Akses Soal',
};

export const dataLMS = {
  data: undefined,
  logo: <LMSIcon />,
  title: 'Tidak Dapat Mengakses LMS',
  subTitle:
    'LMS hanya dapat diakses oleh pihak sekolah yang bekerjasama dengan Kelas Pintar.',
  ButtonLabel1: undefined,
  ButtonLabel2: undefined,
};
