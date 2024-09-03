import React, {LegacyRef, forwardRef} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {richEditorAction} from '@constants/functional';
import Colors from '@constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {useHtmlEditor} from './useHtmlEditor';
import {HtmlEditorProps} from './type';

const HtmlEditor = forwardRef((props: HtmlEditorProps, ref: LegacyRef<any>) => {
  const {
    richTextRef,
    scrollViewRef,
    editorAttached,
    handleCursorPosition,
    onPressAddImage,
    handleChange,
    editorInitializedCallback,
  } = useHtmlEditor(props, ref);
  return (
    <View style={[styles.container, props.containerStyle]}>
      {!props.hideToolbar && !props.isDisabled && editorAttached && (
        <RichToolbar
          {...props.toolbarProps}
          selectedIconTint={Colors.primary.base}
          iconTint={Colors.black}
          editor={richTextRef}
          onPressAddImage={onPressAddImage}
          actions={props.toolbarProps?.actions || richEditorAction()}
        />
      )}
      <ScrollView
        keyboardDismissMode={'none'}
        ref={scrollViewRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}>
        <RichEditor
          {...props.editorProps}
          initialContentHTML={props.editorProps.initialContent}
          disabled={props.isDisabled}
          ref={richTextRef}
          nestedScrollEnabled
          onChange={handleChange}
          onCursorPosition={handleCursorPosition}
          pasteAsPlainText={true}
          useContainer={true}
          editorInitializedCallback={editorInitializedCallback}
          scrollEnabled={true}
        />
      </ScrollView>
    </View>
  );
});

export default React.memo(HtmlEditor);
