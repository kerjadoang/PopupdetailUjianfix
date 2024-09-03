import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Button, CardWrapper, Chevron, PoppinsText} from '@components/atoms';
import CircleIcon from '@components/atoms/CircleIcon';
import IcPencilEdit from '@assets/svg/ic_edit_pencil.svg';
import IcTrashOutline from '@assets/svg/ic_trash_outline_blue.svg';

type Props = {
  questionNumber?: number;
  isCollapse?: boolean;
  onCollapseChange?: CallBackWithParams<void, any>;
};

const QuestionCard = ({questionNumber = 1, isCollapse = false}: Props) => {
  const [isQuestionCollapse, _] = useState(isCollapse);
  const [isEditMode, setIsEditMode] = useState(false);

  const onSaveQuestion = () => {
    setIsEditMode(false);
  };

  const onDeleteQuestion = () => {
    setIsEditMode(false);
  };

  return (
    <CardWrapper style={styles.container}>
      {/* MARK: START Header */}
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeftContainer}>
            <View style={styles.numberContainer}>
              <PoppinsText
                style={styles.headerTitleBlack}
                type="SemiBoldPoppins">
                {questionNumber}
              </PoppinsText>
            </View>
            <PoppinsText style={styles.headerTitleBlue} type="SemiBoldPoppins">
              Soal {questionNumber}.
            </PoppinsText>
          </View>

          <View style={styles.headerRightContainer}>
            {!isEditMode && (
              <CircleIcon
                isActive={!isEditMode}
                icon={<IcPencilEdit />}
                onPress={() => setIsEditMode(true)}
                containerStyle={styles.pencil}
              />
            )}
            <Chevron isCollapse={isQuestionCollapse} />
          </View>
        </View>
        {isEditMode && (
          <View style={styles.editContainer}>
            <Button
              label="Simpan"
              style={styles.saveButton}
              action={onSaveQuestion}
            />
            <CircleIcon
              icon={<IcTrashOutline />}
              containerStyle={styles.trash}
              onPress={onDeleteQuestion}
            />
          </View>
        )}
      </View>
      {/* MARK: END Header */}
    </CardWrapper>
  );
};

export {QuestionCard};
