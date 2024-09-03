import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import Icon from '@assets/svg/ic24_all_subject.svg';

type Props = {
  action: any;
};

const AllSubjects = ({action}: Props) => {
  return (
    <Pressable onPress={action} style={styles.container}>
      <View style={styles.containerWidget}>
        <View style={styles.containerLogo}>
          <Icon width={40} height={40} />
        </View>
        <Text style={styles.text}>Semua Pelajaran</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#C2185B',
    marginTop: 16,
    height: 100,
  },
  containerWidget: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
  },
  containerLogo: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 15,
    padding: 8,
  },
  text: {
    flex: 1,
    fontSize: 12,
    flexWrap: 'wrap',
    width: 100,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.dark.neutral100,
    lineHeight: 16,
  },
  icon: {
    height: 15,
    width: 15,
  },
});

export {AllSubjects};
