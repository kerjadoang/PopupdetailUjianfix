import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import GreyArrow from '@assets/svg/greyArrow.svg';

type Props = {
  onPress: (data?: IProyekPancasila) => void;
  data?: IProyekPancasila[];
};

const DaftarProyekSubCard: FC<Props> = ({data, onPress}) => {
  return (
    <View style={styles.soalContentContainer}>
      {/* Separator */}
      <View style={styles.gamesLineContainer}>
        <View
          style={[
            styles.separatorLineContainer,
            styles.gamesLineInnerContainer,
          ]}>
          <View style={styles.separatorLine} />
        </View>
      </View>
      <View style={styles.soalSublistItemContainer}>
        <View style={[styles.card2, styles.shadowProp]}>
          {data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onPress(item);
                }}>
                <View style={styles.box2}>
                  <View style={{flex: 1}}>
                    <View>
                      <Text style={[styles.title, styles.soalTitle2]}>
                        {item.title}
                      </Text>
                      {item.is_recommended && (
                        <Text style={[styles.rekomendasi]}>Rekomendasi</Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 0.1, marginLeft: 10}}>
                      <GreyArrow width={4} height={8} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default DaftarProyekSubCard;
