import Colors from '@constants/colors';
import React from 'react';
import {Text, StyleSheet, View, Modal, Pressable, Image} from 'react-native';
import {IMAGES} from '@constants/image';

export type ITimesUpAlert = {
  show?: boolean;
  action: () => void;
  answered: number;
  questionCount: number;
  testName: string;
};

const TimesUpAlert = ({
  show,
  action,
  answered,
  questionCount,
  testName,
}: ITimesUpAlert) => {
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image source={IMAGES.CryingMaskot} style={styles.iconPng} />
          <Text style={styles.title}>Waktu Habis !</Text>

          <Text style={styles.desc}>
            {`Kamu berhasil menjawab ${answered} dari ${questionCount} tes ${testName}.`}
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={action}>
              <Text style={styles.textStyleOpen}>Kumpulkan</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorModal,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
    width: '100%',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  button: {
    borderRadius: 25,
    padding: 8,
    elevation: 2,
    borderColor: Colors.primary.base,
    borderWidth: 1,
    minWidth: 100,
    margin: 8,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  buttonOpen: {
    backgroundColor: Colors.primary.base,
  },
  buttonClose: {
    backgroundColor: Colors.white,
    color: Colors.primary.base,
  },
  textStyleClose: {
    color: Colors.primary.base,
    textAlign: 'center',
  },
  textStyleOpen: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
    color: Colors.dark.neutral100,
  },
  desc: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.dark.neutral80,
    lineHeight: 22,
  },
  iconConfirm: {
    width: 25,
    height: 25,
    margin: 5,
    resizeMode: 'contain',
  },
  iconPng: {
    width: 100,
    height: 100,
  },
});

export {TimesUpAlert};
