import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ModalProps,
} from 'react-native';

import IconCloseWhite from '@assets/svg/ic24_x_white.svg';
import Colors from '@constants/colors';
import {hostEndsWith} from '@constants/functional';

type ImageViewerProps = {
  pathUrl?: string;
} & ModalProps;

const ImageViewer: React.FC<ImageViewerProps> = props => {
  return (
    <Modal animationType="slide" {...props} presentationStyle="pageSheet">
      <View style={styles.contetContainer}>
        <View style={styles.mt16}>
          <Text style={styles.photoTitle}>Foto</Text>
        </View>
        <View style={styles.newCenteredView}>
          <Image
            source={hostEndsWith(props.pathUrl ?? '')}
            resizeMode="center"
            style={styles.content}
          />
        </View>
      </View>
      <Pressable onPress={props.onRequestClose} style={styles.buttonContainer}>
        <IconCloseWhite />
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  content: {width: '100%', height: 328},
  photoTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  buttonContainer: {
    position: 'absolute',
    left: 12,
    top: 15,
  },
  mt16: {marginTop: 16},
  contetContainer: {
    backgroundColor: 'rgba(0,0,0,.3)',
    flex: 1,
  },
  newCenteredView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ImageViewer;
