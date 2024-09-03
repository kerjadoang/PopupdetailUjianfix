import Colors from '@constants/colors';
import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  PressableProps,
  Text,
} from 'react-native';

type CoachMarkItemProps = {
  message: string;
  title: string;
  onSkipPress?: PressableProps['onPress'];
  totalCoachMark?: number;
  queue?: number;
};

const DotIndicator = (props: any) => {
  return (
    <View style={{marginTop: 12, flexDirection: 'row', gap: 4}}>
      {Array(props.totalCoachMark)
        .fill(0)
        .map((_, index) => (
          <View
            key={`${index}`}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                index + 1 === props.queue
                  ? Colors.primary.base
                  : Colors.dark.neutral40,
            }}
          />
        ))}
    </View>
  );
};

const CochmarkItemLeaderBoard: FC<CoachMarkItemProps> = props => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('@assets/images/coachmark.gif')}
      />
      <View style={styles.message}>
        <Text style={[styles.messageText, styles.title]}>{props.title}</Text>
        <Text style={styles.messageText}>{props.message}</Text>
        {props.totalCoachMark && <DotIndicator {...props} />}
        <View style={styles.viewButton}>
          <Pressable style={styles.continue}>
            <Text style={[styles.buttonText, styles.continueText]}>Tutup</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginHorizontal: 16,
    backgroundColor: '#FFF',
    maxWidth: 300,
    position: 'relative',
    marginLeft: 90,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {maxWidth: '90%'},
  image: {
    width: 95,
    height: 118,
    resizeMode: 'contain',
    marginLeft: -80,
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  continue: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: Colors.primary.base,
    borderRadius: 20,
  },
  continueText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  messageText: {
    lineHeight: 22,
    letterSpacing: -0.15,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(246,246,246)',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgb(7, 112, 205)',
    fontFamily: 'Poppins-SemiBold',
  },
});

export {CochmarkItemLeaderBoard};
