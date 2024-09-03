/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Button} from '@components/atoms';
import CalendarIcon from '@assets/svg/ic_calendar_blue.svg';
import dayjs from 'dayjs';

interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

type _FilterDateRiwayat = {
  handleChooseDateFrom: any;
  handleChooseDateTo: any;
  handleSubmitAction: any;
  dateFrom: IDatePicker;
  dateTo: IDatePicker;
};

const FilterDateRiwayat = ({
  handleChooseDateFrom,
  handleChooseDateTo,
  dateFrom,
  handleSubmitAction,
  dateTo,
}: _FilterDateRiwayat) => {
  const [filterType, setFilterType] = useState<
    'Semua Tanggal' | 'Pilih Tanggal'
  >('Semua Tanggal');
  return (
    <View style={{marginTop: '5%', paddingHorizontal: '5%'}}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            lineHeight: 28,
            color: Colors.dark.neutral100,
          }}>
          Filter
        </Text>
      </View>
      <View style={{marginVertical: 15}}>
        <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
          <Pressable
            onPress={() => setFilterType('Semua Tanggal')}
            style={
              filterType === 'Semua Tanggal'
                ? {
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 20,
                    backgroundColor: Colors.primary.base,
                  }
                : {
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 20,
                    backgroundColor: Colors.primary.light3,
                  }
            }>
            <Text
              style={
                filterType === 'Semua Tanggal'
                  ? {
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      lineHeight: 22,
                      color: 'white',
                    }
                  : {
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      lineHeight: 22,
                      color: Colors.primary.base,
                    }
              }>
              Semua Tanggal
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterType('Pilih Tanggal')}
            style={
              filterType === 'Pilih Tanggal'
                ? {
                    paddingHorizontal: 10,
                    marginLeft: 10,
                    paddingVertical: 5,
                    borderRadius: 20,
                    backgroundColor: Colors.primary.base,
                  }
                : {
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginLeft: 10,
                    borderRadius: 20,
                    backgroundColor: Colors.primary.light3,
                  }
            }>
            <Text
              style={
                filterType === 'Pilih Tanggal'
                  ? {
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      lineHeight: 22,
                      color: 'white',
                    }
                  : {
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      lineHeight: 22,
                      color: Colors.primary.base,
                    }
              }>
              Pilih Tanggal
            </Text>
          </Pressable>
        </View>
        {filterType === 'Pilih Tanggal' && (
          <View style={{flexDirection: 'row', width: '100%', marginTop: 15}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  lineHeight: 22,
                  color: Colors.dark.neutral100,
                  marginBottom: 5,
                }}>
                Dari
              </Text>
              <Pressable onPress={handleChooseDateFrom}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: Colors.dark.neutral10,
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 14,
                      lineHeight: 22,
                      color: Colors.dark.neutral100,
                      paddingLeft: 5,
                    }}>
                    {/* 29 Jun 1998 */}
                    {`${dayjs(
                      `${dateFrom?.year}-${dateFrom?.month}-${dateFrom?.date}`,
                    )
                      .locale('id')
                      .format('DD MMM YYYY')}`}
                  </Text>
                  <View style={{position: 'absolute', right: 15, top: 5}}>
                    <CalendarIcon />
                  </View>
                </View>
              </Pressable>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  lineHeight: 22,
                  color: Colors.dark.neutral100,
                  marginBottom: 5,
                }}>
                Sampai
              </Text>
              <Pressable onPress={handleChooseDateTo}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: Colors.dark.neutral10,
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 14,
                      lineHeight: 22,
                      color: Colors.dark.neutral100,
                      paddingLeft: 5,
                    }}>
                    {`${dayjs(
                      `${dateTo?.year}-${dateTo?.month}-${dateTo?.date}`,
                    )
                      .locale('id')
                      .format('DD MMM YYYY')}`}
                  </Text>
                  <View style={{position: 'absolute', right: 15, top: 5}}>
                    <CalendarIcon />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 10}}>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Button
            action={() => {
              handleSubmitAction('Semua Tanggal');
            }}
            label="Atur Ulang"
            background={Colors.white}
            color={Colors.dark.neutral50}
            borderWidth={1}
            borderColor={Colors.dark.neutral50}
          />
        </View>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Button
            action={() => {
              handleSubmitAction(filterType);
            }}
            label="Terapkan"
          />
        </View>
      </View>
    </View>
  );
};

export default FilterDateRiwayat;
