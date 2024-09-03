/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles';
import {SvgUri} from 'react-native-svg';
import AkmIcon from '@assets/svg/ic_akmIcon.svg';
import Colors from '@constants/colors';
import {SubjectType} from '@constants/subjectType';

type IKPHeaderImage = {
  path_url: any;
  category: any;
};

export const KPHeaderImage: any = ({path_url, category}: IKPHeaderImage) => {
  return (
    <View>
      {path_url ? (
        <View style={styles.iconContainer}>
          <SvgUri uri={path_url} width={40} height={40} />
        </View>
      ) : category === SubjectType.AKM.AKM ? (
        <View style={styles.iconContainer}>
          <AkmIcon />
        </View>
      ) : (
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 50,
            backgroundColor: Colors?.white,
          }}
        />
      )}
    </View>
  );
};
