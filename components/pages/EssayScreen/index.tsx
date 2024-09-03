import React from 'react';
import Akm from './components/Akm';
import Tes from './components/Tes';
import Practice from './components/Practice';
import {useRoute} from '@react-navigation/native';

const EssayScreen = () => {
  const route = useRoute();
  const {service}: any = route?.params;

  switch (service) {
    case 'Test':
      return <Tes />;

    case 'AKM Literasi':
    case 'AKM Numerasi':
      return <Akm />;

    case 'Practice':
      return <Practice />;

    default:
      return null;
  }
};

export default EssayScreen;
