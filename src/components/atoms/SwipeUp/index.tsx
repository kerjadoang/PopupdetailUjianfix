import Colors from '@constants/colors';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Modal, {ModalProps} from 'react-native-modalbox';

export type SwipeUpProps = {
  height?: any;
  isSwipeLine?: any;
  onClose?: () => void;
  children?: any;
  visible?: any;
  coverScreen?: any;
  styleInnerContainer?: any;
  lineColor?: 'blue' | 'gray';
  maxHeight?: number;
} & ModalProps;

const SwipeUp = ({
  visible = false,
  styleInnerContainer = {},
  height = 100,
  isSwipeLine = true,
  onClose = () => {},
  children,
  backdropPressToClose,
  swipeToClose,
  backButtonClose,
  lineColor = 'blue',
  maxHeight,
}: SwipeUpProps) => {
  return (
    <>
      {visible ? (
        <Modal
          backButtonClose={backButtonClose}
          swipeToClose={swipeToClose}
          backdropPressToClose={backdropPressToClose}
          coverScreen
          style={{
            ...stylesProps(height).containerSwipeUp,
            ...styleInnerContainer,
          }}
          backdropOpacity={0.7}
          backdropColor={Colors.backgroundColorModal}
          position={'bottom'}
          swipeArea={100}
          isOpen={visible}
          onClosed={onClose}>
          {isSwipeLine ? (
            <View
              style={[
                styles.modalSwipeLine,
                {
                  backgroundColor:
                    lineColor === 'blue'
                      ? Colors.primary.base
                      : Colors.dark.neutral40,
                },
              ]}
            />
          ) : null}
          {maxHeight ? (
            <View style={{maxHeight: maxHeight}}>{children}</View>
          ) : (
            children
          )}
        </Modal>
      ) : null}
    </>
  );
};

export {SwipeUp};

const stylesProps = ({height}: any) =>
  StyleSheet.create({
    containerSwipeUp: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      height: height,
      paddingBottom: Platform.OS === 'ios' ? 32 : 0,
    },
  });

export const styles = StyleSheet.create({
  modalSwipeLine: {
    width: 104,
    height: 4,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
