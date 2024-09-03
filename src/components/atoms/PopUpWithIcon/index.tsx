import Colors from '@constants/colors';
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button} from '../Button';
import Logo from '@assets/svg/ic_logo.svg';
import Fonts from '@constants/fonts';

type Props = {
  title?: string;
  desc?: string;
  textButton?: string;
  action?: any;
  twoButton?: any;
  textButton_2?: any;
  action_2?: any;
  icon?: any;
  iconName?: any;
};
const PopUpWithIcon = ({
  action_2,
  title,
  desc,
  textButton,
  action,
  textButton_2,
  twoButton,
  icon,
  iconName,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {icon ? iconName : <Logo width={100} height={100} />}
            <Text style={styles.modalText}>{title}</Text>
            <Text
              style={[
                styles.modalText,
                {fontSize: 14, fontFamily: 'Poppins-Regular'},
              ]}>
              {desc}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {twoButton ? (
                <Button
                  label={textButton_2}
                  icon={undefined}
                  color={Colors.primary.base}
                  style={{
                    padding: 10,
                    paddingHorizontal: 40,
                    marginHorizontal: 5,
                  }}
                  background={Colors.white}
                  action={action_2}
                  outline
                  borderColor={Colors.primary.base}
                  // _width={288}
                  // _height={undefined}
                />
              ) : null}
              <Button
                label={textButton}
                icon={undefined}
                color={Colors.white}
                style={{padding: 10, paddingHorizontal: 50}}
                background={Colors.primary.base}
                action={action}
                // _width={288}
                // _height={undefined}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 15,
    textAlign: 'center',
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    color: Colors.dark.neutral100,
  },
});

export {PopUpWithIcon};
