import React, {FC} from 'react';
import {PopUp, PopUpProps} from '../PopUp';
import RobotSedih from '@assets/svg/robot_sedih.svg';

const PopUpVideoNotReady: FC<PopUpProps> = props => {
  return (
    <PopUp
      {...props}
      Icon={props.Icon || RobotSedih}
      title={
        props.overrideTitle && props.title
          ? props.title
          : props?.type
          ? 'Gagal Menampilkan Materi'
          : 'Gagal Memutar Video'
      }
      desc={
        'Sedang ada proses optimalisai yang sedang berjalan, mohon tunggu sebentar.'
      }
      titleConfirm={'OK'}
      actionConfirm={props?.close}
    />
  );
};

export {PopUpVideoNotReady};
