import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {fetchSoalVideo} from '@redux';

interface RootState {
  getSoalVideo: any;
}
const useFormQuestion = (chapterData: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (chapterData?.id) {
      dispatch(fetchSoalVideo(chapterData.id));
    }
  }, [chapterData, dispatch]);

  const getSoalVideo = useSelector(
    (state: RootState) => state?.getSoalVideo?.data,
  );
  return {
    getSoalVideo,
  };
};

export default useFormQuestion;
