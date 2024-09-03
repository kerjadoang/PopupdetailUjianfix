import {apiGet, apiGetBulkImage, apiPut} from '@api/wrapping';
import {showErrorToast, useMergeState} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import provider from '@services/projectPancasila/provider';
import {
  IPancasilaListStatusProyek,
  Project,
} from '@services/projectPancasila/type';
import {useEffect, useState} from 'react';
import {ParamList} from 'type/screen';

const useStatusProyekTab = (service_type: 'guru' | 'kepsek') => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ProjectPancasilaScreen'>>();
  const [listStatusProyekBerlangsung, setListStatusProyekBerlangsung] =
    useState<IPancasilaListStatusProyek[]>([]);
  const [listStatusProyekRiwayat, setListStatusProyekRiwayat] = useState<
    IPancasilaListStatusProyek[]
  >([]);

  const [state, setState] = useMergeState({
    isLoading: false,
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    getListStatusProyek();
  }, [isFocused]);

  const getListStatusProyek = async () => {
    try {
      setState({isLoading: true});

      var data = await apiGet({
        url: provider.getListStatusProyek(),
      });

      data = await apiGetBulkImage({
        dottedString: 'sender.avatar',
        datas: data,
      });

      setListStatusProyekBerlangsung(
        data.filter((item: any) => item.status === 'berlangsung'),
      );

      setListStatusProyekRiwayat(
        data.filter((item: any) => item.status !== 'berlangsung'),
      );
    } catch (errorMessage: any) {
      showErrorToast(errorMessage || 'Error');
    } finally {
      setState({isLoading: false});
    }
  };

  const onDetailPress = (projectData: Project) => {
    navigation.navigate('EbookScreen', {
      projectData: projectData,
      screen_type: `${service_type} pancasila`,
    });
  };

  const onClickUbah = async (data: IPancasilaListStatusProyek) => {
    navigation.navigate('PancasilaKirimProyekScreen', {
      role: service_type,
      project_id: data.project_id,
      type: 'edit',
      data: data,
    });
  };
  const onClickHapus = async (data: IPancasilaListStatusProyek) => {
    try {
      setState({isLoading: true});
      await apiPut({
        url: URL_PATH.put_pancasila_hapus_status_send_proyek(data.id),
        body: {
          status: 'batal',
        },
      });
      setState({isLoading: false});
      getListStatusProyek();
    } catch (error) {
    } finally {
      setState({isLoading: false});
    }
  };

  const {isLoading}: any = state;
  return {
    isLoading,
    listStatusProyekBerlangsung,
    listStatusProyekRiwayat,
    getListStatusProyek,
    onDetailPress,
    onClickUbah,
    onClickHapus,
  };
};

export default useStatusProyekTab;
