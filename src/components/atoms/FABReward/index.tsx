import Colors from '@constants/colors';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Pressable, View, Animated} from 'react-native';
import Reward from '@assets/svg/ic_hadiah.svg';
import IcChevronRight from '@assets/svg/ic_arrow_right_blue.svg';
import IcChevronLeft from '@assets/svg/ic24_chevron_left_blue.svg';

type Props = {
  onPress: (event: any) => void;
};

const FABReward = ({onPress}: Props) => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const runAnimationOnClick = () => {
    Animated.timing(animationValue, {
      toValue: isHide ? 0 : 60,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animationValue.addListener(() => {
      return;
    });
  }, []);

  return (
    <View style={styles.button}>
      <Animated.View style={{transform: [{translateX: animationValue}]}}>
        <Pressable
          onPress={onPress}
          style={({pressed}) => {
            return {
              opacity: pressed ? 0.5 : 1,
            };
          }}>
          <Reward width={100} height={91} />
        </Pressable>
      </Animated.View>
      <Pressable
        onPress={() => {
          runAnimationOnClick();
          return setIsHide(!isHide);
        }}
        style={({pressed}) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <View style={styles.arrowButton}>
          {isHide ? (
            <IcChevronLeft width={18} />
          ) : (
            <IcChevronRight width={18} />
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
  button: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 5,
    // paddingHorizontal: 16,
    // paddingVertical: 6,
    // alignSelf: 'flex-start',
    borderRadius: 10,
  },
  arrowButton: {
    elevation: 4,
    right: 6,
    top: 18,
    position: 'absolute',
    zIndex: 1,
    height: 22,
    width: 22,
    backgroundColor: Colors.white,
    borderRadius: 22 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  textBtn: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
});

export {FABReward};
