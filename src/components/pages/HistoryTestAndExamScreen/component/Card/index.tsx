/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {BlueBackArrow} from '@assets/images';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Button} from '@components/atoms';

type Props = {
  title: string;
  content: any;
  isDataExists?: boolean;
  category: string;
  subjectData: any;
  type?: any;
  setShowPopup?: any;
  popUpData?: any;
  setPopUpData?: any;
};

const Card = ({
  title,
  content,
  isDataExists,
  setShowPopup,
  setPopUpData,
  popUpData,
  category,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  var service = category?.replace('SOAL ', '');

  if (category === 'SOAL Ulangan Harian') {
    service = 'Ulangan Harian Test';
  }

  return (
    <Pressable style={styles.container} onPress={() => setIsOpen(!isOpen)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>{title}</Text>

        {isDataExists ? (
          <View style={{flex: 0.1}}>
            <Image
              source={BlueBackArrow}
              style={
                isOpen === true
                  ? [styles.iconArrow, {transform: [{rotate: '90deg'}]}]
                  : styles.iconArrow
              }
            />
          </View>
        ) : (
          <Button
            action={() => {
              setPopUpData({
                ...popUpData,
                question_package_service_id:
                  popUpData?.question_package_service_id ?? 4,
                category: service,
              });
              setShowPopup(true);
            }}
            label="Kerjakan"
            background={Colors.primary.light3}
            color={Colors.primary.base}
            style={{flex: 0.4}}
          />
        )}
      </View>

      {isOpen || !isDataExists ? <View>{content}</View> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral40,
  },
  iconArrow: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    transform: [{rotate: '270deg'}],
  },
  title: {
    flex: 1,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.black,
  },
});

export default Card;
