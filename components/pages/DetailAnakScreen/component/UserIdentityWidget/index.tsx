import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './style';

const UserIdentityWidget = ({image, name, class_name, school_name}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageOutterContainer}>
        <View style={styles.imageInnerContainer}>
          <Image source={{uri: image}} style={styles.imageUser} />
        </View>
      </View>

      <View style={styles.badgeNameContainer}>
        <Text style={styles.badgeName}>{name}</Text>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.badgeClassContainer}>
          <Text style={styles.badgeClassText}>{class_name || ' - '}</Text>
          <Text style={styles.badgeClassText}>{' • '}</Text>
          <Text style={styles.badgeClassText}>{school_name || ' - '}</Text>
        </View>
      </View>
    </View>
  );
};

export {UserIdentityWidget};
