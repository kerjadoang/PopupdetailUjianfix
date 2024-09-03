import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import styles from './styles';
import useAsesmenMurid from './useAsesmenMurid';
import {Header} from '@components/atoms';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import Colors from '@constants/colors';
import {bgBlueOrnament} from '@assets/images';
import SectionUjian from './components/SectionUjian';
import SectionTugas from './components/SectionTugas';

const AsesmenMuridScreen = () => {
  const {menuItem} = useAsesmenMurid();
  return (
    <View style={{flex: 1}}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={'Asesmen Murid'}
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

          {/* MARK: START Ujian */}
          <SectionUjian />
          {/* MARK: END Ujian */}

          {/* MARK: START Tugas */}
          <SectionTugas />
          {/* MARK: END Tugas */}
        </ScrollView>
      </View>
      {/* MARK: END Body */}
    </View>
  );
};

export {AsesmenMuridScreen};
