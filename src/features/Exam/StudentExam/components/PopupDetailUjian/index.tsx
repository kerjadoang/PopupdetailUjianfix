import React, {useState} from 'react'; // Mengimpor hook dan library yang diperlukan
import {View, TouchableOpacity} from 'react-native'; // Mengimpor komponen View dan TouchableOpacity dari React Native
//import {Ionicons} from '@expo/vector-icons'; // Mengimpor Ionicons untuk penggunaan ikon
import Modal from 'react-native-modal'; // Mengimpor komponen Modal dari library react-native-modal
import PoppinsText from './components/PoppinsTexts'; // Mengimpor komponen kustom PoppinsText
import {HeaderComponent} from './components/HeaderComponent'; // Mengimpor CardComponent dan HeaderComponent dari folder komponen lokal
import {CardComponent} from './components/CardComponent';
import {styles} from './styles'; // Mengimpor gaya dari style.tsx

export default function PopDetailUjian() {
  // Mendefinisikan komponen fungsional utama
  const [isModalVisible, setModalVisible] = useState(false); // Mendefinisikan state untuk visibilitas modal

  const toggleModal = () => {
    // Menggunakan ternary untuk mengubah visibilitas modal
    setModalVisible(isModalVisible ? false : true);
};

  return (
    <View style={styles.container}>
      {' '}
      {/* Kontainer utama dengan styling */}
      <TouchableOpacity onPress={toggleModal} style={styles.openButton}>
        {' '}
        {/* Tombol untuk membuka modal */}
        <PoppinsText weight="Bold" style={styles.openButtonText}>
          Show Modal
        </PoppinsText>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modalView}>
          <HeaderComponent /> {/* Menampilkan HeaderComponent */}
          <CardComponent /> {/* Menampilkan CardComponent */}
        </View>
      </Modal>
    </View>
  );
}
