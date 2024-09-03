import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import Colors from '@constants/colors';

type Props = {
  title: string;
  subTitle: string;
  status: boolean;
  action: () => void;
};

const CardMCQ: FC<Props> = ({title, subTitle, status, action}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {borderColor: !status ? Colors.danger.base : Colors.dark.neutral20},
      ]}
      onPress={action}>
      <Text
        style={[
          styles.title,
          {color: !status ? Colors.danger.base : Colors.dark.neutral20},
        ]}>
        {title}
      </Text>

      <Text style={styles.subTitle}>{subTitle}</Text>

      {!status && (
        <IconButton
          icon="close"
          iconColor={Colors.danger.base}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  title: {
    flex: 0.09,
    color: Colors.dark.neutral60,
  },
  subTitle: {
    flex: 1,
  },
  icon: {
    width: 25,
    height: 25,
    margin: 0,
  },
});

export {CardMCQ};
