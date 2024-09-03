import React, {useCallback} from 'react';
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  View,
  Dimensions,
} from 'react-native';

import PlayButton from '@assets/svg/ic_play_btn.svg';
import {EmptyData} from '@components/pages/GlobalSearchScreen';
// import {ListItem} from '@components/atoms';
import Colors from '@constants/colors';
import {useSelector} from 'react-redux';
import {ListItem} from '@components/atoms';
import {RouteProp, useRoute} from '@react-navigation/native';
import useScreen from '../useScreen';

const VideoThumbnail = (props: any) => {
  return (
    <ImageBackground source={props.img} style={styles.videoThumbnail}>
      <PlayButton />
    </ImageBackground>
  );
};

const VideoTab: React.FC = () => {
  const specificSearch = useSelector((state: any) => state.specificSearch);
  const route = useRoute<RouteProp<ParamList, 'VideoTabScreen'>>();

  const {query} = route.params;
  const {_handlerNavigationVideo} = useScreen();

  const renderItem = useCallback(({item}: any) => {
    return (
      <ListItem
        {...item}
        titleStyle={{
          width: Dimensions.get('screen').width - 180,
        }}
        left={
          <VideoThumbnail img={require('@assets/images/video_thumbnail.png')} />
        }
        onPress={() => {
          _handlerNavigationVideo(
            item.service_method?.group || '',
            item.service_method?.name || '',
            item,
          );
        }}
      />
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <FlatList
        contentContainerStyle={styles.container}
        data={specificSearch.data.video}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={<EmptyData query={query} />}
        // onEndReached={}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  videoThumbnail: {
    width: 124,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoTab;
