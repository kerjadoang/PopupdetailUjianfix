import React from 'react';
import CorrectSign from '@assets/svg/ic24_check_green.svg';
import IncorrectSign from '@assets/svg/ic24_x_red.svg';

import {Option} from '@services/lpt/type';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import Colors from '@constants/colors';
import {parseHtml} from '@constants/functional';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import {CCheckBox, MainView} from '@components/atoms';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import RenderImage from '@components/atoms/RenderImage';

type OptionItemProps = {
  isPGKomplek?: boolean;
  data?: Option;
  status?: 'correct' | 'incorrect' | 'filled' | null;
  onPress?: CallBackWithParams<void, any>;
  disabled?: PressableProps['disabled'];
  disabledStyle?: boolean;
  imageUrl?: string;
  imageId?: string;
  responseKey?: 'answer' | 'description';
  contentWidth?: number;
  isChecked?: boolean;
  onPressCheck?: () => void | any;
};

const OptionItem: React.FC<OptionItemProps> = props => {
  const isNullStatus = props.status === undefined || props.status === null;
  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        styles.btnBase,
        props.disabledStyle && styles.optionDisabled,
        props.status && styles[props.status as keyof OptionItemProps['status']],
      ]}>
      <MainView
        flex={isNullStatus ? 0 : 1}
        flexDirection="row"
        alignItems="center">
        {props.isPGKomplek ? (
          <CCheckBox
            isChecked={props.isChecked || false}
            customStyle={{marginRight: 10, marginTop: 2}}
            onPressCheck={props.onPressCheck}
          />
        ) : null}
        <Text
          style={[
            styles.textOption,
            props.disabledStyle && styles.optionTextDisabled,
            props.status === 'correct' && styles.correctOption,
            props.status === 'incorrect' && styles.incorrectOption,
          ]}>
          {props.data?.key?.toUpperCase()}.
        </Text>
        <MainView flex={isNullStatus ? 1 : 12}>
          <Pressable
            onPress={props.onPress}
            style={({pressed}) => ({opacity: pressed ? 0.4 : 1})}>
            <MainView>
              <MainView marginTop={10} />
              {/* <Text>{props.data?.[props.responseKey ?? 'answer']}.</Text> */}
              <RenderHtmlView
                contentWidth={props.contentWidth || 100}
                baseStyle={styles.textOptionAnswer}
                disableImagePreview={true}
                imgTagStyle={{
                  marginLeft: 16,
                  maxHeight: WINDOW_HEIGHT * 0.4,
                  maxWidth: WINDOW_WIDTH - 100,
                  alignSelf: 'flex-start',
                }}
                onImagePress={(imageUrl: any) => props.onPress?.(imageUrl)}
                source={{
                  html: parseHtml(
                    props.data?.[props.responseKey ?? 'answer'] as string,
                  ),
                }}
              />
              {props.imageUrl || props.imageId ? (
                <RenderImage
                  imageUrl={props.imageUrl}
                  imageId={props.imageId}
                  width={WINDOW_WIDTH * 0.7}
                  height={200}
                  onPress={() => props.onPress?.(props.data)}
                  style={{
                    width: WINDOW_WIDTH * 0.7,
                    height: 200,
                    alignSelf: 'flex-start',
                    zIndex: -99,
                  }}
                  placeholder={
                    <View style={{width: WINDOW_WIDTH * 0.7, height: 200}} />
                  }
                />
              ) : null}
            </MainView>
            {/* {validateHTMLString(props.data?.[props.responseKey ?? 'answer']) ? (
              <RenderHtmlView
                contentWidth={props.contentWidth || 100}
                baseStyle={styles.textOptionAnswer}
                disableImagePreview={true}
                imgTagStyle={{
                  marginLeft: 16,
                  maxHeight: WINDOW_HEIGHT * 0.05,
                  maxWidth: WINDOW_WIDTH - 100,
                  alignSelf: 'flex-start',
                }}
                onImagePress={(imageUrl: any) => props.onPress?.(imageUrl)}
                source={{
                  html: parseHtml(
                    props.data?.[props.responseKey ?? 'answer'] as string,
                  ),
                }}
              />
            ) : (
              <MainView>
                <MainView marginTop={10} />
                <Text style={styles.textOptionAnswer}>
                  {props.data?.[props.responseKey ?? 'answer']}.
                </Text>
                {props.imageUrl || props.imageId ? (
                  <RenderImage
                    imageUrl={props.imageUrl}
                    imageId={props.imageId}
                    width={WINDOW_WIDTH * 0.7}
                    height={200}
                    onPress={() => props.onPress?.(props.data)}
                    style={{alignSelf: 'flex-start', zIndex: -99}}
                  />
                ) : null}
              </MainView>
            )} */}
          </Pressable>
        </MainView>
      </MainView>
      <MainView flex={isNullStatus ? 0 : 1}>
        {renderSign(props.status)}
      </MainView>
    </Pressable>
  );
};

const renderSign = (status: OptionItemProps['status']) => {
  switch (status) {
    case 'correct':
      return <CorrectSign />;

    case 'incorrect':
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
  checked: {
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
    includeFontPadding: false,
  },
  textOptionAnswer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral100,
    flex: 1,
    includeFontPadding: false,
    lineHeight: 14,
  },
});

export default OptionItem;
