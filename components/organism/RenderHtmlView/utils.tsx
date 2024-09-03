import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  HTMLContentModel,
  HTMLElementModel,
  HTMLElementModelRecord,
  RenderersProps,
  domNodeToHTMLString,
  useInternalRenderer,
} from 'react-native-render-html';
import {
  CustomImageRenderersProps,
  CustomMathRenderersProps,
  CustomSubRenderersProps,
  CustomSupRenderersProps,
} from './type';
import ImageViewer from '@components/molecules/ImageViewer';
import styles from './styles';
import Colors from '@constants/colors';
import {useQuery} from '@tanstack/react-query';
import {apiPost} from '@api/wrapping';
import {MathJaxSvg} from 'react-native-mathjax-html-to-text-svg';
import {ActivityIndicator} from 'react-native-paper';
import {URL_PATH} from '@constants/url';
import RenderImage from '@components/atoms/RenderImage';

export const customRenderersProps: (
  props?: Partial<RenderersProps>,
) => Partial<RenderersProps> = (props?: Partial<RenderersProps>) => {
  return {
    props,
    ul: {
      markerBoxStyle: {
        paddingRight: 10,
        // top: WINDOW_HEIGHT * 0.06,
        // paddingTop:14,
        // alignSelf: 'center',
      },
    },
  };
};

export const customHTMLElementModels: (
  props?: HTMLElementModelRecord,
) => HTMLElementModelRecord = (props?: HTMLElementModelRecord) => {
  return {
    ...props,
    img: HTMLElementModel.fromCustomModel({
      tagName: 'img',
      contentModel: HTMLContentModel.mixed,
    }),
    math: HTMLElementModel.fromCustomModel({
      tagName: 'math',
      contentModel: HTMLContentModel.block,
    }),
    sup: HTMLElementModel.fromCustomModel({
      tagName: 'sup',
      contentModel: HTMLContentModel.textual,
    }),
    sub: HTMLElementModel.fromCustomModel({
      tagName: 'sub',
      contentModel: HTMLContentModel.textual,
    }),
    figure:
      props?.figure ??
      HTMLElementModel.fromCustomModel({
        tagName: 'figure',
        mixedUAStyles: {
          width: WINDOW_WIDTH - 32,
        },
        contentModel: HTMLContentModel.mixed,
      }),
    li:
      props?.li ??
      HTMLElementModel.fromCustomModel({
        tagName: 'li',
        mixedUAStyles: {
          borderRadius: 25,
          alignSelf: 'flex-start',
          paddingRight: 12,
        },
        contentModel: HTMLContentModel.textual,
      }),
    p:
      props?.p ??
      HTMLElementModel.fromCustomModel({
        tagName: 'p',
        mixedUAStyles: {
          paddingBottom: 6,
        },
        contentModel: HTMLContentModel.block,
      }),
    td:
      props?.td ??
      HTMLElementModel.fromCustomModel({
        tagName: 'td',
        mixedUAStyles: {
          borderWidth: 0.3,
          borderColor: Colors.black,
          flex: 1,
        },
        contentModel: HTMLContentModel.block,
      }),
    link:
      props?.link ??
      HTMLElementModel.fromCustomModel({
        tagName: 'link',
        mixedUAStyles: {
          flex: 1,
        },
        contentModel: HTMLContentModel.block,
      }),
  };
};

function extractWidthAndHeight(
  html: string,
): {width: number; height: number} | null {
  const regex = /<img[^>]*width="(\d+)"[^>]*height="(\d+)"[^>]*>/;
  const match = html.match(regex);

  if (match) {
    const width = Number(match[1] ?? 0);
    const height = Number(match[2] ?? 0);
    return {width, height};
  } else {
    return null;
  }
}

export const CustomImageRenderer = (props: CustomImageRenderersProps) => {
  const {rendererProps} = useInternalRenderer('img', props);
  const {
    tnode: {domNode},
  } = props;
  const html = React.useMemo(() => domNodeToHTMLString(domNode), [domNode]);
  const resExtractSize = extractWidthAndHeight(html);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onPress = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
  const uri = rendererProps.source.uri;
  const thumbnailSource = {
    ...rendererProps.source,
    uri: uri,
  };
  const maxWidth = WINDOW_WIDTH * 0.7;
  const maxHeight = 150;
  const imgWidth = Number(
    resExtractSize?.width && resExtractSize?.width <= maxWidth
      ? resExtractSize?.width
      : maxWidth,
  );

  const imgHeight =
    resExtractSize?.height && resExtractSize?.height <= maxHeight
      ? resExtractSize?.height
      : maxHeight;
  return (
    <View style={{flexDirection: 'row'}}>
      <RenderImage
        imageUrl={thumbnailSource?.uri}
        style={
          !props?.isImageTable
            ? [(styles.defaultImgTagStyle, props?.imgTagStyle)]
            : [props?.imgTableTagStyle]
        }
        containerStyle={{flexDirection: 'row'}}
        onPress={async () => {
          props?.onImagePress?.(uri);
          if (props?.disableImagePreview) {
            return;
          }
          onPress();
        }}
        width={imgWidth}
        height={imgHeight}
        placeholder={
          <View
            style={{width: imgWidth, height: imgHeight, borderRadius: 10}}
          />
        }
      />
      <ImageViewer
        visible={isModalOpen}
        onRequestClose={onModalClose}
        pathUrl={thumbnailSource?.uri}
      />
    </View>
  );
};

export const CustomSupRenderer = (props: CustomSupRenderersProps) => {
  const {
    tnode: {domNode},
  } = props;
  const html = React.useMemo(() => domNodeToHTMLString(domNode), [domNode]);

  return (
    <View style={{flexDirection: 'row'}}>
      <Text />
      <Text
        style={{
          fontSize: 8,
          textAlignVertical: 'top',
        }}>
        {html
          .replace(RegExp('(<sup)(.*?)(>)', 'g'), '')
          .replace(RegExp('(</sup)(.*?)(>)', 'g'), '')}
      </Text>
    </View>
  );
};

export const CustomSubRenderer = (props: CustomSubRenderersProps) => {
  const {
    tnode: {domNode},
  } = props;
  const html = React.useMemo(() => domNodeToHTMLString(domNode), [domNode]);

  return (
    <Text
      style={{
        fontSize: 8,
        textAlignVertical: 'bottom',
      }}>
      {html
        .replace(RegExp('(<sub)(.*?)(>)', 'g'), '')
        .replace(RegExp('(</sub)(.*?)(>)', 'g'), '')}
    </Text>
  );
};

export const MathJaxRenderer = (props: CustomMathRenderersProps) => {
  const {
    tnode: {domNode},
  } = props;
  const html = React.useMemo(() => domNodeToHTMLString(domNode), [domNode]);
  const {data: resMathTeX, isLoading} = useQuery({
    queryKey: ['MathJaxRenderer', html],
    queryFn: async () => {
      const resData = await apiPost({
        url: URL_PATH.get_mathml_to_latex,
        // config: {baseURL: 'https://staging-api.kelaspintar.dev'},
        body: {
          mathMl: html,
        },
      });
      return resData;
    },
  });

  return (
    <Pressable
      style={({pressed}) => ({opacity: pressed ? 0.4 : 1})}
      onPress={() => {
        props.onImagePress?.();
      }}>
      {isLoading ? (
        <ActivityIndicator color={Colors.primary.base} />
      ) : (
        !!resMathTeX?.latex && (
          <MathJaxSvg fontSize={16} color="#000000" fontCache={true}>
            {resMathTeX?.latex}
          </MathJaxSvg>
        )
      )}
    </Pressable>
  );
};
