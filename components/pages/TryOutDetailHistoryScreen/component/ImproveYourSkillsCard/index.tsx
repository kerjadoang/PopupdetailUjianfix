import React, {FC} from 'react';
import {MainView, MainText} from '@components/atoms';
import {PTNCardClassSession} from '@components/pages/PTNLiveClassHomeScreen/components';
import BankSoalRecommendationCard from '../BankSoalRecommendationCard';
import {useNavigate} from '@hooks/useNavigate';
import {
  _handlerCapitalizeFirstLetter,
  _handlerConvertAllDate,
} from '@constants/functional';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {VideoAnimationParam} from 'type/screen';

type Props = {
  classRecommendation?: PTNClassRecomendation;
  bankSoalRecommendation?: PTNBankSoalRecommendation;
  isEmptyState?: boolean;
};

const ImproveYourSkillsCard: FC<Props> = ({
  classRecommendation,
  bankSoalRecommendation,
  isEmptyState = false,
}: Props) => {
  const {navigateScreen} = useNavigate();
  if ((!classRecommendation && !bankSoalRecommendation) || isEmptyState) {
    return <></>;
  }

  return (
    <MainView marginVertical={14}>
      <MainText fontWeight="bold" fontSize={16}>
        Tingkatkan Kemampuanmu
      </MainText>
      {classRecommendation ? (
        <PTNCardClassSession
          title={_handlerCapitalizeFirstLetter(
            classRecommendation?.subject_ptn?.module ||
              classRecommendation?.module ||
              '',
          )}
          keys={classRecommendation?.ID || 1}
          subtitle={_handlerCapitalizeFirstLetter(
            classRecommendation?.subject_ptn?.name ||
              classRecommendation?.name ||
              '',
          )}
          endTime={classRecommendation?.time_start}
          time={_handlerConvertAllDate(classRecommendation?.time_start, 9)}
          onRecord={() => {
            navigateScreen<VideoAnimationParam>('VideoAnimationScreen', {
              chapterData: classRecommendation,
              type: 'PTN',
            });
          }}
          mentor={classRecommendation?.user_name || ''}
          bodyWidth={WINDOW_WIDTH}
        />
      ) : null}
      {bankSoalRecommendation ? (
        <BankSoalRecommendationCard
          moduleName={bankSoalRecommendation.module || ''}
          subjectName={bankSoalRecommendation.subject_name || ''}
          onPressPelajari={() => navigateScreen('PTNBankSoalScreen')}
        />
      ) : null}
    </MainView>
  );
};

export default ImproveYourSkillsCard;
