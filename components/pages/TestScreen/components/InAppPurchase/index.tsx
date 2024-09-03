import React, {FC} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import useInAppPurchase from './useInAppPurchase';
import {Button} from '@components/atoms';

type Props = {};

const InAppPurchase: FC<Props> = ({}) => {
  const {products, buyProducts} = useInAppPurchase();
  return (
    <FlatList
      data={products}
      renderItem={({item, index}) => {
        return (
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text style={styles.titleLabel}>{index + 1 + '. '}</Text>
              <Text style={styles.titleLabel}>{item.title}</Text>
            </View>
            <Text style={styles.descriptionLabel}>
              {'deskripsi : ' + item.description}
            </Text>
            <Button
              action={() => buyProducts(item)}
              label={'$' + item.price}
              style={styles.button}
            />
          </View>
        );
      }}
    />
  );
};

export default InAppPurchase;
