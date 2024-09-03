/* eslint-disable react-hooks/exhaustive-deps */
import {Button, EmptyDisplay} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useGetPaketUjianByChapter} from '@services/lms';
import {IListPaketUjianByChapterResponseData} from '@services/lms/type';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, FlatList, useWindowDimensions} from 'react-native';
import CreatePaketSoal from './components/CreatePaketSoal';
import MaskotIconEmptyState from '@assets/svg/maskot_11.svg';
import PlusIcon from '@assets/svg/plus.svg';
import PaketSoalListItem from './components/PaketSoalListItem';
import {ParamList} from 'type/screen';

const PaketSoalListScreen: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ParamList, 'PaketSoalListScreen'>
    >();
  const route = useRoute<RouteProp<ParamList, 'PaketSoalListScreen'>>();
  const isFocused = useIsFocused();
  const {height} = useWindowDimensions();
  const [visibleCreate, setVisibleCreate] = useState<boolean>();

  const {subject_id, chapter_id, school_only, title, subtitle, class_id} =
    route.params;
  const {data: paketUjianByChapterData, refetch} = useGetPaketUjianByChapter(
    school_only,
    subject_id,
    chapter_id ? chapter_id : '0',
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={title} subLabel={subtitle} />,
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderItem = useCallback(
    ({item}: {item: IListPaketUjianByChapterResponseData}) => {
      return (
        <PaketSoalListItem
          data={item}
          showDownloadButton
          onPress={() => {
            navigation.navigate('DetailPaketSoalListScreen', {
              package_id: item.id,
              title,
              subtitle,
              subject_id,
              class_id,
              chapter_id,
            });
          }}
          onPressDetail={() => {
            navigation?.navigate('DetailSoalScreen', {
              order: 1,
              title: 'Detail Paket Soal',
              subtitle: item.name,
              subject_id: item.subject_id,
              school_id: school_only,
              class_id: item.class_id,
              package_id: item.id,
              chapter_id: item.chapter_id,
            });
          }}
        />
      );
    },
    [school_only],
  );

  const onSuccessCreate = (packageId: any) => {
    setVisibleCreate(false);
    navigation.navigate('DetailPaketSoalListScreen', {
      package_id: packageId,
      subject_id,
      title,
      subtitle,
      class_id,
      chapter_id,
      mode: 'detail',
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={paketUjianByChapterData?.data}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyDisplay
            title={'Belum Ada Paket Soal Ditambahkan'}
            desc="Paket soal yang telah ditambahkan
            akan tampil di sini."
            btnLabel="Tambah Paket Soal"
            titleStyle={{fontSize: 16}}
            descStyle={{fontSize: 14}}
            btnLabelStyle={{fontSize: 16}}
            containerStyle={{
              height,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -70,
              alignSelf: 'center',
              width: '95%',
            }}
            btnContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            action={() => {
              setVisibleCreate(true);
            }}
            btnIcon={<PlusIcon />}
            imageSvg={<MaskotIconEmptyState />}
          />
        }
        contentContainerStyle={{gap: 16, padding: 16}}
      />
      {paketUjianByChapterData?.data &&
        paketUjianByChapterData?.data?.length > 0 && (
          <View style={{padding: 16, backgroundColor: Colors.white}}>
            <Button
              label="Tambah Paket Soal"
              action={() => {
                setVisibleCreate(true);
              }}
            />
          </View>
        )}
      <CreatePaketSoal
        onClose={() => setVisibleCreate(false)}
        visible={visibleCreate}
        class_id={class_id}
        chapter_id={chapter_id}
        onSuccessCreate={onSuccessCreate}
        subject_id={subject_id}
        height={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default PaketSoalListScreen;
