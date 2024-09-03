import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import InfoIKM from '@assets/svg/ic48_Tambah_Kelas.svg';
import BukuSakuIKM from '@assets/svg/ic48_materi_sekolah_yellow.svg';
import CapaianPembelajaran from '@assets/svg/ic48_ujian.svg';
import ATP from '@assets/svg/ic48_laporan_nilai_kkm.svg';
import ModulAjar from '@assets/svg/ic48_pr_tugas_alert.svg';
import ProfilPelajar from '@assets/svg/ic48_person_yellow.svg';
import VideoTutorial from '@assets/svg/ic48_Rapat_Virtual.svg';
import {
  IkmListItemScreenParam,
  ListSubjectByPhaseScreenParam,
} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {styles} from './style';
import useHomeIKM from '@components/pages/HomeScreen/useHomeIKM';
interface IProps {
  show?: boolean;
}

const MenuGuruIKM = ({show}: IProps) => {
  const {navigateScreen} = useNavigate();
  const {getGeneralContent} = useHomeIKM();

  const handlerNavigationListSubject = (title: any) => {
    navigateScreen<ListSubjectByPhaseScreenParam>('ListSubjectByPhaseScreen', {
      title: title,
    });
  };

  const menuguru = [
    {
      name: 'Info IKM',
      image: <InfoIKM height={48} width={48} />,
      onPress: () => getGeneralContent('info_ikm'),
      totalUnreads: 0,
    },
    {
      name: 'Buku Saku IKM',
      image: <BukuSakuIKM height={48} width={48} />,
      onPress: () => {
        getGeneralContent('buku_saku_ikm');
      },
      totalUnreads: 0,
    },
    {
      name: 'Capaian Pembelajaran',
      image: <CapaianPembelajaran height={48} width={48} />,
      onPress: () => {
        handlerNavigationListSubject('Capaian Pembelajaran');
      },
      totalUnreads: 0,
    },
    {
      name: 'Alur Tujuan Pembelajaran',
      image: <ATP height={48} width={48} />,
      onPress: () => {
        handlerNavigationListSubject('Alur Tujuan Pembelajaran');
      },
      totalUnreads: 0,
    },
    {
      name: 'Modul Ajar',
      image: <ModulAjar height={48} width={48} />,
      onPress: () => {
        handlerNavigationListSubject('Modul Ajar');
      },
      totalUnreads: 0,
    },
    {
      name: 'Profil Pelajar Pancasila',
      image: <ProfilPelajar height={48} width={48} />,
      onPress: () => {
        getGeneralContent('profil_pelajar_pancasila_ikm');
      },
      totalUnreads: 0,
    },
    {
      name: 'Video Tutorial',
      image: <VideoTutorial height={48} width={48} />,
      onPress: () => {
        navigateScreen<IkmListItemScreenParam>('IkmListItemScreen', {
          services: 'Video Tutorial',
          title: 'Video Tutorial',
        });
      },
      totalUnreads: 0,
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          numColumns={3}
          data={menuguru?.slice(0, show ? 7 : 6)}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={item?.onPress}>
                {item?.image}
                {item?.totalUnreads > 0 ? (
                  <View style={styles.unreadsContainer}>
                    <Text style={styles.unreadsTitle}>
                      {item?.totalUnreads > 10 ? '10+' : item?.totalUnreads}
                    </Text>
                  </View>
                ) : null}
                <Text style={styles.itemText}>{item?.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

export {MenuGuruIKM};
