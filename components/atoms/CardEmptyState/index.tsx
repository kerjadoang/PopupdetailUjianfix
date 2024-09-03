import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Colors from '@constants/colors';

type Props = {
  image: any;
  description: string;
};

const CardEmptyState: FC<Props> = ({image, description}) => {
  return (
    <View style={styles.container}>
      {image}
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: Colors.dark.neutral80,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});

export {CardEmptyState};
