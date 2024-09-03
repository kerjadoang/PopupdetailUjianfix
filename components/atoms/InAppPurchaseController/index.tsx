import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useInAppPurchaseController} from './useInAppPurchaseController';

type Props = {};

const InAppPurchaseController: FC<Props> = ({}) => {
  const {} = useInAppPurchaseController();
  return <View style={styles.container} />;
};

export default InAppPurchaseController;
