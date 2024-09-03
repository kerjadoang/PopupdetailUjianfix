import Colors from '@constants/colors';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Header} from '@components/atoms/Header';
import {Button, CardAnak, PopUp} from '@components/atoms';
import {EmptyDisplay, CardCartHistory} from '@components/atoms';
import {MaskotEmptyCart} from '@assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {LinkAccountScreenParam, ParamList} from 'type/screen';
import {SCREEN_NAME} from '@constants/screen';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import useAnakSaya from '@components/organism/AnakSaya/useAnakSaya';
import {Text} from 'react-native';
import {useNavigate} from '@hooks/useNavigate';
import {fetchPurchase} from '@redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import RobotGembira from '@assets/svg/robot_gembira.svg';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import {useAssignAnak} from './chartHistory.query';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {isStringContains} from '@constants/functional';
import {RootState} from 'src/redux/rootReducer';
import {CartHistoryScreenParams} from 'type/screen';
import {RouteProp, useRoute} from '@react-navigation/native';

const BackdropComponent = (props: BottomSheetBackdropProps) => {
  return <BottomSheetBackdrop {...props} opacity={0.5} />;
};

const HeaderBottomSheet = ({packageName}: {packageName: string}) => {
  return (
    <View style={styles.bottomSheetTitleContainer}>
      <Text style={styles.bottomSheetTitle}>Berikan Paket</Text>
      <Text style={styles.textLight}>{packageName}</Text>
    </View>
  );
};

const EmptyBottomSheet = () => {
  return (
    <View style={styles.emptyBottomSheetContainer}>
      <RobotSedih />
      <View style={styles.emptyBottomSheetDescContainer}>
        <Text style={styles.emptyBottomSheetTitle}>Anak Belum Terhubung</Text>
        <Text style={[styles.emptyBottomSheetDesc, styles.textLight]}>
          Tambah akun anak untuk berikan paket, pantau aktivitas dan progres
          belajar anak.
        </Text>
      </View>
    </View>
  );
};

const CartHistoryScreen = () => {
  const {navigation, navigateScreen, getRouteParams} = useNavigate();
  const route = useRoute<RouteProp<ParamList, SCREEN_NAME.CartHistoryScreen>>();
  // const navigation: any = useNavigation();
  const {access_token} = getRouteParams<CartHistoryScreenParams>();
  const dispatch = useDispatch();
  const purchaseHistory: any = useSelector(
    (state: RootState) => state.purchaseHistory,
  );
  const purchase = purchaseHistory?.data;
  const activeTab = route.params?.activeTab || 0;

  const [activeBtn, setActiveBtn] = useState(0);
  const [showListChildren, setShowListChildren] = useState<boolean>(false);
  const [packageName, setPackageName] = useState<string>('');
  const [paymentPackageId, setPaymentPackageId] = useState<null | number>(null);
  const [assignedChildren, setAssignedChildrenId] = useState<Record<
    string,
    any
  > | null>(null);
  const [openModalAssignMuridSuccess, setOpenModalAssignMuridSuccess] =
    useState(false);

  const buttonSaveChildrenDisabled = assignedChildren === null;

  const {getAllChildren, setUser, refetchAllChildren} = useAnakSaya();
  const notPending = getAllChildren.data.filter(
    (d: any) => d.approval_status !== 'pending',
  );

  const {assignAnak, data: responseAssignAnak, isPending} = useAssignAnak();

  const isSuccessAssignAnak =
    responseAssignAnak?.message === 'berhasil assign paket';

  const isEmptyListChildren = notPending.length <= 0;
  const snapPoints = isEmptyListChildren ? ['60%', '60%'] : ['70%', '70%'];

  const status = [
    {
      id: 1,
      name: 'Menunggu Pembayaran',
      value: 'pending',
    },
    {
      id: 2,
      name: 'Berhasil',
      value: 'succeded',
    },
    {
      id: 3,
      name: 'Gagal',
      value: 'failed',
    },
  ];

  const statusName = x => {
    if (x === 'pending') {
      return 'Menunggu Pembayaran';
    } else if (x === 'succeded') {
      return 'Berhasil';
    } else {
      return 'Gagal';
    }
  };

  useEffect(() => {
    dispatch(fetchPurchase(status[activeBtn].value, access_token));
  }, [activeBtn]);

  useEffect(() => {
    dispatch(fetchPurchase(status[activeBtn].value));
    setActiveBtn(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (isSuccessAssignAnak) {
      setOpenModalAssignMuridSuccess(true);
    }
  }, [isSuccessAssignAnak]);

  const fetchPackage = async (packageNameArg: string, packageId: number) => {
    setShowListChildren(true);
    setPackageName(packageNameArg);
    setPaymentPackageId(packageId);
    refetchAllChildren();
  };

  const navigateToLinkAccount = () => {
    navigateScreen<LinkAccountScreenParam>(SCREEN_NAME.LinkAccountScreen, {
      title: 'orangtua',
    });
  };

  const handleSubmitBottomSheet = () => {
    if (assignedChildren) {
      assignAnak({
        child_id: assignedChildren.user_id,
        package_id: paymentPackageId as number,
      });
      setUser(assignedChildren);
      setShowListChildren(false);
    }
  };

  const closeModalSuccessAssignMurid = () => {
    setOpenModalAssignMuridSuccess(false);
  };

  const onBackToBeranda = () => {
    setOpenModalAssignMuridSuccess(false);
    dispatch(fetchPurchase(status[activeBtn].value));
  };

  if (isPending) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Header
          label={'Riwayat Pembelian'}
          onPressIconLeft={() => navigation.goBack()}
        />
        <View style={styles.BtnContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {status.map((item, index) => {
              return (
                <Button
                  label={item.name}
                  key={item.id}
                  action={() => {
                    setActiveBtn(index);
                  }}
                  style={styles.btn}
                  height={45}
                  color={
                    index === activeBtn ? Colors.white : Colors.dark.neutral80
                  }
                  background={
                    index === activeBtn
                      ? Colors.primary.base
                      : Colors.primary.light3
                  }
                />
              );
            })}
          </ScrollView>
        </View>
        <ScrollView>
          {purchase.length >= 1 ? (
            <View style={{width: '95%', marginHorizontal: '2.5%'}}>
              {purchase?.map(item => {
                const categoryName =
                  item?.payment_package?.[0]?.package?.category?.name || '';
                const className = item?.payment_package?.[0]?.class?.name
                  ? `(${item?.payment_package?.[0]?.class?.name})`
                  : '';

                return (
                  <CardCartHistory
                    key={item?.id}
                    styleStatus={
                      item.status === 'pending'
                        ? 1
                        : item.status === 'succeded'
                        ? 2
                        : 3
                    }
                    isNotAssigned={!item?.is_assign}
                    status={statusName(item.status)}
                    date={item?.created_at}
                    count={'1'}
                    desc={`${categoryName} ${
                      isStringContains(categoryName, 'koin')
                        ? ''
                        : item?.payment_package?.[0]?.package?.duration === 30
                        ? '1 Bulan'
                        : '12 Bulan'
                    } ${className}`}
                    price={item?.total}
                    action={() => {
                      navigateScreen('CartHistoryDetailScreen', {
                        id: item?.payment_package[0]?.payment_id,
                        data: item,
                      });
                    }}
                    onAssign={() => {
                      fetchPackage(
                        item?.payment_package?.[0]?.package?.category?.name,
                        item?.payment_package[0].id,
                      );
                    }}
                  />
                );
              })}
            </View>
          ) : (
            <EmptyDisplay
              title="Belum ada Pembelian"
              desc="Beli Paket dan Koin Kelas Pintar
sekarang, yuk!"
              image={MaskotEmptyCart}
              btnLabel="Beli Paket"
              action={() => navigateScreen('BottomTabNavigator')}
            />
          )}
        </ScrollView>
        {showListChildren && (
          <BottomSheet
            backdropComponent={BackdropComponent}
            style={styles.bottomSheetAnak}
            snapPoints={snapPoints}
            onClose={() => setShowListChildren(false)}
            enablePanDownToClose>
            <BottomSheetFlatList
              contentContainerStyle={styles.listContainer}
              data={notPending}
              renderItem={({item}) => {
                return (
                  <CardAnak
                    onPress={() => setAssignedChildrenId(item)}
                    id={assignedChildren?.user_id}
                    data={item}
                    withShadow
                    withRadio
                  />
                );
              }}
              ListHeaderComponent={
                <HeaderBottomSheet packageName={packageName} />
              }
              ListEmptyComponent={<EmptyBottomSheet />}
            />
            <View style={isEmptyListChildren && styles.saveButton}>
              <TouchableWithoutFeedback onPress={navigateToLinkAccount}>
                <Text style={styles.addChild}>+ Tambah Akun Anak</Text>
              </TouchableWithoutFeedback>

              <Button
                action={handleSubmitBottomSheet}
                style={styles.buttonCTA}
                isDisabled={buttonSaveChildrenDisabled}
                label="Simpan"
              />
            </View>
          </BottomSheet>
        )}
        <PopUp
          close={closeModalSuccessAssignMurid}
          Icon={RobotGembira}
          title="Paket Berhasil Diberikan"
          desc="Paket Kelas Pintar Regular berhasil di berikan untuk Andi Santoso"
          titleConfirm="Oke"
          actionConfirm={onBackToBeranda}
          show={openModalAssignMuridSuccess}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  BtnContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  btn: {
    width: 'auto',
    paddingHorizontal: 16,
    marginHorizontal: 10,
    paddingVertical: 7,
  },
  listContainer: {paddingBottom: 20},

  bottomSheetAnak: {
    alignItems: 'center',
  },
  bottomSheetTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    gap: 6,
  },
  bottomSheetTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  buttonCTA: {
    marginBottom: 12,
  },
  addChild: {
    color: Colors.primary.base,
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 20,
  },
  saveButton: {
    paddingHorizontal: '4%',
  },
  emptyBottomSheetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginVertical: 16,
    gap: 20,
  },
  emptyBottomSheetDescContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  emptyBottomSheetTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  emptyBottomSheetDesc: {
    textAlign: 'center',
    fontSize: 16,
  },
  textLight: {
    color: Colors.dark.neutral60,
  },
});
export {CartHistoryScreen};
