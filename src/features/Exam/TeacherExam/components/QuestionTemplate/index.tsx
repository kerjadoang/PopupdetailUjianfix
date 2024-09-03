import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Button, MainView, PoppinsText} from '@components/atoms';
import Colors from '@constants/colors';
import {FlatList} from 'react-native';

const mockQuestionTemplateData = [
  'Soal Pilihan Ganda',
  'Soal Uraian',
  'Soal Uraian Singkat',
  'Soal Menjodohkan',
];

const SeparatorItem = () => <MainView width={8} />;

const RenderItem = ({
  item,
}: IFlatListItem<(typeof mockQuestionTemplateData)[0]>) => {
  return (
    <Button
      label={item}
      background={Colors.primary.light3}
      textStyle={styles.buttonText}
      style={styles.button}
    />
  );
};

type Props = {};

const QuestionTemplate = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.templateContainer}>
        <PoppinsText style={styles.templateText}>
          Belum punya file template?
        </PoppinsText>
        <PoppinsText style={styles.templateText}>
          unduh template soal berikut
        </PoppinsText>
      </View>
      <FlatList
        horizontal
        data={mockQuestionTemplateData}
        ItemSeparatorComponent={SeparatorItem}
        renderItem={RenderItem}
      />
    </View>
  );
};

export {QuestionTemplate};
