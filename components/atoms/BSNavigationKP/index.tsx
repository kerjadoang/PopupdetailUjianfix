import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import ArrowLeft from '@assets/svg/arrow_left.svg';
import ArrowRight from '@assets/svg/arrow_right.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '@constants/colors';

type Props = {
  preview?: boolean;
  pause?: boolean;
};

const BSNavigationKP: FC<Props> = ({preview, pause}) => {
  return (
    <View style={styles.container}>
      <View style={styles.arrowLeft}>
        <ArrowLeft width={30} height={30} />
      </View>

      {preview && <Text style={styles.textOne}>Tinjau</Text>}

      {pause && (
        <View style={styles.wrapperPause}>
          <Icon
            name="pause"
            size={15}
            color={Colors.white}
            style={styles.wrapperPause_icon}
          />

          <Text style={styles.wrapperPause_text}>Jeda</Text>
        </View>
      )}

      <View style={styles.arrowRight}>
        <ArrowRight width={30} height={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  arrowLeft: {
    backgroundColor: Colors.dark.neutral10,
    borderRadius: 22,
    padding: 7,
  },
  textOne: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
    fontWeight: 'bold',
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 22,
    paddingVertical: 5,
    borderRadius: 20,
    letterSpacing: 0.25,
  },
  wrapperPause: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    paddingHorizontal: 10.5,
    paddingVertical: 4,
  },
  wrapperPause_icon: {
    paddingHorizontal: 7,
    paddingVertical: 6,
    backgroundColor: Colors.primary.base,
    borderRadius: 14,
    marginRight: 8,
  },
  wrapperPause_text: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
    fontWeight: 'bold',
  },
  arrowRight: {
    backgroundColor: Colors.primary.base,
    borderRadius: 22,
    padding: 7,
  },
});

export {BSNavigationKP};
