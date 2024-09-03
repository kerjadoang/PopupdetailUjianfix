import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import usePerangkatAjarScreen from './usePerangkatAjarScreen';
import {Header} from '@components/atoms';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import Colors from '@constants/colors';
import {bgBlueOrnament} from '@assets/images';
import StatusProyekTab from '@components/pages/ProjectPancasilaScreen/components/StatusProyekTab';
import CardSesiKelas from './component/CardSesiKelas';

const PerangkatAjarScreen = () => {
  const {menuItem} = usePerangkatAjarScreen();

  return (
    <View style={{flex: 1}}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={'Perangkat Ajar'}
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

          {/* MARK: START Projek Berlangsung */}
          <StatusProyekTab
            service_type="guru"
            isShowRiwayat={false}
            limit={3}
          />
          {/* MARK: END Projek Berlangsung */}

          {/* MARK: START Sesi Kelas */}
          <CardSesiKelas />
          {/* MARK: END Sesi Kelas */}
        </ScrollView>
      </View>
      {/* MARK: END Body */}
    </View>
  );
};

export {PerangkatAjarScreen};
