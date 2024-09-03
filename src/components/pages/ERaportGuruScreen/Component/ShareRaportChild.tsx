import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Download from '@assets/svg/downloadBlue.svg';
import DownloadGrey from '@assets/svg/grey_download.svg';
import ShareErapor from '@assets/svg/share_erapor.svg';
import SeeDetail from '@assets/svg/blue_eye.svg';
import SeeDetailGrey from '@assets/svg/grey_eye.svg';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  key?: number;
  isSticky?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  totalStudent?: number;
  studentEraport?: AssessmentEraporShareStudent;
  onEraportShare: () => void;
  onEraportDownload: () => void;
  onEraportSeeDetail?: () => void;
  onEraportReset?: () => void;
};

const ShareRaportChild = ({
  studentEraport,
  totalStudent,
  isSticky,
  onEraportDownload,
  onEraportShare,
  onEraportSeeDetail,
  onEraportReset,
}: Props) => {
  const isManualSelected = !isSticky && studentEraport;
  const disableDownload = isManualSelected && !studentEraport.share;
  const disableDetail =
    isManualSelected && !studentEraport.ui_button_edit_erapor_student;

  const renderInfo = () => {
    return isSticky ? (
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{totalStudent} Murid dipilih</Text>
        <Text
          style={[
            styles.infoText,
            {color: Colors.primary.base, fontFamily: Fonts.RegularPoppins},
          ]}
          onPress={onEraportReset}>
          Atur Ulang
        </Text>
      </View>
    ) : null;
  };

  const renderShadow = () => {
    return isSticky ? (
      <View style={[styles.stickyContainer, styles.shadowContainer]} />
    ) : null;
  };

  return (
    <>
      {renderShadow()}
      <View style={[!isSticky ? styles.container : styles.stickyContainer]}>
        {renderInfo()}
        <ScrollView>
          <TouchableOpacity style={styles.item2} onPress={onEraportShare}>
            <ShareErapor width={22} height={22} />
            <Text style={styles.shareItemText}>Bagikan e-Raport</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item2}
            disabled={disableDownload}
            onPress={disableDownload ? undefined : onEraportDownload}>
            {disableDownload ? (
              <DownloadGrey width={22} height={22} />
            ) : (
              <Download width={22} height={22} />
            )}
            <Text
              style={[
                styles.shareItemText,
                {color: disableDownload ? Colors.dark.neutral60 : undefined},
              ]}>
              Unduh e-Raport
            </Text>
          </TouchableOpacity>
          {!isSticky ? (
            <TouchableOpacity
              disabled={disableDetail}
              style={styles.item2}
              onPress={disableDetail ? undefined : onEraportSeeDetail}>
              {disableDetail ? (
                <SeeDetailGrey width={22} height={22} />
              ) : (
                <SeeDetail width={22} height={22} />
              )}
              <Text
                style={[
                  styles.shareItemText,
                  {color: disableDetail ? Colors.dark.neutral60 : undefined},
                ]}>
                Lihat Detail
              </Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  stickyContainer: {
    position: 'absolute',
    bottom: 70,
    backgroundColor: Colors.white,
    width: '100%',
    padding: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  kertasDinasText: {
    fontWeight: '600',
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    fontSize: 16,
    marginBottom: 0,
    textAlign: 'left',
    alignSelf: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  textSelected: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  textDefault: {
    fontWeight: '400',
    fontSize: 16,
    fontFamily: Fonts.RegularPoppins,
    lineHeight: 24,
    color: Colors.black,
  },
  item2: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  shareItemText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.black,
    marginLeft: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    justifyContent: 'space-between',
  },
  shadowContainer: {
    bottom: 172,
    width: '100%',
    backgroundColor: Colors.black,
    opacity: 0.1,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
});

export {ShareRaportChild};
