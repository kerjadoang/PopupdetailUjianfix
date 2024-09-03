import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';

type Props = {
  title?: string;
  action?: any;
  svg?: any;
};

const WidgetService = ({title, action, svg}: Props) => {
  return (
    <Pressable
      onPress={action}
      style={[styles.containerWidget, styles.shadowProp, styles.card]}>
      <View style={styles.containerLogo}>{svg}</View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
  },
  containerWidget: {
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 'auto',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  textContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    borderRadius: 10,
  },
});

export {WidgetService};
