import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {MainText, MainView} from '@components/atoms';
import LinearGradient from 'react-native-linear-gradient';
import IconEye from '@assets/svg/blue_eye.svg';
import Colors from '@constants/colors';
import ThumbnailATP from '@assets/svg/thumbnail_atp.svg';
import ThumbnailModulAjar from '@assets/svg/thumbnail_modul_ajar.svg';
import ThumbnailCapaianPembelajaran from '@assets/svg/thumbnail_capaian_pembelajaran.svg';
import ThumbnailVideoTutorial from '@assets/svg/thumbnail_video_pembelajaran.svg';
import IconMore from '@assets/svg/ic24_more_gray_vertical.svg';
import RenderImage from '@components/atoms/RenderImage';

type Props = {
  phase?: string;
  type: IkmLMSScreenType;
  data?: any;
  onPress?: () => void;
  onClickMore?: () => void;
};

const CardListItem: FC<Props> = ({phase, type, data, onPress, onClickMore}) => {
  data = data?.item;
  const renderThumbnail = (type: IkmLMSScreenType) => {
    switch (type) {
      case 'Alur Tujuan Pembelajaran':
        return (
          <ThumbnailATP
            width={'100%'}
            height={200}
            preserveAspectRatio="xMinYMin slice"
          />
        );
      case 'Modul Ajar':
        return (
          <ThumbnailModulAjar
            width={'100%'}
            height={200}
            preserveAspectRatio="xMinYMin slice"
          />
        );
      case 'Capaian Pembelajaran':
        return (
          <ThumbnailCapaianPembelajaran
            width={'100%'}
            height={200}
            preserveAspectRatio="xMinYMin slice"
          />
        );
      case 'Video Tutorial':
        return (
          <ThumbnailVideoTutorial
            width={'100%'}
            height={200}
            preserveAspectRatio="xMinYMin slice"
          />
        );
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.shadowItem}>
        <MainView borderRadius={10} overflow="hidden">
          <MainView>
            <RenderImage
              imageUrl={data?.thumbnail_media_url}
              placeholder={renderThumbnail(type)}
              style={styles.img}
              resizeMode="cover"
            />
            <MainView position="absolute" height={200} width={'100%'}>
              <LinearGradient
                colors={['#FFFFFF00', '#000000CC']}
                style={styles.imgOverlay}
              />
              <MainView flex={1} justifyContent="flex-end">
                <MainView
                  flexDirection="row"
                  alignItems="center"
                  marginLeft={24}
                  marginRight={4}
                  marginBottom={16}
                  gap={18}>
                  <MainView flex={1} gap={4}>
                    <Text style={styles.imgTextSubtitle}>
                      Bahan Ajar • {phase || ''}
                    </Text>
                    <Text style={styles.imgTextTitle} numberOfLines={1}>
                      {data?.name || data?.title}
                    </Text>
                    <Text style={styles.imgTextSubtitle}>
                      {data?.subject_name || ''}
                    </Text>
                  </MainView>
                  {type === 'Modul Ajar' ? (
                    <TouchableOpacity onPress={onClickMore}>
                      <IconMore />
                    </TouchableOpacity>
                  ) : null}
                </MainView>
              </MainView>
            </MainView>
          </MainView>

          <MainView style={styles.footerWrapper}>
            <TouchableOpacity
              style={styles.footerBtnComponent}
              onPress={onPress}>
              <MainView style={styles.footerBtnItem}>
                <IconEye />
                <MainText color={Colors.primary.base} fontWeight="600">
                  Lihat
                </MainText>
              </MainView>
            </TouchableOpacity>
          </MainView>
        </MainView>
      </View>
    </View>
  );
};

export default CardListItem;
