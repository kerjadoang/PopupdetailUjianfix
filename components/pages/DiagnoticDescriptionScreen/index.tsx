import {ScrollView, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {styles} from './styles';
import {Header} from '@components/atoms';
import {useDiagnoticDescription} from './useDiagnoticDescription';
import RenderHtmlView from '@components/organism/RenderHtmlView';

const DiagnoticDescriptionScreen = () => {
  const {navigation, route} = useDiagnoticDescription();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Deskripsi'} />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RenderHtmlView source={route?.params?.source} />
      </ScrollView>
    </View>
  );
};

export {DiagnoticDescriptionScreen};
