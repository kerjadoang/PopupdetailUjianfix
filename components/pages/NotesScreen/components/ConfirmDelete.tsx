import {PopUp, PopUpProps} from '@components/atoms';
import React from 'react';
import Maskot11 from '@assets/svg/maskot_11.svg';

type ConfirmDeleteProps = {} & PopUpProps;

const ConfirmDelete: React.FC<ConfirmDeleteProps> = props => {
  return (
    <PopUp
      titleConfirm="Batal"
      titleCancel="Hapus"
      title="Hapus catatan ini?"
      Icon={Maskot11}
      {...props}
    />
  );
};

export default ConfirmDelete;
