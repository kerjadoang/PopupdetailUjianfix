/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchExplanationTryout} from '@redux';
import {RootState} from 'src/redux/rootReducer';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const useExplanation = () => {
  const route = useRoute<RouteProp<ParamList, 'ExplanationTryOutScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ExplanationTryOutScreen'>>();
  const dispatch = useDispatch();
  const {tyroutHistoryId, subjectId, testName}: any = route.params;
  const [selectedStatus, setSelectedStatus] = useState('correct');
  const [explanationData, setExplanationData] = useState();

  //List status soal
  const status = [
    {label: 'Benar', value: 'correct'},
    {label: 'Salah', value: 'wrong'},
    {label: 'Dilewati', value: 'pass'},
  ];
  const {getExplanationTryout}: any = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(
      fetchExplanationTryout(tyroutHistoryId, subjectId, selectedStatus),
    );
  }, []);

  const filterExplanation = (status: any) => {
    switch (status) {
      case 'wrong':
        return getExplanationTryout?.data?.wrong_answer;

      case 'pass':
        return getExplanationTryout?.data?.pass_answer;

      default:
        return getExplanationTryout?.data?.correct_answer;
    }
  };

  return {
    getExplanationTryout,
    status,
    selectedStatus,
    setSelectedStatus,
    route,
    navigation,
    testName,
    filterExplanation,
    explanationData,
    setExplanationData,
  };
};

export {useExplanation};
