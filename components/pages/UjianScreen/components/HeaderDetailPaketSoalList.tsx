import Colors from '@constants/colors';
import {Pressable, Text} from 'react-native';
import {
  useDetailRawSoalList,
  useDetailSoalList,
  useDetailSoalListActions,
} from '../zustand';
import SelectedCheckBoxIcon from '@assets/svg/Checkbox_selected.svg';
import UnselectCheckBoxIcon from '@assets/svg/Checkbox_unselect.svg';
import {MainText, MainView} from '@components/atoms';
import Info from '@assets/svg/ic24_blue_info.svg';
import Fonts from '@constants/fonts';

type CheckBoxProps = {
  selected: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = props => {
  if (props.selected) {
    return <SelectedCheckBoxIcon />;
  }
  return <UnselectCheckBoxIcon />;
};

interface Props {
  listMode: DetailPaketSoalListMode;
  labelName: string;
}

const HeaderDetailPaketSoalList: React.FC<Props> = ({
  labelName,
  listMode = 'detail',
}) => {
  const rawSoalList = useDetailRawSoalList();
  const soalList = useDetailSoalList();
  const {setSoalList} = useDetailSoalListActions();

  if (listMode === 'delete') {
    const isChecked = rawSoalList?.length === soalList?.length;
    return (
      <MainView
        marginHorizontal={16}
        flexDirection="row"
        justifyContent="space-between"
        alignContent="space-between">
        <MainText fontSize={14}>Pilih Semua</MainText>
        <Pressable
          style={{marginRight: 12}}
          onPress={() => {
            if (isChecked) {
              setSoalList([]);
              return;
            }
            return setSoalList(rawSoalList || []);
          }}>
          <CheckBox selected={isChecked} />
        </Pressable>
      </MainView>
    );
  }

  if (listMode === 'reorder') {
    return (
      <MainView
        backgroundColor={Colors.primary.light3}
        flexDirection="row"
        paddingVertical={8}
        paddingHorizontal={14}
        alignItems="center"
        borderRadius={10}
        overflow="hidden"
        marginHorizontal={16}>
        <Info
          width={24}
          height={24}
          color={Colors.primary.base}
          style={{marginRight: 8}}
        />
        <MainText fontFamily={Fonts.LightPoppins} fontWeight="400">
          Geser untuk mengatur urutan soal.
        </MainText>
      </MainView>
    );
  }

  return (
    <Text
      style={{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: Colors.dark.neutral100,
        marginHorizontal: 16,
        paddingBottom: 16,
      }}>
      {labelName}
    </Text>
  );
};

export default HeaderDetailPaketSoalList;
