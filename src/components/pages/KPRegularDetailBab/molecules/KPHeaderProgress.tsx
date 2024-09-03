import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles';
import ProgressBar from '@components/atoms/ProgressBar';
import {SubjectType} from '@constants/subjectType';

type IRenderHeader = {
  chapterData: any;
  category: string;
  data?: any;
};

export const KPHeaderProgress = ({
  chapterData = false,
  category,
}: IRenderHeader) => {
  const _progressPercentage =
    category === SubjectType.KPRegular.Practice
      ? chapterData?.practice_progress?.progress_percentage
      : category === SubjectType.KPRegular.Test
      ? chapterData?.test_progress?.progress_percentage
      : chapterData?.progress?.progress_percentage;
  const _totalMaterial =
    category === SubjectType.KPRegular.Practice
      ? chapterData?.practice_progress?.total_material
      : category === SubjectType.KPRegular.Test
      ? chapterData?.test_progress?.total_material
      : chapterData?.progress?.total_material;
  const _userProgress =
    category === SubjectType.KPRegular.Practice
      ? chapterData?.practice_progress?.user_progress
      : category === SubjectType.KPRegular.Test
      ? chapterData?.test_progress?.user_progress
      : chapterData?.progress?.user_progress;

  return (
    <View style={styles.detailHeader}>
      <View style={styles.detailHeaderLeftSection}>
        <View>
          <Text
            allowFontScaling={false}
            style={styles.detailHeaderLeftContentTop}>
            Progres Belajar
          </Text>
          <Text
            allowFontScaling={false}
            style={styles.detailHeaderLeftContentBottom}>
            {`${_userProgress ?? 0}/${_totalMaterial ?? 0} materi (${
              Math.round(_progressPercentage) ?? 0
            }%)`}
          </Text>
        </View>
      </View>
      <View style={styles.detailHeaderRightSection}>
        <ProgressBar
          progress={`${Math.round(_progressPercentage) ?? 0}%`}
          height={6}
        />
      </View>
    </View>
  );
};
