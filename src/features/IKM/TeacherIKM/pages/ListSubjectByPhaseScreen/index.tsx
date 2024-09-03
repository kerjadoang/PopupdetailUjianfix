import React, {useLayoutEffect} from 'react';
import {View, FlatList, TouchableOpacity, Pressable} from 'react-native';
import styles from './styles';
import useListSubjectByPhase from './useListSubjectByPhase';
import {Header, MainText, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {IkmListItemScreenParam} from 'type/screen';
import RenderImage from '@components/atoms/RenderImage';

const ListSubjectByPhaseScreen = () => {
  const {
    navigation,
    navigateScreen,
    title,
    listPhaseClass,
    mapel,
    selectedPhase,
    setSelectedPhase,
  } = useListSubjectByPhase();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={title} />,
    });
  }, []);

  const renderBtnPhase = (item: any) => {
    return (
      <TouchableOpacity onPress={() => setSelectedPhase(item)}>
        <MainView
          style={styles.btnContainer}
          backgroundColor={
            selectedPhase.id === item?.id
              ? Colors.primary.base
              : Colors.primary.light2
          }>
          <MainText
            color={
              selectedPhase.id === item?.id
                ? Colors.white
                : Colors.dark.neutral80
            }
            fontWeight={selectedPhase.id === item?.id ? '600' : '400'}
            style={styles.phaseName}>
            {item?.name}
          </MainText>
        </MainView>
      </TouchableOpacity>
    );
  };

  const handlerOnPressSubject = (item: IBaseSubject) => {
    navigateScreen<IkmListItemScreenParam>('IkmListItemScreen', {
      title: title,
      data: item,
      services: title,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listPhaseClass}
          style={styles.phaseWrapper}
          ItemSeparatorComponent={() => <MainView width={16} />}
          renderItem={(item: any) => {
            item = item?.item;
            return renderBtnPhase(item);
          }}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={mapel?.data?.data}
          style={styles.subjectWrapper}
          contentContainerStyle={styles.subjectContainer}
          ItemSeparatorComponent={() => <MainView height={20} />}
          numColumns={3}
          renderItem={({item}: {item: IBaseSubject}) => {
            item.phase = selectedPhase?.name;
            return (
              <Pressable onPress={() => handlerOnPressSubject(item)}>
                <MainView width={WINDOW_WIDTH / 3.25} alignItems="center">
                  <MainView paddingBottom={6}>
                    <RenderImage
                      imageUrl={item?.path_url}
                      width={64}
                      height={64}
                      onPress={() => handlerOnPressSubject(item)}
                    />
                  </MainView>
                  <MainText
                    textAlign="center"
                    color={Colors.dark.neutral100}
                    fontSize={12}>
                    {item?.name}
                  </MainText>
                </MainView>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export {ListSubjectByPhaseScreen};
