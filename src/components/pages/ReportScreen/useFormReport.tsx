import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api/index';
import {useState, useEffect} from 'react';

const useFormReport = (subject?: any) => {
  const [chapterData, setChapterData] = useState<any[]>([]);
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [popUpHeaderVisible] = useState<boolean>(true);
  const [chapterChoosed, setChapterChoosed] = useState<any>(0);
  const [selectedItem, setSelectedItem] = useState(1);

  const fetchChapter = async () => {
    try {
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      await api
        .get(`/lpt/v1/practice?subject_id=${subject?.id}`, {
          headers: {
            Authorization: `Bearer ${tokenParse}`,
          },
        })
        .then(response => {
          setChapterData(response?.data?.data);
        });
    } catch (err) {}
  };

  useEffect(() => {
    fetchChapter();
  }, []);

  const handleSetPopUpVisible = (visible: boolean = false) => {
    setPopUpVisible(visible);
  };

  return {
    setSelectedItem,
    selectedItem,
    chapterChoosed,
    setChapterChoosed,
    chapterData,
    popUpVisible,
    handleSetPopUpVisible,
    popUpHeaderVisible,
  };
};

export default useFormReport;
