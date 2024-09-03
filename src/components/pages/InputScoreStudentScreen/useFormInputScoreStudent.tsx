import {useCallback, useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
const useFormInputScoreStudent = () => {
  const {getUser} = useSelector((state: RootState) => state);
  const school_id: string = getUser?.data?.school?.id;
  const [data] = useState(null);
  const [allStudent, setAllStudent] = useState([]);
  const [allDate, setAllDate] = useState([]);
  const [firstAcademic, setFirstAcademic] = useState(null);
  const [choosenAcademic, setChoosenAcademic] = useState(null);
  const [allClass, setAllClass] = useState([]);
  const [chooseClass, setChooseClass] = useState([]);
  const [image, setImage] = useState(null);
  const route = useRoute<RouteProp<ParamList, 'InputScoreStudentScreen'>>();
  const dispatch = useDispatch();

  const getAllStudent = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');

      const userTypeId = 1;
      const rombelClassId =
        chooseClass?.length === 0
          ? route?.params?.rombel_id?.id
          : chooseClass?.id;
      const academicYearId =
        choosenAcademic?.length === 0 ? firstAcademic?.id : choosenAcademic?.id;

      const response = await api.get(
        `/lms/v1/rombel-user/${userTypeId}?rombelClassId=${rombelClassId}&academicYearId=${academicYearId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        const data = response?.data?.data;
        setAllStudent(data);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, [
    chooseClass?.id,
    chooseClass?.length,
    choosenAcademic?.id,
    choosenAcademic?.length,
    firstAcademic?.id,
    route?.params?.rombel_id?.id,
  ]);

  useEffect(() => {
    getAllStudent();
  }, [getAllStudent]);
  const getAllDate = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get(
        `/lms/v1/academic-year/get-all/${school_id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        },
      );
      if (response.status === 200) {
        const data = response?.data?.data;
        setAllDate(data);
        const lastArray = data[data.length - 1];
        setFirstAcademic(lastArray);
      }
    } catch (err) {
      return;
    }
  }, [school_id]);
  useEffect(() => {
    getAllDate();
  }, [getAllDate]);

  const getAllClass = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      const response = await api.get('lms/v1/rombel-user/list-class', {
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      if (response.status === 200) {
        const data = response?.data?.data;
        setAllClass(data);
      }
    } catch (err) {
      return;
    }
  }, []);

  useEffect(() => {
    getAllClass();
  }, [getAllClass]);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatars = await Promise.all(
          (allStudent?.rombel_user || []).map(async (student: any) => {
            if (student && student.avatar) {
              try {
                const imgRes = await api.get(
                  `/media/v1/image/${student.avatar}`,
                );
                const pathUrl = imgRes?.data?.data?.path_url;
                return pathUrl !== undefined ? pathUrl : null;
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
                return null;
              }
            } else {
              return null;
            }
          }),
        );
        setImage(avatars);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchAvatar();
  }, [dispatch, allStudent]);

  const mergedData = allStudent?.rombel_user?.map(
    (item: any, index: number) => {
      const avatarItem = image && image[index];
      return {
        ...item,
        avatar: avatarItem ? avatarItem : null,
      };
    },
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(mergedData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mergedData?.filter((item: any) =>
      item?.full_name.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredData(filtered);
  };

  const handleFilterAcademic = item => {
    setChoosenAcademic(item);
  };
  const handleFilterClass = item => {
    setChooseClass(item);
  };
  return {
    data,
    allStudent,
    allDate,
    handleFilterAcademic,
    choosenAcademic,
    allClass,
    handleFilterClass,
    chooseClass,
    firstAcademic,
    image,
    searchQuery,
    setSearchQuery,
    filteredData,
    setFilteredData,
    mergedData,
    handleSearch,
    setChoosenAcademic,
    setChooseClass,
  };
};

export default useFormInputScoreStudent;
