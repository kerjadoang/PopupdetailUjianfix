/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  PressableProps,
} from 'react-native';

import ChevronIcon from '@assets/svg/ic16_chevron_right.svg';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Header} from '@components/atoms/Header';
import {IListChapterBySubjectResponseData} from '@services/lms/type';
import {useGetChaptersBySubject} from '@services/lms';
import {SvgUri} from 'react-native-svg';

type ChapterItemProps = {
  data: IListChapterBySubjectResponseData;
  onPress?: PressableProps['onPress'];
};

const ChapterItem: React.FC<ChapterItemProps> = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 10,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      }}>
      <View style={{flexGrow: 1}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: Colors.dark.neutral100,
          }}>
          {props.data.name}
        </Text>
        {props.data.subtitle && (
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              color: Colors.dark.neutral80,
            }}>
            {props.data.subtitle}
          </Text>
        )}
      </View>
      <ChevronIcon />
    </Pressable>
  );
};

const PaketSoalChapterListScreen: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ParamList, 'PaketSoalChapterListScreen'>
    >();
  const route = useRoute<RouteProp<ParamList, 'PaketSoalChapterListScreen'>>();

  const {subject_id, path_url, className, subjectName, class_id} = route.params;
  const {data: chapterBySubjectData} = useGetChaptersBySubject(subject_id);
  const mergeChapterBySubjectData = [...(chapterBySubjectData?.data ?? [])];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label="Paket Soal" />,
    });
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: IListChapterBySubjectResponseData;
    index: number;
  }) => {
    return (
      <ChapterItem
        key={index}
        data={item}
        onPress={() =>
          navigation.navigate('PaketSoalListScreen', {
            school_only: item.id ? false : true,
            subject_id,
            chapter_id: item.id,
            title: item.name,
            class_id,
            subtitle: `${className} • ${subjectName}`,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapelDetailContainer}>
        {path_url && <SvgUri width={64} height={64} uri={path_url} />}
        <View>
          <Text style={styles.classLabel}>{className}</Text>
          <Text style={styles.subjectLabel}>{subjectName}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.listBabContainer}>
        <Text style={styles.listBabLabel}>Daftar Bab</Text>
      </View>
      <FlatList
        data={mergeChapterBySubjectData}
        renderItem={renderItem}
        style={{backgroundColor: Colors.white}}
        contentContainerStyle={{gap: 16, padding: 16, paddingTop: 8}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapelDetailContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  classLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral60,
    fontSize: 12,
  },
  subjectLabel: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
    fontSize: 18,
  },
  divider: {
    height: 4,
    backgroundColor: Colors.dark.neutral10,
    width: '100%',
  },
  listBabContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: Colors.white,
  },
  listBabLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.dark.neutral100,
  },
});

export default PaketSoalChapterListScreen;
