import React, {FC, useCallback, useLayoutEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './style';
import Colors from '@constants/colors';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import ResetIcon from '@assets/svg/close_x.svg';
import {InputText, SwipeUp} from '@components/atoms';
import {
  IKpRegularSearchData,
  KpRegSubjectType,
  kpRegularSearchDestroy,
  newFetchKpRegularSearch,
} from '@redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SubjectType} from '@constants/subjectType';
import {
  _handlerCapitalizeFirstLetter,
  isStringContains,
} from '@constants/functional';
import {useNavigation} from '@react-navigation/native';
import {useSearchModalActions} from './zustand/searchModal';

const Header: FC<{
  query: string;
  handleSearch: () => void;
  setQuery: (_value: string) => void;
  setModalVisible: (_value: boolean) => void;
}> = ({query, handleSearch, setQuery, setModalVisible}) => {
  return (
    <View style={styles.headerSearch}>
      <View style={{flex: 3}}>
        <InputText
          backgroundColor={Colors.dark.neutral10}
          returnKeyType="search"
          value={query}
          onSubmitEditing={handleSearch}
          maxLength={60}
          onChangeText={text => setQuery(text)}
          leftIcon={SearchIcon}
          rightIcon={query && ResetIcon}
          onPressIcon={() => setQuery('')}
          placeholder="Cari bab, materi, atau..."
        />
      </View>

      <Pressable
        style={styles.cancelLabelContainter}
        onPress={() => setModalVisible(false)}>
        <Text style={styles.cancelLabel}>Batal</Text>
      </Pressable>
    </View>
  );
};

const SearchTipsOrNotFound: FC<{title: string; description: string}> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.searchTipsOrNotFound}>
      <Image
        source={require('@assets/images/robot_empty_search.png')}
        style={{width: 100, height: 100}}
      />

      <Text style={styles.searchTipsOrNotFoundTitle}>{title}</Text>
      <Text style={styles.searchTipsOrNotFoundDescription}>{description}</Text>
    </View>
  );
};

const ListItem: FC<{
  type?: string;
  title: string;
  description?: string;
  onPress: () => void;
  containerStyle?: any;
}> = ({type, title, description, onPress, containerStyle}) => {
  const {setShowModal: setModalVisible} = useSearchModalActions();
  return (
    <List.Item
      onPress={() => {
        setModalVisible(false);
        return onPress();
      }}
      style={[
        type === 'sub' && {marginLeft: 35},
        {
          borderBottomWidth: 1,
          borderBottomColor: Colors.dark.neutral20,
        },
        containerStyle,
      ]}
      title={title}
      titleStyle={type !== 'sub' ? styles.textBold : styles.textNormal}
      descriptionStyle={styles.textBold}
      description={type === 'sub' && description}
      left={props => (
        <List.Icon
          {...props}
          icon={type !== 'sub' ? 'book' : 'bookmark'}
          color={Colors.primary.base}
          style={{paddingLeft: 0}}
        />
      )}
      right={props => (
        <List.Icon
          {...props}
          icon="chevron-right"
          color={Colors.dark.neutral50}
        />
      )}
    />
  );
};

const SubItem = ({
  subjectId,
  title,
  subjectType,
  feature,
}: {
  subjectId: number;
  title: KpRegSubjectType;
  subjectType: string;
  feature: Feature[];
}) => {
  const navigation: any = useNavigation();
  if (title !== parseSubjectType(subjectType)) {
    return;
  }
  return feature?.map((val: Feature, _key: number) => (
    <ListItem
      key={_key}
      type="sub"
      title={val?.name as string}
      description={val?.description}
      onPress={() => {
        return navigateTo(navigation, val, subjectId, subjectType);
      }}
    />
  ));
};

const ListGroup: FC<{
  subjectId: number;
  title: KpRegSubjectType;
  data: MappedKpRegularSearchMaterial[];
  subjectType: string;
  subjectData: any;
}> = ({subjectId, title, subjectData, subjectType, data}) => {
  const navigation: any = useNavigation();
  const isCurrentSubjectType = title === parseSubjectType(subjectType);
  return data.length > 0 ? (
    <View style={{marginTop: 16}}>
      <Text style={styles.textBold}>
        {_handlerCapitalizeFirstLetter(title)}
      </Text>

      {data.map((val: MappedKpRegularSearchMaterial, key) => {
        return (
          <View key={key}>
            <ListItem
              title={val?.title || ''}
              containerStyle={{
                backgroundColor: val.is_active ? null : Colors.dark.neutral10,
              }}
              onPress={() => {
                if (isCurrentSubjectType) {
                  return;
                }
                return navigateTo(
                  navigation,
                  val,
                  subjectId,
                  title,
                  subjectData,
                );
              }}
            />
            {
              <SubItem
                subjectId={subjectId}
                title={title}
                subjectType={subjectType}
                feature={val?.feature || []}
              />
            }
          </View>
        );
      })}
    </View>
  ) : null;
};

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  subjectData: any;
  subjectType: string;
};

const SearchModalKpReg: FC<Props> = ({
  modalVisible,
  setModalVisible,
  subjectData,
  subjectType,
}) => {
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');

  const {
    data: {total, learn, practice, test},
  } = useSelector((state: IKpRegularSearchData) => state.kpRegularSearch);

  const removeModal = useCallback(() => {
    setQuery('');
    setLastQuery('');
    setIsSearch(false);
    dispatch(kpRegularSearchDestroy());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (!modalVisible) {
      removeModal();
    }
  }, [modalVisible, dispatch, removeModal]);

  return (
    <SafeAreaView>
      <SwipeUp
        visible={modalVisible}
        styleInnerContainer={styles.searchModalContainer}
        onClose={() => setModalVisible(false)}>
        <Header
          query={query}
          setQuery={setQuery}
          setModalVisible={setModalVisible}
          handleSearch={() => {
            if (query.trim().length < 0) {
              return;
            }
            setIsSearch(true);
            setLastQuery(query);
            dispatch(
              newFetchKpRegularSearch({
                words: query,
                subjectId: subjectData?.id,
                subjectType: parseSubjectType(subjectType),
              }),
            );
          }}
        />

        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}>
          {!isSearch ? (
            <SearchTipsOrNotFound
              title="Tips Pencarian"
              description={
                'Tulis kata kunci untuk mencari materi atau\nsoal di pelajaran.'
              }
            />
          ) : (total || 0) <= 0 ? (
            <SearchTipsOrNotFound
              title="Pencarian Tidak Ditemukan"
              description={`Hasil pencarian "${lastQuery.toUpperCase()}" nihil.\nCoba masukkan kata kunci lainnya!`}
            />
          ) : (
            <View>
              <Text style={styles.textBold}>
                {subjectData?.name} {'\u2022'} {total} Hasil
              </Text>

              <ListGroup
                subjectData={subjectData}
                subjectId={subjectData?.id}
                title="learn"
                subjectType={subjectType}
                data={learn || []}
              />
              <ListGroup
                subjectData={subjectData}
                subjectId={subjectData?.id}
                title="practice"
                subjectType={subjectType}
                data={practice || []}
              />
              <ListGroup
                subjectData={subjectData}
                subjectId={subjectData?.id}
                title="test"
                subjectType={subjectType}
                data={test || []}
              />
            </View>
          )}
        </ScrollView>
      </SwipeUp>
    </SafeAreaView>
  );
};
export {SearchModalKpReg};

const parseSubjectType = (subjectType: string) => {
  if (subjectType === SubjectType.KPRegular.Learn) {
    return 'learn';
  }
  if (subjectType === SubjectType.KPRegular.Practice) {
    return 'practice';
  }
  return 'test';
};

const parseSubjectTypeToNavigate = (subjectType: string) => {
  if (isStringContains(subjectType, 'learn')) {
    return SubjectType.KPRegular.Learn;
  }
  if (isStringContains(subjectType, 'practice')) {
    return SubjectType.KPRegular.Practice;
  }
  return SubjectType.KPRegular.Test;
};

const navigateTo = (
  navigation: any,
  data: KpRegularSearchMaterial,
  subjectId: number,
  subjectType?: any,
  subjectData?: any,
) => {
  const isPractice = isStringContains(
    parseSubjectType(subjectType),
    'practice',
  );
  const isTest = isStringContains(parseSubjectType(subjectType), 'test');
  if ((subjectType && subjectData) || isPractice || isTest) {
    navigation.navigate('KPRegularDetailBab', {
      category: parseSubjectTypeToNavigate(subjectType),
      chapterData: data?.chapter || data?.chapterMaterialData || '',
      subject_name: subjectData?.name || '',
      subject_icon: subjectData?.icon_path_id || '',
      subject_id: subjectData?.id || 0,
      isFromSearchModal: true,
    });
    return;
  }

  switch (data.type) {
    case 'presentation':
      navigation.navigate('VideoPresentationScreen', {
        contentData: data.chapterMaterialData,
        subjectId: subjectId,
        contentType: data.type,
      });
      break;
    case 'ebook':
      navigation.navigate('EbookScreen', {
        chapterData: data.chapterMaterialData,
        subjectId: subjectId,
        contentType: data.type,
      });
      break;
    case 'concept':
      navigation.navigate('ConceptScreen', {
        chapterData: data.chapterMaterialData,
        subjectId: subjectId,
      });
      break;
    case 'video':
      navigation.navigate('VideoAnimationScreen', {
        chapterData: data.chapterMaterialData,
        subjectId: subjectId,
      });
      break;
    default:
      break;
  }
};

export * from './zustand/searchModal';
