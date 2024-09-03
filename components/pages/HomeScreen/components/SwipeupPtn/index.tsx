import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles';
import LogoPtn from '@assets/svg/ptn_blue.svg';
import {Button} from '@components/atoms';
import MaskotPtn from '@assets/svg/maskot_ptn.svg';

type Props = {
  class_id?: number;
  onBerlanggananPress: VoidCallBack;
};

const SwipeupPtn: FC<Props> = ({class_id, onBerlanggananPress}) => {
  if ((class_id || 0) < 10) {
    return (
      <View style={styles.forbiddenTestContainerStyle}>
        <LogoPtn
          width={100}
          height={50}
          style={styles.forbiddenTestIconContainerStyle}
        />
        <Text style={styles.forbiddenTestDescriptionTopStyle}>
          Tidak Dapat Mengakses PTN
        </Text>
        <Text style={styles.forbiddenTestDescriptionBottomStyle}>
          PTN hanya dapat diakses oleh Kelas 10, 11, 12.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.ptnUnSubsContainer}>
      <MaskotPtn width={100} height={100} />
      <Text style={styles.titleValidation}>Belum Berlangganan Paket PTN</Text>
      <Text style={styles.descValidation}>
        Fitur ini hanya dapat diakses oleh pengguna paket. Akses PTN dengan
        berlangganan.
      </Text>
      <View style={styles.btnSwipeContainer}>
        <Button label={'Berlangganan'} action={onBerlanggananPress} />
      </View>
    </View>
  );
};

export default SwipeupPtn;
