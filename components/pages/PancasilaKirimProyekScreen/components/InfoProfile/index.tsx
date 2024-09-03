import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Image} from 'react-native';
import Colors from '@constants/colors';

type Props = {
  name: string;
  avatar?: string;
  nik: string;
};

const InfoProfile: FC<Props> = ({name, avatar, nik}) => {
  return (
    <View style={{flexDirection: 'row', marginBottom: 24}}>
      <Image
        source={{
          uri:
            avatar ||
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        }}
        style={styles.imageProfile}
      />
      <View style={styles.infoProfile}>
        <Text style={styles.title}>{name}</Text>
        <Text style={[styles.title, {color: Colors.dark.neutral80}]}>
          Nik: {nik}
        </Text>
      </View>
    </View>
  );
};

export default InfoProfile;
