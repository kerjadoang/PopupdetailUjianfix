import Colors from '@constants/colors';
import React, {FC} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {ToastConfigParams} from 'react-native-toast-message';
import IconCloseWhite from '@assets/svg/ic_close_white.svg';
import IconCloseBlack from '@assets/svg/ic_close_black.svg';
import {StyleSheet} from 'react-native';
import Fonts from '@constants/fonts';
import ChevronUp from '@assets/svg/ic24_chevron_up_grey.svg';

const ToastContainer: FC<ToastConfigParams<any>> = props => {
  if (props?.isVisible) {
    return (
      <View
        style={[
          styles.toastContainer,
          {
            backgroundColor:
              props.type === 'error'
                ? Colors.danger.base
                : props.type === 'warning'
                ? Colors.secondary.base
                : props.type === 'info'
                ? Colors.white
                : Colors.success.light1,
            borderWidth: 1,
            borderColor:
              props.type === 'info' ? Colors.dark.neutral40 : 'transparent',
          },
        ]}>
        <View style={{flex: 12}}>
          <Text
            style={[
              styles.toastTitle,
              {
                color:
                  props.type === 'warning' || props.type === 'info'
                    ? Colors.dark.neutral100
                    : Colors.white,
              },
            ]}>
            {props.text1}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              props?.onPress?.();
              props.hide?.();
            }}>
            {props?.type === 'warning' || props?.type === 'info' ? (
              <IconCloseBlack width={24} height={24} />
            ) : (
              <IconCloseWhite width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

const NotifContainer: FC<ToastConfigParams<any>> = props => (
  <Pressable
    onPress={() => {
      props.onPress();
      props.hide();
    }}
    style={styles.notifContainer}>
    <View style={styles.notifRow}>
      <View style={styles.notifRow2}>
        <View style={styles.notifRow3}>
          <View style={styles.notifBase}>
            <View style={styles.notifDot} />
          </View>
          <Text style={styles.notifKPText}>Kelas Pintar</Text>
        </View>
        <Text style={styles.notifBarusaja}>Baru Saja</Text>
      </View>
      <ChevronUp />
    </View>
    <View>
      <Text style={styles.notifText}>{props.text1}</Text>
      <Text style={styles.answerText}>Klik untuk melihat jawaban</Text>
    </View>
  </Pressable>
);

const LabelChartContainer: FC<ToastConfigParams<any>> = props => (
  <View style={styles.labelChartContainer}>
    <View style={styles.labelChartPointContainer}>
      <Text style={styles.labelChartPoint}>{props.text2}</Text>
    </View>
    <Text style={styles.labelChartText}>{props.text1}</Text>
  </View>
);

export {ToastContainer, NotifContainer, LabelChartContainer};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    zIndex: 999,
    bottom: -24,
    right: 16,
    left: 16,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.success.light1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toastTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black,
  },
  labelChartContainer: {
    width: '94%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary.base,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  labelChartPointContainer: {
    width: 32,
    height: 32,
    backgroundColor: Colors.white,
    marginRight: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelChartPoint: {
    fontSize: 14,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  labelChartText: {
    fontSize: 14,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.white,
  },
  notifContainer: {
    paddingHorizontal: 17,
    paddingVertical: 15,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: '90%',
  },
  notifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifText: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral100,
    fontSize: 14,
  },
  answerText: {
    fontSize: 13,
  },
  notifRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notifRow3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  notifBase: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.white,
  },
  notifKPText: {
    fontSize: 12,
    color: Colors.primary.base,
  },
  notifBarusaja: {
    fontSize: 12,
    color: Colors.dark.neutral80,
  },
});
