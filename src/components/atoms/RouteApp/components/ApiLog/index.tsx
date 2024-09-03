import React, {FC} from 'react';
import {MainText, MainView} from '@components/atoms';
import Config from 'react-native-config';
import NetworkLogger from 'react-native-network-logger';
import Colors from '@constants/colors';
import {appVersion} from '@constants/functional';

type Props = {};

const ApiLog: FC<Props> = ({}) => {
  return (
    <MainView flex={1}>
      <MainView
        flexDirection="row"
        height={38}
        alignItems="center"
        padding={8}
        justifyContent="space-between"
        backgroundColor={'#2d2a28'}>
        <MainView flexDirection="row">
          <MainText color={Colors.white}>Variant : </MainText>
          <MainText color={Colors.white}>{Config.ENV_MODE}</MainText>
        </MainView>
        <MainView flexDirection="row">
          <MainText color={Colors.white}>Version : </MainText>
          <MainText color={Colors.white}>{appVersion}</MainText>
        </MainView>
      </MainView>
      <NetworkLogger theme={'dark'} />
    </MainView>
  );
};

export default ApiLog;
