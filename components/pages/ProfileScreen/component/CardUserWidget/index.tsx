import React from 'react';
import {Image, Text, Pressable, View} from 'react-native';
import {iconStudent, iconTeacher} from '@assets/images';
import IconCrownEdit from '@assets/svg/ic_crown.svg';
import IconAnalyze from '@assets/svg/ic_analyze.svg';
import {Button} from '@components/atoms';
import {styles} from './style';
import IconArrowRightGray from '@assets/svg/ic_arrow_right_grey.svg';
import IconMoreGray from '@assets/svg/ic_more_gray.svg';
import {IParentResponse} from '@services/uaa/type';
import useCardUserWidget from './useCardUserWidget';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

type CardUserWidgetProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userData?: IParentResponse;
  userTypeId: any;
};

const CardUserWidget: React.FC<CardUserWidgetProps> = props => {
  const navigation: any = useNavigation();
  const {xp, rank, navigateToLinkAccount}: any = useCardUserWidget();
  const getUser: any = useSelector((state: RootState) => state.getUser);

  const isParentStatusConnected =
    props?.userData?.data?.approval_status === 'approved';
  const isParentStatusWaiting =
    props?.userData?.data?.approval_status === 'pending';

  const widgetParentNotConnected = () => {
    return (
      <View style={styles.cardContentParentNotConnected}>
        <Text style={styles.parentNotConnectedTitle}>
          {'Orang Tua Belum Terhubung'}
        </Text>
        <Button
          style={styles.parentNotConnectedButton}
          label={'Hubungkan'}
          action={navigateToLinkAccount}
        />
        <Image source={iconTeacher} style={styles.parentNotConnectedImage} />
      </View>
    );
  };

  const widgetParentConnected = () => {
    return (
      <View style={styles.cardContentNoJustify}>
        <View style={styles.imageOutterContainerParent}>
          <Image
            source={props?.userTypeId == 2 ? iconTeacher : iconStudent}
            style={styles.imageParent}
          />
        </View>

        <View>
          <Text style={styles.parentTitle}>{'Orang Tua'}</Text>
          <Text style={styles.parentSubtitle}>
            {props.userData?.data?.full_name || '-'}
          </Text>
        </View>
      </View>
    );
  };

  const widgetParentWaiting = () => {
    return (
      <View style={styles.cardContentWaiting}>
        <View style={styles.leftContentWaiting}>
          <View style={styles.imageOutterContainerParent}>
            <Image source={iconStudent} style={styles.imageParent} />
          </View>

          <View>
            <Text style={styles.parentTitleWaiting}>
              {props.userData?.data?.full_name || '-'}
            </Text>
            <Text style={styles.parentSubtitleWaiting}>{'Orang Tua'}</Text>
            <View style={styles.parentBadge}>
              <Text style={styles.parentBadgeTitle}>
                {'Menunggu verifikasi'}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => props.setVisible(true)}
          style={styles.iconMoreGray}>
          <IconMoreGray width={26} height={26} />
        </Pressable>
      </View>
    );
  };

  const _renderWidgetParent = () => {
    let res = widgetParentNotConnected();
    if (getUser?.data?.disable_update_profile) {
      return;
    }

    if (isParentStatusConnected) {
      res = widgetParentConnected();
    } else if (isParentStatusWaiting) {
      res = widgetParentWaiting();
    } else {
      res = widgetParentNotConnected();
    }

    return res;
  };

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        {_renderWidgetParent()}

        <Pressable
          style={styles.cardContent}
          onPress={() => {
            navigation.navigate('LeaderboardScreen', {});
          }}>
          <View style={styles.leftContentContainer}>
            <View style={styles.imageRankContainer}>
              <IconCrownEdit style={styles.rankIcon} />
              <Text style={styles.rankTitle}>{rank}</Text>
            </View>

            <View>
              <Text style={styles.parentTitle}>{'Papan Peringkat'}</Text>
              <Text style={styles.parentSubtitle}>
                {xp?.data?.xp ? `${xp?.data?.xp} XP` : '0 XP'}
              </Text>
            </View>
          </View>

          <IconArrowRightGray width={26} height={26} />
        </Pressable>

        <Pressable
          style={styles.cardContent}
          onPress={() => {
            navigation.navigate('KPRegularLaporanScreen', {});
          }}>
          <View style={styles.leftContentContainer}>
            <View style={styles.trainingReportImageContainer}>
              <IconAnalyze style={styles.rankIcon} />
            </View>

            <Text style={styles.trainingReportTitle}>{'Laporan Belajar'}</Text>
          </View>

          <IconArrowRightGray width={26} height={26} />
        </Pressable>
      </View>
    );
  };

  /*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */

  const isHideWidget =
    props?.userTypeId == 2 ||
    props?.userTypeId == 4 ||
    props?.userTypeId == 5 ||
    props?.userTypeId == 6;
  return <>{isHideWidget ? null : _renderContent()}</>;
};

export {CardUserWidget};
