/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {List, Text} from 'react-native-paper';
import Colors from '@constants/colors';

type Props = {
  icon: any;
  title: string;
  description: string;
  action: () => void;
};

const ContactItem: FC<Props> = ({icon, title, description, action}) => {
  return (
    <List.Item
      onPress={action}
      style={styles.container}
      title={({fontSize}) => (
        <>
          <Text style={[{fontSize}, styles.listItem_textTitle]}>{title}</Text>

          <Text style={[{fontSize}, styles.listItem_textDescription]}>
            {description}
          </Text>
        </>
      )}
      left={props =>
        icon && (
          <List.Icon
            {...props}
            icon={icon}
            color={Colors.primary.base}
            style={{}}
          />
        )
      }
      right={props => (
        <List.Icon
          {...props}
          icon={'arrow-right'}
          color={Colors.primary.base}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingEnd: 0,
    paddingVertical: 0,
  },
  listItem_textTitle: {
    fontWeight: 'bold',
  },
  listItem_textDescription: {
    color: Colors.primary.base,
  },
});

export {ContactItem};
