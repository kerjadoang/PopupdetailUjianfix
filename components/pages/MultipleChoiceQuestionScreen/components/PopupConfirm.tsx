import {PopUp, PopUpProps} from '@components/atoms';
import React from 'react';
import RobotBack from '@assets/svg/maskot_3.svg';
import RobotDone from '@assets/svg/maskot_8.svg';

type PopupConfirmProps = {
  type?: 'back' | 'done';
  totalAnsweredQuestion?: number;
  totalQuestion?: number;
  serviceTitle?: string;
} & PopUpProps;

const PopupConfirm: React.FC<PopupConfirmProps> = props => {
  const isDone = props.type === 'done';
  const isDoneAll =
    (props.totalQuestion ?? 0) - (props.totalAnsweredQuestion ?? 0) === 0;

  const content = {
    title: isDone || isDoneAll ? 'Siap Dikumpulkan!' : 'Belum Selesai!',
    desc:
      isDone || isDoneAll
        ? `Keren! Kamu berhasil menjawab ${
            props.totalAnsweredQuestion ?? 0
          } dari ${props.totalQuestion ?? 0} latihan ${
            props.serviceTitle ?? ''
          }.`
        : 'Apakah kamu yakin untuk keluar? Progresmu tidak akan tersimpan.',
    Icon: isDone || isDoneAll ? RobotDone : RobotBack,
    titleCancel: isDone ? 'Periksa Ulang' : 'Keluar',
    titleConfirm: isDone ? 'Kumpulkan' : 'Lanjut',
  };

  return (
    <PopUp
      {...content}
      {...props}
      actionCancel={isDone ? props.close : props.actionCancel}
      actionConfirm={isDone ? props.actionConfirm : props.close}
    />
  );
};

export default React.memo(PopupConfirm);
