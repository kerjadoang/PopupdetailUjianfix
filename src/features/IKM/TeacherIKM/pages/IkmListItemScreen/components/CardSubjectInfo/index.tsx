import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {MainText, MainView} from '@components/atoms';
import RenderImage from '@components/atoms/RenderImage';

type Props = {
  data?: any;
};

const CardSubjectInfo: FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <MainView flexDirection="row" alignItems="center">
        <MainView paddingRight={16}>
          <RenderImage imageUrl={data?.path_url} width={64} height={64} />
        </MainView>
        <MainView width={'80%'}>
          <MainText paddingBottom={2} style={styles.phaseName}>
            {data?.phase}
          </MainText>
          <Text style={styles.subjectName} numberOfLines={2}>
            {data?.name}
          </Text>
        </MainView>
      </MainView>
    </View>
  );
};

export default CardSubjectInfo;
