import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Button, Header} from '@components/atoms';
import {ProfessionCard} from './components/ProfessiCard';
import useDiagnoticRecommendation from './useDiagnoticRecommendation';
import {ButtonMajors} from './components/ButtonMajors';
const DiagnoticRecommendationScreen = () => {
  const {
    professions,
    navigation,
    type,
    majors,
    selected,
    setSelected,
    _setMajors,
    major,
    _setSelectedMajors,
    _setStorageProfessions,
  } = useDiagnoticRecommendation();

  return (
    <View style={styles.container}>
      <Header
        label={
          type === 'professions' ? 'Rekomendasi Profesi' : 'Rekomendasi Jurusan'
        }
      />
      <View style={styles.subContainer}>
        <Text style={styles.label}>
          Silahkan pilih {type === 'professions' ? 'profesi' : 'jurusan'} yang
          diinginkan
        </Text>
        {type === 'majors' ? (
          <Text style={styles.max}>*Maksimal 3 pilihan</Text>
        ) : null}
        <ScrollView
          contentContainerStyle={[
            styles.contentContainerStyle,
            type === 'professions' && styles.contentContainerStyleProfessions,
          ]}
          showsVerticalScrollIndicator={false}>
          {type === 'professions' &&
            professions?.map((obj: any, index: number) => (
              <ProfessionCard
                label={obj?.name}
                key={index}
                selected={selected?.id === obj?.id}
                action={() => {
                  navigation.navigate('DiagnoticProfessionScreen', {
                    profession: obj,
                  });
                  setSelected(obj);
                  _setStorageProfessions(obj);
                }}
              />
            ))}
          {type === 'majors' &&
            majors?.map((obj: any, index: number) => {
              const data = {id: obj?.id, major: obj?.major};
              const selectedValue =
                selected?.length !== 0
                  ? selected?.some((obj: any) => obj?.id === data?.id)
                  : major?.some((obj: any) => obj?.id === data?.id) || [];
              return (
                <ButtonMajors
                  label={obj?.major?.name}
                  key={index}
                  selected={selectedValue}
                  action={() => {
                    _setSelectedMajors(data);
                  }}
                />
              );
            })}
        </ScrollView>
      </View>
      {type === 'majors' ? (
        <View style={styles.bottomContainer}>
          <Button
            label="Pilih"
            style={styles.button}
            isDisabled={selected?.length === 0}
            action={() => _setMajors(selected)}
          />
        </View>
      ) : null}
    </View>
  );
};

export {DiagnoticRecommendationScreen};
