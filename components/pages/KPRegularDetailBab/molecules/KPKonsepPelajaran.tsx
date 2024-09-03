/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles';
import LearnConceptIcon from '@assets/svg/lessonConcept.svg';
import BlueArrowIcon from '@assets/svg/blueArrow.svg';
import ProviderMedia from '@services/media/provider';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProgressCircle} from '@components/atoms';
import Colors from '@constants/colors';
import VideoPresentasiIcon from '@assets/svg/videoPresentasi.svg';
import {IMaterialContentData} from '../type';
import {ParamList} from 'type/screen';

type IKonsepPelajaran = {
  chapterData: any;
};

export const KPKonsepPelajaran: any = ({chapterData}: IKonsepPelajaran) => {
  const isFocus = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'KPKonsepPelajaran'>>();
  const [isObjective, setIsObjective] = useState<'konsep' | 'objektif' | ''>(
    'konsep',
  );
  const handleActionByChapterType = async (ix: any) => {
    try {
      const _resFileData = await ProviderMedia?.getFile(
        ix?.chapter_material?.[0]?.file_id,
      );
      const ResData = _resFileData?.data || false;
      if (ResData?.data?.path_url?.endsWith('.json')) {
        fetch(ResData?.data?.path_url)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error: ' + response.status);
            }
          })
          .then(data => {
            navigation.navigate('LearningObjectiveScreen', {
              chapterData: ix,
              contentData: data,
            });
          })
          .catch(error => {
            Toast?.show({
              type: 'error',
              text1: error?.message ?? 'Terjadi kesalahan pada sistem kami',
            });
          });
      } else {
        navigation.navigate('ConceptScreen', {
          chapterData: ix,
        });
      }
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ??
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  const handleFetchData = async (fileId: any) => {
    try {
      const _resFileData = await ProviderMedia?.getFile(fileId);
      const ResData = _resFileData?.data || false;
      if (ResData?.data?.path_url?.endsWith('.json')) {
        setIsObjective('objektif');
      } else {
        setIsObjective('konsep');
      }
    } catch (error: any) {
      Toast?.show({
        type: 'error',
        text1:
          error?.response?.data?.message ??
          'Terjadi kesalahan pada sistem kami',
      });
    }
  };

  useEffect(() => {
    // handleFetchData();
    chapterData?.map(async (ie: any) => {
      if (ie?.type === 'concept' && ie?.chapter_material) {
        handleFetchData(ie?.chapter_material?.[0]?.file_id);
      }
    });
  }, [isFocus]);

  const renderScreen: any = chapterData?.map(
    (_contentData: IMaterialContentData) => {
      if (_contentData?.type === 'concept' && _contentData?.chapter_material) {
        return (
          <TouchableOpacity
            onPress={() => {
              handleActionByChapterType(_contentData);
            }}
            key={Math.random()}
            style={styles.modalContainer}>
            {isObjective === 'konsep' ? (
              <View style={styles.modalInnerContainer}>
                <View style={styles.concepCardIconContainer}>
                  <LearnConceptIcon width={70} height={70} />
                </View>
                <View style={styles.conceptCardIconMiddleContainer}>
                  <Text style={styles.conceptCardMiddleTitle}>
                    Konsep Pelajaran
                  </Text>
                  <Text style={styles.conceptCardMiddleTitle2}>
                    {_contentData?.chapter_material[0]?.title ?? ''}
                  </Text>
                </View>
                <View style={styles.conceptCardLeftContainer}>
                  <BlueArrowIcon height={14} width={8} />
                </View>
              </View>
            ) : isObjective === 'objektif' ? (
              <View style={styles.lessonPresentastionContainer}>
                <View style={styles.lessonProgressContainer}>
                  <ProgressCircle
                    progress={0}
                    size={65}
                    strokeWidth={0}
                    color={Colors.primary.base}
                    children={<VideoPresentasiIcon />}
                  />
                </View>
                <View style={styles.lessonTitleContainer}>
                  <Text numberOfLines={2} style={styles.lessonTitle2}>
                    Objektif Pelajaran
                  </Text>
                  <Text style={styles.lessonTitle}>
                    {_contentData?.chapter_material[0].title ?? ''}
                  </Text>
                </View>
                <View style={styles.lessonArrowContainer}>
                  <BlueArrowIcon height={14} width={8} />
                </View>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      }
    },
  );
  return renderScreen;
};
