/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {styles} from '../style';
import AkmIcon from '@assets/svg/ic_akmIcon.svg';
import Colors from '@constants/colors';
import {SubjectType} from '@constants/subjectType';
import RenderImage from '@components/atoms/RenderImage';

type IKPHeaderImage = {
  path_url: any;
  image_id?: string;
  category: any;
};

export const KPHeaderImage: any = ({
  path_url,
  image_id,
  category,
}: IKPHeaderImage) => {
  return (
    <View>
      {path_url || image_id ? (
        <View style={styles.iconContainer}>
          <RenderImage
            imageId={image_id}
            imageUrl={path_url}
            style={{width: 40, height: 40}}
            placeholder={
              <View style={{width: 56, height: 56, borderRadius: 50}} />
            }
          />
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
