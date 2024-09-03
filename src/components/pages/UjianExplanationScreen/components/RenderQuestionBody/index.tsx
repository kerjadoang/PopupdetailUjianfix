import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {InputText} from '@components/atoms';
import RenderQuestion from '@components/pages/MultipleQuestionTypeScreen/components/RenderQuestion';
import OptionItem from '@components/pages/MultipleChoiceQuestionScreen/components/OptionItem';

type Props = {
  questionType: IRenderQuestionBodyType;
  currentQuestion: number;
  onQuestionChange?: CallBackWithParams<void, IBaseOption | string | undefined>;
  options?: IBaseOption[];
  singleQuestionAnswer?: IBaseOption;
  essayAnswer?: string;
  placeHolder?: string;
  mode: IRenderQuestionBodyMode;
} & RenderQuestionProps;

const RenderQuestionBody: FC<Props> = ({
  bobot,
  imageUrl,
  question,
  questionType,
  options,
  currentQuestion,
  onQuestionChange,
  singleQuestionAnswer,
  essayAnswer,
  placeHolder,
  mode,
}) => {
  const [tempAnswerPG, setTempAnswerPG] = useState<IBaseOption>();
  const [essayInput, setEssayInput] = useState<string | undefined>(essayAnswer);
  const answeredId =
    tempAnswerPG?.id ??
    (options?.find(option => option.id === singleQuestionAnswer?.id) || 0);

  useEffect(() => {
    onQuestionChange?.(tempAnswerPG || essayInput);
  }, [currentQuestion]);

  useEffect(() => {
    if (!essayAnswer) {
      return;
    }
    setEssayInput(essayAnswer);
  }, [essayAnswer]);

  return (
    <View style={styles.container}>
      <RenderQuestion imageUrl={imageUrl} question={question} bobot={bobot} />

      {questionType === 'MCQ' ? (
        <View style={styles.optionContainer}>
          {options
            ?.sort((a, b) => (a.key! > b.key! ? 1 : a.key! < b.key! ? -1 : 0))
            ?.map((item: IBaseOption, idx) => {
              item.answer = item?.answer?.replace(
                'margin-bottom: 0;',
                'margin: 0;',
              );
              return (
                <OptionItem
                  status={
                    answeredId === item.id
                      ? 'filled'
                      : item.is_correct
                      ? 'correct'
                      : undefined
                  }
                  data={item}
                  imageUrl={item.path_url || item.file_id}
                  responseKey="answer"
                  key={idx}
                  onPress={() =>
                    mode === 'ANSWER' ? setTempAnswerPG(item) : undefined
                  }
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
          placeholder={placeHolder}
          onChangeText={text =>
            mode === 'ANSWER' ? setEssayInput(text) : undefined
          }
          disabled={true}
        />
      )}
    </View>
  );
};

export default RenderQuestionBody;
