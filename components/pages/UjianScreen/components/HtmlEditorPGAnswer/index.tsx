import React, {FC, useRef} from 'react';
import {
  View,
  Text,
  TextInputProps,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {CCheckBox, MainView, UploaderProps} from '@components/atoms';
import RemoveIcon from '@assets/svg/ic24_x_round.svg';
import HtmlEditor from '@components/organism/HtmlEditor';
import {AddImageProps} from '@components/organism/HtmlEditor/type';

type HtmlEditorPGAnswerProps = {
  isKompleks?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  errorLabel?: string;
  label?: string;
  labelPrefix?: string;
  isChecked?: boolean;
  onRemoveInput?: TouchableOpacityProps['onPress'];
  onPressAddImage?: () => Promise<AddImageProps>;
  onPressCheck?: () => void | any;
} & TextInputProps &
  UploaderProps;

const HtmlEditorPGAnswer: FC<HtmlEditorPGAnswerProps> = (
  props: HtmlEditorPGAnswerProps,
) => {
  const contentRef = useRef();
  return (
    <>
      <View
        style={[
          styles.container,
          props.containerStyle,
          !!props.errorLabel && styles.error,
        ]}>
        <View style={styles.mainContainer}>
          <MainView flexDirection="row">
            <MainView flexDirection="row" flex={1}>
              {props.isKompleks ? (
                <CCheckBox
                  isChecked={props.isChecked || false}
                  customStyle={{marginRight: 10, marginTop: 2}}
                  onPressCheck={props.onPressCheck}
                />
              ) : null}
              <Text style={styles.labelPrefix}>{props.labelPrefix}.</Text>
            </MainView>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={props.onRemoveInput}>
              <RemoveIcon />
            </TouchableOpacity>
          </MainView>
          <MainView flexDirection="row" flex={1}>
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
              containerStyle={styles.htmlContainer}
              onChange={(text: any) => {
                return props.onChangeText?.(text);
              }}
            />
          </MainView>
        </View>
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

export default React.memo(HtmlEditorPGAnswer);
