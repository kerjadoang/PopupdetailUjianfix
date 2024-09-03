/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect} from 'react';
import {Image, View} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {styles} from './style';
import {Button} from '@components/atoms';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setGiftBoxOpen: (value: boolean) => void;
};

const PopUp: FC<Props> = ({visible, setVisible, setGiftBoxOpen}) => {
  const {reward} = useSelector(state => state);

  useEffect(() => {
    if (reward?.error) {
      setVisible(false);
      setGiftBoxOpen(true);
    }
  }, [reward, setGiftBoxOpen, setVisible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.container}>
        <Image
          source={require('@assets/images/daily_check_in_dci_open.png')}
          style={{width: 184, height: 212}}
        />

        <Text style={styles.title}>Hore! Kamu dapat</Text>

        <View style={styles.coinContainer}>
          <Image
            source={require('@assets/images/koin.png')}
            style={{width: 24, height: 24}}
          />

          <Text style={styles.coinContainer__text}>
            {reward?.data?.reward} Koin
          </Text>
        </View>

        <View style={styles.button}>
          <Button
            label="Klaim Hadiah"
            action={() => {
              setVisible(false);
              setGiftBoxOpen(true);
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export {PopUp};
