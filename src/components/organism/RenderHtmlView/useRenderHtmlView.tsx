import {isStringContains, parseHtml} from '@constants/functional';
import {RenderHtmlViewProps} from '.';
import {
  CustomRendererProps,
  CustomTagRendererRecord,
  HTMLSource,
} from 'react-native-render-html';
import {
  CustomImageRenderer,
  CustomSubRenderer,
  CustomSupRenderer,
  MathJaxRenderer,
} from './utils';
import {
  CustomImageRenderersProps,
  CustomMathRenderersProps,
  CustomSubRenderersProps,
  CustomSupRenderersProps,
} from './type';

export const useRenderHtmlView = (props: RenderHtmlViewProps) => {
  const sourceHtml = (props.source as any).html;
  const isContainParseHtml = isStringContains(sourceHtml, 'parsehtml');
  const source: HTMLSource = {
    ...props.source,
    html: isContainParseHtml ? sourceHtml : parseHtml(sourceHtml),
  };
  const isImageTable = isStringContains(source.html, 'image-in-table');
  const customRenderers: CustomTagRendererRecord = {
    math: (mathProps: CustomRendererProps<CustomImageRenderersProps>) => {
      const resMathProps: CustomMathRenderersProps = {
        ...mathProps,
        ...props,
      };
      return MathJaxRenderer(resMathProps);
    },
    sup: (supProps: CustomRendererProps<CustomSupRenderersProps>) => {
      const resSupProps: CustomSupRenderersProps = {
        ...supProps,
        ...props,
      };
      return CustomSupRenderer(resSupProps);
    },
    sub: (subProps: CustomRendererProps<CustomSubRenderersProps>) => {
      const resSubProps: CustomSubRenderersProps = {
        ...subProps,
        ...props,
      };
      return CustomSubRenderer(resSubProps);
    },
    img: (imgProps: CustomRendererProps<CustomImageRenderersProps>) => {
      const resImgProps: CustomImageRenderersProps = {
        ...imgProps,
        ...props,
        isImageTable,
      };
      return (
        props?.customImgTagRender?.(resImgProps) ||
        CustomImageRenderer(resImgProps)
      );
    },
  };

  return {
    source,
    customRenderers,
  };
};
