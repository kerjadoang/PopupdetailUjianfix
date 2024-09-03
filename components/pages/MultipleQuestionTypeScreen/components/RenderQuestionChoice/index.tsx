import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import OptionItem from '@components/pages/MultipleChoiceQuestionScreen/components/OptionItem';
import {InputText} from '@components/atoms';
import {ILMSUjianSingleQuestionAnswer} from '@services/lms/type';
// import OptionItem from '../MultipleChoiceQuestionScreen/components/OptionItem';

type Props = {
  isPG?: boolean;
  options?: IBaseOption[];
  sinlgeQuestionAnswer?: ILMSUjianSingleQuestionAnswer;
  currentQuestion?: number;
  onChangeQuestion?: CallBackWithParams<void, IBaseOption | string | undefined>;
};

const RenderQuestionChoice: FC<Props> = ({
  isPG,
  options,
  sinlgeQuestionAnswer,
  currentQuestion,
  onChangeQuestion,
}) => {
  const [tempAnswerPG, setTempAnswerPG] = useState<IBaseOption>();
  const [essayInput, setEssayInput] = useState<string | undefined>(undefined);
  const answeredId =
    tempAnswerPG?.id ??
    options?.filter(
      option => option.id === sinlgeQuestionAnswer?.selected_options,
    )?.[0]?.id ??
    0;

  useEffect(() => {
    onChangeQuestion?.(isPG ? tempAnswerPG : essayInput);
  }, [currentQuestion]);

  return (
    <View style={styles.container}>
      {isPG ? (
        <View style={styles.optionContainer}>
          {options
            ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
            ?.map((item: IBaseOption) => {
              item.answer = item?.answer?.replace(
                'margin-bottom: 0;',
                'margin: 0;',
              );
              return (
                <OptionItem
                  status={answeredId === item.id ? 'filled' : undefined}
                  data={item}
                  imageUrl={item.path_url || item.file_id}
                  responseKey="answer"
                  key={item.key}
                  onPress={() => setTempAnswerPG(item)}
                />
              );
            })}
        </View>
      ) : (
        <InputText
          multiline
          bottom={16}
          isNotOutline
          borderRadius={10}
          value={essayInput || ''}
          inputTextStyle={{height: 120}}
          placeholder={'Tulis jawabanmu di sini...'}
          onChangeText={text => setEssayInput(text)}
        />
      )}
    </View>
  );
};

export default RenderQuestionChoice;
