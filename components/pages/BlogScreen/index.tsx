/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {EmptyDisplay} from '@components/atoms';
import Card from '@components/atoms/Card';
import Colors from '@constants/colors';
import Chip from '@components/atoms/Chip';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBlog, fetchTags} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';

const BlogScreen = () => {
  const {tags, blog} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedTag, setSelectedTag] = useState({
    index: 0,
    name: '',
  });

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchBlog(selectedTag?.index));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.background}>
      <Header label="Info Pintar" />

      <View style={styles.tagContainer}>
        <ScrollView horizontal>
          {tags?.data?.data?.map((item, index) => {
            return (
              <Chip
                title={item.name}
                active={selectedTag.index === index ? true : false}
                key={index}
                onPress={() => {
                  setSelectedTag({
                    ...selectedTag,
                    index: index,
                    name: item.name,
                  });
                  dispatch(fetchBlog(item.term_id));
                }}
              />
            );
          })}
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {blog?.data?.data?.length < 1 ? (
            <EmptyDisplay
              title="Blog tidak ditemukan"
              desc={'Cari blog dengan nama tag yang lain'}
            />
          ) : (
            blog?.data?.data?.map((item, index) => {
              return (
                <Card
                  key={index}
                  title={item.post_title}
                  description={'2 menit baca'}
                  image={{uri: item.post_index?.[0]?.open_graph_image}}
                  action={() => {
                    navigation.navigate('BlogDetailScreen', {idBlog: item.id});
                  }}
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '5%',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedBtn: {
    backgroundColor: Colors.primary.base,
    padding: 8,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  tagContainer: {
    padding: 5,
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default BlogScreen;
