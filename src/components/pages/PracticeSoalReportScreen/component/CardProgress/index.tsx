import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '@constants/colors';
import {ProgressCircle} from '@components/atoms';

type Props = {
  title: string;
  progress: number;
  action: () => void;
  img?: any;
  taskdone: number;
  alltask: number;
};
const CardProgress = ({
  title,
  taskdone,
  alltask,
  progress,
  action,
  img,
}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={action}>
      <View>{img}</View>
      <View style={{flex: 1}}>
        <Text style={styles.cardTextTitle}>{title}</Text>

        <Text style={styles.cardTextSubTitle}>
          <Text style={{color: Colors.dark.neutral100}}>{taskdone}</Text>{' '}
          {`dari ${alltask} materi selesai`}
        </Text>
      </View>

      <ProgressCircle
        progress={progress}
        size={48}
        strokeWidth={4}
        color={Colors.primary.base}
        children={
          <Text style={[styles.textNormal, {color: Colors.primary.base}]}>
            {`${progress}%`}
          </Text>
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
  },
  cardTextTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
  },
  cardTextSubTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  textNormal: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.white,
  },
});

export {CardProgress};
