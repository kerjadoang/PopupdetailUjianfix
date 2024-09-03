import React, {useEffect, useState} from 'react'; /// Mengimpor React
import {View} from 'react-native'; // Mengimpor View dari React Native
 // Mengimpor Ionicons untuk penggunaan ikon
import { PoppinsText } from '@/components/atoms'; // Mengimpor komponen kustom PoppinsText
import {styles} from '../styles'; // Mengimpor gaya dari file style lokal
import { apiGet } from '@/api/wrapping';

// Definisikan interface untuk data API yang sesuai dengan CardComponent
interface CardData {
  value: number;
  correct: number;
  wrong: number;
  skipped: number;
  duration: string;
  examDate: string;
}

export const CardComponent: React.FC = () => {
  const [data, setData] = useState<CardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet<CardData>({
          url: 'https://api.example.com/card-data', // Ganti URL dengan endpoint API yang relevan
          fullResponse: false,
          resHeaders: false,
          retry: 3,
        });

        setData(response); // Menyimpan data yang diambil ke state
        setError(null); // Menghapus error jika data berhasil diambil
      } catch (error) {
        setData(null); // Menghapus data jika terjadi error
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Jika terjadi error, tampilkan pesan error
  if (error) {
    return (
      <View style={styles.container}>
        <PoppinsText>{error}</PoppinsText>
      </View>
    );
  }

  // Jika tidak ada data dan tidak ada error, tidak menampilkan apapun
  if (!data) {
    return null;
  }
  return (
    <View style={styles.container}>
    <View style={styles.nilaiContainer}>
      <PoppinsText style={styles.nilai}>Nilai</PoppinsText>
      <PoppinsText style={styles.value}>{data.value}</PoppinsText>
    </View>
    <View style={styles.statsContainer}>
      <View style={styles.stats}>
        <PoppinsText style={styles.correct}>{data.correct}</PoppinsText>
        <PoppinsText style={styles.correctLabel}>Benar</PoppinsText>
      </View>
      <View style={styles.stats}>
        <PoppinsText style={styles.wrong}>{data.wrong}</PoppinsText>
        <PoppinsText style={styles.wrongLabel}>Salah</PoppinsText>
      </View>
      <View style={styles.stats}>
        <PoppinsText style={styles.skipped}>{data.skipped}</PoppinsText>
        <PoppinsText style={styles.skippedLabel}>Dilewati</PoppinsText>
      </View>
    </View>
    <View style={styles.divider} />
    <View style={styles.infoContainer}>
      <PoppinsText style={styles.duration}>
        Durasi Pengerjaan:{' '}
        <PoppinsText style={styles.timeText}>{data.duration}</PoppinsText>
      </PoppinsText>
      <PoppinsText style={styles.date}>{data.examDate}</PoppinsText>
    </View>
  </View>
  );
};
