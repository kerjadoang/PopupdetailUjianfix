import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {MainView} from '@components/atoms';
import Colors from '@constants/colors';

type Props = {};

const BottomSheetHandle: FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <MainView justifyContent="center" alignItems="center" marginVertical={8}>
        <MainView
          width={'12%'}
          height={6}
          borderRadius={100}
          backgroundColor={Colors.primary.base}
        />
      </MainView>
    </View>
  );
};

export default BottomSheetHandle;
