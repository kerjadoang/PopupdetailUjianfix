import React, {Component} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  ViewStyle,
} from 'react-native';

import CoachmarkView from './CoachmarkView';
import {CoachmarkProps, CoachmarkPosition} from './types';
import Colors from '@constants/colors';
const height = Dimensions.get('screen').height;
/**
 * Coachmark Overlay
 * source code lib from react-native-coachmark -> Writtent by Jacky Wijaya at Traveloka
 *
 * Customize by orbit team
 * @see {@link https://docs.google.com/spreadsheets/d/1MQC8msubjF5GprDiLN2n2cRSbrZYG3u2wksGJW5UrlY/edit?usp=sharing} for more usage information
 */

interface CoachmarkState {
  visible: boolean;
  childStyle: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  position?: CoachmarkPosition;
}

export default class CoachmarkLib extends Component<
  CoachmarkProps,
  CoachmarkState
> {
  static defaultProps: CoachmarkProps = {
    childrenStyle: {},
    autoShow: false,
    onHide: () => {},
    onShow: () => {},
    isAnchorReady: true,
    message: '',
    title: '',
    leadingIcon: false,
    buttonSkipText: 'Skip',
    // buttonPrevText: '',
    onSkip: () => {},
    onNext: () => {},
    onPrevious: () => {},
    isHideSkipButton: false,
    isShowPreviousButton: false,
    arrowOffset: 0,
    arrowMiddle: false,
    buttonSkipOffset: 0,
    buttonNextOffset: 0,
    buttonPreviousOffset: 0,
    buttonOnContent: false,
    isVisible: true,
    totalCoachmark: 1,
    queue: 1,
    buttonFinishText: '',
    backgroundColor: '',
    marginBottomContent: 0,
    maxWidth: 0,
    maxHeight: 0,
  };

  view = React.createRef<View>();
  interval?: ReturnType<typeof setInterval>;

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      childStyle: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
    };
  }

  show = () => {
    return new Promise<Promise<void>>(resolve => {
      this.interval = setInterval(() => {
        this._isInViewPort().then(isInViewPort => {
          if (isInViewPort) {
            this._stopWatching();
            resolve(this._handleShow());
          }
        });
      }, 100);
    });
  };

  hide = () => {
    return this._handleHide();
  };

  _isInViewPort = () => {
    return new Promise(resolve => {
      if (!this.props.isAnchorReady || !this.view || !this.view.current) {
        return resolve(false);
      }
      this.view.current.measure((x, y, width, height, pageX, pageY) => {
        const windowHeight = Dimensions.get('window').height;
        const windowWidth = Dimensions.get('window').width;
        const rectBottom = pageY + height;
        const rectTop = pageY;
        const rectLeft = x;
        const rectRight = x + width;
        const isInViewPort =
          rectBottom <= windowHeight &&
          rectTop >= 0 &&
          rectLeft >= 0 &&
          rectRight <= windowWidth;
        if (isInViewPort) {
          this.setState({
            childStyle: {
              top: pageY,
              left: pageX,
              width,
              height,
            },
            position:
              pageY > Dimensions.get('window').height - (pageY + height)
                ? CoachmarkPosition.BOTTOM
                : CoachmarkPosition.TOP,
          });
        }
        resolve(isInViewPort);
      });
    });
  };

  _handleShow = () => {
    this.props.onShow!();
    this.setState({
      visible: true,
    });
    return new Promise<void>(resolve => {
      this.interval = setInterval(() => {
        if (!this.state.visible) {
          this._stopWatching();
          resolve();
        }
      }, 16);
    });
  };

  _handleHide = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.props.onHide!();
      },
    );
  };

  _stopWatching = () => {
    clearInterval(this.interval!);
    this.interval = undefined;
  };

  _measureLayout = () => {
    if (this.props.autoShow) {
      this.show();
    }
  };

  _renderChildren = () => {
    const {children, top = -0.032, backgroundColor = '', maxWidth} = this.props;
    const {childStyle} = this.state;

    const marginTop = Platform.OS === 'android' ? height * top : 0;
    const childrenStyles: ViewStyle = StyleSheet.flatten(
      this.props.childrenStyle,
    );
    const isHaveChildrenStyles = Object.keys(childrenStyles)?.length !== 0;
    return (
      <View
        style={[
          backgroundColor !== '' ? {backgroundColor: backgroundColor} : null,
          {
            ...styles.child,
            marginTop: marginTop,
            ...childStyle,
            ...styles.zeroSpacing,
          },
        ]}>
        <View
          style={[
            isHaveChildrenStyles ? styles.border : null,
            {
              borderRadius: childrenStyles?.borderRadius || 0,
            },
            isHaveChildrenStyles && maxWidth !== 0
              ? {
                  width: maxWidth,
                }
              : null,
          ]}>
          {children}
        </View>
      </View>
    );
  };

  _renderCoachmark = () => {
    const {
      renderArrow,
      title,
      message,
      leadingIcon,
      arrowOffset,
      arrowMiddle,
      buttonOnContent,
      buttonNextText,
      buttonPrevText,
      buttonSkipText,
      buttonFinishText,

      //adds on
      queue,
      totalCoachmark,
      marginBottomContent,
    } = this.props;
    const {position, childStyle} = this.state;

    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          ...(position === CoachmarkPosition.TOP
            ? {
                top:
                  childStyle.top +
                  childStyle.height -
                  (height / 10) * (Platform.OS == 'android' ? 0.2 : -0.1),
              }
            : {
                bottom:
                  Dimensions.get('screen').height -
                  childStyle.top -
                  (height / 10) * (Platform.OS == 'android' ? 0.4 : -0.1),
              }),
          marginBottom: marginBottomContent,
        }}>
        <CoachmarkView
          // x={childStyle.left + childStyle.width / 2}
          x={
            arrowMiddle
              ? Dimensions.get('screen').width / 2
              : childStyle.left + childStyle.width / 2 - 24
          }
          position={position}
          message={message!}
          renderArrow={renderArrow}
          title={title}
          leadingIcon={leadingIcon}
          onNext={() => this._handleOnNext()}
          onPrev={() => this._handleOnPrev()}
          onSkip={() => this._handleOnSkip()}
          buttonNextText={buttonNextText}
          buttonPrevText={buttonPrevText}
          buttonSkipText={buttonSkipText}
          buttonFinishText={buttonFinishText}
          arrowOffset={arrowOffset}
          buttonOnContent={buttonOnContent}
          queue={queue}
          totalCoachmark={totalCoachmark}
          // handleHide={this.hide}
          // isHideSkipButton={this.props.isHideSkipButton}
        />
      </View>
    );
  };

  _handleOnPrev = () => {
    if (this.props.onPrevious) {
      this.props.onPrevious();
    }
    this.hide();
  };

  _handleOnNext = () => {
    if (this.props.onNext) {
      this.props.onNext();
    }
    this.hide();
  };

  _handleOnSkip = () => {
    if (this.props.onSkip) {
      this.props.onSkip();
    }
    this.hide();
  };

  render() {
    const {
      contentContainerStyle,
      accessibilityLabel,
      testID,
      children,
      isVisible,
      buttonOnContent,
    } = this.props;

    const {visible, position} = this.state;

    return (
      <React.Fragment>
        <View
          ref={this.view}
          style={contentContainerStyle}
          onLayout={this._measureLayout}>
          {React.Children.only(children)}
        </View>
        {isVisible && (
          <>
            <Modal animationType="fade" transparent visible={visible}>
              <View style={styles.backdrop} />
              {position === 'bottom' ? (
                <React.Fragment>
                  {this._renderCoachmark()}
                  {this._renderChildren()}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this._renderChildren()}
                  {this._renderCoachmark()}
                </React.Fragment>
              )}

              {!buttonOnContent && (
                <TouchableWithoutFeedback
                  accessibilityLabel={accessibilityLabel}
                  testID={testID}>
                  <View style={StyleSheet.absoluteFill} />
                </TouchableWithoutFeedback>
              )}
            </Modal>
          </>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.backgroundColorModal,
  },
  child: {
    position: 'absolute',
  },
  border: {
    borderWidth: 4,
    borderColor: Colors.yellow,
  },
  zeroSpacing: {marginBottom: 0, marginLeft: 0, marginRight: 0, padding: 0},
});
