/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {ScrollView, Text} from 'react-native';

import TryOut from './TryOut';
import LiveClass from './LiveClass';
import BankSoal from './BankSoal';
import {Filter} from '../';
import {TAB_NAMES} from '../../utils';
import {useRoute} from '@react-navigation/native';

const TabContentItem: FC<{
  type: (typeof TAB_NAMES)[keyof typeof TAB_NAMES];
}> = ({type}) => {
  const route: any = useRoute();
  const [callbackTypeTryOut, setCallbackTypeTryOut] = useState();
  const [callbackTryOut, setCallbackTryOut] = useState();
  const [callbackMapel, setCallbackMapel] = useState();

  const __renderTabContentItemByType = () => {
    switch (type) {
      case 'Try Out':
        return (
          <TryOut
            valueFilterTypeTryOut={callbackTypeTryOut}
            valueFilterTryOut={callbackTryOut}
            valueFilterMapel={callbackMapel}
            isFromParent={route?.params?.isfromParent || false}
            data={route?.params?.data}
          />
        );
      case 'Live Class':
        return (
          <LiveClass
            valueFilterTryOut={callbackTryOut}
            valueFilterMapel={callbackMapel}
            isFromParent={route?.params?.isfromParent || false}
            data={route?.params?.data}
          />
        );
      case 'Bank Soal':
        return (
          <BankSoal
            valueFilterTryOut={callbackTryOut}
            valueFilterMapel={callbackMapel}
            isFromParent={route?.params?.isfromParent || false}
            data={route?.params?.data}
          />
        );
      default:
        return <Text>Tab Content Item Not Found</Text>;
    }
  };

  return (
    <>
      <Filter
        type={type}
        setCallbackTypeTryOut={setCallbackTypeTryOut}
        setCallbackTryOut={setCallbackTryOut}
        setCallbackMapel={setCallbackMapel}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 16}}>
        {__renderTabContentItemByType()}
      </ScrollView>
    </>
  );
};

export default TabContentItem;
