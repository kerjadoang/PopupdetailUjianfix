import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import MapelIpa from '@assets/svg/ic56_mapel_ipa.svg';

import Colors from '@constants/colors';
import {ListItem} from '@components/atoms';
import {useSelector} from 'react-redux';
import {EmptyData} from '@components/pages/GlobalSearchScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import useScreen from '../useScreen';

const SoalTab: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'SoalTabScreen'>>();
  const specificSearch = useSelector((state: any) => state.specificSearch);

  const {query} = route.params;
  const {_handlerNavigationSoal} = useScreen();

  const renderItem = useCallback(({item}: any) => {
    return (
      <ListItem
        {...item}
        left={<MapelIpa />}
        onPress={() => {
          _handlerNavigationSoal(
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
        data={specificSearch.data.soal}
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default SoalTab;
