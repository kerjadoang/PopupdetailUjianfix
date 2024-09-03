import {KoinIcon} from '@assets/images';
import Colors from '@constants/colors';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import WhiteCart from '@assets/svg/Buy.svg';
import Fonts from '@constants/fonts';

type Props = {
  coin: number;
  action: any;
};

const CardBuyCoin = ({coin, action}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Image source={KoinIcon} style={styles.leftIcon} />
        </View>
        <View style={styles.mid}>
          <Text style={styles.koin}>{coin}</Text>
          <Text style={styles.descKoin}>Koin Kelas Pintar</Text>
        </View>
      </View>

      <Pressable style={styles.right} onPress={action}>
        <WhiteCart width={16} height={16} style={styles.iconBtn} />
        <Text style={styles.textBtn}>Beli Koin</Text>
      </Pressable>
    </View>
  );
};

export {CardBuyCoin};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 40,
    padding: 12,
    justifyContent: 'space-between',
  },
  leftIcon: {
    width: 45,
    height: 45,
  },
  left: {
    marginRight: 8,
    justifyContent: 'center',
  },
  mid: {},
  right: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.primary.base,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  koin: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },
  descKoin: {
    fontFamily: 'Poppins-Light',
  },
  row: {
    flexDirection: 'row',
  },
  textBtn: {
    fontSize: 14,
    fontFamily: Fonts.SemiBoldPoppins,
    lineHeight: 22,
    color: Colors.white,
    textAlignVertical: 'center',
  },
  iconBtn: {
    marginRight: 10,
    alignSelf: 'center',
  },
});
