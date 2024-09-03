import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {fetchBlog} from '@redux';
import {useNavigation} from '@react-navigation/native';
import {INavigation} from 'type/screen';
import {RootState} from 'src/redux/rootReducer';
import {rdxDispatch} from '@constants/functional';

const useInformation = () => {
  // get state of redux/
  const blog: any = useSelector((state: RootState) => state.blog);
  const navigation = useNavigation<INavigation<'HomeScreen'>>();
  // setup dispatch
  // const dispatch = useDispatch();

  useEffect(() => {
    rdxDispatch(fetchBlog(''));
  }, []);

  return {
    blog,
    navigation,
  };
};

export default useInformation;
