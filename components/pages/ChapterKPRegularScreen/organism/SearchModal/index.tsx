/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useLayoutEffect, useState} from 'react';
import {Image, Modal, Pressable, ScrollView, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './style';
import Colors from '@constants/colors';
import SearchIcon from '@assets/svg/ic_search_blue.svg';
import ResetIcon from '@assets/svg/close_x.svg';
import {InputText} from '@components/atoms';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {
  IKpRegularSearchData,
  fetchKpRegularSearch,
  kpRegularSearchDestroy,
} from '@redux';

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

const ListItem: FC<{type?: string; title: string; description?: string}> = ({
  type,
  title,
  description,
}) => {
  return (
    <List.Item
      style={[
        type === 'sub' && {marginLeft: 35},
        {
          borderBottomWidth: 1,
          borderBottomColor: Colors.dark.neutral20,
        },
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

const ListGroup: FC<{title: string; data: []}> = ({title, data}) => {
  return data.length > 0 ? (
    <View style={{marginTop: 16}}>
      <Text style={styles.textBold}>{title}</Text>

      {data.map((val: any, key) => (
        <View key={key}>
          <ListItem title={val?.chapter_name} />

          {val?.list.map((_val: any, _key: number) => (
            <ListItem
              key={_key}
              type="sub"
              title={_val?.service_type}
              description={_val?.name}
            />
          ))}
        </View>
      ))}
    </View>
  ) : null;
};

type Props = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  subjectData: any;
};

const SearchModal: FC<Props> = ({
  modalVisible,
  setModalVisible,
  subjectData,
}) => {
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');

  const {
    kpRegularSearch: {
      loading,
      data: {total, learn, practice, test},
    },
  } = useSelector((state: IKpRegularSearchData) => state);

  useLayoutEffect(() => {
    if (!modalVisible) {
      setQuery('');
      setLastQuery('');
      setIsSearch(false);
      dispatch(kpRegularSearchDestroy());
    }
  }, [modalVisible, dispatch]);

  return (
    <>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Header
          query={query}
          setQuery={setQuery}
          setModalVisible={setModalVisible}
          handleSearch={() => {
            if (query.trim().length > 0) {
              setIsSearch(true);
              setLastQuery(query);
              dispatch(fetchKpRegularSearch({words: query}));
            }
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
          ) : total <= 0 ? (
            <SearchTipsOrNotFound
              title="Pencarian Tidak Ditemukan"
              description={`Hasil pencarian "${lastQuery.toUpperCase()}" nihil.\nCoba masukkan kata kunci lainnya!`}
            />
          ) : (
            <View>
              <Text style={styles.textBold}>
                {subjectData?.name} {'\u2022'} {total} Hasil
              </Text>

              <ListGroup title="Learn" data={learn} />
              <ListGroup title="Practice" data={practice} />
              <ListGroup title="Test" data={test} />
            </View>
          )}
        </ScrollView>
      </Modal>

      {loading ? <LoadingIndicator /> : null}
    </>
  );
};

export {SearchModal};
