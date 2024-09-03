import {
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {Button} from '@components/atoms';
import RenderHTML from 'react-native-render-html';
import {_htmlWithHTTPS} from '@constants/functional';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
type ToastResultProps = {
  type: 'correct' | 'incorrect' | null;
  answer?: string;
  exactAnswer?: string;
  discussion: string;
  showAnswer?: boolean;
  isTanyaJawab?: boolean;
  isKuis?: boolean;
  titleNext?: string;
  btnTitle?: string;
  totalAnswer?: number;
  onPressNext?: () => void | undefined;
  onPressPrevious?: () => void | undefined;
  contentWidth?: number;
} & ModalProps;

const ToastResult: React.FC<ToastResultProps> = props => {
  return (
    <Modal {...props}>
      <View style={styles.container}>
        <Pressable style={{flexGrow: 1}} onPress={props.onRequestClose} />
        <View style={styles.wrapper}>
          <Text style={[styles.titleBase, props.type && styles[props.type]]}>
            {props.type === 'correct' ? 'Jawaban Benar' : 'Jawaban Salah'}
          </Text>
          <ScrollView style={{marginBottom: 10}}>
            {props.type === 'incorrect' && props.showAnswer && (
              <Text style={styles.answerText}>
                Jawaban Kamu:{' '}
                <Text style={styles.answerTextBold}>{props.answer}</Text>
                {'\n'}
                Jawaban Benar:{' '}
                <Text style={styles.answerTextBold}>{props.exactAnswer}</Text>
              </Text>
            )}
            {(props.isTanyaJawab ||
              (props.isKuis && props.type === 'incorrect')) && (
              <RenderHTML
                baseStyle={{color: Colors.black}}
                contentWidth={props.contentWidth || 100}
                source={{
                  html: _htmlWithHTTPS(props.discussion as string),
                }}
              />
            )}
          </ScrollView>
          <View style={{flexDirection: 'row', gap: 12, marginBottom: 20}}>
            {props.onPressPrevious && (
              <Button
                label="Sebelumnya"
                action={props.onPressPrevious}
                style={{marginTop: 16, flex: 1}}
                outline={true}
              />
            )}
            {props.onPressNext && (
              <Button
                label={props.titleNext || 'Lanjut'}
                action={props.onPressNext}
                style={{marginTop: 16, flex: 1}}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-end'},
  wrapper: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.neutral20,
    maxHeight: WINDOW_HEIGHT * 0.5,
  },
  titleBase: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  correct: {
    color: Colors.success.light1,
  },
  incorrect: {
    color: Colors.danger.base,
  },
  answerText: {
    fontSize: 14,
    color: Colors.dark.neutral100,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  answerTextBold: {fontFamily: 'Poppins-SemiBold'},
  discussionText: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
});

export default ToastResult;
