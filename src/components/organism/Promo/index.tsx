import {StyleSheet, View, Text, Dimensions} from 'react-native';
import React, {FC, useCallback} from 'react';
import Colors from '@constants/colors';
import usePromo from './usePromo';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RenderImage from '@components/atoms/RenderImage';
import {FlatList} from 'react-native-gesture-handler';
import {INavigation} from 'type/screen';

type Props = {
  data?: any;
  onPress?: any;
};

const Promo: FC<Props> = () => {
  const {promo} = usePromo();
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width * 0.8;
  const navigation = useNavigation<INavigation<'HomeScreen'>>();

  const renderPromoBanner = useCallback(
    ({item, index}: any) => {
      const onBannerPress = () => {
        navigation?.navigate('PromoDetailScreen', {
          data: item,
          uuid: item?._id,
        });
      };
      return (
        <Pressable
          key={item?._id || index}
          onPress={onBannerPress}
          style={[styles.shadowProp, styles.card, {marginHorizontal: 8}]}>
          <RenderImage
            imageId={item?.id_image}
            onPress={onBannerPress}
            style={{width: imageWidth, height: 122, borderRadius: 8}}
            placeholder={
              <View style={{width: imageWidth, height: 122, borderRadius: 8}} />
            }
          />
        </Pressable>
      );
    },
    [imageWidth, navigation],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promo & Event</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={promo?.data as any}
        renderItem={renderPromoBanner}
      />
    </View>
  );
};

export default Promo;

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

  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginBottom: 16,
  },
});
