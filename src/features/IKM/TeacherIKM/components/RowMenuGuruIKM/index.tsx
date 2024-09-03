import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import IcChevronRightBlue from '@assets/svg/ic16_chevron_right.svg';
import IcChevronRightRed from '@assets/svg/ic16_chevron_right_red.svg';
import IcChevronRightYellow from '@assets/svg/ic16_chevron_right_yellow.svg';
import {MainText, MainView} from '@components/atoms';
import {useNavigate} from '@hooks/useNavigate';

const RowMenuGuruIKM = () => {
  const {navigateScreen} = useNavigate();

  const RowmMenuGuru = [
    {
      name: 'Perangkat Ajar',
      description: 'Materi Sekolah, Projek Pancasila, LKPD, Sesi Kelas',
      bgColor: Colors.supporting.blueLight2,
      icon: <IcChevronRightBlue />,
      onPress: () => {
        navigateScreen('PerangkatAjarScreen');
      },
    },
    {
      name: 'Asesmen Murid',
      description: 'Tugas, Ujian',
      bgColor: Colors.supporting.redLight2,
      icon: <IcChevronRightRed />,
      onPress: () => {
        navigateScreen('AsesmenMuridScreen');
      },
    },
    {
      name: 'Komunitas',
      description: 'Rapat Virtual, Grup Diskusi',
      bgColor: Colors.supporting.secondaryLight2,
      icon: <IcChevronRightYellow />,
      onPress: () => {
        navigateScreen('KomunitasScreen');
      },
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          data={RowmMenuGuru}
          style={styles.shadowItem}
          renderItem={({item, index}) => {
            return (
              <MainView
                borderRadius={10}
                overflow="hidden"
                marginHorizontal={16}
                marginBottom={16}>
                <TouchableOpacity key={index} onPress={item?.onPress}>
                  <MainView
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    backgroundColor={item?.bgColor}
                    paddingVertical={4}
                    paddingHorizontal={12}>
                    <MainText
                      type="Bold"
                      fontWeight="600"
                      fontSize={12}
                      color={Colors.dark.neutral100}>
                      {item?.name}
                    </MainText>
                    {item?.icon}
                  </MainView>
                </TouchableOpacity>
                <MainView backgroundColor={Colors.white}>
                  <MainText
                    paddingVertical={4}
                    paddingHorizontal={12}
                    fontSize={10}
                    color={Colors.dark.neutral80}>
                    {item?.description}
                  </MainText>
                </MainView>
              </MainView>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  shadowItem: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
});

export {RowMenuGuruIKM};
