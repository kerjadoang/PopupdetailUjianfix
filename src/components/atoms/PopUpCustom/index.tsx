import Colors from '@constants/colors';
import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';

export type PopUpProps = {
  visible?: boolean;
  onPressCancel?: any;
  children?: any;
};

const PopUpCustom = ({visible, onPressCancel, children}: PopUpProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPressCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorModal,
    paddingHorizontal: 16,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
    width: '100%',
  },
});

export {PopUpCustom};
