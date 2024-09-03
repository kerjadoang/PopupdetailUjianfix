import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Button} from '@components/atoms';

type Props = {
  onKembali: () => void;
  onKirim: () => void;
  name: string;
};

const SubmitForm: FC<Props> = ({onKembali, onKirim, name}) => {
  return (
    <View style={[styles.buttonContainer, {justifyContent: 'space-around'}]}>
      <Button
        label="Kembali"
        action={onKembali}
        style={{width: '48%'}}
        outline={true}
      />
      <Button label={name} action={onKirim} style={{width: '48%'}} />
    </View>
  );
};

export default SubmitForm;
