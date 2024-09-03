/* eslint-disable react-native/no-inline-styles */
import Colors from '@constants/colors';
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Fonts from '@constants/fonts';

import Subtrack from '@assets/svg/Subtract.svg';
import WhiteDownload from '@assets/svg/whiteDownload.svg';

type Props = {
  semester: string;
  isDownload: boolean;
  action: any;
};

const DownloadReport = ({semester, isDownload, action}: Props) => {
  return (
    <>
      <View style={[styles.container]}>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}>
          <Subtrack width={24} height={24} style={{marginLeft: 16}} />

          <View>
            <Text style={[styles.title, {color: Colors.dark.neutral100}]}>
              Unduh e-Rapor
            </Text>

            <Text
              style={[
                styles.semester,
                {color: Colors.dark.neutral80},
              ]}>{`Semester ${semester}`}</Text>
          </View>
        </View>

        {isDownload ? (
          <Pressable style={styles.btn} onPress={action}>
            <WhiteDownload width={24} height={24} />
            <Text style={[styles.title, {color: Colors.white}]}>Unduh</Text>
          </Pressable>
        ) : (
          <Text style={styles.noReportYetText}>Belum tersedia</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '100%',
    elevation: 8,
    borderRadius: 15,
  },
  btn: {
    gap: 8,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.primary.base,
  },
  noReportYetText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    textAlignVertical: 'center',
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
  },
  semester: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
  },
});

export {DownloadReport};
