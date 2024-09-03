import React, {useState, useEffect} from 'react';
import {SvgXml} from 'react-native-svg';
import {SvgAdditionalProps, SvgUri2Props} from './svgUri2';
// eslint-disable-next-line no-console
export const err = console.error.bind(console);

const propsAreEqual = (prevProps: SvgUri2Props, nextProps: SvgUri2Props) =>
  prevProps.uri === nextProps.uri;

async function fetchText(uri: string, props?: SvgAdditionalProps) {
  props?.onLoadStart?.();
  const response = await fetch(uri);
  if (response.ok || (response.status === 0 && uri.startsWith('file://'))) {
    return await response.text();
  }
  throw new Error(`Fetching ${uri} failed with status ${response.status}`);
}

const SvgUri2: React.FC<SvgUri2Props> = React.memo(props => {
  const {onError, uri, onLoad} = props;
  const [xml, setXml] = useState<string | null>(null);
  useEffect(() => {
    uri
      ? fetchText(uri, props)
          .then(data => {
            onLoad?.();
            setXml(data);
          })
          .catch(onError)
      : setXml(null);
  }, [onError, uri, onLoad]);
  return <SvgXml xml={xml} override={props} />;
}, propsAreEqual);

export default SvgUri2;
