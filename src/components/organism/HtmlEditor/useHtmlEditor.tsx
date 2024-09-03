import {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';
import {AddImageProps, HtmlEditorProps} from './type';
export const useHtmlEditor = (props: HtmlEditorProps, ref: any) => {
  const richTextRef: any = useRef<RichEditor>();
  const scrollViewRef: any = useRef<ScrollView>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contentRef: any = ref || useRef();
  const [editorAttached, setEditorAttached] = useState(false);

  let handleCursorPosition = useCallback((scrollY: any) => {
    // Positioning scroll bar
    scrollViewRef?.current?.scrollTo({y: scrollY - 30, animated: true});
  }, []);

  const generateImageTag = useCallback((props: AddImageProps) => {
    return `
    <div style="margin-left:12;"> 
      <img src="${props.imageUrl}" 
        alt="" 
        width="${props.width || 100}px" 
        height="${props.height || 100}px" 
      />
    </div>
    `;
  }, []);

  const onPressAddImage = useCallback(async () => {
    const imageUrl = await props.onPressAddImage?.();
    if (!imageUrl?.imageUrl) {
      return;
    }
    richTextRef?.current?.insertHTML('<br/>');
    richTextRef?.current?.insertHTML(generateImageTag(imageUrl));
    richTextRef?.current?.insertHTML('<br/>');
  }, []);

  useEffect(() => {
    contentRef.current = props.editorProps?.initialContent;
    return () => {};
  }, [props.editorProps?.initialContent]);

  // editor change data
  const handleChange = useCallback((html: string) => {
    // save html to content ref;
    contentRef.current = html;
    props.onChange?.(html);
  }, []);

  const editorInitializedCallback = useCallback(() => {
    setEditorAttached(true);
  }, []);

  return {
    richTextRef,
    scrollViewRef,
    editorAttached,
    handleCursorPosition,
    onPressAddImage,
    handleChange,
    editorInitializedCallback,
  };
};
