import React from 'react';
import {
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import styles from './styles';
import useKomunitas from './useKomunitas';
import {Header, MainText, MainView, PopUp, SwipeUp} from '@components/atoms';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import Colors from '@constants/colors';
import {bgBlueOrnament} from '@assets/images';
import {useRapatVirtualTeacherScreen} from '@components/pages/RapatVirtualTeacherScreen/useRapatVirtualTeacherScreen';
import {CardRapatVirtual} from '@components/pages/RapatVirtualTeacherScreen/component';
import IconEdit from '@assets/svg/ic24_edit_2.svg';
import IconDelete from '@assets/svg/ic24_trash_red.svg';
import RobotHapus from '@assets/svg/ic_robot_hapus.svg';

const KomunitasScreen = () => {
  const {
    navigation,
    menuItem,
    dataItem,
    setDataItem,
    showMoreSwipeUp,
    setShowMoreSwipeUp,
    showConfirmCancel,
    setShowConfirmCancel,
  } = useKomunitas();
  const {list, cancelVirtualMeeting} = useRapatVirtualTeacherScreen();

  const renderMoreSwipeUp = () => {
    return (
      <MainView padding={16} gap={24}>
        <Pressable
          onPress={() => {
            setShowMoreSwipeUp(false);
            navigation.navigate('RapatVirtualCreateScreen', {
              type: 'edit',
              data: dataItem,
            });
          }}>
          <MainView flexDirection="row" gap={12} alignItems="center">
            <IconEdit />
            <MainText
              fontSize={16}
              color={Colors.dark.neutral100}
              lineHeight={24}>
              Ubah Rapat Virtual
            </MainText>
          </MainView>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowMoreSwipeUp(false);
            setShowConfirmCancel(true);
          }}>
          <MainView flexDirection="row" gap={12} alignItems="center">
            <IconDelete />
            <MainText
              fontSize={16}
              color={Colors.dark.neutral100}
              lineHeight={24}>
              Batalkan Rapat Virtual
            </MainText>
          </MainView>
        </Pressable>
      </MainView>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Header
          iconLeft={<IconArrowLeftWhite width={24} height={24} />}
          label={'Komunitas'}
          styleLabel={styles.styleLabel}
          backgroundColor="transparent"
          colorLabel={Colors.white}
        />
        <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />

        {/* MARK: START Body */}
        <View style={styles.cardContainer}>
          <ScrollView style={{flexGrow: 1}}>
            {/* MARK: START Menu Item */}
            <View style={[styles.menuContainer, styles.shadowItem]}>
              <FlatList
                horizontal
                scrollEnabled={false}
                data={menuItem}
                renderItem={(item: any) => {
                  item = item?.item;
                  return (
                    <TouchableOpacity onPress={item?.onPress}>
                      <View style={styles.menuItem}>
                        {item?.image}
                        <Text style={styles.menuName}>{item?.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            {/* MARK: END Menu Item */}

            {/* MARK: START Rapat Virtual */}
            {list !== null ? (
              <View style={{marginBottom: 50}}>
                {list?.map((items: any, index: number) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() =>
                        navigation.navigate('RapatVirtualDetailScreen', {
                          data: items,
                        })
                      }>
                      <CardRapatVirtual
                        data={items}
                        action={() =>
                          navigation.navigate('RapatVirtualTestCamerascreen', {
                            data: items,
                          })
                        }
                        actionMore={() => {
                          setDataItem(items);
                          setShowMoreSwipeUp(true);
                        }}
                      />
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
            {/* MARK: END Rapat Virtual */}
          </ScrollView>
        </View>
        {/* MARK: END Body */}
      </View>

      {/* MARK: START Swipe Up More */}
      <SwipeUp
        isSwipeLine={true}
        visible={showMoreSwipeUp}
        onClose={() => setShowMoreSwipeUp(false)}
        height={500}
        children={renderMoreSwipeUp()}
      />
      {/* MARK: END Swipe Up More */}

      {/* MARK: START PopUp Hapus */}
      <PopUp
        show={showConfirmCancel}
        Icon={RobotHapus}
        title="Batalkan Rapat Virtual"
        desc="Apakah Anda yakin akan membatalkan rapat virtual?"
        titleCancel="Kembali"
        actionCancel={() => {
          setShowConfirmCancel(false);
        }}
        titleConfirm="Batalkan"
        actionConfirm={() => {
          cancelVirtualMeeting(dataItem?.id);
        }}
      />
      {/* MARK: END PopUp Hapus */}
    </>
  );
};

export {KomunitasScreen};
