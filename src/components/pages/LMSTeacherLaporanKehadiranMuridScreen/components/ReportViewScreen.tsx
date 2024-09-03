import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {styles} from '../style';
import {View} from 'react-native';
import Pdf from 'react-native-pdf';

const ReportViewScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'ReportViewScreen'>>();

  return (
    <View style={styles.PKSContainer}>
      <Header
        label={route?.params?.fileName ?? ''}
        styleLabel={styles.CAAHeader}
        backgroundColor={Colors.white}
      />
      <Pdf source={{uri: route?.params?.filePath ?? ''}} style={styles.flex1} />
    </View>
  );
};

export default ReportViewScreen;
