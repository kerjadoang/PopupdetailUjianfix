import Colors from '@constants/colors';
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import Close from '@assets/svg/x.svg';
import Fonts from '@constants/fonts';

export type PopUpProps = {
  show?: boolean;
  close?: any;
  Icon?: any;
  title?: string;
  desc?: string;
  titleCancel?: string | null;
  titleConfirm?: string;
  actionCancel?: any;
  actionConfirm?: any;
  disabledActionConfirm?: boolean;
  disabledActionCancel?: boolean;
  png?: any;
  iconConfirm?: any;
  buttonPosition?: 'horizontal' | 'vertical';
  additionalContent?: React.ReactNode;
};

const SwipeUp = ({
  show,
  close,
  Icon,
  title,
  desc,
  titleCancel,
  titleConfirm,
  actionCancel,
  actionConfirm,
  png,
  iconConfirm,
  buttonPosition = 'horizontal',
  ...props
}: PopUpProps) => {
  const isHorizontal = buttonPosition === 'horizontal';
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={actionCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {close && (
            <TouchableOpacity style={styles.closeContainer} onPress={close}>
              <Close width={24} height={24} />
            </TouchableOpacity>
          )}
          {png ? (
            <Image style={styles.iconPng} source={png} />
          ) : Icon ? (
            <Icon width={100} height={100} />
          ) : null}
          <Text style={styles.title}>{title}</Text>
          {desc && <Text style={styles.desc}>{desc}</Text>}
          {props.additionalContent}
          <View style={[styles.buttonContainer, styles[buttonPosition]]}>
            {titleCancel && (
              <Pressable
                style={[
                  styles.button,
                  isHorizontal && {flex: 1, minWidth: 100},
                  !isHorizontal && {minWidth: '100%'},
                  styles.buttonClose,
                  props.disabledActionConfirm && styles.btnDisabled,
                ]}
                disabled={props.disabledActionCancel}
                onPress={actionCancel}>
                <Text
                  style={[
                    styles.textStyleClose,
                    props.disabledActionConfirm && styles.btnLabelDisabled,
                  ]}>
                  {titleCancel}
                </Text>
              </Pressable>
            )}

            {titleConfirm && (
              <Pressable
                style={[
                  styles.button,
                  isHorizontal && {flex: 1, minWidth: 100},
                  !isHorizontal && {minWidth: '100%'},
                  styles.buttonOpen,
                  props.disabledActionConfirm && styles.btnDisabled,
                ]}
                onPress={actionConfirm}
                disabled={props.disabledActionConfirm}>
                {iconConfirm ? (
                  <Image source={iconConfirm} style={styles.iconConfirm} />
                ) : null}
                <Text
                  style={[
                    styles.textStyleOpen,
                    props.disabledActionConfirm && styles.btnLabelDisabled,
                  ]}>
                  {titleConfirm}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
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
  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
    width: '100%',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  button: {
    borderRadius: 25,
    padding: 8,
    elevation: 2,
    borderColor: Colors.primary.base,
    borderWidth: 1,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  buttonOpen: {
    backgroundColor: Colors.primary.base,
  },
  buttonClose: {
    backgroundColor: Colors.white,
    color: Colors.primary.base,
  },
  textStyleClose: {
    color: Colors.primary.base,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  textStyleOpen: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
    color: Colors.dark.neutral100,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  desc: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.dark.neutral80,
    lineHeight: 22,
    fontFamily: Fonts.RegularPoppins,
  },
  iconConfirm: {
    width: 25,
    height: 25,
    margin: 5,
    resizeMode: 'contain',
  },
  iconPng: {
    width: 100,
    height: 100,
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column-reverse',
  },
  btnDisabled: {
    backgroundColor: Colors.dark.neutral40,
    borderColor: 'transparent',
  },
  btnLabelDisabled: {
    color: Colors.dark.neutral60,
  },
});

export {SwipeUp};
