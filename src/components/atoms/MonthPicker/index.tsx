import React from 'react';
import {ScrollPicker} from '@components/atoms';
import {Text, View, StyleSheet} from 'react-native';
import dayjs from 'dayjs';

type Props = {
  selected?: any;
  onChange?: any;
  onClose?: any;
  action?: any;
};

const generateMonth = () => {
  let months = [];
  for (let i = 0; i < 12; i++) {
    let month = dayjs().month(i).locale('id').format('MMMM');
    months.push(month);
  }
  return months;
};

const generateYear = () => {
  let years = [];
  for (let i = 0; i < 50; i++) {
    let year = dayjs().subtract(i, 'year').format('YYYY');
    years.push(year);
  }
  return years.reverse();
};

const MonthPicker = ({selected, onChange}: Props) => {
  const val = (element: string) => element === `${selected?.year}`;
  const selectedYearIndex = generateYear().findIndex(val);

  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <ScrollPicker
          dataSource={generateMonth()}
          selectedIndex={selected.month - 1}
          renderItem={data => {
            return (
              <View>
                <Text>{data}</Text>
              </View>
            );
          }}
          borderRadiusLeft={20}
          borderRadiusRight={0}
          onValueChange={(data, index) => {
            onChange({...selected, month: index + 1});
          }}
          wrapperHeight={180}
          wrapperColor="#FFFFFF"
          itemHeight={45}
          width={250}
        />
        <ScrollPicker
          dataSource={generateYear()}
          selectedIndex={selectedYearIndex}
          renderItem={data => {
            return (
              <View>
                <Text>{data}</Text>
              </View>
            );
          }}
          onValueChange={data => {
            onChange({...selected, year: data});
          }}
          borderRadiusLeft={0}
          borderRadiusRight={20}
          wrapperHeight={180}
          wrapperColor="#FFFFFF"
          itemHeight={45}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'white',
    padding: 4,
  },
  icon: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
  },
  text: {
    fontSize: 16,
    color: '#1D252D',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: '#C2185B',
    width: 250,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollView: {
    height: 100,
    backgroundColor: 'pink',
  },
});

export {MonthPicker};
