import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import {renderStripe} from '@constants/functional';
import React from 'react';
import {View, Text, StyleSheet, Modal, ModalProps} from 'react-native';

import RibbonIcon from '@assets/svg/group_39947.svg';
import RobotIcon from '@assets/svg/maskot_8.svg';

type ModalDoneProps = {
  subject?: string;
  chapter?: string;
  onDone?: () => void;
  title?: string;
} & ModalProps;

const ModalDone: React.FC<ModalDoneProps> = props => {
  return (
    <Modal {...props} animationType="slide">
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <RibbonIcon style={styles.ribbonIcon} />
          <RobotIcon width={97} height={97} />
          <Text style={styles.title}>
            {props.title || 'PR Berhasil Dikumpulkan'}
          </Text>
          <Text style={styles.subjectChapter}>
            {renderStripe(props.subject)} {'\u2022'}{' '}
            {renderStripe(props.chapter)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="OK"
            action={() => props.onDone?.()}
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  contentContainer: {flex: 2, justifyContent: 'flex-end', alignItems: 'center'},
  ribbonIcon: {marginBottom: -40},
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.dark.neutral100,
    marginTop: 20,
  },
  subjectChapter: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral60,
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  button: {alignSelf: 'flex-end', width: '100%'},
});

export default ModalDone;
