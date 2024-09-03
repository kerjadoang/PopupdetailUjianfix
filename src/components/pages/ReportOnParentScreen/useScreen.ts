import {useState} from 'react';

const useScreen = () => {
  const [selectedItem, setSelectedItem] = useState('Materi');
  const item = ['Materi', 'Sesi Kelas', 'Ujian', 'PR/Projek/Tugas', 'LKS'];
  return {
    selectedItem,
    setSelectedItem,
    item,
  };
};
export {useScreen};
