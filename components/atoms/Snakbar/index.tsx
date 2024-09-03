import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';

type Props = {
  message: string;
  height?: number;
  color?: string;
  close: () => void;
};

const Snakbar: FC<Props> = ({
  message,
  height = 60,
  color = Colors.primary.base,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: height,
          backgroundColor: color,
        },
      ]}>
      <Text style={styles.title}>{message}</Text>
    </View>
  );
};

export default Snakbar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  headerIconContainer: {flex: 1, alignItems: 'center', paddingTop: 2},
  bottomBodyContainer: {flex: 3, flexDirection: 'row'},
  checkIconContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  descriptionContainer: {flex: 6, justifyContent: 'center'},
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: Colors.white,
  },
});
