import {useMergeState} from '@constants/functional';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import IconMaskot3 from '@assets/svg/maskot_3.svg';
import {useEffect} from 'react';

const useDiscussionGrupSearchMemberScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiscussionGrupSearchMemberScreen'>
    >();

  const [state, setState] = useMergeState({
    isLoading: false,
    searchQuery: false,
    listMember: false,
    selectedUser: false,
    isShowSwipeUpMoreUser: false,
  });
  const {
    isLoading,
    searchQuery,
    listMember,
    selectedUser,
    isShowSwipeUpMoreUser,
  }: any = state;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      _handlerGetGroupInformation('');
    }
  }, [isFocused]);

  const _handlerGetGroupInformation = async (value: any) => {
    setState({isLoading: true});

    try {
      let res;
      if (value?.length != 0) {
        res = await provider.getDiscusssionGroupInformationByKeyword(value);
      } else {
        res = await provider.getDiscusssionGroupInformationByKeyword('');
      }

      if (res?.status == 200) {
        var resDataData = res?.data?.data || false;
        const userMediaId = resDataData?.avatar;

        if (userMediaId) {
          const userRes = await providerMedia.getImage(userMediaId);

          if (userRes?.code === 100) {
            resDataData.path_url = userRes?.data?.path_url || false;
          }
        }

        if (resDataData?.users) {
          const usersArray = resDataData?.users?.map(
            async (item: any, index: any) => {
              const usersMediaId = item?.avatar;
              const usersRes = await providerMedia.getImage(usersMediaId);

              if (usersRes?.code == 100) {
                resDataData.users[index].path_url =
                  usersRes?.data?.path_url || false;
              }
            },
          );

          await Promise.all(usersArray);
        }

        setTimeout(() => {
          setState({
            isLoading: false,
            listMember: resDataData,
            searchQuery: value.length > 1 ? value : false,
          });
        }, 500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  const _handlerOnChangeSearching = (value: any) => {
    setState({searchQuery: value});
  };

  const _handlerOnSubmitSearch = () => {
    _handlerGetGroupInformation(searchQuery);
  };

  const _handlerSetNotActiveSearch = () => {
    setState({
      searchQuery: '',
    });
    navigation?.goBack();
  };

  const _handlerOnCloseSwipeUpMoreUser = () => {
    setState({
      isShowSwipeUpMoreUser: false,
    });
  };

  const _handlerAddDeleteAdmin = () => {
    setState({
      isShowSwipeUpMoreUser: false,
    });
    selectedUser?.isUserAdmin ? _handlerUnsetAdmin() : _handlerSetAdmin();
  };

  const _handlerSetAdmin = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.putSetAdmin(selectedUser?.id);
      _handlerGetGroupInformation('');

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
            isShowSnackBar: true,
            snackBarType: 'SUCCESS',
            snackBarLabel: 'Anggota berhasil dijadikan Admin.',
          });
        }, 500);

        setTimeout(() => {
          setState({
            isShowSnackBar: false,
          });
        }, 1500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e: any) {
      const errorData = e?.response?.data;

      setTimeout(() => {
        setState({
          isLoading: false,
          isShowSnackBar: true,
          snackBarType: 'FAILED',
          snackBarLabel: errorData?.message || 'Internal Server Error',
        });
      }, 500);

      setTimeout(() => {
        setState({
          isShowSnackBar: false,
        });
      }, 1500);
    }
  };

  const _handlerUnsetAdmin = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.putUnsetAdmin(selectedUser?.id);
      _handlerGetGroupInformation('');

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
            isShowSnackBar: true,
            snackBarType: 'SUCCESS',
            snackBarLabel: 'Admin Grup berhasil dibatalkan.',
          });
        }, 500);

        setTimeout(() => {
          setState({
            isShowSnackBar: false,
          });
        }, 1500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e: any) {
      const errorData = e?.response?.data;

      setTimeout(() => {
        setState({
          isLoading: false,
          isShowSnackBar: true,
          snackBarType: 'FAILED',
          snackBarLabel: errorData?.message || 'Internal Server Error',
        });
      }, 500);

      setTimeout(() => {
        setState({
          isShowSnackBar: false,
        });
      }, 1500);
    }
  };

  const _handlerDeleteMemberConfirmation = () => {
    setState({
      popupData: {
        icon: IconMaskot3,
        title: 'Hapus Anggota Grup',
        description: `Apakah Anda yakin untuk menghapus ${selectedUser?.name} dari grup ini?`,
        labelConfirm: 'Hapus',
        labelCancel: 'Batal',
        onPressConfirm: () => {
          setState({isShowPopup: false});
          _handlerDeleteMemberFromGroup();
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
      isShowSwipeUpMoreUser: false,
    });
  };

  const _handlerDeleteMemberFromGroup = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.putDeleteMember(selectedUser?.id);
      _handlerGetGroupInformation('');

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
            isShowSnackBar: true,
            snackBarType: 'SUCCESS',
            snackBarLabel: 'Anggota berhasil dihapus.',
          });
        }, 500);

        setTimeout(() => {
          setState({
            isShowSnackBar: false,
          });
        }, 1500);
      } else {
        setTimeout(() => {
          setState({
            isLoading: false,
          });
        }, 500);
      }
    } catch (e: any) {
      const errorData = e?.response?.data;

      setTimeout(() => {
        setState({
          isLoading: false,
          isShowSnackBar: true,
          snackBarType: 'FAILED',
          snackBarLabel: errorData?.message || 'Internal Server Error',
        });
      }, 500);

      setTimeout(() => {
        setState({
          isShowSnackBar: false,
        });
      }, 1500);
    }
  };

  const _handlerSeeDetailMember = () => {
    setState({
      isShowSwipeUpMoreUser: false,
    });
    navigation?.navigate('DiscussionGrupDetailScreen', {
      userId: selectedUser?.id,
    });
  };

  const _handlerShowSwipeUpMoreUser = (
    userId: number,
    userName: string,
    isUserAdmin: boolean,
  ) => {
    setState({
      isShowSwipeUpMoreUser: true,
      selectedUser: {
        id: userId,
        name: userName,
        isUserAdmin: isUserAdmin,
      },
    });
  };

  return {
    isLoading,
    searchQuery,
    listMember,
    selectedUser,
    isShowSwipeUpMoreUser,
    _handlerAddDeleteAdmin,
    _handlerSeeDetailMember,
    _handlerDeleteMemberConfirmation,
    _handlerOnCloseSwipeUpMoreUser,
    _handlerOnChangeSearching,
    _handlerSetNotActiveSearch,
    _handlerShowSwipeUpMoreUser,
    _handlerOnSubmitSearch,
  };
};

export default useDiscussionGrupSearchMemberScreen;
