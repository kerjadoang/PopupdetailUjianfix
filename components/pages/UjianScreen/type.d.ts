type DetailPaketSoalListMode = 'reorder' | 'detail' | 'delete';

interface ISetPaketSoalMore {
  setShuffleQuestionSelected?: CallBackWithParams<void, boolean>;
  setShuffleAnswersSelected?: CallBackWithParams<void, boolean>;
}
interface IPaketSoalMore {
  shuffleQuestionSelected?: boolean;
  shuffleAnswersSelected?: boolean;
}
