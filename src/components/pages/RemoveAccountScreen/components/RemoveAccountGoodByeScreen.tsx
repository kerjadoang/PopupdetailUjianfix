import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import useRemoveAccount from '../useRemoveAccount';
import {Button} from '@components/atoms';
import {styles} from '../styles';
import HappyRobot from '@assets/svg/robot_success.svg';

const RemoveAccountGoodByeScreen = () => {
  const {_handleGoodByeButton} = useRemoveAccount();

  const _renderGoodByeSection = () => {
    return (
      <View style={styles.goodByeContainer}>
        <HappyRobot width={100} height={100} />
        <View style={styles.goodByeCenter}>
          <Text style={styles.goodByeTitle}>Akunmu telah berhasil dihapus</Text>
          <Text style={styles.goodByeLabel}>
            Terima kasih telah mempercayai Kelas Pintar. Sukses selalu untuk
            kedepannya ya!
          </Text>
        </View>
        <Button
          label="Sampai Jumpa"
          style={styles.buttonGoodBye}
          action={_handleGoodByeButton}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {_renderGoodByeSection()}
      </ScrollView>
    </View>
  );
};

export {RemoveAccountGoodByeScreen};
