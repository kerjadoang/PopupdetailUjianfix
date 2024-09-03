import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '@components/atoms';
import IconGroup from '@assets/svg/ic_group.svg';
import IconArrowRightGrey from '@assets/svg/ic_arrow_right_grey.svg';
import IconMessage from '@assets/svg/ic_message.svg';
import IconEditTask from '@assets/svg/ic_edit_task.svg';
import {styles} from './style';
import {iconStudent} from '@assets/images';

const GroupMentorWidget = () => {
  const isGroupMentorConnected = true;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginBottom: 6}}>
        <IconGroup width={26} height={16} />
        <Text style={styles.groupMentorTitle}>{'Grup dengan Mentor'}</Text>
      </View>

      {isGroupMentorConnected ? (
        <View style={styles.cardContentConnected}>
          <TouchableOpacity style={styles.headerContent}>
            <View style={styles.leftContentContainer}>
              <Image source={iconStudent} style={styles.imageUser} />

              <View>
                <Text style={styles.connectedTitle}>{'Grup Belajar X'}</Text>
                <Text style={styles.connectedSubtitleFont12}>
                  {'Bersama Mentor Riska Wijaya'}
                </Text>
              </View>
            </View>

            <IconArrowRightGrey width={26} height={26} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardTaskConnected}>
            <View style={styles.leftContentConnectedContainer}>
              <IconEditTask width={20} height={20} style={{marginRight: 8}} />
              <Text style={styles.subtitleBlue}>{'3'}</Text>
              <Text style={styles.connectedSubtitle}>
                {'Tugas perlu dikerjakan'}
              </Text>
            </View>

            <IconArrowRightGrey width={26} height={26} />
          </TouchableOpacity>

          <View style={styles.lineGrey} />

          <TouchableOpacity style={styles.cardTaskConnected}>
            <View style={styles.leftContentConnectedContainer}>
              <IconMessage width={20} height={20} style={{marginRight: 8}} />
              <Text style={styles.subtitleBlue}>{'9+'}</Text>
              <Text style={styles.connectedSubtitle}>{'Pesan baru'}</Text>
            </View>

            <IconArrowRightGrey width={26} height={26} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cardContentNotConnected}>
          <View>
            <Text style={styles.notConnectedTitle}>
              {'Grup Belum Terhubung'}
            </Text>
            <Text style={styles.notConnectedSubtitle}>
              {'Belum memiliki grup bersama Mentor'}
            </Text>
          </View>

          <Button
            style={styles.notConnectedButton}
            label={'Gabung'}
            action={() => {}}
          />
        </View>
      )}
    </View>
  );
};

export {GroupMentorWidget};
