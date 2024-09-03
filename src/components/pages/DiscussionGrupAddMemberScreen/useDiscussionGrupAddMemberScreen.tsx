import {useMergeState} from '@constants/functional';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {useEffect} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useDiscussionGrupAddMemberScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiscussionGrupAddMemberScreen'>
    >();
  const route =
    useRoute<RouteProp<ParamList, 'DiscussionGrupAddMemberScreen'>>();
  const {name, navigate_from, avatar_id} = route?.params;
  const [state, setState] = useMergeState({
    isLoading: false,
    isOnSearching: false,
    searchQuery: false,
    listPotensialRoleHeadMaster: [],
    listPotensialRoleTeacher: [],
    listPotensialRoleAdmin: [],
    listPotensialRoleHeadMasterTemporary: [],
    listPotensialRoleTeacherTemporary: [],
    listPotensialRoleAdminTemporary: [],
  });
  const {
    isLoading,
    isOnSearching,
    searchQuery,
    listPotensialRoleHeadMaster,
    listPotensialRoleTeacher,
    listPotensialRoleAdmin,
    listPotensialRoleHeadMasterTemporary,
    listPotensialRoleTeacherTemporary,
    listPotensialRoleAdminTemporary,
    isCheckedAll,
    isCheckedAllTemporary,
  }: any = state;

  const isFocused = useIsFocused();
  const isSearchEmpty = !searchQuery || searchQuery?.length == 0;

  useEffect(() => {
    if (isFocused) {
      _handlerGetPotensialMember('');
    }
  }, [isFocused]);

  const _handlerGetPotensialMember = async (value: any) => {
    setState({isLoading: true});

    try {
      let res;
      if (value && value.length != 0) {
        res = await provider.getDiscusssionPotensialGroupMemberByKeyword(value);
      } else {
        res = await provider.getDiscusssionPotensialGroupMember();
      }
      // console.log('abc res>>>', JSON.stringify/(res?.data?.data, null, 2));

      var resData = res?.data || false;

      if (resData?.data) {
        const usersArray = resData?.data?.map(async (item: any, index: any) => {
          const usersMediaId = item?.avatar;
          const usersRes = await providerMedia.getImage(usersMediaId);

          if (usersRes?.code == 100) {
            resData.data[index].path_url = usersRes?.data?.path_url || false;
          }

          if (isSearchEmpty) {
            resData.data[index].isChecked = false;
          } else {
            const {id, user_type_id} = item || false;

            const listCurrentId =
              user_type_id == 4
                ? listPotensialRoleHeadMaster
                : user_type_id == 6
                ? listPotensialRoleAdmin
                : listPotensialRoleTeacher;

            const arr = listCurrentId.map((item: any, _: number) => item?.id);

            if (arr.includes(id)) {
              const checkedCondition = listCurrentId.filter(
                (item: any, _: number) => item?.id == id,
              );

              resData.data[index].isChecked = checkedCondition?.[0]?.isChecked;
            } else {
              resData.data[index].isChecked = false;
            }
          }

          resData.data[index].user_id = resData?.data[index]?.id;
        });

        await Promise.all(usersArray);
      }

      /*
          USER_TYPE_ID
          1. Murid >> B2C B2B
          2. Orang Tua >> Ngikut anak
          3. Mentor
          4. Kepsek >> B2B B2G
          5. Guru >> B2B
          6. Admin >> B2B
        */

      const listPotensialAll = resData?.data;

      const roleHeadMaster = listPotensialAll?.filter(
        (item: any) => item?.user_type_id === 4,
      );

      const roleTeacher = listPotensialAll?.filter(
        (item: any) => item?.user_type_id === 5,
      );

      const roleAdmin = listPotensialAll?.filter(
        (item: any) => item?.user_type_id === 6,
      );

      setTimeout(() => {
        if (value && value?.length != 0) {
          setState({
            isLoading: false,
            listPotensialRoleHeadMasterTemporary: roleHeadMaster,
            listPotensialRoleTeacherTemporary: roleTeacher,
            listPotensialRoleAdminTemporary: roleAdmin,
          });
        } else {
          setState({
            isLoading: false,
            listPotensialRoleHeadMaster: roleHeadMaster,
            listPotensialRoleTeacher: roleTeacher,
            listPotensialRoleAdmin: roleAdmin,
          });
        }
      }, 500);
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerOnChangeSearching = (value: any) => {
    if (!value && value.length == 0) {
      setState({listPotensialRoleHeadMasterTemporary: []});
      setState({listPotensialRoleTeacherTemporary: []});
      setState({listPotensialRoleAdminTemporary: []});
    }
    setState({searchQuery: value});
  };

  const _handlerOnSubmitSearch = () => {
    _handlerGetPotensialMember(searchQuery);
  };

  const _handlerSetActiveSearch = () => {
    setState({
      isOnSearching: true,
    });
  };

  const _handlerSetNotActiveSearch = () => {
    setState({
      isOnSearching: false,
      searchQuery: false,
      listPotensialRoleAdmin: [],
      listPotensialRoleAdminTemporary: [],
      listPotensialRoleHeadMaster: [],
      listPotensialRoleHeadMasterTemporary: [],
      listPotensialRoleTeacher: [],
      listPotensialRoleTeacherTemporary: [],
    });

    _handlerGetPotensialMember('');
  };

  const _handlerOnPressCheckBoxTemporary = (
    index: number,
    id: number,
    data: any,
    role: string,
  ) => {
    let datum = data;
    const selectedData = datum?.filter((item: any) => item?.id == id)?.[0];
    const {user_type_id} = selectedData || false;

    const dataMapping =
      user_type_id == 4
        ? listPotensialRoleHeadMaster
        : user_type_id == 6
        ? listPotensialRoleAdmin
        : listPotensialRoleTeacher;

    const idx = dataMapping.findIndex((item: any) => item?.id == id);
    _handlerOnPressCheckBox(idx + 1, id, dataMapping, role);

    const updatedObj = {
      ...datum[index - 1],
      isChecked: !selectedData?.isChecked,
    };

    const updateData = [
      ...datum.slice(0, index - 1),
      updatedObj,
      ...datum.slice(index),
    ];

    if (selectedData?.isChecked) {
      setState({isCheckedAllTemporary: false});
    }

    if (role == 'HEADMASTER') {
      setState({
        listPotensialRoleHeadMasterTemporary: updateData,
      });
    } else if (role == 'TEACHER') {
      setState({
        listPotensialRoleTeacherTemporary: updateData,
      });
    } else if (role == 'ADMIN') {
      setState({
        listPotensialRoleAdminTemporary: updateData,
      });
    }
  };

  const _handlerOnPressCheckBox = (
    index: number,
    id: number,
    data: any,
    role: string,
  ) => {
    let datum = data;
    const selectedData = datum?.filter((item: any) => item?.id == id)?.[0];

    const updatedObj = {
      ...datum[index - 1],
      isChecked: !selectedData?.isChecked,
    };

    const updateData = [
      ...datum.slice(0, index - 1),
      updatedObj,
      ...datum.slice(index),
    ];

    if (selectedData?.isChecked) {
      setState({isCheckedAll: false});
    }

    if (role == 'HEADMASTER') {
      setState({
        listPotensialRoleHeadMaster: updateData,
      });
    } else if (role == 'TEACHER') {
      setState({
        listPotensialRoleTeacher: updateData,
      });
    } else if (role == 'ADMIN') {
      setState({
        listPotensialRoleAdmin: updateData,
      });
    }
  };

  const _handlerOnPressCheckBoxAll = () => {
    setState({
      isCheckedAll: !isCheckedAll,
    });

    let listHeadMaster = listPotensialRoleHeadMaster;
    let listTeacher = listPotensialRoleTeacher;
    let listAdmin = listPotensialRoleAdmin;

    listHeadMaster?.map(async (_: any, index: any) => {
      listHeadMaster[index].isChecked = !isCheckedAll;
    });

    listTeacher?.map(async (_: any, index: any) => {
      listTeacher[index].isChecked = !isCheckedAll;
    });

    listAdmin?.map(async (_: any, index: any) => {
      listAdmin[index].isChecked = !isCheckedAll;
    });

    if (listHeadMaster && listHeadMaster.length != 0) {
      setState({listPotensialRoleHeadMaster: listHeadMaster});
    } else if (listTeacher && listTeacher.length != 0) {
      setState({listPotensialRoleTeacher: listTeacher});
    } else if (listAdmin && listAdmin.length != 0) {
      setState({listPotensialRoleAdmin: listAdmin});
    }
  };

  const _handlerOnPressCheckBoxAllTemporary = () => {
    setState({
      isCheckedAllTemporary: !isCheckedAllTemporary,
    });

    let listHeadMaster = listPotensialRoleHeadMaster;
    let listTeacher = listPotensialRoleTeacher;
    let listAdmin = listPotensialRoleAdmin;

    let listHeadMasterTemp = listPotensialRoleHeadMasterTemporary;
    let listTeacherTemp = listPotensialRoleTeacherTemporary;
    let listAdminTemp = listPotensialRoleAdminTemporary;

    listHeadMasterTemp?.map((item: any, index: any) => {
      const {id} = item || false;
      const idxTemp = listTeacher.findIndex((item: any) => item?.id == id);

      listHeadMaster[idxTemp].isChecked = !isCheckedAllTemporary;
      listHeadMasterTemp[index].isChecked = !isCheckedAllTemporary;
    });

    listTeacherTemp?.map((item: any, index: any) => {
      const {id} = item || false;
      const idxTemp = listTeacher.findIndex((item: any) => item?.id == id);

      listTeacher[idxTemp].isChecked = !isCheckedAllTemporary;
      listTeacherTemp[index].isChecked = !isCheckedAllTemporary;
    });

    listAdminTemp?.map((item: any, index: any) => {
      const {id} = item || false;
      const idxTemp = listTeacher.findIndex((item: any) => item?.id == id);

      listAdmin[idxTemp].isChecked = !isCheckedAllTemporary;
      listAdminTemp[index].isChecked = !isCheckedAllTemporary;
    });

    if (listHeadMasterTemp && listHeadMasterTemp.length != 0) {
      setState({listPotensialRoleHeadMasterTemporary: listHeadMasterTemp});
    } else if (listTeacherTemp && listTeacherTemp.length != 0) {
      setState({listPotensialRoleTeacherTemporary: listTeacherTemp});
    } else if (listAdminTemp && listAdminTemp.length != 0) {
      setState({listPotensialRoleAdminTemporary: listAdminTemp});
    }
  };

  const _handlerOnPressSubmitData = async () => {
    setState({isLoading: true});

    const isListValid =
      listPotensialRoleTeacher.length != 0 ||
      listPotensialRoleHeadMaster.length != 0 ||
      listPotensialRoleAdmin.length != 0;

    const listAll =
      isListValid &&
      listPotensialRoleTeacher?.concat(
        listPotensialRoleHeadMaster,
        listPotensialRoleAdmin,
      );

    const listAllMemberChecked =
      listAll &&
      listAll?.length != 0 &&
      listAll?.filter((item: any) => item?.isChecked === true);

    const arrOnlyShowId = listAllMemberChecked?.map((item: any) => {
      return {
        user_id: item?.user_id,
      };
    });

    if (arrOnlyShowId.length === 0) {
      Toast.show({
        type: 'warning',
        text1: 'Tambahkan minimal 1 orang.',
      });
      setState({
        isLoading: false,
      });
    } else {
      try {
        if (navigate_from && navigate_from == 'DiscussionCreateGroupScreen') {
          const requestBody: any = {
            users: arrOnlyShowId,
            name: name,
            avatar_id: avatar_id,
          };

          await provider.postDiscussionCreateGroup(requestBody);
          navigation?.navigate('DiscussionGrupMessageScreen');
        } else {
          const requestBody = {
            users: arrOnlyShowId,
          };

          await provider.postDiscussionAddMember(requestBody);
          navigation?.navigate('DiscussionGrupMessageScreen');
        }
      } catch (e: any) {
        const errorData = e?.response?.data;

        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'error',
            text1: errorData?.message || 'Internal Server Error',
          });
        }, 500);
      }
    }
  };

  return {
    isLoading,
    isOnSearching,
    searchQuery,
    listPotensialRoleHeadMaster,
    listPotensialRoleTeacher,
    listPotensialRoleAdmin,
    listPotensialRoleHeadMasterTemporary,
    listPotensialRoleTeacherTemporary,
    listPotensialRoleAdminTemporary,
    isCheckedAll,
    isCheckedAllTemporary,
    _handlerSetNotActiveSearch,
    _handlerSetActiveSearch,
    _handlerOnChangeSearching,
    _handlerOnPressCheckBox,
    _handlerOnPressCheckBoxTemporary,
    _handlerOnPressCheckBoxAll,
    _handlerOnPressCheckBoxAllTemporary,
    _handlerOnPressSubmitData,
    _handlerOnSubmitSearch,
  };
};

export default useDiscussionGrupAddMemberScreen;
