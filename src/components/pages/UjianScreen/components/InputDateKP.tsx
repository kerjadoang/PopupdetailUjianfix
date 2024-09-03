import {SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {IAllRombelClassResponse} from '@services/global/type';
import React from 'react';

import DateTimePicker from 'react-native-ui-datepicker';

type InputDateProps = {
  inputs?: IAllRombelClassResponse;
  selectedVal?: any;
  onSelect?: () => void;
  selectedOption?: Date;
} & SwipeUpProps;

const InputDateKP: React.FC<InputDateProps> = props => {
  return (
    <SwipeUp {...props}>
      <DateTimePicker
        mode="range"
        onChange={props.onSelect}
        headerButtonsPosition="right"
        headerButtonColor={Colors.primary.base}
      />
    </SwipeUp>
  );
};

export default InputDateKP;
