/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  logo?: any;
  title: any;
  description: any;
  onPress?: any;
};
const CardLaporanAnakSaya: FC<Props> = ({
  logo,
  onPress,
  title,
  description,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.flexRow,
        {
          backgroundColor: Colors.primary.light3,
          paddingVertical: 12,
          paddingLeft: 20,
          borderRadius: 10,
          marginBottom: 8,
        },
      ]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '5%',
        }}>
        <Image source={logo} style={styles.icon} />
      </View>
      <View style={[styles.flexCol, {flex: 1}]}>
        <View>
          <Text
            style={[
              styles.font,
              {
                fontWeight: '600',
                fontSize: 14,
                marginBottom: 4,
              },
            ]}>
            {title}
          </Text>
          <Text
            style={[
              styles.font,
              {
                fontWeight: '400',
                fontSize: 12,
                color: Colors.dark.neutral80,
              },
            ]}>
            {description}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '5%',
        }}>
        <Icon
          name="chevron-right"
          size={16}
          color={Colors.primary.base}
          style={styles.icon}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  icon: {
    padding: 8,
  },
  font: {
    fontFamily: 'Poppins-Regular',
  },
});

export {CardLaporanAnakSaya};
