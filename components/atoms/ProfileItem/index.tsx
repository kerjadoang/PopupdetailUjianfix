import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Laporan from '@assets/svg/laporan.svg';
type Props = {
  title?: string;
  description?: string;
  Image?: any;
  arrow?: boolean;
  type?: number;
  action?: any;
  value?: number;
};

const ProfileItem = ({
  title,
  description,
  Image,
  arrow,
  type,
  action,
  value,
}: Props) => {
  return (
    <TouchableOpacity style={styles.viewContainer} onPress={action}>
      <View style={styles.imgContainer}>
        {type === 3 ? (
          <Laporan width={24} height={24} />
        ) : type === 2 ? (
          <View>
            <Text style={styles.value}>{value}</Text>
          </View>
        ) : (
          <Image width={24} height={24} />
        )}
      </View>
      {type === 3 ? (
        <View style={styles.viewText}>
          <Text style={styles.titleLaporan}>{title}</Text>
        </View>
      ) : (
        <View style={styles.viewText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
      )}
      {arrow && (
        <Icon name="chevron-right" size={24} color={Colors.primary.base} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  imgContainer: {
    backgroundColor: Colors.primary.light2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  viewText: {
    paddingHorizontal: 16,
    flex: 1,
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
    fontStyle: 'normal',
    color: Colors.primary.base,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 11,
    fontStyle: 'normal',
    color: Colors.dark.neutral100,
  },
  titleLaporan: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
    fontStyle: 'normal',
    color: Colors.dark.neutral100,
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
    fontStyle: 'normal',
    color: Colors.dark.neutral80,
  },
});

export {ProfileItem};
