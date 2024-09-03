/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import Colors from '@constants/colors';
import React, {useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card} from './component/Card';
import {Header} from '@components/atoms/Header';
import {useScreen} from './useScreen';
import {FlatList} from 'react-native-gesture-handler';

const HistoryShareEraporScreen = () => {
  const {navigation, classes_data, listStudent} = useScreen();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Bagikan Erapor'}
          subLabel={classes_data?.name || 'Kelas --'}
        />
      ),
    });
  }, []);
  return (
    <View style={styles.body}>
      <FlatList
        data={listStudent}
        renderItem={(item: any) => {
          item = item?.item;
          if (!item?.status) {
            return <View key={item.id} />;
          }
          return (
            <Card
              key={item.id}
              status={item?.status}
              name={item?.user?.full_name}
              nis={item?.user?.registration_number}
              shareDate={item?.assessment_erapor_share?.issue_date}
              action={() => {
                navigation.navigate('DetailEraporScreen', {
                  id_rapor: item?.assessment_erapor_share_student_id,
                  classes_name: classes_data,
                });
              }}
            />
          );
        }}
      />
    </View>
  );
};
export {HistoryShareEraporScreen};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    padding: 16,
  },
});
