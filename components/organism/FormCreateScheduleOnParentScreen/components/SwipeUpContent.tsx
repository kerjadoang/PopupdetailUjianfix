/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, memo} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {List} from 'react-native-paper';

import styles from '../style';
import ChecklistWhite from '@assets/svg/ic_checklist_white.svg';
import ChevronUp from '@assets/svg/blueArrowUp.svg';
import ChevronDown from '@assets/svg/blue_arrow_down.svg';
import {Button, DateTimePickerForm} from '@components/atoms';

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
  options?: string[];
  type: 'RECEIVER' | 'DATE';
  selectedItem: any;
  onPress?: () => void;
  setSelectedItem: (value: any) => void;
};

const SwipeUpContent: FC<Props> = ({
  title,
  options,
  type,
  selectedItem,
  onPress,
  setSelectedItem,
}) => {
  const isAll = JSON.stringify(options) === JSON.stringify(selectedItem);

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

          <Button label={'Simpan'} action={onPress} />
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
                  onPress={() => setSelectedItem({id: 'ALL'})}
                  right={() => <CheckBox isChecked={isAll} isParent />}>
                  {null}
                </List.Accordion>

                {options
                  ?.filter((val: any) => !val?.class)
                  .map((val: any, id) => {
                    const active = selectedItem?.includes(val);

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
                        onPress={() => setSelectedItem(val)}
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

                            const activeData = selectedItem
                              ?.filter((_val: any) => _val?.class)
                              ?.find(
                                (item: any) => item?.id === subValue?.parent_id,
                              );

                            const activeDataAll = selectedItem
                              ?.filter((_val: any) => _val?.class)
                              ?.find((item: any) => item?.id === subValue?.id);

                            if (isAll) {
                              active = true;
                            } else if (
                              activeData?.class?.some(
                                (item: any) => item?.id === subValue?.id,
                              )
                            ) {
                              active = true;
                            } else if (
                              activeDataAll?.class?.some(
                                (item: any) => !item.parent_id,
                              )
                            ) {
                              active = true;
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
                                  onPressCheck={() => setSelectedItem(subValue)}
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
          <Button label={'Simpan'} action={onPress} />
        </>
      )}
    </View>
  );
};

export default memo(SwipeUpContent);
