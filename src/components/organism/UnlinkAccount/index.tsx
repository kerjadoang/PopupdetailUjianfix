import {PopUp, PopUpProps, SwipeUp, SwipeUpProps} from '@components/atoms';
import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

import IconUnlink from '@assets/svg/ic_unlink.svg';
import Colors from '@constants/colors';

type UnlinkAccountProps = {
  type: keyof typeof content;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
} & SwipeUpProps &
  Omit<PopUpProps, 'type'>;

const content = {
  anak: {
    title: 'orang tua',
  },
  orangtua: {
    title: 'Anak',
  },
};

const UnlinkAccount: React.FC<UnlinkAccountProps> = props => {
  return (
    <>
      <SwipeUp {...props}>
        <Pressable
          onPress={() => props.setShow(true)}
          style={styles.containerSwipeUp}>
          <IconUnlink />
          <Text style={styles.titleSwipeUp}>
            Batal hubungkan akun {content[props.type].title}
          </Text>
        </Pressable>
        <PopUp {...props} />
      </SwipeUp>
    </>
  );
};

const styles = StyleSheet.create({
  containerSwipeUp: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  titleSwipeUp: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    fontSize: 16,
  },
});

export default UnlinkAccount;
