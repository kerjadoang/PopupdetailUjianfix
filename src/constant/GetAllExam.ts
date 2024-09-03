const GetAllExam = [
  {
    id: 1,
    name: 'Semua',
    key: ['ditugaskan', 'mengerjakan', 'dikumpulkan', 'diperiksa'],
  },
  {
    id: 2,
    name: 'Sudah dinilai',
    key: ['diperiksa'],
  },
  {
    id: 3,
    name: 'Belum dinilai',
    key: ['ditugaskan', 'mengerjakan', 'dikumpulkan'],
  },
];

export const NewGetAllExam = [
  {
    id: 1,
    name: 'Semua',
    key: ['scheduled', 'on_progess', 'done', 'done_scoring'],
  },
  {
    id: 2,
    name: 'Sudah dinilai',
    key: ['done_scoring'],
  },
  {
    id: 3,
    name: 'Belum dinilai',
    key: ['done'],
  },
];

export default GetAllExam;
