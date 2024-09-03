import {apiTelegramSendMessage} from '@api/wrapping';
import {appVersion} from '@constants/functional';
import {bantuanWhatsapp} from '@constants/url';
import {NativeHelper} from '@helpers/index';
import {sendCriticalErrorLog} from '@services/firebase/firebaseDatabase';
import {Alert, Linking} from 'react-native';
import Config from 'react-native-config';

const errorHandler = ({error, isFatal, route}: IErrorHandler) => {
  const stackTrace = error.stack || '';
  const appLogId = 'KP-' + new Date().getTime().toString();
  const errorAlertTitle =
    'Maaf ya.. kami sedang mengalami gangguan\nsilakan coba lagi atau hubungi kami ya!';
  const errorAlertBody = `Terjadi kesalahan pada aplikasi saat memproses permintaan anda\n(${appLogId})`;
  const errorInfo = parseStackTrace(stackTrace);

  if (!isFatal) {
    return;
  }
  // SHOW CRITICAL ALERT
  Alert.alert(errorAlertTitle, errorAlertBody, [
    {
      text: 'Hubungi Kami',
      onPress: () => {
        Linking.openURL(bantuanWhatsapp(appLogId))
          .then(() => {
            !__DEV__ && NativeHelper.forceQuitApp();
          })
          .catch(() => {
            // console.log(e);
          });
      },
    },
    {
      text: 'Keluar Aplikasi',
      style: 'destructive',
      onPress: () => {
        !__DEV__ && NativeHelper.forceQuitApp();
      },
    },
  ]);
  // SEND CRITICAL LOG
  sendCriticalErrorLog({
    feature: 'global_alert',
    serviceName: 'general_service',
    type: 'ERROR',
    screenName: route.screenName,
    body: {
      ...errorInfo,
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
      route: route,
    },
    message: error.message,
    appLogId: appLogId,
    errorResponse: error.toString(),
    title: 'ALERT',
  });
  apiTelegramSendMessage({
    botId: Config.TELEGRAM_ALERT_BOT_ID,
    chatId: Config.TELEGRAM_ALERT_CHAT_ID,
    text: `${Config?.ENV_MODE?.toUpperCase()} ERROR!!!\nid: ${appLogId}\nApp Version: ${appVersion}\nScreen Name: ${
      route.screenName
    }`,
  });
};

function parseStackTrace(stackTrace: string) {
  const lines = stackTrace.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Look for lines containing the platform information
    if (line.includes('platform=') && line.includes('app=')) {
      const platformMatch = line.match(/platform=(\w+)/);
      const platform = platformMatch ? platformMatch[1] : null;
      const appMatch = line.match(/app=([^&\s]+)/);
      const app = appMatch ? appMatch[1] : null;
      // Extract file name and line number from the following line
      const nextLine = lines[i + 1];
      const fileMatch = nextLine.match(/\/([^\/]+):(\d+):/);
      const fileName = fileMatch ? fileMatch[1] : null;
      const lineNumber = fileMatch ? fileMatch[2] : null;
      return {
        platform,
        app,
        fileName,
        lineNumber,
      };
    }
  }
  return null;
}
export {errorHandler, parseStackTrace};
