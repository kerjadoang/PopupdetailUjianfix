import {CaptureProtection} from 'react-native-capture-protection';
import Config from 'react-native-config';
import {
  LabelChartContainer,
  NotifContainer,
  ToastContainer,
} from '../ToastContainer';
import React from 'react';
import {ToastConfigParams} from 'react-native-toast-message';

export const listScreenDontNeetAuth = [
  'Splash',
  'Autentikasi',
  'LoginScreen',
  'VerificationScreen',
  'SelectRoleScreen',
  'PersonalDataScreen',
  'PusatBantuanScreen',
  'InputPasswordScreen',
  'VerificationRegisterScreen',
  'ChangeNumberScreen',
  'ForgotPasswordScreen',
  'ClassScreen',
  'Onboarding',
  'SuccessRegisterScreen',
  'RemoveAccountGoodByeScreen',
  'LinkAccountScreen',
];

export const preventScreenshotsIOS = () => {
  if (Config.ENABLE_SCREENSHOT === 'false') {
    CaptureProtection.preventScreenshot();
    CaptureProtection.setScreenRecordScreenWithText(
      'Maaf tidak diizinkan untuk merekam layar!',
    );
    CaptureProtection.preventScreenRecord();

    return;
  }

  CaptureProtection.allowScreenRecord();
  CaptureProtection.allowScreenshot();
};

export const toastConfig = {
  success: (props: any) => <ToastContainer {...props} />,
  error: (props: any) => <ToastContainer {...props} type="error" />,
  warning: (props: any) => <ToastContainer {...props} type="warning" />,
  notif: (props: ToastConfigParams<any>) => <NotifContainer {...props} />,
  labelChart: (props: ToastConfigParams<any>) => (
    <LabelChartContainer {...props} />
  ),
};
