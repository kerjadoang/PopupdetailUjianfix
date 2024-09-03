import Colors from '@constants/colors';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Button} from '@components/atoms';

type Props = {
  data: any;
  selected: any;
  setSelected: any;
  terapkanFilter?: () => void;
  setModalVisible?: () => void;
  clearSelected?: () => void;
};

const TipeFilter = ({
  // data,
  selected,
  setSelected,
  terapkanFilter,
  setModalVisible,
  clearSelected,
}: Props) => {
  const data = ['PR', 'Projek', 'Tugas'];
  return (
    <View style={{padding: 10}}>
      <Text style={styles.title}>Filter</Text>
      <View style={styles.headerSwipe}>
        <Text style={styles.text}>Tipe</Text>
      </View>
      <View style={styles.contentSwipe}>
        {data?.map((item: any) => {
          let active = selected.includes(item);
          return (
            <Pressable
              onPress={() => setSelected(item)}
              key={item}
              style={[
                styles.chipContainer,
                {
                  backgroundColor: active
                    ? Colors.primary.base
                    : Colors.primary.light3,
                },
              ]}>
              <Text
                style={[
                  styles.chipText,
                  {
                    color: active ? Colors.white : Colors.primary.base,
                  },
                ]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={[styles.contentSwipe, {justifyContent: 'space-around'}]}>
        <Button
          label="Atur Ulang"
          action={() => clearSelected()}
          style={{width: 120}}
          outline={true}
        />
        <Button
          label="Terapkan"
          action={() => {
            terapkanFilter();
            setModalVisible(false);
          }}
          style={{width: 120}}
        />
      </View>
    </View>
  );
};
export {TipeFilter};

const styles = StyleSheet.create({
  chipContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  chipText: {
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary.light3,
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  listHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subText: {
    borderRadius: 30,
    color: Colors.primary.base,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontFamily: 'Poppins-Bold',
  },
  button: {
    backgroundColor: Colors.primary.base,
    borderRadius: 20,
    padding: 10,
  },
  renderEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  seperator: {
    borderWidth: 1,
    margin: 16,
    borderColor: Colors.dark.neutral40,
  },
  downPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.light3,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 20,
  },
  headerSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentSwipe: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    marginVertical: 5,
    gap: 10,
  },
  swipeList: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: Colors.primary.light3,
    color: Colors.primary.base,
    padding: 10,
    borderRadius: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  // Kalender Style
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  today_button: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 25,
  },
  today_text: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: Colors.primary.base,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  dayName: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
    fontFamily: 'Poppins-Regular',
  },
  ViewDay: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  date: {
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
    textAlign: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});
