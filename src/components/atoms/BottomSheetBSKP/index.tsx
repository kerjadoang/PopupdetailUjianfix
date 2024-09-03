import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Colors from '@constants/colors';

type Props = {
  title: string;
  category: string;
  titleList: string;
  lists: string[];
  action: () => void;
};

const BottomSheetBSKP: FC<Props> = ({
  title,
  category,
  titleList,
  lists,
  action,
}) => {
  return (
    <>
      <View style={styles.line} />

      <View style={styles.header}>
        <Text style={styles.header_title}>{title}</Text>
        <Text style={styles.header_subTitle}>{category}</Text>
      </View>

      <View>
        <Text style={styles.content_title}>{titleList}</Text>

        <View>
          {lists.map((val, id) => (
            <View key={id} style={styles.content_list}>
              <Text>{'\u2022'}</Text>

              <Text style={styles.content_list_text}>{val}</Text>
            </View>
          ))}
        </View>
      </View>

      <Button
        onPress={action}
        mode="contained"
        style={styles.button}
        buttonColor={Colors.primary.base}>
        Mulai
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    width: 64,
    borderBottomColor: Colors.primary.base,
    borderRadius: 10,
    borderBottomWidth: 4,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
  },
  header_title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.16,
    color: Colors.dark.neutral100,
  },
  header_subTitle: {
    backgroundColor: Colors.primary.light3,
    marginTop: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    textAlign: 'center',
    letterSpacing: 0.25,
    color: Colors.primary.base,
  },
  content_title: {
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  content_list: {
    flexDirection: 'row',
  },
  content_list_text: {
    flex: 1,
    marginLeft: 5,
    letterSpacing: 0.25,
  },
  button: {
    marginTop: 16,
  },
});

export {BottomSheetBSKP};
