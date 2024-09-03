import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default class CTimer extends Component<any, Time> {
  myInterval: any;

  constructor(props: any) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    const {time, onChange, onFinished}: any = this.props;

    this.setState({
      hours: parseInt(time / 3600),
      minutes: parseInt((time % 3600) / 60),
      seconds: time % 60,
    });

    this.myInterval = setInterval(() => {
      const {hours, minutes, seconds} = this.state;

      if (seconds > 0) {
        this.setState(({seconds}) => ({
          seconds: seconds - 1,
        }));
        if (onChange) {
          onChange(seconds);
        }
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(this.myInterval);
            if (onFinished) {
              onFinished();
            }
          } else {
            this.setState(({hours}) => ({
              hours: hours - 1,
              minutes: 59,
              seconds: 59,
            }));
          }
        } else {
          this.setState(({minutes}) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  componentDidUpdate(prevProps: any) {
    const {stopTimer} = this.props;

    if (stopTimer !== prevProps.stopTimer) {
      if (stopTimer) {
        clearInterval(this.myInterval);
      }
    }
  }

  render() {
    const {
      color,
      type,
      size,
      bracket,
      containerStyle,
      fontType = 'Poppins-SemiBold',
    } = this.props;
    const {hours, minutes, seconds} = this.state;

    return (
      <View style={{...styles.containerTimer, ...containerStyle}}>
        {bracket && (
          <Text
            style={{
              ...styles.timerText,
              color: color,
              fontSize: size,
              fontFamily: fontType,
            }}>
            {'('}
          </Text>
        )}

        {type?.hours && (
          <Text
            style={{
              ...styles.timerText,
              color: color,
              fontSize: size,
              fontFamily: fontType,
            }}>
            {hours < 10 ? `0${hours}` : hours}
            {':'}
          </Text>
        )}

        {type?.minutes && (
          <Text
            style={{
              ...styles.timerText,
              color: color,
              fontSize: size,
              fontFamily: fontType,
            }}>
            {minutes < 10 ? `0${minutes}` : minutes}
            {':'}
          </Text>
        )}

        {type?.seconds && (
          <Text
            style={{
              ...styles.timerText,
              color: color,
              fontSize: size,
              fontFamily: fontType,
            }}>
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        )}

        {bracket && (
          <Text
            style={{
              ...styles.timerText,
              color: color,
              fontSize: size,
              fontFamily: fontType,
            }}>
            {')'}
          </Text>
        )}
      </View>
    );
  }
}
