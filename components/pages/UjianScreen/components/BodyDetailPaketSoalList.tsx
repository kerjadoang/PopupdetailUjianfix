import {EmptyDisplay, MainView} from '@components/atoms';
import PlusIcon from '@assets/svg/plus.svg';
import MaskotIconEmptyState from '@assets/svg/maskot_11.svg';
import {
  useDetailRawSoalList,
  useDetailSoalList,
  useDetailSoalListActions,
} from '../zustand';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import SoalListItem from './SoalListItem';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

interface Props {
  listMode: DetailPaketSoalListMode;
  isAddMode: boolean;
  selectedSoal: IBasePackageQuestion[];
  setVisibleMenu: CallBackWithParams<void, boolean>;
  onPressSoalItem: CallBackWith2Params<void, IBasePackageQuestion, number>;
}

const BodyDetailPaketSoalList: React.FC<Props> = ({
  isAddMode,
  selectedSoal,
  onPressSoalItem,
  setVisibleMenu,
  listMode,
}) => {
  const soalList = useDetailSoalList() || [];
  const rawSoalList = useDetailRawSoalList() || [];
  const {setSoalList} = useDetailSoalListActions();

  const renderItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<IBasePackageQuestion>) => {
    return (
      <ScaleDecorator>
        <SoalListItem
          soalList={listMode === 'delete' ? soalList : []}
          listMode={listMode}
          isActive={isActive}
          onLongPress={() => listMode === 'reorder' && drag()}
          isAddMode={isAddMode}
          data={item}
          index={getIndex() || 0}
          onPress={() => onPressSoalItem(item, getIndex() || 0)}
          selected={selectedSoal?.some(soal => soal.id === item.id)}
        />
      </ScaleDecorator>
    );
  };

  return (
    <MainView flex={1}>
      <DraggableFlatList
        data={listMode === 'reorder' ? soalList : rawSoalList}
        keyExtractor={(item: IBasePackageQuestion, index: number) =>
          item.id?.toString() ?? index.toString()
        }
        renderItem={renderItem}
        containerStyle={{paddingBottom: 80}}
        onDragEnd={({data}) => setSoalList(data)}
        ListEmptyComponent={
          <EmptyDisplay
            title={'Belum Ada Soal Ditambahkan'}
            desc="Soal yang telah ditambahkan
            akan tampil di sini."
            btnLabel="Tambah Soal"
            titleStyle={{fontSize: 16}}
            descStyle={{fontSize: 14}}
            btnLabelStyle={{fontSize: 16}}
            containerStyle={{
              height: WINDOW_HEIGHT,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -70,
              alignSelf: 'center',
              width: '95%',
            }}
            btnContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            action={() => {
              setVisibleMenu(true);
            }}
            btnIcon={<PlusIcon />}
            imageSvg={<MaskotIconEmptyState />}
          />
        }
        contentContainerStyle={{gap: 16, padding: 16}}
      />
    </MainView>
  );
};

export default BodyDetailPaketSoalList;
