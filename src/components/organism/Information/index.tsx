import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useCallback} from 'react';
import Colors from '@constants/colors';
import useInformation from './useInformation';
import {FlatList} from 'react-native-gesture-handler';

const Information = () => {
  const {blog, navigation} = useInformation();
  const dimensions = Dimensions.get('window');
  // const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width * 0.35;
  const renderInformationCard = useCallback(({item, index}: any) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('BlogDetailScreen', {idBlog: item.id});
        }}
        key={item?.id || index}
        style={{flex: 1, marginHorizontal: 6}}>
        <ImageBackground
          imageStyle={{borderRadius: 10}}
          resizeMode={'cover'}
          source={{
            uri: item.post_index[0]?.open_graph_image,
          }}>
          <View
            style={{
              padding: 10,
              flex: 1,
              justifyContent: 'flex-end',
              width: imageWidth,
              height: 160,
            }}>
            <Text
              style={[styles.titleBlog]}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {item.post_title || '-'}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <Text style={styles.title}>Info Pintar</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('BlogScreen');
          }}>
          <Text
            style={{
              color: Colors.primary.base,
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
            }}>
            Lihat Semua
          </Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={blog?.data?.data}
        renderItem={renderInformationCard}
      />
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    marginTop: 16,
  },
  hr: {
    borderWidth: 0.17,
    opacity: 0.2,
    marginVertical: 10,
    backgroundColor: Colors.primary.light3,
  },
  titleBlog: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
  },
});
