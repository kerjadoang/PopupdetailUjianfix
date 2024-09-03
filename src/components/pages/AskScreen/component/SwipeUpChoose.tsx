import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../style';
import Camera from '@assets/svg/ic_camera_blue.svg';
import Gallery from '@assets/svg/ic_gallery_blue.svg';

type Props = {
  action?: any;
  actionCamera?: any;
};
const SwipeUpChoose = ({action, actionCamera}: Props) => {
  return (
    <View style={{padding: 16}}>
      <Pressable style={styles.rowSwipe} onPress={actionCamera}>
        <Camera width={24} height={24} style={{marginRight: 5}} />
        <Text style={[styles.text, {fontSize: 14}]}>Ambil Dari Kamera</Text>
      </Pressable>
      <Pressable style={styles.rowSwipe} onPress={action}>
        <Gallery width={24} height={24} style={{marginRight: 5}} />
        <Text style={[styles.text, {fontSize: 14}]}>Ambil Dari Galeri</Text>
      </Pressable>
    </View>
  );
};

export default SwipeUpChoose;
