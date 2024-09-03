import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {CoachmarkContentProps} from './types';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

const DotIndicator = (props: any) => {
  return (
    <View style={{marginTop: 12, flexDirection: 'row', gap: 4}}>
      {Array(props.totalCoachmark)
        .fill(0)
        .map((_, index) => (
          <View
            key={`${index}`}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                index + 1 === props.queue
                  ? Colors.primary.base
                  : Colors.dark.neutral40,
            }}
          />
        ))}
    </View>
  );
};

const renderNextText = (param: any): string => {
  return param.totalCoachmark === param.queue ? 'Selesai' : 'Lanjutkan';
};

export default class CoachmarkContent extends Component<CoachmarkContentProps> {
  static defaultProps: Pick<CoachmarkContentProps, 'buttonNextText'> = {
    buttonNextText: 'OK',
  };

  render() {
    const {
      title,
      message,
      onNext,
      buttonSkipText,
      onSkip,
      totalCoachmark,
      queue,
      buttonFinishText,
    } = this.props;

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('@assets/images/coachmark.gif')}
        />
        <View style={styles.message}>
          <Text style={[styles.messageText, styles.title]}>{title}</Text>
          <Text style={styles.messageText}>{message}</Text>
          {totalCoachmark && <DotIndicator {...this.props} />}
          <View
            style={[
              styles.viewButton,
              totalCoachmark === queue ? styles.alignEnd : null,
            ]}>
            {buttonSkipText && queue !== totalCoachmark ? (
              <TouchableOpacity onPress={onSkip}>
                <Text style={styles.buttonText}>{buttonSkipText}</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.continue} onPress={onNext}>
              <Text style={[styles.buttonText, styles.continueText]}>
                {buttonFinishText !== ''
                  ? buttonFinishText
                  : renderNextText(this.props)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginHorizontal: 16,
    backgroundColor: '#FFF',
    maxWidth: 300,
    position: 'relative',
    marginLeft: 90,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
  },
  message: {maxWidth: '90%'},
  image: {
    width: 95,
    height: 118,
    resizeMode: 'contain',
    marginLeft: -80,
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  continue: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: Colors.primary.base,
    borderRadius: 20,
  },
  continueText: {
    color: 'white',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  messageText: {
    lineHeight: 22,
    letterSpacing: -0.15,
    fontSize: 14,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.black,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(246,246,246)',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgb(7, 112, 205)',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  alignEnd: {
    justifyContent: 'flex-end',
  },
});
