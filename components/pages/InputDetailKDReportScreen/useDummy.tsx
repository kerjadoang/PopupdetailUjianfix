export const dataList = [
  {
    id: 1,
    title: 'Sikap',
  },
  {
    id: 2,
    title: 'Pengetahuan',
  },
  {
    id: 3,
    title: 'Keterampilan',
  },
  {
    id: 4,
    title: 'Ekstrakulikuler',
  },
  {
    id: 5,
    title: 'Catatan Perkembangan Fisik',
  },
  {
    id: 6,
    title: 'Saran',
  },
  {
    id: 7,
    title: 'Ketidakhadiran',
  },
  {
    id: 8,
    title: 'Keputusan',
  },
];
export const dataList2 = {
  data: {
    user_id: 38,
    assessment_erapor_share_student_id: 3,
    rombel_class_school: {
      id: 4,
      rombel_id: 1,
      class_id: 1,
      school_id: 5,
      name: 'Kelas 1A',
    },
    academic_year: {
      id: 1,
      school_id: 2,
      start_date: '2022-06-01T00:00:00Z',
      end_date: '2023-06-01T00:00:00Z',
    },
    academic_phase: {
      id: 5,
      academic_year_id: 1,
      school_id: 5,
      type: 'Genap',
      start_date: '2023-01-01T00:00:00Z',
      end_date: '2023-06-01T00:00:00Z',
    },
    issue_date: '2023-01-30T00:00:00Z',
    attitude: [
      {
        title: 'Sikap Spriritual',
        description: 'bagus sekali',
      },
      {
        title: 'Sikap Sosial',
        description: 'bagus banget',
      },
    ],
    knowledge: [
      {
        id_kkm: 18,
        id_basic_competency: 5,
        subject_id: 11,
        subject_name: 'Budi Pekerti',
        kkm: 70,
        score: 79.75,
        predicate: 'good',
        description: 'okeh',
        assessment_erapor_share_student_id: 3,
      },
    ],
    skills: [
      {
        id_kkm: 21,
        subject_id: 0,
        subject_name: 'Menggambar',
        kkm: 65,
        score: 0,
        predicate: 'failed',
        description: '',
        assessment_erapor_share_student_id: 3,
      },
      {
        id_kkm: 22,
        subject_id: 0,
        subject_name: 'Kerajinan Tangan',
        kkm: 65,
        score: 0,
        predicate: 'failed',
        description: '',
        assessment_erapor_share_student_id: 3,
      },
    ],
    extracurricular: [
      {
        id_kkm: 23,
        extracurricular_name: 'Basket',
        kkm: 80,
        score: 0,
        predicate: '',
        description: 'Sangat bagus',
        assessment_erapor_share_student_id: 3,
      },
      {
        id_kkm: 24,
        extracurricular_name: 'Paskibra',
        kkm: 77,
        score: 0,
        predicate: '',
        description: 'Sempurna',
        assessment_erapor_share_student_id: 3,
      },
    ],
    physical_development_record: [
      {
        title: 'Tinggi Badan',
        size: '170 cm',
        description: '',
      },
      {
        title: 'Berat Badan',
        size: '50 kg',
        description: 'kurus',
      },
    ],
    suggestion: 'teruskan belajar',
    sick: 0,
    permission: 0,
    alpha: 0,
    introductory_message: '',
    graduation_status: 'lulus',
  },
};
