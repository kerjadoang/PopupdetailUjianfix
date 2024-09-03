import {StyleSheet, Text, View} from 'react-native';
import Colors from '@constants/colors';

type Props = {
  title: String;
  blueTitle: String;
};

const CardStepPayment: FC<Props> = ({title, blueTitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greyText}>{title}</Text>
      <Text style={blueTitle ? styles.blueText : {display: 'none'}}>
        {blueTitle}
      </Text>
    </View>
  );
};

export default CardStepPayment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: 15,
    borderRadius: 15,
    elevation: 6,
    marginVertical: 10,
  },
  greyText: {
    fontFamily: 'Poppins-Light',
    fontSize: 17,
  },
  blueText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: Colors.primary.light1,
  },
});
