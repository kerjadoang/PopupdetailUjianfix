import {
  rdxDispatch,
  showErrorToast,
  showSuccessToast,
  useMergeState,
} from '@constants/functional';
import {apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCreateNote} from '@services/lms';
import {getDetailNotePancasilaDestroy} from '@redux';
import {CreateNoteBody} from '@services/lpt/type';
import {ParamList} from 'type/screen';

const usePancasilaDetailNote = (role?: any, projekData?: IProyekPancasila) => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ProjectPancasilaScreen'>>();
  const [state] = useMergeState({
    isLoading: false,
  });
  const {mutate: createNote} = useCreateNote();

  const gotoDetailProyek = async () => {
    navigation.navigate('PancasilaKirimProyekScreen', {
      role: role,
      project_id: projekData?.id,
      type: 'kirim',
    });
  };

  //kepsek
  const createNotes = async (data: CreateNoteBody) => {
    if (!data.notes || !data.file) {
      return;
    }
    await createNote({
      project_id: data.chapter_material_id ?? projekData?.id,
      notes: data.notes,
      file: data.file ?? null,
    });
    rdxDispatch(getDetailNotePancasilaDestroy());
  };

  //kepsek
  const onKonfirmRekomendasi = async (data: any) => {
    try {
      // showLoading();
      await createNotes(data);
      await apiPost({
        url: URL_PATH.post_pancasila_kirim_rekomendasi_proyek(),
        body: {
          project_id: projekData?.id,
          is_recommended: projekData?.is_recommended ? false : true,
        },
      });
      // dismissLoading();
      navigation.pop();

      const toastMessage = projekData?.is_recommended
        ? 'Berhasil Batalkan Rekomendasi'
        : 'Berhasil Merekomendasi';
      showSuccessToast(toastMessage);
    } catch (error: any) {
      // dismissLoading();
      showErrorToast(error || 'Terjadi Kesalahan');
    } finally {
    }
  };

  const {isLoading}: any = state;
  return {isLoading, gotoDetailProyek, onKonfirmRekomendasi};
};
export default usePancasilaDetailNote;
