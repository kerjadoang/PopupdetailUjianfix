import React from 'react';
import {MainView} from '@components/atoms';
import {View} from 'react-native';
import {Text} from 'react-native';
import {styles} from '../styles';
import Fonts from '@constants/fonts';
import {Pressable} from 'react-native';
import {TextInput} from 'react-native';
import Plus from '@assets/svg/fluent_add_circle.svg';
import Minus from '@assets/svg/akar_icons_circle.svg';
import Colors from '@constants/colors';

interface Props {
  item: any;
  index: number;
  addBasicCompetencyDetail: VoidCallBack;
  deleteBasicCompetencyDetail: CallBackWithParams<void, number>;
  handleTitleChange: CallBackWith2Params<void, string, number>;
  handleNotesChange: CallBackWith2Params<void, string, number>;
}

const InputKDForm: React.FC<Props> = ({
  item,
  index,
  addBasicCompetencyDetail,
  deleteBasicCompetencyDetail,
  handleNotesChange,
  handleTitleChange,
}) => {
  const currentNumber = index + 1;
  return (
    <MainView key={index}>
      <View style={[styles.addKD, {marginVertical: 12}]}>
        <Text
          style={[
            styles.textTitle,
            {fontSize: 14, fontFamily: Fonts.SemiBoldPoppins},
          ]}>
          Kompetensi Dasar {currentNumber}
        </Text>
        <View style={[styles.addKD, {marginRight: 5}]}>
          <Pressable
            style={styles.buttonPlus}
            onPress={addBasicCompetencyDetail}>
            <Plus />
          </Pressable>
          <Pressable
            style={styles.buttonMinus}
            onPress={() => deleteBasicCompetencyDetail(item?.no)}>
            <Minus />
          </Pressable>
        </View>
      </View>
      <Text style={{marginBottom: 8}}>Bab {currentNumber}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tulis Judul"
        defaultValue={item?.chapter}
        placeholderTextColor={Colors.dark.neutral50}
        onChangeText={text => handleTitleChange(text, index)}
      />
      <Text style={{marginBottom: 8}}>Catatan (optional)</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Tulis Catatan"
        placeholderTextColor={Colors.dark.neutral50}
        defaultValue={item?.notes}
        onChangeText={text => handleNotesChange(text, index)}
      />
    </MainView>
  );
};

export default InputKDForm;
