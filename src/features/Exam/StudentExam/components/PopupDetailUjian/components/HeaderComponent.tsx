import React, {useEffect, useState} from 'react'; // Mengimpor React, useEffect, dan useState
import {View} from 'react-native'; // Mengimpor View dari React Native
import { PoppinsText } from '@/components/atoms';// Mengimpor komponen kustom PoppinsText
import {styles} from '../styles'; // Mengimpor gaya dari file style lokal
import { apiGet } from '@/api/wrapping';

interface HeaderData {
  examTitle: string;
  subject: string;
  description?: string;
  score?: number;
  examDate?: string;
}

export const HeaderComponent: React.FC = () => {
  const [data, setData] = useState<HeaderData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet<HeaderData>({
          url: 'https://api.example.com/header-data', // Ganti URL dengan endpoint API yang relevan
          fullResponse: false,
          resHeaders: false,
          retry: 3,
        });

        // Contoh respons data dari API yang sesuai dengan HeaderData
        const mockData: HeaderData = {
          examTitle: 'Ujian Tengah Semester',
          subject: 'Matematika',
          description: 'Ulangan Harian Pola Bilangan',
          score: 85,
          examDate: '2024-08-28',
        };

        setData(mockData);  // Menyimpan data yang diambil ke state
        setError(null);     // Menghapus error jika data berhasil diambil
      } catch (error) {
        setData(null); // Menghapus data jika terjadi error
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // Mendefinisikan komponen fungsional HeaderComponent
  return (
    <>
      <View>
        {' '}
        {/* Kontainer untuk bar atas */}
        <View /> {/* Styling untuk bar atas */}
      </View>
      <PoppinsText style={styles.header}>
      {data?.examTitle} • {data?.subject} 
      </PoppinsText>
      <PoppinsText style={styles.title}>
     {data?.description}
      </PoppinsText>
    </>
  );
};
