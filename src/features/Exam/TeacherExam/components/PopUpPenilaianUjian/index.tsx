import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { PoppinsText } from '@/components/atoms';
import styles from './styles';

const PopUpPenilaianUjian = () => {
  const [isModalVisible, setModalVisible] = useState(false);


  const toggleModal = () => setModalVisible(isModalVisible ? false : true);


  };


  return (
    <View style={styles.container}>
      <Button title='Show Popup' onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        useNativeDriver>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <Image
            source={require('./assets/Robot.svg')}
            style={styles.robotIcon}
          />
          <Text style={styles.title}>Kumpulkan Nilai Ujian</Text>
          <PoppinsText style={styles.message}>
            Ketika selesai dikumpulkan, nilai akan dibagikan ke murid
            </PoppinsText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.reviewButton} onPress={toggleModal}>
            <PoppinsText style={styles.reviewText}>Periksa Ulang</PoppinsText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={toggleModal}>
              <PoppinsText style={styles.submitText}>Kumpulkan</PoppinsText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopUpPenilaianUjian;
