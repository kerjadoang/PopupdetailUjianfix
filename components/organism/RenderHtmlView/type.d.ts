import {RenderHtmlViewProps} from '.';
import {TBlock} from 'react-native-render-html';

type CustomImageRenderersProps = Omit<
  RenderHtmlViewProps,
  'RenderHTMLSourceProps' | RenderHTMLProps
> &
  CustomRendererProps<TBlock>;
type CustomMathRenderersProps = Omit<
  RenderHtmlViewProps,
  'RenderHTMLSourceProps' | RenderHTMLProps
> &
  CustomRendererProps<TBlock>;
type CustomSupRenderersProps = Omit<
  RenderHtmlViewProps,
  'RenderHTMLSourceProps' | RenderHTMLProps
> &
  CustomRendererProps<TBlock>;
type CustomSubRenderersProps = Omit<
  RenderHtmlViewProps,
  'RenderHTMLSourceProps' | RenderHTMLProps
> &
  CustomRendererProps<TBlock>;
