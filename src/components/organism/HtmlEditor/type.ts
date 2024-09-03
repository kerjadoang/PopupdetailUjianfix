import {StyleProp, ViewStyle} from 'react-native';
import {RichEditorProps, RichToolbarProps} from 'react-native-pell-rich-editor';

export type EditorProps = {initialContent: string | any} & RichEditorProps;
export type ToolbarProps = {} & RichToolbarProps<any>;
export type HtmlEditorProps = {
  editorProps: EditorProps;
  toolbarProps?: ToolbarProps;
  hideToolbar?: boolean;
  isDisabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
  /**
   * Must return image url to show image in html editor
   */
  onPressAddImage?: () => Promise<AddImageProps>;
};

export interface AddImageProps {
  id?: string;
  imageName?: string;
  imageUrl: string;
  width?: number;
  height?: number;
}
