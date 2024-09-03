import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import IconEdit from '@assets/svg/ic24_edit_2.svg';
import IconTrash from '@assets/svg/ic24_trash_red.svg';
import provider from '@services/lms/provider';
import mediaProvider from '@services/media/provider';
import {convertDate} from '@constants/functional';
import {ParamList} from 'type/screen';

const {height: HEIGHT} = Dimensions.get('window');

const TAB_NAMES = {
  AKTIF: 'Aktif',
  DIJADWALKAN: 'Dijadwalkan',
} as const;

const LIMIT_OFFSET = {
  offset: 0,
  limit: 10,
};

const formatDate = (date: string) =>
  convertDate(date).format('DD MMM YYYY • H:mm');

const useAnnouncementManageScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'AnnouncementManageScreen'>>();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadNewData, setIsLoadNewData] = useState(false);
  const [aktifs, setAktifs] = useState([]);
  const [aktifPagination, setAktifPagination] = useState(LIMIT_OFFSET);
  const [isAktifNextData, setIsAktifNextData] = useState(false);
  const [dijadwalkans, setDijadwalkans] = useState([]);
  const [isDijadwalkanNextData, setIsDijadwalkanNextData] = useState(false);

  const [dijadwalkanPagination, setDijadwalkanPagination] =
    useState(LIMIT_OFFSET);

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [isShowSwipeUpItem, setIsShowSwipeUpItem] = useState(false);
  const [isShowPopUpItemHapus, setIsShowPopUpItemHapus] = useState(false);

  const swipeUpListItem = [
    {
      icon: <IconEdit />,
      label: 'Perbarui Pengumuman',
      onPress: (id: number, isFrom: 'Dijadwalkan' | 'Aktif') => {
        setIsShowSwipeUpItem(false);
        navigation.navigate('AnnouncementManageCreateScreen', {
          id,
          type: 'EDIT',
          isFrom: isFrom,
        });
      },
    },
    {
      icon: <IconTrash />,
      label: 'Hapus Pengumuman',
      onPress: () => {
        setIsShowSwipeUpItem(false);
        setIsShowPopUpItemHapus(true);
      },
    },
  ];

  const __getAnnouncements = async ({
    status,
    offset,
    limit,
  }: {
    status: 'active' | 'scheduled';
    offset: number;
    limit: number;
  }) => {
    const {status: httpStatus, data} = await provider.getAnnouncements({
      status,
      offset,
      limit,
    });

    if (httpStatus === 200) {
      const datas = data?.data ?? [];

      if (status === 'active') {
        setIsAktifNextData(datas?.length > 0);
        setAktifs(offset === 0 ? datas : [...aktifs, ...datas]);
      } else {
        setIsDijadwalkanNextData(datas?.length > 0);
        setDijadwalkans(offset === 0 ? datas : [...dijadwalkans, ...datas]);
      }
    }
  };

  const __getAnnouncement = async (announcementID: number) => {
    const {
      status,
      data: {data},
    } = await provider.getAnnouncement(announcementID);

    if (status === 200 && data) {
      const {image, ...sd} = data;

      try {
        const {
          data: {path_url},
        } = await mediaProvider.getImage(image);

        setDetailData({...sd, image: path_url});
      } catch (_) {}
    }
  };

  const __deleteAnnouncement = async (announcementID: number) => {
    const {status} = await provider.deleteAnnouncement(announcementID);

    if (status === 200) {
      setIsLoadNewData(!isLoadNewData);

      Toast.show({
        type: 'success',
        text1: 'Pengumuman berhasil dihapus.',
      });
    }
  };

  const __onEndReachedAktif = () => {
    if (!isLoading && isAktifNextData) {
      setAktifPagination(prevState => ({
        ...prevState,
        // offset: aktifPagination.offset + aktifPagination.limit,
        offset: prevState.offset + 1,
      }));
    }
  };

  const __onEndReachedDijadwalkan = () => {
    if (!isLoading && isDijadwalkanNextData) {
      setDijadwalkanPagination(prevState => ({
        ...prevState,
        // offset: dijadwalkanPagination.offset + dijadwalkanPagination.limit,
        offset: prevState.offset + 1,
      }));
    }
  };

  return {
    navigation,
    isLoading,
    setIsLoading,
    isLoadNewData,
    aktifPagination,
    setAktifPagination,
    aktifs,
    dijadwalkanPagination,
    setDijadwalkanPagination,
    dijadwalkans,
    isShowDetail,
    setIsShowDetail,
    detailData,
    isShowSwipeUpItem,
    setIsShowSwipeUpItem,
    swipeUpListItem,
    isShowPopUpItemHapus,
    setIsShowPopUpItemHapus,
    isAktifNextData,
    //
    __getAnnouncements,
    __getAnnouncement,
    __deleteAnnouncement,
    __onEndReachedAktif,
    __onEndReachedDijadwalkan,
  };
};

export {
  HEIGHT,
  TAB_NAMES,
  LIMIT_OFFSET,
  formatDate,
  useAnnouncementManageScreen,
};
