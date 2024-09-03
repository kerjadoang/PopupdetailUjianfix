/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {List} from 'react-native-paper';

import styles from '../style';
import ChecklistWhite from '@assets/svg/ic_checklist_white.svg';
import ChevronUp from '@assets/svg/blueArrowUp.svg';
import ChevronDown from '@assets/svg/blue_arrow_down.svg';
import {Button, DateTimePickerForm} from '@components/atoms';
import {deepClone, isStringContains} from '@constants/functional';

const CheckBox = memo(
  ({isChecked, onPressCheck, isParent, isDisabled}: any) => {
    return (
      <TouchableOpacity
        onPress={onPressCheck}
        style={isParent ? {right: '-90%'} : {marginTop: 12}}>
        {isChecked ? (
          <View style={[styles.checkBoxChecked, isDisabled && {opacity: 0.5}]}>
            <ChecklistWhite height={10} width={10} />
          </View>
        ) : (
          <View style={styles.checkBoxNotChecked} />
        )}
      </TouchableOpacity>
    );
  },
);

type Props = {
  title: string;
  options?: any[];
  type: 'RECEIVER' | 'DATE';
  selectedItem: any;
  onPress?: (data?: any) => void;
  setSelectedItem: (value: any) => void;
};

function sortByPropertyDesc(arr: any[], property: string) {
  return arr?.slice?.().sort?.((a, b) => b[property] - a[property]);
}

const SwipeUpContent: FC<Props> = ({
  title,
  options,
  type,
  selectedItem,
  onPress,
  setSelectedItem,
}) => {
  const [tempReceivers, setTempReceivers] = useState<any[]>(
    type === 'DATE' ? [] : [...selectedItem],
  );

  const isAll =
    JSON.stringify(sortByPropertyDesc(deepClone(options), 'id')) ===
    JSON.stringify(
      sortByPropertyDesc(deepClone(tempReceivers || selectedItem), 'id'),
    );

  const remapReceivers = () => {
    const mappedReceivers: any[] = [];
    for (var receiver of tempReceivers) {
      if (receiver?.class?.length < 12 || !receiver?.class) {
        mappedReceivers.push(receiver);
        continue;
      }
      const rawReceiver = options?.find(item => item.id === receiver.id);
      const resReceiver = deepClone(receiver);
      resReceiver.class = rawReceiver.class;
      resReceiver.total_class = resReceiver?.class?.length;
      mappedReceivers.push(resReceiver);
    }
    setTempReceivers(mappedReceivers);
  };

  useEffect(() => {
    if (!selectedItem && type === 'DATE') {
      return;
    }
    remapReceivers();
  }, []);

  return (
    <View style={styles.swipeUpContainer}>
      <Text style={styles.swipeUpTitle}>{title}</Text>

      {type === 'DATE' ? (
        <>
          <View style={{paddingHorizontal: 16, marginBottom: 24}}>
            <DateTimePickerForm
              selected={selectedItem}
              onChange={setSelectedItem}
            />
          </View>

          <Button label={'Simpan'} action={() => onPress?.()} />
        </>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {options?.length === 0 ? (
              <Text style={styles.valueSwipeUp}>Tidak ada data</Text>
            ) : (
              <>
                <List.Accordion
                  title={'Kirim ke Semua'}
                  style={styles.listItem}
                  titleStyle={[
                    styles.listItemTitle,
                    isAll && styles.listItemTitleBold,
                  ]}
                  onPress={() => {
                    setTempReceivers(isAll ? [] : deepClone(options) || []);
                    // return setSelectedItem({ id: 'ALL' });
                  }}
                  right={() => <CheckBox isChecked={isAll} isParent />}>
                  {null}
                </List.Accordion>

                {options
                  ?.filter((val: any) => !val?.class)
                  .map((val: any, id) => {
                    const active = tempReceivers?.some(
                      item => item.id === val.id,
                    );

                    return (
                      <List.Accordion
                        key={id}
                        title={val?.name}
                        style={styles.listItem}
                        titleStyle={[
                          styles.listItemTitle,
                          active && styles.listItemTitleBold,
                          isAll && styles.listItemTitleBoldDisabled,
                        ]}
                        onPress={() => {
                          const resData = tempReceivers.pushOrRemove(val, {
                            customCondition: data => data.id === val.id,
                          });
                          setTempReceivers(resData);
                        }}
                        right={() => (
                          <CheckBox
                            isChecked={active}
                            isDisabled={isAll}
                            isParent
                          />
                        )}>
                        {null}
                      </List.Accordion>
                    );
                  })}

                <List.AccordionGroup>
                  {options
                    ?.filter((val: any) => val?.class)
                    .map((val: any, id) => {
                      return (
                        <List.Accordion
                          id={`${id}`}
                          key={id}
                          title={val?.name}
                          style={[styles.listItem, {marginTop: 12}]}
                          titleStyle={styles.listItemTitle}
                          right={props => (
                            <View style={{right: '-130%'}}>
                              {props.isExpanded ? (
                                <ChevronUp />
                              ) : (
                                <ChevronDown />
                              )}
                            </View>
                          )}>
                          {val?.class?.map((subValue: any, subId: number) => {
                            let active = false;

                            const rawReceiversByRole = deepClone(options)?.find(
                              (item: any) => item.id === val.id,
                            );

                            const activeReceiversByRole = deepClone(
                              tempReceivers,
                            )?.find((item: any) => item.id === val.id);

                            const isSelectAll =
                              activeReceiversByRole?.class?.some((item: any) =>
                                isStringContains(item.name, 'semua'),
                              );

                            const activeReceiver =
                              activeReceiversByRole?.class?.find(
                                (item: any) =>
                                  item.id === subValue.id &&
                                  item.name === subValue.name,
                              );

                            if (activeReceiver || isSelectAll) {
                              active = true;
                            } else if (
                              activeReceiver?.name !== subValue?.name
                            ) {
                              active = false;
                            }

                            return (
                              <View
                                key={subId}
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={[
                                    styles.listItemTitle,
                                    active && styles.listItemTitleBold,
                                    isAll && styles.listItemTitleBoldDisabled,
                                    {left: 0, marginTop: 12},
                                  ]}>
                                  {subValue?.name}
                                </Text>

                                <CheckBox
                                  isChecked={active}
                                  isDisabled={isAll}
                                  onPressCheck={() => {
                                    //check is current checkbox name is select all
                                    const isCurrentCheckIsSelectedAll =
                                      isStringContains(subValue?.name, 'semua');

                                    // get current role
                                    const receiversByRole =
                                      activeReceiversByRole ||
                                      rawReceiversByRole;

                                    //is current selected is checked
                                    const isChecked =
                                      receiversByRole?.class?.some(
                                        (item: any) =>
                                          item?.name === subValue?.name,
                                      ) ||
                                      rawReceiversByRole?.class?.length -
                                        receiversByRole?.class?.length ===
                                        1;

                                    // start push all class / remove all class
                                    if (isCurrentCheckIsSelectedAll) {
                                      //remove all class
                                      if (isChecked && activeReceiversByRole) {
                                        //clear class
                                        receiversByRole.class = [];
                                        //reset total class
                                        receiversByRole.total_class = 0;

                                        //push current class by role to main data
                                        const finalData =
                                          tempReceivers.pushOrRemove<any>(
                                            receiversByRole,
                                            {
                                              customCondition: item =>
                                                item.id === val.id,
                                              replaceWhenExist: true,
                                            },
                                          );
                                        setTempReceivers([...finalData]);
                                        return;
                                      }
                                      //remove push all class

                                      //push all class
                                      receiversByRole.class =
                                        rawReceiversByRole.class;
                                      //calculate total class role
                                      receiversByRole.total_class =
                                        rawReceiversByRole.class?.length;

                                      //push current class by role to main data
                                      const finalData =
                                        tempReceivers.pushOrRemove(
                                          receiversByRole,
                                          {
                                            customCondition: item =>
                                              item.id === val.id,
                                            replaceWhenExist: true,
                                          },
                                        );
                                      setTempReceivers([...finalData]);
                                      return;
                                    }
                                    // end push all class / remove all class

                                    // push one item in class
                                    if (!activeReceiversByRole) {
                                      // assign one item into class role
                                      receiversByRole.class = [subValue];

                                      //push current class by role to main data
                                      const finalData =
                                        tempReceivers.pushOrRemove(
                                          receiversByRole,
                                          {
                                            customCondition: item =>
                                              item.id === val.id,
                                            replaceWhenExist: true,
                                          },
                                        );
                                      setTempReceivers([...finalData]);

                                      return;
                                    }

                                    //remove one item in class
                                    //remove current selected item / class
                                    receiversByRole.class =
                                      receiversByRole.class?.pushOrRemove(
                                        subValue,
                                        {
                                          customCondition: (item: any) =>
                                            item.id === subValue.id,
                                        },
                                      );

                                    const isTotalRoleClassSameWithRawData =
                                      rawReceiversByRole?.class?.length - 1 ===
                                      receiversByRole.class?.length;

                                    //push 'semua class' to role
                                    if (
                                      !isSelectAll &&
                                      isTotalRoleClassSameWithRawData
                                    ) {
                                      receiversByRole.class =
                                        rawReceiversByRole?.class;
                                    } else {
                                      //remove 'semua class' item
                                      receiversByRole.class =
                                        receiversByRole.class?.filter(
                                          (item: any) =>
                                            !isStringContains(
                                              item.name,
                                              'semua',
                                            ),
                                        );
                                    }

                                    //calculate total class
                                    receiversByRole.total_class =
                                      receiversByRole.class?.length;

                                    //push current class by role to main data
                                    const finalData =
                                      tempReceivers.pushOrRemove(
                                        receiversByRole,
                                        {
                                          customCondition: item =>
                                            item.id === val.id,
                                          replaceWhenExist: true,
                                        },
                                      );

                                    setTempReceivers([...finalData]);
                                  }}
                                />
                              </View>
                            );
                          })}
                        </List.Accordion>
                      );
                    })}
                </List.AccordionGroup>
              </>
            )}
          </ScrollView>

          <View style={{marginTop: 16}} />
          <Button label={'Simpan'} action={() => onPress?.(tempReceivers)} />
        </>
      )}
    </View>
  );
};

export default memo(SwipeUpContent);
