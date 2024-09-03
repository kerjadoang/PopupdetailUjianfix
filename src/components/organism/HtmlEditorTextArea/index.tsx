import React, {useRef} from 'react';
import {StyleProp, Text, TextInputProps, ViewStyle} from 'react-native';
import {View} from 'react-native';
import {styles} from './styles';
import HtmlEditor from '../HtmlEditor';
import {AddImageProps} from '../HtmlEditor/type';

type HtmlEditorTextAreaProps = {
  containerStyle?: StyleProp<ViewStyle>;
  errorLabel?: string;
  label?: string;
  onPressAddImage?: () => Promise<AddImageProps>;
} & TextInputProps;

const HtmlEditorTextArea: React.FC<HtmlEditorTextAreaProps> = props => {
  const contentRef = useRef<any>();
  return (
    <>
      <View
        style={[
          styles.container,
          props.containerStyle,
          !!props.errorLabel && styles.error,
        ]}>
        <HtmlEditor
          ref={contentRef}
          editorProps={{
            initialContent: props.value,
            editorStyle: styles.editorContainer,
            placeholder: props.placeholder,
          }}
          toolbarProps={{
            style: styles.editorContainer,
          }}
          onPressAddImage={props.onPressAddImage}
          containerStyle={styles.containerStyle}
          onChange={(text: string) => {
            return props.onChangeText?.(text);
          }}
        />
      </View>
      {(props.errorLabel || props.label) && (
        <View>
          {props.errorLabel && (
            <Text style={styles.errorLabel}>{props.errorLabel}</Text>
          )}
          {props.label && <Text style={styles.label}>{props.label}</Text>}
        </View>
      )}
    </>
  );
};

export {HtmlEditorTextArea};
