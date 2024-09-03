import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Colors from '@constants/colors';

type Props = {
  status: string;
  dateTime: string;
  title: string;
  description: string;
  price: string;
  action: () => void;
};

const HistoryItem: FC<Props> = ({
  status,
  dateTime,
  title,
  description,
  price,
  action,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.top_textStatus}>{status}</Text>
        <Text style={styles.top_textDateTime}>{dateTime}</Text>
      </View>

      <View style={styles.containerCenter}>
        <Text style={styles.center_title}>{title}</Text>
        <Text style={styles.center_description}>{description}</Text>
      </View>

      <View style={styles.containerBottom}>
        <Text style={styles.bottom_text}>{price}</Text>

        <Button
          onPress={action}
          mode="outlined"
          textColor={Colors.primary.base}
          style={styles.bottom_button}
          labelStyle={styles.bottom_buttonText}>
          Lihat Detail
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 10,
    backgroundColor: Colors.white,
  },
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  top_textStatus: {
    color: '#995F0D',
    backgroundColor: Colors.secondary.light2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    letterSpacing: 0.25,
  },
  top_textDateTime: {
    fontSize: 12,
    color: Colors.dark.neutral60,
  },
  containerCenter: {
    marginTop: 8,
  },
  center_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
  },
  center_description: {
    color: Colors.dark.neutral60,
    letterSpacing: 0.25,
  },
  containerBottom: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom_text: {
    color: Colors.dark.neutral80,
    letterSpacing: 0.25,
    fontSize: 18,
    fontWeight: '700',
  },
  bottom_button: {
    borderColor: Colors.primary.base,
  },
  bottom_buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export {HistoryItem};
