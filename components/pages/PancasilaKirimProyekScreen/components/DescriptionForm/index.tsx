import React, {FC} from 'react';
import {View, Text, TextInput, TextInputProps} from 'react-native';
import styles from './styles';

type InputNotesProps = {} & TextInputProps;

const InputNotes: React.FC<InputNotesProps> = props => {
  return (
    <View style={styles.inputContainer}>
      <TextInput multiline {...props} style={[props.style, styles.textInput]} />
    </View>
  );
};
type Props = {
  setText: (text: string) => void;
  valueText: string | undefined;
  placeholderText?: string | undefined;
};

const DescriptionForm: FC<Props> = ({setText, valueText, placeholderText}) => {
  return (
    <View>
      <Text style={styles.titleButton}>Deskripsi (Optional)</Text>
      <InputNotes
        onChangeText={e => setText(e)}
        value={valueText}
        placeholder={placeholderText || ''}
      />
    </View>
  );
};

export default DescriptionForm;
