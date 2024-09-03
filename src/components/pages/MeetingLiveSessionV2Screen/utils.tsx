import {isPlatformIOS} from '@constants/functional';
// import ZoomUs, {RNZoomUsJoinMeetingParams} from 'react-native-zoom-us';
import {ZoomIframeType} from './types';
import queryString from 'query-string';
import Config from 'react-native-config';

export const initZoom: (
  customMeeting?: boolean,
) => Promise<boolean> = async () => {
  try {
    if (isPlatformIOS) {
      return Promise.resolve(false);
    }
    // const initialized = await ZoomUs.initialize(
    //   {
    //     clientKey: '4tCNRczVkrEqLsJI7BFmpD6tSNlwxQffO1Xf',
    //     clientSecret: '28WHxodIObgxLG65LUMuuK8PkrH1civ0BZZj',
    //   },
    //   {
    //     enableCustomizedMeetingUI: customMeeting || false,
    //   },
    // );
    // console.log('initialize zoom message ', initialized);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const joinMeetingZoom = async () => {
  if (isPlatformIOS) {
    return;
  }
  // return await ZoomUs.joinMeeting(params);
};

export const muteAudioZoom = async () => {
  if (isPlatformIOS) {
    return;
  }
  // const result = await ZoomUs.muteMyAudio(isMute);
  // return result;
};

export const INJECTED_JAVASCRIPT = ` 
    setTimeout(function() { 
      window.ReactNativeWebView.postMessage(/*your pushed data back to onMessage 'event.nativeEvent.data'*/); 
    }, 2500);`;

export const htmlDummy = `
    <html>
    <head></head>
    <body>
    <Text>asd</Text>
      <script>
        setTimeout(function () {
          window.ReactNativeWebView.postMessage("Hello!")
        }, 2000)
      </script>
    </body>
    </html>
  `;

export const zoomIframeUrl = (props: ZoomIframeType) => {
  const qString = queryString.stringify(props);
  // return `${Config.ZOOM_WEBVIEW_URL}/#/zoom/live-class?${qString}`;
  return `${Config.ZOOM_WEBVIEW_URL}/student?${qString}`;
};

export const clearWebviewAudio = (url?: string) => {
  return `
    window.location.href = "${url || 'https://kelaspintar.id'}";
    true;
  `;
};

export const detectEndMeetingIJS = `
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'characterData') {
      const text = mutation.target.textContent;
      // if (text.includes('host ended meeting')) {
      if (text.toLowerCase().includes('got')) {
        window.postMessage('TextFound');
      }
    }
  });
});

const targetNode = document.body;
const config = { characterData: true, subtree: true };
observer.observe(targetNode, config);
`;
