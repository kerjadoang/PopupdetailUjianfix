import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  title?: string;
  action?: any;
};

const CardParentAction = ({title, action}: Props) => {
  return (
    <TouchableOpacity onPress={action} style={[styles.view]}>
      <View style={styles.viewText}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Icon
        name="chevron-right"
        size={24}
        color={Colors.primary.base}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.primary.base,
    alignItems: 'center',
    borderRadius: 10,
  },
  viewText: {
    width: '90%',
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    padding: 8,
  },
});

export {CardParentAction};
