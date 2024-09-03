import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  onAttend: () => void;
  onNotAttend: () => void;
  totalAttend: number;
  totalNotAttend: number;
  active: number;
};

const TabView = ({
  onAttend,
  onNotAttend,
  totalAttend,
  totalNotAttend,
  active = 0,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card} onPress={onAttend}>
          <View style={styles.contentCardWrapper}>
            <Text
              style={active === 0 ? styles.activeText : styles.nonActiveText}>
              {'Hadir'}
            </Text>

            <View
              style={
                active === 0
                  ? styles.badgeTotalContainerActive
                  : styles.badgeTotalContainerPassive
              }>
              <Text
                style={
                  active === 0
                    ? styles.badgeTotalTitleActive
                    : styles.badgeTotalTitlePassive
                }>
                {totalAttend}
              </Text>
            </View>
          </View>
          {active === 0 ? (
            <View style={styles.lineActiveContainer}>
              <View style={styles.lineActive} />
            </View>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={onNotAttend}>
          <View style={styles.contentCardWrapper}>
            <Text
              style={active === 1 ? styles.activeText : styles.nonActiveText}>
              {'Tidak Hadir'}
            </Text>

            <View
              style={
                active === 1
                  ? styles.badgeTotalContainerActive
                  : styles.badgeTotalContainerPassive
              }>
              <Text
                style={
                  active === 1
                    ? styles.badgeTotalTitleActive
                    : styles.badgeTotalTitlePassive
                }>
                {totalNotAttend}
              </Text>
            </View>
          </View>

          {active === 1 ? (
            <View style={styles.lineActiveContainer}>
              <View style={styles.lineActive} />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <View />
      <View style={styles.lineGrey} />
    </View>
  );
};

export {TabView};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
  },
  contentCardWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeTotalContainerActive: {
    minWidth: 25,
    minHeight: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.light3,
  },
  badgeTotalContainerPassive: {
    minWidth: 25,
    minHeight: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.neutral10,
  },
  badgeTotalTitleActive: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  badgeTotalTitlePassive: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  activeText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginRight: 4,
  },
  nonActiveText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginRight: 4,
  },
  lineGrey: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.dark.neutral10,
  },
  lineActiveContainer: {
    paddingHorizontal: 4,
  },
  lineActive: {
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 4,
    borderColor: Colors.primary.base,
  },
});
