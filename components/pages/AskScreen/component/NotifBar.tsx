import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from '../style';
import Ic_notif from '@assets/svg/ic_notif_tanya.svg';
import WhiteRightIcon from '@assets/svg/right.svg';
type Props = {
  action?: any;
  dataNotif: any;
};
const NotifBar = ({action, dataNotif}: Props) => {
  return (
    <Pressable style={styles.notif} onPress={action}>
      <View style={styles.bgNotif}>
        <Ic_notif width={20} height={20} />
      </View>
      <View style={styles.notifContent}>
        <Text style={styles.textNotif}>{dataNotif}</Text>
        <View style={styles.notifJawaban}>
          <Text style={[styles.textNotif, {fontFamily: 'Poppins-Regular'}]}>
            Lihat Jawaban
          </Text>
          <WhiteRightIcon width={16} />
        </View>
      </View>
    </Pressable>
  );
};

export {NotifBar};
