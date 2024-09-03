import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useAuthController} from './useAuthController';
import RobotSad from '@assets/svg/robot_sedih.svg';
import {PopUpDialog} from '../PopUp/PopupDialog';

type Props = {};

const AuthController: FC<Props> = ({}) => {
  const {isShowPopupKickUser, kickUser} = useAuthController();
  return (
    <>
      <View style={styles.container}>{/* <Text>AuthController</Text> */}</View>
      <PopUpDialog
        show={isShowPopupKickUser}
        titleImageContent={
          <RobotSad width={120} height={120} style={{marginBottom: 12}} />
        }
        subtitle={'Kamu telah login di tempat lain'}
        styleSubtitle={styles.subTitleStyle}
        titleConfirm={'Tutup'}
        actionConfirm={kickUser}
      />
    </>
  );
};

export default AuthController;
