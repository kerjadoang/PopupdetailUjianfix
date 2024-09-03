/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Modal, Pressable, View} from 'react-native';
import HeaderStripIcon from '@assets/svg/headerStrip.svg';

type _IPopUp = {
  isOpenPopUp: boolean;
  handleShowPopUp: any;
  handleClosePopUp: any;
  popUpContent: any;
  showHeader?: boolean;
};

const PopUpComponent = ({
  isOpenPopUp,
  handleClosePopUp,
  popUpContent,
  showHeader = true,
}: _IPopUp) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpenPopUp}
      onDismiss={() => {}}>
      <Pressable
        onPress={() => {
          handleClosePopUp();
        }}
        style={{flex: 1, backgroundColor: 'rgba(29, 37, 45, 0.4)'}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(29, 37, 45, 0.4)',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
            paddingTop: '5%',
            paddingHorizontal: '5%',
            paddingBottom: '5%',
          }}>
          <View
            style={{width: '100%', alignItems: 'center', marginBottom: '5%'}}>
            {showHeader && <HeaderStripIcon />}
          </View>
          {popUpContent}
        </View>
      </View>
    </Modal>
  );
};

export default PopUpComponent;
