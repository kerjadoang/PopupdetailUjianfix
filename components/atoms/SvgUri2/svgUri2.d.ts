import {UriProps} from 'react-native-svg';
export type SvgAdditionalProps = {
  onLoadStart?: () => void;
  onError?: (error: Error) => void;
  override?: Object;
  onLoad?: () => void;
};

export type SvgUri2Props = {} & UriProps & SvgAdditionalProps;
