/* eslint-disable react-hooks/exhaustive-deps */
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/ptn/provider';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import mediaProvider from '@services/media/provider';
import apiWithoutToken from '@api/withoutToken';
import {URL_PATH} from '@constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {
  dismissLoading,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import {apiGetSingleImage} from '@api/wrapping';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ParamList} from 'type/screen';

const useDiagnoticTestResult = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiagnoticTestResultScreen'>
    >();
  const route = useRoute<RouteProp<ParamList, 'DiagnoticTestResultScreen'>>();
  const dataAnak: any = route?.params?.data;
  const {getUser}: any = useSelector((state: RootState) => state);
  const isFocused = useIsFocused();
  const [editedProfessions, setEditedProfessions] = useState<boolean>(false);
  const [profession, setProfession] = useState<any>(null);
  const [dataResult, setDataResult] = useState<any>(null);
  const [selected, setSelected] = useState<any>(profession ? profession : []);
  const [userAnakData, setUserAnakData] = useState<any>([]);
  const [alreadyDoneDiagnotic, setAlreadyDoneDiagnotic] = useState<any>(null);
  const [universityMajors, setUniversityMajors] = useState<any>(null);
  const [universityMajorsKp, setUniversityMajorsKp] = useState<any>(null);

  const {checkDiagnostic}: any = useSelector((state: RootState) => state);

  const getUserAnak = async () => {
    try {
      const response = await apiWithoutToken('/uaa/v1/user/get-user', {
        headers: {
          Authorization: `Bearer ${dataAnak?.access_token}`,
        },
      });
      if (response.status === 200) {
        const imgUrl = await apiGetSingleImage({
          imageId: response?.data?.data?.avatar,
        });

        response.data.data.path_url = imgUrl;
        setUserAnakData(response?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const checkHasDoneMinatBakat = async (data: any, navigation: any) => {
    if (checkDiagnostic) {
      const validationTest = checkDiagnostic?.data?.data;
      if (
        validationTest?.already_finished_test &&
        validationTest?.already_register
      ) {
        navigation.navigate('DiagnoticTestResultScreen', {data});
      } else {
        showErrorToast('Tidak ada data anak yang ditampilkan.');
      }
    }
  };

  const _renderDiagnoticTestResult = async () => {
    try {
      const user_id = getUser?.data?.id;
      const token = await AsyncStorage.getItem(Keys.token);
      const tokenParse = await JSON.parse(token || '');
      showLoading();
      const {
        status,
        data: {data},
      } = await apiWithoutToken(
        URL_PATH.get_diagnotic_test_result(
          dataAnak ? dataAnak?.user_id : user_id,
        ),
        {
          headers: {
            Authorization: `Bearer ${dataAnak?.access_token || tokenParse}`,
          },
        },
      );
      if (status === 200) {
        // trim the description of profession_characteristic into 1 pharagraph for front view
        if (data?.profession_characteristic?.description) {
          const htmlContent = data?.profession_characteristic?.description;
          if (htmlContent !== '') {
            const h6StartIndex = htmlContent.indexOf('<h6>');
            const h6EndIndex = htmlContent.indexOf('</h6>', h6StartIndex) + 5; // Include the closing </h6> tag

            const ulStartIndex = htmlContent.indexOf('<ul>', h6EndIndex);
            const ulEndIndex = htmlContent.indexOf('</ul>', ulStartIndex) + 5; // Include the closing </ul> tag

            const firstH6Content = htmlContent.substring(
              h6StartIndex,
              h6EndIndex,
            );
            const firstULContent = htmlContent.substring(
              ulStartIndex,
              ulEndIndex,
            );
            const combinedContent = firstH6Content + firstULContent;

            data.profession_characteristic.descriptionFront = combinedContent;
          }
        }
        //promise getImage for successfull_figures
        if (data?.successfull_figures?.length !== 0) {
          const promises = data?.successfull_figures?.map(async (obj: any) => {
            if (obj?.picture) {
              const resImage = await mediaProvider.getImage(obj?.picture);
              obj.image_path_url = resImage?.data?.path_url;
            }
          });
          await Promise.all(promises);
        }
        const resImageTest = await apiGetSingleImage({
          imageId: data?.profession_characteristic?.picture,
        });
        data.profession_characteristic.picture = resImageTest;
        setDataResult(data);
      }
    } catch (errMessage: any) {
      showErrorToast(errMessage || 'Terjadi kesalahan.');
    } finally {
      dismissLoading();
    }
  };

  //set AyncStorage Profession
  const _setStorageProfessions = async (data: any) => {
    try {
      await provider.setDiagnoticProfession(data, async () => {
        getDiagnoticProfessions();
        setEditedProfessions(false);
        //if existing data profession == future then remove data majors
        if (profession?.id !== data.id) {
          await provider.resetDiagnotcMajors();
        }
        navigation.navigate('DiagnoticProfessionScreen', {
          profession: selected,
        });
      });
    } catch (_) {}
  };

  const setUserProfessions = async (obj: any) => {
    setSelected(obj);
    setEditedProfessions(true);
  };

  const getDiagnoticProfessions = async () => {
    try {
      const professions = await provider.getDiagnoticProfession();
      setProfession(professions);
    } catch (_) {}
  };

  useLayoutEffect(() => {
    if (isFocused) {
      getDiagnoticProfessions();
    }
  }, [isFocused]);

  useEffect(() => {
    if (profession) {
      setSelected(profession);
    }
  }, [profession]);

  useEffect(() => {
    if (editedProfessions) {
      _setStorageProfessions(selected);
    }
  }, [editedProfessions]);

  useEffect(() => {
    if (dataAnak) {
      getUserAnak();
    }
    _renderDiagnoticTestResult();
  }, []);

  const _renderUserUniversityMajorKp = async () => {
    try {
      const {
        status,
        data: {data},
      } = await provider.getUserUniversityMajorKp(getUser?.data?.id);
      if (status === 200) {
        const promise = data?.user_university_major?.map(async (obj: any) => {
          if (obj?.university?.length !== 0) {
            const promiseUniversity = obj?.university?.map(
              async (objUniv: any) => {
                const logo = objUniv?.logo;
                if (logo) {
                  const resImage = await mediaProvider.getImage(logo);
                  if (resImage?.status === 200) {
                    objUniv.logo_path_url = resImage?.data?.path_url;
                  }
                }
              },
            );
            await Promise.allSettled(promiseUniversity);
          }
        });
        await Promise.allSettled(promise);
        setUniversityMajorsKp(data);
      }
    } catch (_) {}
  };

  const _renderUserUniversityMajor = async () => {
    try {
      const {
        status,
        data: {data},
      } = await provider.getUserUniversityMajor(getUser?.data?.id);
      if (status === 200) {
        setUniversityMajors(data);
      }
    } catch (_) {}
  };

  const validationTest = checkDiagnostic?.data?.data;
  useEffect(() => {
    if (
      validationTest?.already_finished_test &&
      validationTest?.already_register &&
      validationTest?.already_choose_profession
    ) {
      setAlreadyDoneDiagnotic(true);
      _renderUserUniversityMajorKp();
      _renderUserUniversityMajor();
    }
  }, [validationTest]);

  //tab
  const Tab = createMaterialTopTabNavigator();
  const [tabActive, setTabActive] = useState<'Rekomendasi' | 'Pilihan Pribadi'>(
    'Rekomendasi',
  );
  const tabNavigator = ['Rekomendasi', 'Pilihan Pribadi'];

  return {
    navigation,
    route,
    getUser,
    dataResult,
    setUserProfessions,
    selected,
    checkHasDoneMinatBakat,
    userAnakData,
    alreadyDoneDiagnotic,
    isFocused,
    Tab,
    tabActive,
    setTabActive,
    tabNavigator,
    universityMajorsKp,
    universityMajors,
  };
};

export default useDiagnoticTestResult;
