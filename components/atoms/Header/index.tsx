import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './style';
import BlueArrowLeft from '@assets/svg/blueArrowLeft.svg';
import {NavigationContext} from '@react-navigation/native';
import Colors from '@constants/colors';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {MainView} from '../MainComponent';

type Props = {
  label?: string;
  labelContent?: React.ReactNode;
  subLabel?: string | boolean | any;
  styleLabel?: StyleProp<TextStyle>;
  styleSubLabel?: StyleProp<TextStyle>;
  iconLeft?: any;
  styleIconLeft?: any;
  onPressIconLeft?: () => void;
  iconRight?: any;
  styleIconRight?: any;
  styleContainer?: StyleProp<ViewStyle>;
  onPressIconRight?: () => void;
  paddingHorizontal?: number;
  colorLabel?: any;
  subLabelContent?: React.ReactNode;
  backgroundColor?: string;
  withoutBackButton?: boolean;
  showBackdrop?: boolean;
};

const Header = ({
  label,
  subLabel,
  styleLabel,
  styleSubLabel,
  iconLeft,
  styleIconLeft,
  onPressIconLeft,
  iconRight,
  styleIconRight,
  styleContainer,
  onPressIconRight,
  paddingHorizontal = 16,
  subLabelContent,
  labelContent,
  colorLabel = Colors.dark.neutral100,
  backgroundColor = Colors.white,
  withoutBackButton = false,
  showBackdrop = false,
}: Props) => {
  const navigation: any = React.useContext(NavigationContext);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: paddingHorizontal,
        backgroundColor: backgroundColor,
      }}>
      <View style={[styles.container, styleContainer]}>
        <TouchableOpacity
          hitSlop={{bottom: 2, left: 2, right: 2, top: 2}}
          style={[styles.iconLeft, styleIconLeft]}
          onPress={
            onPressIconLeft
              ? onPressIconLeft
              : () => {
                  navigation.pop();
                }
          }>
          {!withoutBackButton ? (
            iconLeft ? (
              iconLeft
            ) : (
              <BlueArrowLeft width={18} height={18} style={styleIconLeft} />
            )
          ) : null}
        </TouchableOpacity>

        <View style={styles.labelContainer}>
          {label || labelContent ? (
            <>
              {label && (
                <Text
                  allowFontScaling={false}
                  numberOfLines={2}
                  style={[
                    styles.label,
                    {
                      color: colorLabel,
                      width: !iconRight ? '80%' : '60%',
                    },
                    styleLabel,
                  ]}>
                  {label}
                </Text>
              )}
              {labelContent}
              {subLabel ? (
                <Text
                  allowFontScaling={false}
                  numberOfLines={2}
                  style={[
                    styles.subLabel,
                    {
                      color: colorLabel,
                      width: !iconRight ? '80%' : '60%',
                    },
                    styleSubLabel,
                  ]}>
                  {subLabel}
                </Text>
              ) : null}
              {subLabelContent}
            </>
          ) : null}
        </View>

        {iconRight && onPressIconRight ? (
          <TouchableOpacity
            style={[styleIconRight, styles.iconRight]}
            onPress={onPressIconRight}>
            {iconRight}
          </TouchableOpacity>
        ) : null}
      </View>
      {showBackdrop && (
        <MainView
          position="absolute"
          backgroundColor={Colors.backdrop}
          opacity={0.1}
          width={WINDOW_WIDTH}
          height={70}
        />
      )}
    </SafeAreaView>
  );
};

export {Header};
