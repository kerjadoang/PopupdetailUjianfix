import {Button, MainView} from '@components/atoms';
import {useDetailSoalList, useDetailSoalListActions} from '../zustand';
import {View} from 'react-native';
import Colors from '@constants/colors';

interface Props {
  listMode: DetailPaketSoalListMode;
  isAddMode: boolean;
  selectedSoal: any[];
  data: any;
  setVisibleMenu: CallBackWithParams<void, boolean>;
  onAddSoalToPaketSoal: VoidCallBack;
  onDoneEditMode: CallBackWithParams<void, IBasePackageQuestion[]>;
  setShowPopUpListMore: CallBackWithParams<void, boolean>;
}

const FooterDetailPaketSoalList: React.FC<Props> = ({
  data,
  isAddMode,
  listMode,
  onAddSoalToPaketSoal,
  selectedSoal,
  setVisibleMenu,
  onDoneEditMode,
  setShowPopUpListMore,
}) => {
  const soalList = useDetailSoalList() || [];
  const {setMode: setListMode, setSoalList} = useDetailSoalListActions();

  if (listMode !== 'detail') {
    const totalSoal = soalList?.length;
    const deleteTitle =
      totalSoal === 0 || totalSoal === 1
        ? 'Hapus Soal'
        : `Hapus ${totalSoal} Soal`;
    return (
      <MainView
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        backgroundColor={Colors.white}>
        <MainView flexDirection="row" gap={12} marginHorizontal={16}>
          <Button
            label="Batal"
            outline
            style={{flex: 1}}
            action={() => {
              if (listMode === 'reorder') {
                setShowPopUpListMore(true);
                return;
              }
              setListMode('detail');
              setSoalList([]);
            }}
            // isDisabled={loadingCreateSoalSendiri}
          />
          <Button
            label={listMode === 'reorder' ? 'Simpan' : deleteTitle}
            style={{flex: 1}}
            action={() => onDoneEditMode(soalList || [])}
            // isDisabled={loadingCreateSoalSendiri}
          />
        </MainView>
      </MainView>
    );
  }

  return (
    <MainView
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor={Colors.white}>
      {isAddMode && (
        <View style={{padding: 16, backgroundColor: Colors.white}}>
          <Button
            label={`Simpan ${selectedSoal.length ?? ''} Pilihan`}
            action={onAddSoalToPaketSoal}
            isDisabled={selectedSoal.length < 1}
          />
        </View>
      )}
      {!isAddMode &&
        data?.data?.package_question &&
        data?.data?.package_question?.length > 0 &&
        data?.data?.school_id && (
          <View style={{padding: 16, backgroundColor: Colors.white}}>
            <Button label="Tambah Soal" action={() => setVisibleMenu(true)} />
          </View>
        )}
    </MainView>
  );
};

export default FooterDetailPaketSoalList;
