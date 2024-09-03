import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SwipeUp} from '../../atoms/SwipeUp';
import {generalStyles} from '@constants/styles';
import EditIcon from '@assets/svg/ic24_edit_2.svg';
import TrashIcon from '@assets/svg/ic24_trash_red.svg';
import Fonts from '@constants/fonts';
import {useDeleteMaterial, useGetSchoolMaterialsDetail} from '@services/lms';
import {PopUp} from '@components/atoms';
import Robot from '@assets/svg/ic_robot_hapus.svg';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import Colors from '@constants/colors';
interface IProps {
  navigation?: any;
  onClose: any;
  visible: boolean;
  data: any;
  fromScreen?: string;
  screenParams?: any;
}
const SwipeUpActionMaterials = (props: IProps) => {
  const {data, refetch, loading} = useGetSchoolMaterialsDetail();
  const {mutate: deleteMaterial} = useDeleteMaterial();
  const [showAlertDelete, setShowAlertDelete] = useState<boolean>(false);
  const _renderChildrenSwipeUp = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={generalStyles.row}
          onPress={() =>
            refetch(props?.data?.id).then((res: any) => {
              setShowAlertDelete(false);
              props?.onClose();
              if (res?.data && !loading) {
                props?.navigation?.navigate('EditSchoolMaterialsScreen', {
                  materialsParams: data?.data ?? res?.data,
                  fromScreen: props?.fromScreen,
                  screenParams: props?.screenParams,
                });
              }
            })
          }>
          <EditIcon width={24} height={24} />
          <Text style={styles.label}>Ubah Materi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[generalStyles.row, styles.spacing]}
          onPress={() => {
            setShowAlertDelete(true);
          }}>
          <TrashIcon width={24} height={24} />
          <Text style={styles.label}>Hapus Materi</Text>
        </TouchableOpacity>
        {showAlertDelete ? (
          <PopUp
            actionCancel={() => {
              deleteMaterial(props?.data?.id).then(() => {
                setShowAlertDelete(false);
                props?.onClose();
                props?.navigation?.goBack();
              });
            }}
            actionConfirm={() => {
              setShowAlertDelete(false);
            }}
            titleConfirm="Batal"
            titleCancel="Hapus"
            Icon={Robot}
            title="Hapus Materi"
            desc={`Apakah Anda yakin untuk menghapus materi ${props?.data?.title} ? dari ${props?.data?.chapterName} `}
          />
        ) : null}
        {loading ? <LoadingIndicator /> : null}
      </View>
    );
  };
  return (
    <SwipeUp
      {...props}
      isSwipeLine
      height={500}
      children={_renderChildrenSwipeUp()}
    />
  );
};

export {SwipeUpActionMaterials};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  spacing: {marginVertical: 24},
  label: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.16,
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
});
