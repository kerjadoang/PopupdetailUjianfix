import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {} from '@redux';
import provider from '@services/ptn/provider';
import {useEffect, useLayoutEffect, useState} from 'react';

const useDiagnoticRecommendation = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiagnoticRecommendationScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'DiagnoticRecommendationScreen'>>();
  const isFocused = useIsFocused();
  const [profession, setProfession] = useState<any>(null);
  const [major, setMajor] = useState<any>([]);
  const professionRoute = route?.params?.profession;
  const professions = route?.params?.professions;
  const majors = route?.params?.majors;

  const type = professions ? 'professions' : majors ? 'majors' : 'majors';
  const [selected, setSelected] = useState<any>([]);

  const getDiagnoticProfessions = async () => {
    try {
      const professionStorage = await provider.getDiagnoticProfession();
      setProfession(professionStorage);
      setSelected(professionStorage);
    } catch (_) {
      setSelected([]);
    }
  };

  const getDiagnoticMajors = async () => {
    try {
      const data = await provider.getDiagnoticMajors();
      setMajor(data);
      setSelected(data);
    } catch (_) {
      setSelected([]);
    }
  };

  useLayoutEffect(() => {
    getDiagnoticMajors();
    getDiagnoticProfessions();
    if (isFocused) {
      setSelected([]);
    }
  }, [isFocused]);

  useEffect(() => {
    if (type === 'majors') {
      setSelected(major);
    } else if (type === 'professions') {
      setSelected(profession);
    }
  }, [major, profession]);

  const _setStorageProfessions = async (data: any) => {
    try {
      //if existing data profession == future then remove data majors
      if (profession?.id !== data?.id) {
        await provider.resetDiagnotcMajors();
      }
      await provider.setDiagnoticProfession(data, async () => {
        getDiagnoticProfessions();
      });
    } catch (_) {}
  };

  const _setStorageMajors = async (data: any) => {
    try {
      await provider.setDiagnoticMajors(data);
    } catch (_) {}
  };

  const _setMajors = async (data: any) => {
    try {
      _setStorageMajors(data).then(() => {
        navigation.navigate('DiagnoticProfessionScreen', {
          profession: professionRoute,
        });
      });
    } catch (_) {}
  };

  const _setSelectedMajors = async (obj: any) => {
    if (type === 'majors') {
      setSelected((prev: any) => {
        if (prev?.length !== 0) {
          if (prev?.some((o: any) => o?.id === obj?.id)) {
            return prev?.filter((o: any) => o?.id !== obj?.id);
          } else {
            if (prev?.length > 2) {
              return prev;
            }
            if (prev) {
              return [...prev, obj];
            }
          }
        } else {
          return [obj];
        }
      });
    }
  };

  return {
    navigation,
    route,
    professions,
    majors,
    type,
    selected,
    setSelected,
    _setMajors,
    major,
    profession,
    _setSelectedMajors,
    _setStorageProfessions,
  };
};

export default useDiagnoticRecommendation;
