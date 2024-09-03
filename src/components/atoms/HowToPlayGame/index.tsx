import React, {useEffect} from 'react';
import {Button} from '@components/atoms';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

type Props = {
  data: any;
  chapterId: string;
};

const HowToPlayGame = ({data, chapterId}: Props) => {
  const navigation = useNavigation();
  const [selectedGame, setSelectedGame] = React.useState();
  const {miniGameList}: any = useSelector((state: RootState) => state);
  const id = data?.id;
  useEffect(() => {
    if (miniGameList) {
      setSelectedGame(
        miniGameList?.data?.service?.[0]?.service_content?.filter(
          (item: any) => item?.id === id,
        ),
      );
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{data?.title || '-'}</Text>
          <Text style={styles.soal}>{data?.soal || '-'} Soal</Text>
          <View style={styles.stepContainer}>
            <Text style={styles.title2}> Cara Pengerjaan : </Text>
            {data?.step?.map((element: any, index: any) => {
              return (
                <View style={styles.row} key={index}>
                  <Text style={styles.dot}>{'\u25CF'}</Text>
                  <Text style={styles.step}>{element}</Text>
                </View>
              );
            })}
          </View>
          <Button
            label={'Mulai'}
            action={() => {
              navigation.navigate('MiniGameScreen', {
                data: selectedGame,
                chapterId: chapterId,
              });
            }}
            style={styles.btn}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 470,
    padding: 10,
    paddingHorizontal: 15,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginBottom: 10,
  },
  title2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  dot: {width: '5%'},
  step: {
    width: '95%',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginVertical: 2,
  },
  soal: {
    textAlign: 'center',
    backgroundColor: Colors.primary.light3,
    color: Colors.primary.base,
    padding: 5,
    width: '20%',
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  btn: {
    marginTop: 10,
  },
  stepContainer: {
    height: 300,
  },
});

export {HowToPlayGame};
