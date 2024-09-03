export * from './MoreItem';
import React, {FC} from 'react';
import styles from './styles';
import {MainView} from '@components/atoms';
import IcShuffleQuestion from '@assets/svg/ic24_shuffle_question_inactive.svg';
import IcShuffleOption from '@assets/svg/ic24_shuffle_option_inactive.svg';
import MoreItem from './MoreItem';
type MorePaketSoalListItemProps = {} & IPaketSoalMore & ISetPaketSoalMore;

const MorePaketSoalListItem: FC<MorePaketSoalListItemProps> = ({
  shuffleAnswersSelected,
  shuffleQuestionSelected,
  setShuffleAnswersSelected,
  setShuffleQuestionSelected,
}) => {
  return (
    <MainView
      position="absolute"
      zIndex={999}
      right={20}
      top={32}
      padding={12}
      style={styles.moreContainer}>
      <MoreItem
        id={1}
        icon={<IcShuffleOption />}
        text="Acak Urutan Soal"
        selected={shuffleQuestionSelected}
        onPress={() => {
          setShuffleQuestionSelected?.(!shuffleQuestionSelected);
        }}
      />
      <MoreItem
        id={2}
        icon={<IcShuffleQuestion />}
        text="Acak Urutan Jawaban"
        selected={shuffleAnswersSelected}
        onPress={() => {
          setShuffleAnswersSelected?.(!shuffleAnswersSelected);
        }}
      />
    </MainView>
  );
};

export default MorePaketSoalListItem;
