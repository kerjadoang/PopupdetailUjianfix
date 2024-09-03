import React, {FC, useCallback, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import {Button, Widget} from '@components/atoms';
import EmptyIcon from '@assets/svg/ic_empty_icon_fav.svg';

type Props = {
  // favData: Array<any>;
  subjectData: any;
  localListSubjectFav: any;
  onSavePress: CallBackWithParams<void, any>;
};

const SwipeupSettingFav: FC<Props> = ({
  localListSubjectFav,
  subjectData,
  // favData,
  onSavePress,
}) => {
  const [tempLocalListSubjectFav, setTempLocalListSubjectFav] =
    useState(localListSubjectFav);

  const handleUpdateSubjectsFavorite: any = useCallback(
    async (data: any, isAdd: boolean) => {
      let dataArr: any[] = [];
      if (isAdd === true) {
        if (tempLocalListSubjectFav.length !== 4) {
          // dataArr?.push(data);
          dataArr = [...tempLocalListSubjectFav, data];
          // localListSubjectFav?.map(async (ie: any) => {
          //   dataArr?.push(ie);
          // });
          setTempLocalListSubjectFav(dataArr);
        }
      } else {
        tempLocalListSubjectFav?.map((ie: any) => {
          if (data?.subject_id) {
            if (ie?.subject_id !== data?.subject_id) {
              dataArr.push(ie);
            }
          } else {
            if (ie?.id !== data?.id) {
              dataArr.push(ie);
            }
          }
        });
        setTempLocalListSubjectFav(dataArr);
      }
    },
    [tempLocalListSubjectFav],
  );

  return (
    <View style={styles.container}>
      <View style={styles.settingFavContainer}>
        <View style={styles.settingFavTopContentContainer}>
          <View style={styles.settingFavTopTitleContainer}>
            <Text style={styles.settingFavTopTitle}>
              Semua Mata Pelajaran Favorit
            </Text>
          </View>
          <View style={styles.settingFavBottomContentContainer}>
            <View style={styles.settingFavEmptyIcon}>
              {tempLocalListSubjectFav?.[0] ? (
                <Widget
                  key={'favdata01'}
                  type={1}
                  title={
                    tempLocalListSubjectFav?.[0]?.subject?.name ||
                    tempLocalListSubjectFav?.[0]?.name
                  }
                  action={() =>
                    handleUpdateSubjectsFavorite(
                      tempLocalListSubjectFav?.[0],
                      false,
                    )
                  }
                  remove={true}
                  add={false}
                  imageId={tempLocalListSubjectFav?.[0]?.icon_mobile}
                  svg={
                    tempLocalListSubjectFav?.[0]?.path_url ||
                    tempLocalListSubjectFav?.[0]?.subject?.path_url
                  }
                  backgroundColor={'white'}
                />
              ) : (
                <View style={styles.mh10}>
                  <EmptyIcon />
                </View>
              )}
              {tempLocalListSubjectFav?.[1] ? (
                <Widget
                  key={'favdata02'}
                  type={1}
                  title={
                    tempLocalListSubjectFav?.[1]?.subject?.name ||
                    tempLocalListSubjectFav?.[1]?.name
                  }
                  action={() =>
                    handleUpdateSubjectsFavorite(
                      tempLocalListSubjectFav?.[1],
                      false,
                    )
                  }
                  remove={true}
                  add={false}
                  imageId={tempLocalListSubjectFav?.[1]?.icon_mobile}
                  svg={
                    tempLocalListSubjectFav?.[1]?.path_url ||
                    tempLocalListSubjectFav?.[1]?.subject?.path_url
                  }
                  backgroundColor={'white'}
                />
              ) : (
                <View style={styles.mh10}>
                  <EmptyIcon />
                </View>
              )}
              {tempLocalListSubjectFav?.[2] ? (
                <Widget
                  key={'favdata03'}
                  type={1}
                  title={
                    tempLocalListSubjectFav?.[2]?.subject?.name ||
                    tempLocalListSubjectFav?.[2]?.name
                  }
                  action={() =>
                    handleUpdateSubjectsFavorite(
                      tempLocalListSubjectFav?.[2],
                      false,
                    )
                  }
                  remove={true}
                  add={false}
                  imageId={tempLocalListSubjectFav?.[2]?.icon_mobile}
                  svg={
                    tempLocalListSubjectFav?.[2]?.path_url ||
                    tempLocalListSubjectFav?.[2]?.subject?.path_url
                  }
                  backgroundColor={'white'}
                />
              ) : (
                <View style={styles.mh10}>
                  <EmptyIcon />
                </View>
              )}
              {tempLocalListSubjectFav?.[3] ? (
                <Widget
                  key={'favdata04'}
                  type={1}
                  title={
                    tempLocalListSubjectFav?.[3]?.subject?.name ||
                    tempLocalListSubjectFav?.[3]?.name
                  }
                  action={() =>
                    handleUpdateSubjectsFavorite(
                      tempLocalListSubjectFav?.[3],
                      false,
                    )
                  }
                  remove={true}
                  add={false}
                  imageId={tempLocalListSubjectFav?.[3]?.icon_mobile}
                  svg={
                    tempLocalListSubjectFav?.[3]?.path_url ||
                    tempLocalListSubjectFav?.[3]?.subject?.path_url
                  }
                  backgroundColor={'white'}
                />
              ) : (
                <View style={styles.mh10}>
                  <EmptyIcon />
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.settingFavBottomContainer}>
          <View style={styles.settingFavBottomTitlecontainer}>
            <Text style={styles.settingFavBottomTitle}>
              Semua Mata Pelajaran
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.settingFavBottomScrollView}>
            <View style={styles.swpMiddleScrollViewInner}>
              {subjectData?.data?.map((ie: any) => {
                const isAlreadyToFav = tempLocalListSubjectFav.some(
                  (item: any) => ie.id === (item?.subject_id || item?.id),
                );
                return (
                  <Widget
                    key={`favdata#${ie?.id}`}
                    type={1}
                    title={ie?.name || '-'}
                    action={() =>
                      tempLocalListSubjectFav.length === 4 || isAlreadyToFav
                        ? null
                        : handleUpdateSubjectsFavorite(ie, true)
                    }
                    remove={false}
                    // add={false}
                    add={
                      tempLocalListSubjectFav.length === 4 || isAlreadyToFav
                        ? false
                        : true
                    }
                    imageId={ie?.icon_mobile}
                    svg={ie?.path_url}
                    backgroundColor={'white'}
                  />
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.settingFavSubmitButtonContainer}>
            <Button
              action={() => onSavePress(tempLocalListSubjectFav)}
              isDisabled={tempLocalListSubjectFav.length === 4 ? false : true}
              label="Simpan"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SwipeupSettingFav;
