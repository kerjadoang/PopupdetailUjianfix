import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styles from './styles';
import RenderImage from '@components/atoms/RenderImage';
import {isDeepEqual, parseHtml} from '@constants/functional';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

const propsAreEqual = (
  prevProps: RenderQuestionProps,
  nextProps: RenderQuestionProps,
) => isDeepEqual(prevProps, nextProps);

const RenderQuestion: FC<RenderQuestionProps> = React.memo(
  ({question, imageUrl, bobot}) => {
    return (
      <View>
        <View style={styles.labelQuestionContainer}>
          <Text style={styles.labelQuestion}>PERTANYAAN</Text>
          <Text style={styles.labelMarks}>Bobot: {bobot ?? 0}</Text>
        </View>
        {imageUrl && (
          <View style={styles.imageContainer}>
            <RenderImage
              imageUrl={imageUrl}
              placeholder={
                <View style={{width: WINDOW_WIDTH - 32, height: 200}} />
              }
              width={WINDOW_WIDTH - 32}
              height={200}
              style={{width: WINDOW_WIDTH - 32, height: 200}}
              showPreviewImage={true}
            />
          </View>
        )}

        <RenderHtmlView
          baseStyle={{color: Colors.black}}
          contentWidth={Dimensions.get('screen').width - 32}
          source={{
            html: parseHtml(question as string),
          }}
        />
        {/* {validateHTMLString(question) ? (
        <RenderHtmlView
          baseStyle={{color: Colors.black}}
          contentWidth={Dimensions.get('screen').width - 32}
          source={{
            html: parseHtml(question as string),
          }}
        />
      ) : (
        <Text style={styles.textQuestion}>{question}</Text>
      )} */}
      </View>
    );
  },
  propsAreEqual,
);

export default RenderQuestion;
