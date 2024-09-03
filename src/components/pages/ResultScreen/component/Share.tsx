/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import CopyLink from '@assets/svg/copy_link.svg';
import InvFriend from '@assets/svg/inv_friend.svg';
import ShareResult from '@assets/svg/share_result.svg';
import {StyleSheet} from 'react-native';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {Pressable} from 'react-native';

type Props = {
  invite: () => void;
  copy: () => void;
  share: () => void;
};

const Share = ({invite, copy, share}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bagikan Kuis</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Pressable onPress={copy}>
          <CopyLink width={30} height={30} style={styles.icon} />
          <Text style={styles.item}>Copy Link</Text>
        </Pressable>
        <Pressable onPress={share}>
          <ShareResult width={30} height={30} style={styles.icon} />
          <Text style={styles.item}>Bagikan Hasil</Text>
        </Pressable>
        <Pressable onPress={invite}>
          <InvFriend width={30} height={30} style={styles.icon} />
          <Text style={styles.item}>Undang Teman</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    padding: 16,
    height: 150,
  },
  item: {
    fontFamily: Fonts.RegularPoppins,
  },
  icon: {
    alignSelf: 'center',
  },
});
export default Share;
