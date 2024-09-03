import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {FC} from 'react';
import LeftArrow from '@assets/svg/leftArrow.svg';
type Props = {
  message: string;
  action: any;
};
const TopNavigation: FC<Props> = ({message, action}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={action}>
        <LeftArrow width={19} height={19} />
      </TouchableOpacity>
      <Text style={styles.title}>{message}</Text>
      <TouchableOpacity>
        <Image
          source={require('@assets/images/ic_gift.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  container: {
    height: 40,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 19,
    height: 19,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});
