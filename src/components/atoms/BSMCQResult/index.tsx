import Colors from '@constants/colors';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

type Props = {
  title: string;
  description?: string;
  labelButton: string;
  actionButton: () => void;
  status: boolean;
};

const BSMCQResult: FC<Props> = ({
  title,
  description,
  labelButton,
  actionButton,
  status,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, !status && {color: Colors.danger.base}]}>
        {title}
      </Text>

      {description && <Text>{description}</Text>}

      <Button
        mode="outlined"
        onPress={actionButton}
        buttonColor={Colors.primary.base}
        textColor={Colors.white}
        style={styles.button}>
        {labelButton}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    elevation: 2,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.success.base,
  },
  button: {
    marginTop: 16,
  },
});

export {BSMCQResult};
