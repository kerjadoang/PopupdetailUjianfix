import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import Down from '@assets/svg/ic_arrow_bottom_blue.svg';
import Pencil from '@assets/svg/ic_edit.svg';
import Colors from '@constants/colors';
import Delete from '@assets/svg/ic_trash_red.svg';
import {Button} from '@components/atoms';
import Plus from '@assets/svg/ic24_plus.svg';
import Trash from '@assets/svg/ic_trash_red.svg';
import {isStringContains} from '@constants/functional';
type Props = {
  handleEdit?: any;
  handleDelete?: any;
  data?: any;
  dataListKnowledge?: any;
  dataListSkills?: any;
  dataListExtra?: any;
  dataList?: any;
  handleSwipeAddSkills?: any;
  handleSwipeAddExtra?: any;
  handleEditExtra?: any;
  handleDeleteExtra?: any;
  title?: any;
};

const ITEM_HEIGHT = 350;
/// Knowledge / Skills
const DropdownContent = ({
  handleEdit,
  handleDelete,
  dataList,
  title,
  handleSwipeAddSkills,
}: Props) => {
  return (
    <ScrollView style={styles.contentDropdown}>
      {dataList?.length === 0 ? (
        <View>
          {isStringContains(title, 'keterampilan') ? (
            <Button
              action={handleSwipeAddSkills}
              label={'Tambah ' + title}
              background={Colors.white}
              borderWidth={1}
              color={Colors.primary.base}
              iconLeft={<Plus width={25} height={25} />}
            />
          ) : (
            <Text>-</Text>
          )}
        </View>
      ) : (
        <View style={{marginBottom: 50}}>
          {dataList?.map((item: any, key: number) => (
            <View key={key} style={{marginBottom: 20}}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <Text style={styles.textTitle}>{item?.subject_name}</Text>
                <View style={styles.row}>
                  {isStringContains(title, 'keterampilan') && (
                    <Pressable
                      onPress={() => handleEdit(item, title)}
                      style={{marginRight: 10}}>
                      <Pencil width={24} height={24} />
                    </Pressable>
                  )}
                  {isStringContains(title, 'keterampilan') ? (
                    <Pressable
                      onPress={() =>
                        handleDelete(
                          item?.subject_id || item?.id,
                          item?.subject_name,
                          title,
                        )
                      }>
                      <Delete width={24} height={24} />
                    </Pressable>
                  ) : null}
                </View>
              </View>
              <View>
                <View style={styles.subDropContent}>
                  <View>
                    <Text style={styles.textSubTitle}>KKM</Text>
                    <Text style={styles.textScore}>{item?.kkm}</Text>
                  </View>
                  <View>
                    <Text style={styles.textSubTitle}>Rentang</Text>
                    <Text style={[styles.textScore]}>{item?.range}</Text>
                  </View>
                  <View>
                    <Text style={styles.textSubTitle}>Rentang Dibulatkan</Text>
                    <Text style={[styles.textScore]}>
                      {item?.range_rounded}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.dashed} />
              <View>
                <View style={[styles.row]}>
                  <View style={styles.boxScore}>
                    <Text style={styles.textSubTitle}>Execellent</Text>
                    <Text style={styles.textScore}>
                      {item?.excelent_start + '-' + item?.excelent_end}{' '}
                    </Text>
                  </View>
                  <View style={styles.boxScore}>
                    <Text style={styles.textSubTitle}>Nilai Awal</Text>
                    <Text style={styles.textScore}>
                      {item?.excelent_start}{' '}
                    </Text>
                  </View>
                </View>
                <View style={[styles.row]}>
                  <View style={styles.boxScore}>
                    <Text style={styles.textSubTitle}>Very Good</Text>
                    <Text style={styles.textScore}>
                      {item?.very_good_start + '-' + item?.very_good_end}{' '}
                    </Text>
                  </View>
                  <View style={styles.boxScore}>
                    <Text style={styles.textSubTitle}>Nilai Awal</Text>
                    <Text style={styles.textScore}>
                      {item?.very_good_start}{' '}
                    </Text>
                  </View>
                </View>
                <View style={[styles.row]}>
                  <View style={styles.boxScore}>
                    <Text style={styles.textSubTitle}>Good</Text>
                    <Text style={styles.textScore}>
                      {item?.good_start + '-' + item?.good_end}{' '}
                    </Text>
                  </View>
                  <View style={styles.boxScore}>
                    <Text style={styles.textSubTitle}>Nilai Awal</Text>
                    <Text style={styles.textScore}>{item?.good_start} </Text>
                  </View>
                </View>
                <View style={[styles.row]}>
                  <View style={styles.boxScore}>
                    <Text style={styles.textSubTitle}>Failed</Text>
                    <Text style={styles.textScore}>{'<' + item?.failed} </Text>
                  </View>
                  <View style={styles.boxScore}>
                    <Text style={styles.textSubTitle}>Nilai Awal</Text>
                    <Text style={styles.textScore}>{item?.failed} </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
          {isStringContains(title, 'keterampilan') ? (
            <Button
              action={handleSwipeAddSkills}
              label={'Tambah ' + title}
              background={Colors.white}
              borderWidth={1}
              color={Colors.primary.base}
              iconLeft={<Plus width={25} height={25} />}
            />
          ) : null}
        </View>
      )}
    </ScrollView>
  );
};

/// Extra
const DropdownContent_2 = ({
  handleEditExtra,
  handleDelete,
  dataList,
  title,
  handleSwipeAddExtra,
  handleDeleteExtra,
}: Props) => {
  return (
    <ScrollView style={styles.contentDropdown}>
      {dataList?.length === 0 ? (
        <Button
          label={'Tambah ' + title}
          background={Colors.white}
          borderWidth={1}
          action={handleSwipeAddExtra}
          color={Colors.primary.base}
          iconLeft={<Plus width={25} height={25} />}
        />
      ) : (
        <View style={{marginBottom: 50}}>
          {dataList?.map((item: any, key: number) => (
            <View key={key} style={{marginBottom: 20}}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <Text style={styles.textTitle}>
                  {item?.extracurricular_name}
                </Text>
                <View style={styles.row}>
                  <Pressable
                    onPress={() => handleEditExtra(item)}
                    style={{marginRight: 10}}>
                    <Pencil width={24} height={24} />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleDeleteExtra(
                        item?.id,
                        item?.extracurricular_name,
                        title,
                      )
                    }
                    style={{marginRight: 10}}>
                    <Trash width={24} height={24} />
                  </Pressable>
                  {item?.can_delete ? (
                    <Pressable
                      onPress={() =>
                        handleDelete(
                          item?.subject_id,
                          item?.subject_name,
                          title,
                        )
                      }>
                      <Delete width={24} height={24} />
                    </Pressable>
                  ) : null}
                </View>
              </View>
              <View>
                <View
                  style={[
                    styles.subDropContent,
                    {justifyContent: 'flex-start'},
                  ]}>
                  <View>
                    <Text style={styles.textSubTitle}>Angka</Text>
                    <Text style={styles.textScore}>
                      {item?.extracurricular_grade}{' '}
                    </Text>
                  </View>
                  <View style={{left: 100}}>
                    <Text style={styles.textSubTitle}>Predikat</Text>
                    <Text style={[styles.textScore]}>
                      {item?.extracurricular_predicate}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.textSubTitle}>Deskripsi</Text>
                  <Text style={styles.textScore}>{item?.description}</Text>
                </View>
              </View>
            </View>
          ))}

          <Button
            label={'Tambah ' + title}
            background={Colors.white}
            borderWidth={1}
            action={handleSwipeAddExtra}
            color={Colors.primary.base}
            iconLeft={<Plus width={25} height={25} />}
          />
        </View>
      )}
    </ScrollView>
  );
};
const DropDown = ({
  data,
  handleEdit,
  handleDelete,
  dataListKnowledge,
  dataListSkills,
  dataListExtra,
  handleSwipeAddSkills,
  handleSwipeAddExtra,
  handleEditExtra,
  handleDeleteExtra,
}: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleDropdown = (id: any) => {
    setSelectedId(id);
    setDropdownOpen(!dropdownOpen);
  };

  const [dropdownHeight, setDropdownHeight] = useState(0);
  useEffect(() => {
    if (dropdownOpen) {
      const contentHeight = ITEM_HEIGHT;
      setDropdownHeight(contentHeight);
    } else {
      setDropdownHeight(0);
    }
  }, [dropdownOpen, selectedId, data]);
  return (
    <View>
      {data?.map((item: any, key: number) => (
        <View key={key}>
          <Pressable onPress={() => toggleDropdown(item?.id)}>
            <View
              style={[
                styles.button,
                {
                  borderBottomWidth:
                    dropdownOpen && selectedId === item?.id ? 0 : 1,
                },
              ]}>
              <Text style={styles.textTitle}>{item?.name}</Text>
              <Down
                width={24}
                height={24}
                style={{
                  transform: [
                    {
                      rotate:
                        dropdownOpen && selectedId === item?.id
                          ? '180deg'
                          : '0deg',
                    },
                  ],
                }}
              />
              {/* )} */}
            </View>
          </Pressable>

          {dropdownOpen && selectedId === item?.id && (
            <View
              style={{
                height: dropdownHeight,
                borderBottomWidth: 1,
                borderColor: Colors.dark.neutral20,
              }}>
              {item?.id === 3 ? (
                <DropdownContent_2
                  handleEditExtra={(item: any) => handleEditExtra(item)}
                  handleDelete={handleDelete}
                  handleSwipeAddExtra={handleSwipeAddExtra}
                  title={item?.name}
                  dataList={dataListExtra}
                  handleDeleteExtra={handleDeleteExtra}
                />
              ) : (
                <DropdownContent
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleSwipeAddSkills={handleSwipeAddSkills}
                  title={item?.name}
                  dataList={
                    item?.id === 1
                      ? dataListKnowledge
                      : item?.id === 2
                      ? dataListSkills
                      : null
                  }
                />
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export {DropDown};
