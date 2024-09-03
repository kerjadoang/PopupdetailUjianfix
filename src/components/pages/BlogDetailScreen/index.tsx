/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBlogD} from '@redux';
import {Header} from '@components/atoms/Header';
import {BlueRightArrow} from '@assets/images';
import Colors from '@constants/colors';
import BlueArrowLeft from '@assets/svg/blueArrowLeft.svg';
import {useRoute} from '@react-navigation/native';
import {RootState} from 'src/redux/rootReducer';
import dayjs from 'dayjs';
import Information from '@components/organism/Information';

const BlogDetailScreen = () => {
  const route = useRoute();
  const {idBlog}: any = route.params;
  const dispatch: any = useDispatch();
  const {blogDetail}: any = useSelector((state: RootState) => state);
  const scrollRef = useRef<any>();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const formatedDate = (x: any) => {
    return dayjs(x).format('Do MMM YYYY');
  };

  useEffect(() => {
    if (idBlog !== null) {
      dispatch(fetchBlogD(idBlog));
    }
  }, [dispatch, idBlog]);

  const dumHtml = `
<style>
#content{
  font-size:45;
  padding: 15px;
}
</style>
<body><div id="content">${blogDetail?.data?.post_content}<div></body>`;
  return (
    <SafeAreaView style={styles.background}>
      {blogDetail.data ? (
        <View>
          <Header
            label={'Info Pintar'}
            iconRight={
              <Image
                source={BlueRightArrow}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
            }
            onPressIconRight={() => {}}
          />
          <ScrollView ref={scrollRef}>
            <View style={styles.body}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tagsRow}>
                  {blogDetail?.data?.post_tags?.map(
                    (item: any, index: number) => {
                      return (
                        <View key={index} style={styles.tagsContainer}>
                          <Text style={styles.tags}>{item?.tags?.name}</Text>
                        </View>
                      );
                    },
                  )}
                </View>
              </ScrollView>

              <Text style={styles.title}>{blogDetail?.data?.post_title}</Text>
              <Text style={styles.date}>
                {formatedDate(blogDetail?.data?.post_date)}
              </Text>
              {blogDetail?.data?.post_index?.map((item: any, index: number) => {
                return (
                  <Image
                    key={index}
                    source={{
                      uri: item?.open_graph_image,
                    }}
                    style={styles.imgCover}
                  />
                );
              })}

              <View>
                <WebView
                  source={{
                    html: dumHtml,
                  }}
                  style={{width: '100%', height: 2000, overflow: 'visible'}}
                />
                <View style={{paddingVertical: 10}}>
                  <TouchableOpacity
                    onPress={onPressTouch}
                    style={styles.toTopBtn}>
                    <BlueArrowLeft
                      width={15}
                      height={15}
                      style={{
                        alignSelf: 'center',
                        transform: [{rotate: '90deg'}],
                      }}
                    />
                    <Text style={styles.textBtn}>Kembali Ke atas</Text>
                  </TouchableOpacity>
                  <View style={{marginVertical: 25}}>
                    <Information />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: '5%',
    backgroundColor: 'white',
  },
  body: {
    paddingHorizontal: '5%',
    width: '100%',
    // marginVertical: '2%',
    paddingBottom: '10%',
  },
  title: {
    width: '100%',
    fontFamily: 'Poppins-Bold',
    fontSize: 23,
  },
  date: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    marginVertical: 15,
  },
  imgCover: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tagsContainer: {
    backgroundColor: Colors.primary.light2,
    borderRadius: 25,
  },
  tags: {
    color: Colors.primary.base,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  toTopBtn: {
    borderRadius: 15,
    backgroundColor: Colors.primary.light2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  iconBtn: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textBtn: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
});

export default BlogDetailScreen;
