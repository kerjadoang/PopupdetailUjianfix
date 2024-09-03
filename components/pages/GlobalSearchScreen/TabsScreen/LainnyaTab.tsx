import React, {useCallback} from 'react';
import {StyleSheet, FlatList, Image, View, Dimensions} from 'react-native';

import {ListItem} from '@components/atoms';
import Colors from '@constants/colors';
import {useSelector} from 'react-redux';
import {EmptyData} from '@components/pages/GlobalSearchScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import useScreen from '../useScreen';

const VideoThumbnail = (props: any) => {
  return <Image source={props.img} style={styles.videoThumbnail} />;
};

const LainnyaTab: React.FC = () => {
  const specificSearch = useSelector((state: any) => state.specificSearch);
  const route = useRoute<RouteProp<ParamList, 'LainnyaTabScreen'>>();

  const {query} = route.params;
  const {_handlerNavigationLainnya} = useScreen();

  const renderItem = useCallback(({item}: any) => {
    return (
      <ListItem
        titleStyle={{
          width: Dimensions.get('screen').width - 180,
        }}
        left={<VideoThumbnail img={{uri: item?.thumbnail}} />}
        onPress={() => {
          _handlerNavigationLainnya(item.service_method?.group || '', item);
        }}
        {...item}
      />
    );
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <FlatList
        contentContainerStyle={styles.container}
        data={specificSearch.data.lainnya}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyData query={query} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
  },
  videoThumbnail: {
    width: 124,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LainnyaTab;
