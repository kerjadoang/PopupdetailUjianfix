/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Modal, Pressable, View} from 'react-native';
import {Styles} from './style';
import LineHorizontalBlueIcon from '@assets/svg/headerStrip.svg';

type _SwipeUpModalType = {
  isOpenPopUp: boolean;
  handleShowPopUp: any;
  children: any;
};

const SwipeUpModal = ({
  isOpenPopUp,
  handleShowPopUp,
  children,
}: _SwipeUpModalType) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpenPopUp}
      onDismiss={() => {}}>
      <Pressable
        onPress={() => {
          handleShowPopUp(false);
        }}
        style={Styles.popUpTopContent}
      />
      <View style={Styles.popUpContentContainer}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={{width: '100%', marginTop: '3%'}}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <LineHorizontalBlueIcon />
            </View>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {SwipeUpModal};
