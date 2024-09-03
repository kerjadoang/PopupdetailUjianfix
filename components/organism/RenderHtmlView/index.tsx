import React, {FC, ReactElement} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import styles from './styles';
import RenderHTML, {
  CustomRendererProps,
  RenderHTMLProps,
  RenderHTMLSourceProps,
} from 'react-native-render-html';
import {customHTMLElementModels, customRenderersProps} from './utils';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {useRenderHtmlView} from './useRenderHtmlView';
import {isDeepEqual} from '@constants/functional';

const propsAreEqual = (
  prevProps: RenderHtmlViewProps,
  nextProps: RenderHtmlViewProps,
) => isDeepEqual(prevProps.source, nextProps.source);

export type RenderHtmlViewProps = {
  parentContainerStyle?: StyleProp<ViewStyle>;
  imgTagStyle?: StyleProp<ViewStyle>;
  imgTableTagStyle?: StyleProp<ViewStyle>;
  disableImagePreview?: boolean;
  onImagePress?: CallBackWithParams<void, any>;
  customImgTagRender?: CallBackWithParams<
    ReactElement,
    CustomRendererProps<any>
  >;
} & RenderHTMLSourceProps &
  RenderHTMLProps;

const RenderHtmlView: FC<RenderHtmlViewProps> = React.memo(
  (props: RenderHtmlViewProps) => {
    const {source, customRenderers} = useRenderHtmlView(props);

    return (
      <View style={[styles.container, props.parentContainerStyle]}>
        <RenderHTML
          enableExperimentalBRCollapsing
          source={source}
          contentWidth={props.contentWidth || WINDOW_WIDTH}
          renderers={props?.renderers || customRenderers}
          renderersProps={customRenderersProps(props.renderersProps)}
          customHTMLElementModels={customHTMLElementModels(
            props.customHTMLElementModels,
          )}
        />
      </View>
    );
  },
  propsAreEqual,
);

export default RenderHtmlView;
