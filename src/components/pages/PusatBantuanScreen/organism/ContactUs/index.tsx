import React, {FC} from 'react';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

import {styles} from './style';
import Colors from '@constants/colors';
import IC24FB from '@assets/svg/ic24_facebook.svg';
import IC24TT from '@assets/svg/ic24_twitter.svg';
import IconArrowRightBlue from '@assets/svg/blueArrow.svg';
import ICChat24 from '@assets/svg/ic24_chat.svg';
import ICEmail24 from '@assets/svg/ic24_email.svg';
import ICInstagram24 from '@assets/svg/ic24_instagram.svg';

const SOSMEDS = [
  {
    title: 'Facebook',
    description: 'Kelaspintarid',
    image: <IC24FB />,
    backgroundColor: Colors.primary.light3,
    onPress: () => Linking.openURL('https://www.facebook.com/kelaspintarid'),
  },
  {
    title: 'Twitter',
    description: '@kelaspintar_id',
    image: <IC24TT />,
    backgroundColor: Colors.primary.light2,
    onPress: () => Linking.openURL('https://www.twitter.com/kelaspintar_id'),
  },
  {
    title: 'Instagram',
    description: '@kelaspintar_id',
    image: <ICInstagram24 />,
    backgroundColor: '#FFF2F7',
    onPress: () => Linking.openURL('https://www.instagram.com/kelaspintar_id'),
  },
];

const CONTACTS = [
  {
    title: 'Telepon',
    icon: <Icons name="phone" size={24} color={Colors.primary.base} />,
    onPress: () => Linking.openURL('tel:02140403999'),
  },
  {
    title: 'Chat',
    icon: <ICChat24 />,
    onPress: () =>
      Linking.openURL(
        'https://api.whatsapp.com/send/?phone=6281513003999&text=Hi+Kelas+Pintar%21+Saya+butuh+penjelasan+mengenai...&type=phone_number&app_absent=0',
      ),
  },
  {
    title: 'Email',
    icon: <ICEmail24 />,
    onPress: () => Linking.openURL('mailto:sobat@kelaspintar.id'),
  },
];

const ContactUs: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerFirstWrapper}>
        <Image
          source={require('@assets/images/pusat_bantuan_contact_us.png')}
          style={styles.containerFirstWrapperImage}
        />

        <Text style={styles.containerFirstWrapperTextTitle}>
          Kami Siap Membantu
        </Text>

        <Text style={styles.containerfirstWrapperTextDescription}>
          {
            'Ada yang bisa kami bantu?\nHubungi Sobat Pintar melalui saluran\ndi bawah ini:'
          }
        </Text>
      </View>

      <View style={styles.containerSecondWrapper}>
        {CONTACTS.map((val, key) => (
          <TouchableOpacity
            key={key}
            style={styles.containerSecondWrapperButton}
            onPress={val.onPress}>
            {val.icon}

            <Text style={styles.containersecondWrapperButtonText}>
              {val.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {SOSMEDS.map((val, key) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.cardContent,
            val.backgroundColor ? {backgroundColor: val.backgroundColor} : {},
          ]}
          onPress={val.onPress}>
          <View style={styles.leftContentContainer}>
            <View style={styles.imageLeftContainer}>{val.image}</View>

            <View>
              <Text style={styles.parentTitle}>{val.title}</Text>
              <Text style={styles.parentSubtitle}>{val.description}</Text>
            </View>
          </View>

          <IconArrowRightBlue />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export {ContactUs};
