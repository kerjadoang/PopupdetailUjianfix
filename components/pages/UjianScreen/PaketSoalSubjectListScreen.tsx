/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  PressableProps,
} from 'react-native';

import Colors from '@constants/colors';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Header} from '@components/atoms/Header';
import {useGetRombelClassList, useGetTeacherClassSubject} from '@services/lms';
import {
  IRombelListClassResponseData,
  ITeacherClassSubjectResponseData,
} from '@services/lms/type';
import {SvgUri} from 'react-native-svg';

type PaketSoalItemProps = {
  data: ITeacherClassSubjectResponseData;
  onPress?: PressableProps['onPress'];
};

const PaketSoalItem: React.FC<PaketSoalItemProps> = props => {
  return (
    <Pressable
      style={{
        alignItems: 'center',
        gap: 6,
        width: '30%',
      }}
      onPress={props.onPress}>
      {props.data?.path_url && (
        <SvgUri width={64} height={64} uri={props.data.path_url} />
      )}
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: Colors.dark.neutral100,
          textAlign: 'center',
        }}>
        {props.data.name}
      </Text>
    </Pressable>
  );
};

type PaketSoalChipProps = {
  selected?: boolean;
  data: IRombelListClassResponseData;
  onPress?: PressableProps['onPress'];
};

const PaketSoalChip: React.FC<PaketSoalChipProps> = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[
        paketSoalChipStyle.container,
        props.selected && paketSoalChipStyle.selectedBg,
      ]}>
      <Text
        style={[
          paketSoalChipStyle.label,
          props.selected && paketSoalChipStyle.selectedLabel,
        ]}>
        {props.data.name}
      </Text>
    </Pressable>
  );
};

const PaketSoalSubjectListScreen: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ParamList, 'PaketSoalSubjectListScreen'>
    >();
  const scrollViewRef = useRef();
  const {refetch, data: rombelClassData} = useGetRombelClassList();
  const {refetch: getTeacherClassSubject, data: teacherClassSubjectData} =
    useGetTeacherClassSubject();
  const [selectedRombel, setSelectedRombel] =
    useState<IRombelListClassResponseData>({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label="Paket Soal" />,
    });
  }, []);

  const onPressChip = (item: IRombelListClassResponseData) => {
    scrollViewRef.current?.scrollTo?.({y: 0, animated: false});
    setSelectedRombel(item);
    getTeacherClassSubject(item.id);
  };

  const renderPaketSoalChip = ({
    item,
  }: {
    item: IRombelListClassResponseData;
  }) => {
    return (
      <PaketSoalChip
        onPress={() => onPressChip(item)}
        selected={item.id === selectedRombel?.id}
        data={item}
      />
    );
  };

  useEffect(() => {
    refetch(res => {
      setSelectedRombel(res.data?.[0] ?? {});
      if (res.data?.[0]?.id) {
        getTeacherClassSubject(res.data?.[0]?.id);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          renderItem={renderPaketSoalChip}
          data={rombelClassData?.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingVertical: 16}}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{gap: 8, paddingHorizontal: 16}}
        />
      </View>
      <ScrollView ref={scrollViewRef}>
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 16,
          }}>
          {/* {dummyData
            .filter(item => item.id === selectedClass)?.[0]
            ?.item?.map?.(data => {
              return (
                <PaketSoalItem
                  data={data}
                  onPress={() => navigation.navigate('PaketSoalChapterListScreen')}
                />
              );
            })} */}
          {teacherClassSubjectData?.data?.map((item, index) => {
            return (
              <PaketSoalItem
                key={index}
                data={item}
                onPress={() =>
                  navigation.navigate('PaketSoalChapterListScreen', {
                    subject_id: item.id,
                    subjectName: item.name,
                    className: item.class?.name,
                    class_id: item.class_id,
                    path_url: item.path_url,
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

const paketSoalChipStyle = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary.light3,
    borderRadius: 30,
  },
  label: {fontFamily: 'Poppins-Regular', color: Colors.dark.neutral80},
  selectedBg: {
    backgroundColor: Colors.primary.base,
  },
  selectedLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.white,
  },
});

export default PaketSoalSubjectListScreen;
