import React, {FC} from 'react';
import {MainView, MainText, Button} from '@components/atoms';
import Colors from '@constants/colors';
import styles from './styles';

type Props = {
  title?: string;
  action?: VoidCallBack;
};

const CardBelumDikerjakan: FC<Props> = ({action, title}) => {
  return (
    <MainView
      style={[styles.container, styles.shadowProp]}
      gap={4}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <MainText>{title || 'Test belum dikerjakan'}</MainText>
      {action && (
        <Button
          action={action}
          label="Kerjakan"
          background={Colors.primary.light3}
          color={Colors.primary.base}
          style={{width: '30%'}}
        />
      )}
    </MainView>
  );
};

export default CardBelumDikerjakan;
