import {
  _handlerCameraPermission,
  _handlerGalleryPermission,
  dismissLoading,
  limitImageInMb,
  listFileImageExtension,
  maximalLimitImage,
  showLoading,
  useMergeState,
} from '@constants/functional';
import provider from '@services/lms/provider';
import providerMedia from '@services/media/provider';
import {useEffect} from 'react';
import IconCameraBlue from '@assets/svg/ic24_camera_blue.svg';
import IconGalleryBlue from '@assets/svg/ic_gallery_blue.svg';
import IconOpenEyeBlue from '@assets/svg/blue_eye.svg';
import IconTrashRed from '@assets/svg/ic_trash_red.svg';
import IconMaskot3 from '@assets/svg/maskot_3.svg';
import React from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {IUploadImageResponse} from '@services/media/type';
import {useUploadImage} from '@services/media';
import {StackNavigationProp} from '@react-navigation/stack';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const useDiscussionGrup = () => {
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DiscussionGrupScreen'>>();
  const [state, setState] = useMergeState({
    isLoading: false,
    groupData: false,
    isShowPopup: false,
    popupData: false,
    isShowSwipeUpMoreGroup: false,
    isShowSwipeUpMoreUser: false,
    isShowSwipeUpEditGroup: false,
    isShowSwipeUpChangeGroupName: false,
    groupName: false,
    selectedUser: false,
  });

  const {
    isLoading,
    groupData,
    isShowPopup,
    popupData,
    isShowSwipeUpMoreGroup,
    isShowSwipeUpMoreUser,
    isShowSwipeUpEditGroup,
    isShowSwipeUpChangeGroupName,
    groupName,
    selectedUser,
  }: any = state;

  const {mutate: uploadImage} = useUploadImage();
  const groupAvatar = (groupData && groupData?.path_url) || false;
  const initialEditGroupData = [
    {
      icon: <IconCameraBlue width={24} height={24} />,
      label: 'Ambil dari Kamera',
      onPress: () => {
        setState({isShowSwipeUpEditGroup: false});

        setTimeout(() => {
          _handlerOpenCamera();
        }, 500);
      },
    },
    {
      icon: <IconGalleryBlue width={24} height={24} />,
      label: 'Ambil dari Galeri',
      onPress: () => {
        setState({isShowSwipeUpEditGroup: false});

        setTimeout(() => {
          _handlerOpenGallery();
        }, 500);
      },
    },
    {
      icon: <IconOpenEyeBlue width={24} height={24} />,
      label: 'Lihat Foto',
      onPress: () => {
        setState({isShowSwipeUpEditGroup: false});
        navigation?.navigate('ViewPhotoScreen', {
          path_url: groupAvatar,
          header_label: 'Foto Grup',
        });
      },
    },
    {
      icon: <IconTrashRed width={24} height={24} />,
      label: 'Hapus Foto',
      onPress: () => {
        setState({
          popupData: {
            icon: IconMaskot3,
            title: 'Hapus Foto Grup',
            description: 'Apakah Anda yakin untuk menghapus foto grup ini?',
            labelConfirm: 'Batal',
            labelCancel: 'Hapus',
            onPressConfirm: () => {
              setState({isShowPopup: false});
            },
            onPressCancel: () => {
              setState({isShowPopup: false});
              _handlerDeleteAvatarGroup();
            },
          },
          isShowPopup: true,
          isShowSwipeUpEditGroup: false,
        });
      },
    },
  ];

  useEffect(() => {
    if (isFocused) {
      _handlerGetGroupInformation();
    }
  }, [isFocused]);

  const _handlerOpenCamera = async () => {
    const permit = await _handlerCameraPermission();

    if (permit) {
      const result: any = await launchCamera({
        mediaType: 'photo',
        presentationStyle: 'fullScreen',
      });

      if (!result.didCancel) {
        const fileName = result?.assets[0]?.fileName;
        const fileSize = result?.assets[0]?.fileSize;
        const extensionFile = fileName.split('.')?.pop();
        const isFileLowerThanMaxLimit = fileSize <= maximalLimitImage;
        const isFileHigherThanMaxLimit = fileSize > maximalLimitImage;
        const isFileFormatNotValid =
          !listFileImageExtension.includes(extensionFile);

        if (isFileFormatNotValid) {
          setState({
            popupData: {
              title: 'Peringatan!',
              description: 'Extensi file harus jpg, jpeg, atau png!',
              labelConfirm: 'Mengerti',
              onPressConfirm: () => {
                setState({isShowPopup: false});
              },
            },
            isShowPopup: true,
          });
        } else if (isFileHigherThanMaxLimit) {
          setState({
            popupData: {
              title: 'Peringatan!',
              description: `Ukuran maksimal foto ${limitImageInMb}mb!`,
              labelConfirm: 'Mengerti',
              onPressConfirm: () => {
                setState({isShowPopup: false});
              },
            },
            isShowPopup: true,
          });
        } else if (isFileLowerThanMaxLimit) {
          setState({isLoading: true});
          uploadingImage(result?.assets);
        }
      }
    }
  };

  const _handlerOpenGallery = async () => {
    try {
      const permit = await _handlerGalleryPermission();

      if (permit) {
        const result: any = await launchImageLibrary({
          mediaType: 'photo',
          presentationStyle: 'fullScreen',
        });

        if (!result.didCancel) {
          const fileName = result?.assets[0]?.fileName;
          const fileSize = result?.assets[0]?.fileSize;
          const extensionFile = fileName.split('.')?.pop();
          const isFileLowerThanMaxLimit = fileSize <= maximalLimitImage;
          const isFileHigherThanMaxLimit = fileSize > maximalLimitImage;
          const isFileFormatNotValid =
            !listFileImageExtension.includes(extensionFile);

          if (isFileFormatNotValid) {
            setState({
              popupData: {
                title: 'Peringatan!',
                description: 'Extensi file harus jpg, jpeg, atau png!',
                labelConfirm: 'Mengerti',
                onPressConfirm: () => {
                  setState({isShowPopup: false});
                },
              },
              isShowPopup: true,
            });
          } else if (isFileHigherThanMaxLimit) {
            setState({
              popupData: {
                title: 'Peringatan!',
                description: `Ukuran maksimal foto ${limitImageInMb}mb!`,
                labelConfirm: 'Mengerti',
                onPressConfirm: () => {
                  setState({isShowPopup: false});
                },
              },
              isShowPopup: true,
            });
          } else if (isFileLowerThanMaxLimit) {
            setState({isLoading: true});
            uploadingImage(result?.assets);
          }
        }
      }
    } catch (e) {}
  };

  const uploadingImage = (asset: ImagePickerResponse['assets']) => {
    const formData = new FormData();
    formData.append('attachment', {
      name: asset?.[0]?.fileName,
      type: asset?.[0]?.type,
      uri:
        Platform.OS === 'android'
          ? asset?.[0]?.uri
          : asset?.[0]?.uri?.replace('file://', ''),
    });
    formData.append('type', 'grup_diskusi');
    formData.append('sub_type', 'avatar');

    uploadImage(formData).then((res: IUploadImageResponse) => {
      const mediaId = res?.data?.ID;
      if (mediaId) {
        setTimeout(() => {
          _handlerChangeAvatarGroup(mediaId);
        }, 100);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Internal Server Error',
        });
      }
    });
  };

  const _handlerGetGroupInformation = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getDiscusssionGroupInformation();

      if (res?.status == 200) {
        var resDataData = res?.data?.data || false;
        const schoolMediaId = resDataData?.avatar;

        if (schoolMediaId) {
          const schoolRes = await providerMedia.getImage(schoolMediaId);

          if (schoolRes?.code === 100) {
            resDataData.path_url = schoolRes?.data?.path_url || false;
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

        // console.log(
        //   'abcde resDataData>>>',
        //   JSON.stringify(resDataData, null, 2),
        // );

        setTimeout(() => {
          setState({
            isLoading: false,
            groupData: resDataData,
            groupName: resDataData?.name,
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

  const _handlerSubmitChangeGroupName = async () => {
    setState({isLoading: true, isShowSwipeUpChangeGroupName: false});

    const requestBody = {
      group_name: groupName,
    };

    try {
      const res = await provider.putChangeGroupName(requestBody);
      _handlerGetGroupInformation();

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Nama grup berhasil disimpan.',
          });
        }, 500);
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
        });

        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }, 500);
    }
  };

  const _handlerDeleteAvatarGroup = async () => {
    setState({isLoading: true, isShowSwipeUpChangeGroupName: false});

    try {
      const res = await provider.putDeleteAvatarGroup();
      _handlerGetGroupInformation();

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Foto grup berhasil dihapus.',
          });
        }, 500);
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
        });

        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }, 500);
    }
  };

  const _handlerChangeAvatarGroup = async (mediaId: any) => {
    showLoading();

    const requestBody: any = {
      avatar_id: mediaId,
    };

    try {
      const res = await provider.putChangeAvatarGroup(requestBody);
      _handlerGetGroupInformation();

      if (res?.status == 200) {
        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Foto grup berhasil disimpan.',
          });
        }, 500);
      }
    } catch (e: any) {
      const errorData = e?.response?.data;

      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }, 500);
    } finally {
      dismissLoading();
    }
  };

  const _handlerSetAdmin = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.putSetAdmin(selectedUser?.id);
      _handlerGetGroupInformation();

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Anggota berhasil dijadikan Admin.',
          });
        }, 500);
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
        });

        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }, 500);
    }
  };

  const _handlerUnsetAdmin = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.putUnsetAdmin(selectedUser?.id);
      _handlerGetGroupInformation();

      if (res?.status == 200) {
        setTimeout(() => {
          setState({
            isLoading: false,
          });

          Toast.show({
            type: 'success',
            text1: 'Admin Grup berhasil dibatalkan.',
          });
        }, 500);
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
        });

        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }, 500);
    }
  };

  const _handlerDeleteMemberFromGroup = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.putDeleteMember(selectedUser?.id);
      _handlerGetGroupInformation();

      if (res?.status == 200) {
        navigation?.navigate('DiscussionGrupMessageScreen');
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
        });

        Toast.show({
          type: 'error',
          text1: errorData?.message || 'Internal Server Error',
        });
      }, 500);
    }
  };

  const _handlerLeaveGroup = async () => {
    setState({isLoading: true});

    try {
      await provider.deleteLeaveGroup();
      _handlerGetGroupInformation();

      setTimeout(() => {
        setState({
          isLoading: false,
        });

        Toast.show({
          type: 'success',
          text1: 'Anda berhasil keluar grup.',
        });

        setTimeout(() => {
          navigation?.navigate('BottomTabNavigatorGuru');
        }, 300);
      }, 500);
    } catch (e: any) {
      const errorData = e?.response?.data;

      setTimeout(() => {
        setState({
          isLoading: false,
        });

        if (errorData?.message) {
          Toast.show({
            type: 'error',
            text1: errorData?.message || 'Internal Server Error',
          });
        }
      }, 500);
    }
  };

  const _handlerOnCloseSwipeUpEditGroup = () => {
    setState({
      isShowSwipeUpEditGroup: false,
    });
  };

  const _handlerOnCloseSwipeUpChangeGroupName = () => {
    setState({
      isShowSwipeUpChangeGroupName: false,
    });
  };

  const _handlerOnCloseSwipeUpMoreUser = () => {
    setState({
      isShowSwipeUpMoreUser: false,
    });
  };

  const _handlerOnCloseSwipeUpMoreGroup = () => {
    setState({
      isShowSwipeUpMoreGroup: false,
    });
  };

  const _handlerShowSwipeUpEditGroup = () => {
    setState({
      isShowSwipeUpEditGroup: true,
    });
  };

  const _handlerShowSwipeUpChangeGroupName = () => {
    setState({
      isShowSwipeUpChangeGroupName: true,
    });
  };

  const _handlerShowSwipeUpMoreGroup = () => {
    setState({
      isShowSwipeUpMoreGroup: true,
    });
  };

  const _handlerSetActiveSearch = () => {
    navigation?.navigate('DiscussionGrupSearchMemberScreen');
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

  const _handlerOnPressLeaveGroup = () => {
    setState({
      popupData: {
        icon: IconMaskot3,
        title: 'Keluar Grup Diskusi',
        description: 'Apakah Anda yakin untuk keluar dari\nGrup Diskusi ini?',
        labelConfirm: 'Keluar',
        labelCancel: 'Batal',
        onPressConfirm: () => {
          setState({isShowPopup: false});
          _handlerLeaveGroup();
        },
        onPressCancel: () => {
          setState({isShowPopup: false});
        },
      },
      isShowPopup: true,
      isShowSwipeUpMoreGroup: false,
    });
  };

  const _handlerOnChangeGroupName = (val: any) => {
    setState({
      groupName: val,
    });
  };

  const _handlerAddDeleteAdmin = () => {
    setState({
      isShowSwipeUpMoreUser: false,
    });
    selectedUser?.isUserAdmin ? _handlerUnsetAdmin() : _handlerSetAdmin();
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

  const _handlerSeeDetailMember = () => {
    setState({
      isShowSwipeUpMoreUser: false,
    });
    navigation?.navigate('DiscussionGrupDetailScreen', {
      userId: selectedUser?.id,
    });
  };

  const _handlerNavigationToAddMemberScreen = () => {
    navigation?.navigate('DiscussionGrupAddMemberScreen', {});
  };

  return {
    isLoading,
    groupData,
    isShowPopup,
    popupData,
    isShowSwipeUpMoreUser,
    isShowSwipeUpEditGroup,
    isShowSwipeUpChangeGroupName,
    groupName,
    initialEditGroupData,
    selectedUser,
    isShowSwipeUpMoreGroup,
    _handlerOnCloseSwipeUpMoreGroup,
    _handlerOnCloseSwipeUpEditGroup,
    _handlerOnCloseSwipeUpChangeGroupName,
    _handlerOnCloseSwipeUpMoreUser,
    _handlerShowSwipeUpChangeGroupName,
    _handlerShowSwipeUpEditGroup,
    _handlerShowSwipeUpMoreUser,
    _handlerShowSwipeUpMoreGroup,
    _handlerOnChangeGroupName,
    _handlerSubmitChangeGroupName,
    _handlerAddDeleteAdmin,
    _handlerDeleteMemberConfirmation,
    _handlerSeeDetailMember,
    _handlerOnPressLeaveGroup,
    _handlerSetActiveSearch,
    _handlerNavigationToAddMemberScreen,
  };
};

export default useDiscussionGrup;
