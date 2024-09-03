import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

type Props = {
  title: string;
  description: string;
};
const QA: FC<Props> = ({title, description}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={[styles.title, {fontSize: 16, color: '#0055B8'}]}>
        {title}
      </Text>
      <Text style={[styles.title, {fontSize: 14}]}>{description}</Text>
    </View>
  );
};

export default QA;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
  },
});
