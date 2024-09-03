import Colors from '@constants/colors';
import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Close from '@assets/svg/x.svg';
import Fonts from '@constants/fonts';
import {sleep} from '@constants/functional';
import {startCountdown, stopCountdown} from './utils';

export type PopUpProps = {
  show?: boolean;
  close?: any;
  Icon?: any;
  title?: string;
  styleTitle?: any;
  subtitle?: string;
  desc?: any;
  styleDesc?: any;
  titleCancel?: string | null;
  titleConfirm?: string;
  actionCancel?: any;
  actionConfirm?: any;
  disabledActionConfirm?: boolean;
  disabledActionCancel?: boolean;
  disableActionClose?: boolean;
  png?: any;
  namaAnak?: string;
  iconConfirm?: any;
  buttonPosition?: 'horizontal' | 'vertical';
  additionalContent?: React.ReactNode;
  titleImageContent?: React.ReactNode;
  modalView?: StyleProp<ViewStyle>;
  confirmStyle?: StyleProp<ViewStyle>;
  confirmTextStyle?: StyleProp<TextStyle>;
  cancelStyle?: StyleProp<ViewStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
  overrideTitle?: boolean;
  type?: any;
  countdownConfirm?: number; //in sec
  countdownCancel?: number; //in sec
  onPopupShow?: CallBack<void>;
  onPopupDismiss?: CallBack<void>;
};

const PopUp = ({
  show,
  close,
  Icon,
  title,
  subtitle,
  desc,
  styleDesc,
  titleCancel,
  titleConfirm,
  actionCancel,
  actionConfirm,
  png,
  iconConfirm,

  buttonPosition = 'horizontal',
  disableActionClose,
  onPopupShow,
  onPopupDismiss,
  confirmStyle,
  confirmTextStyle,
  cancelStyle,
  cancelTextStyle,
  countdownConfirm = 0,
  countdownCancel = 0,
  ...props
}: PopUpProps) => {
  const isHorizontal = buttonPosition === 'horizontal';
  const [tempCountdownConfirm, setTempCountdownConfirm] =
    useState(countdownConfirm);
  const [tempCountdownCancel, setTempCountdownCancel] =
    useState(countdownCancel);
  const confirmCountdownRef = useRef<NodeJS.Timer>();
  const cancelCountdownRef = useRef<NodeJS.Timer>();

  const checkCountdownConfirm = async () => {
    stopCountdown(confirmCountdownRef, setTempCountdownConfirm);
    if (countdownConfirm == 0) {
      return;
    }
    setTempCountdownConfirm(countdownConfirm);
    await sleep(100);
    startCountdown(
      confirmCountdownRef,
      countdownConfirm,
      setTempCountdownConfirm,
    );
  };

  const checkCountdownCancel = async () => {
    stopCountdown(cancelCountdownRef, setTempCountdownCancel);
    if (countdownCancel == 0) {
      return;
    }
    setTempCountdownCancel(countdownCancel);
    await sleep(100);
    startCountdown(cancelCountdownRef, countdownCancel, setTempCountdownCancel);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onDismiss={() => {
        onPopupDismiss?.();
      }}
      onShow={async () => {
        checkCountdownConfirm();
        checkCountdownCancel();
        onPopupShow?.();
      }}
      onRequestClose={actionCancel}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, props.modalView]}>
          {close && (
            <TouchableOpacity
              disabled={disableActionClose}
              style={styles.closeContainer}
              onPress={close}>
              <Close width={24} height={24} />
            </TouchableOpacity>
          )}
          {png ? (
            <Image style={styles.iconPng} source={png} />
          ) : Icon ? (
            <Icon width={100} height={100} />
          ) : null}
          <Text style={[styles.title, props.styleTitle]}>{title}</Text>
          {props.titleImageContent}
          {subtitle ? (
            <Text
              style={[
                styles.desc,
                {fontFamily: Fonts.SemiBoldPoppins},
                styleDesc,
              ]}>
              {subtitle}
            </Text>
          ) : null}

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
                  cancelStyle,
                  props.disabledActionConfirm && styles.btnDisabled,
                  tempCountdownCancel != 0 && styles.btnDisabled,
                ]}
                disabled={
                  props.disabledActionCancel || tempCountdownCancel != 0
                }
                onPress={actionCancel}>
                <Text
                  style={[
                    styles.textStyleClose,
                    cancelTextStyle,
                    props.disabledActionConfirm && styles.btnLabelDisabled,
                    tempCountdownCancel != 0 && styles.btnLabelDisabled,
                  ]}>
                  {tempCountdownCancel != 0 ? tempCountdownCancel : titleCancel}
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
                  confirmStyle,
                  props.disabledActionConfirm && styles.btnDisabled,
                  tempCountdownConfirm != 0 && styles.btnDisabled,
                ]}
                onPress={actionConfirm}
                disabled={
                  props.disabledActionConfirm || tempCountdownConfirm != 0
                }>
                {iconConfirm ? (
                  <Image source={iconConfirm} style={styles.iconConfirm} />
                ) : null}
                <Text
                  style={[
                    styles.textStyleOpen,
                    confirmTextStyle,
                    props.disabledActionConfirm && styles.btnLabelDisabled,
                    tempCountdownConfirm != 0 && styles.btnLabelDisabled,
                  ]}>
                  {tempCountdownConfirm != 0
                    ? tempCountdownConfirm
                    : titleConfirm}
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
    fontFamily: 'Poppins-Regular',
  },
  textStyleOpen: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 18,
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
    fontFamily: 'Poppins-Regular',
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
    flexDirection: 'column',
  },
  btnDisabled: {
    backgroundColor: Colors.dark.neutral40,
    borderColor: 'transparent',
  },
  btnLabelDisabled: {
    color: Colors.dark.neutral60,
  },
});

export {PopUp};
