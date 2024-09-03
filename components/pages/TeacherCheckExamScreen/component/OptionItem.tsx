import React from 'react';
import CorrectSign from '@assets/svg/ic24_check_green.svg';
import IncorrectSign from '@assets/svg/ic24_x_red.svg';

import {Option} from '@services/lpt/type';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Colors from '@constants/colors';
import RenderHTML from 'react-native-render-html';
import {_htmlWithHTTPS} from '@constants/functional';
import {CCheckBox, MainView} from '@components/atoms';
import RenderImage from '@components/atoms/RenderImage';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

type OptionItemProps = {
  data?: Option;
  correctAnswer?: any;
  userAnswer?: any;
  hideOptionSign?: boolean;
  is_correct?: boolean;
  isPGKompleks?: boolean;
  isChecked?: boolean;
};

const OptionItem: React.FC<OptionItemProps> = (props: any) => {
  const {}: OptionItemProps = props;
  const isCorrect = props?.data?.is_correct;
  const isSelected = props?.data?.id === props?.userAnswer;

  const getOptionHighlight = () => {
    if (props.isPGKompleks) {
      return styles.btnBase;
    }
    if (isSelected) {
      return [
        styles.btnBase,
        isCorrect ? styles.btnCorrect : styles.btnInCorrect,
      ];
    }

    return [styles.btnBase, isCorrect ? styles.btnCorrect : undefined];
  };

  const getOptionTextStyle = () => {
    if (props.isPGKompleks) {
      return styles.textOption;
    }
    if (isSelected) {
      return [
        styles.textOption,
        isCorrect ? styles.correctOption : styles.incorrectOption,
      ];
    }

    return isCorrect
      ? [styles.textOption, styles.correctOption]
      : styles.textOption;
  };

  const getOptionSign = () => {
    if (isSelected) {
      return isCorrect ? true : false;
    }

    return isCorrect || null;
  };

  return (
    <View style={[getOptionHighlight()]}>
      {props.isPGKompleks ? (
        <CCheckBox
          isChecked={props.isChecked || false}
          customStyle={{marginRight: 10, marginTop: 2}}
        />
      ) : null}
      <Text style={[getOptionTextStyle()]}>
        {props.data?.key?.toUpperCase()}.
      </Text>

      <MainView flexDirection="row" alignItems="center" marginVertical={4}>
        <MainView flex={6}>
          <RenderHTML
            contentWidth={Dimensions.get('window').width}
            baseStyle={styles.textOptionAnswer}
            source={{
              html: _htmlWithHTTPS(
                props?.data?.[props?.responseKey ?? 'answer'],
              ),
            }}
          />

          {!!props.data?.file_id && (
            <RenderImage
              imageId={props.data?.file_id}
              width={150}
              height={WINDOW_HEIGHT * 0.25}
              style={{alignSelf: 'flex-start'}}
            />
          )}
        </MainView>
        {!props.isPGKompleks ? (
          <MainView flex={1}>{renderSign(getOptionSign())}</MainView>
        ) : null}
      </MainView>
    </View>
  );
};

const renderSign = (status: any) => {
  switch (status) {
    case true:
      return <CorrectSign />;

    case false:
      return <IncorrectSign />;

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  btnBase: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  btnCorrect: {
    borderColor: Colors.success.base,
    backgroundColor: Colors.success.light2,
  },
  btnInCorrect: {
    borderColor: Colors.danger.base,
    backgroundColor: Colors.danger.light2,
  },
  optionDisabled: {
    backgroundColor: Colors.dark.neutral20,
  },
  optionTextDisabled: {
    color: Colors.dark.neutral60,
  },
  correct: {
    borderWidth: 2,
    borderColor: Colors.success.light1,
    backgroundColor: Colors.success.light2,
  },
  incorrect: {
    borderWidth: 2,
    borderColor: Colors.danger.base,
    backgroundColor: Colors.danger.light2,
  },
  filled: {
    borderWidth: 2,
    borderColor: Colors.orange.base,
    backgroundColor: Colors.orange.light1,
  },
  correctOption: {
    color: Colors.success.light1,
  },
  incorrectOption: {
    color: Colors.danger.base,
  },
  textOption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral60,
    marginRight: 10,
  },
  textOptionAnswer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral100,
    flexGrow: 1,
  },
});

export default OptionItem;
