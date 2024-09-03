import {PoppinsText} from '@components/atoms';
import Colors from '@constants/colors';
import * as React from 'react';
import {SafeAreaView, View, useWindowDimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {UploadFileExam} from '../../components';
import PaketSoalKP from '../../components/ExamTabComponent/PaketSoalKP';

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  'Unggah File': UploadFileExam,
  'Gunakan Paket Soal': PaketSoalKP,
  'Buat Soal Sendiri': SecondRoute,
});

const renderTabBar = (props: any) => (
  <TabBar
    scrollEnabled={true}
    tabStyle={{width: ms(220)}}
    {...props}
    indicatorStyle={{
      backgroundColor: Colors.primary.base,
      height: ms(4),
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    }}
    style={{backgroundColor: Colors.white}}
    renderLabel={({route, focused}) => (
      <PoppinsText
        type="SemiBoldPoppins"
        style={{
          color: focused ? Colors.primary.base : Colors.dark.neutral80,
          fontSize: ms(16),
        }}>
        {route.title}
      </PoppinsText>
    )}
  />
);

export default function ExamTypeTab({
  HeaderComponent,
}: {
  HeaderComponent: React.ReactNode;
}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Unggah File', title: 'Unggah File'},
    {key: 'Gunakan Paket Soal', title: 'Gunakan Paket Soal'},
    {key: 'Buat Soal Sendiri', title: 'Buat Soal Sendiri'},
  ]);

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={{padding: 16}}>{HeaderComponent}</View>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <PoppinsText
          type="SemiBoldPoppins"
          style={{fontSize: ms(20), padding: ms(16)}}>
          Buat Soal Ujian
        </PoppinsText>
        <TabView
          renderTabBar={renderTabBar}
          swipeEnabled={false}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          sceneContainerStyle={{paddingHorizontal: ms(16), paddingTop: ms(16)}}
        />
      </View>
    </SafeAreaView>
  );
}
