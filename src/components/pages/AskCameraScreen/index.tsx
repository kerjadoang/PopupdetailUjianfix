import React, {useState} from 'react';
import {Text, View, Pressable, TextInput} from 'react-native';
import MapelMatematika from '@assets/svg/ic56_mapel_matematika.svg';
import {SvgUri} from 'react-native-svg';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import Icon from '@assets/svg/ic_camera_blue.svg';
import Robot from '@assets/svg/robot_ask1.svg';
import Robot2 from '@assets/svg/robo_ask2.svg';
import Ic_bot from '@assets/svg/ic_arrow_bottom_blue.svg';
import {Button, PopUpWithIcon, SwipeUp} from '@components/atoms';
import {ScrollView} from 'react-native-gesture-handler';
import IconCoin from '@assets/svg/ic_coin.svg';
import Colors from '@constants/colors';
import useFormAskCamera from './useFormAskCamera';
import RenderImage from '@components/atoms/RenderImage';

const AskCameraScreen = () => {
  const {
    lastAccessed,
    chapter,
    notes,
    handleSubjectId,
    handleChapterId,
    setNotes,
    total_coin,
    modalSection,
    handleChooseImage,
    data_param,
    handleSendAsk,
    handleSuccess,
    selectedValue,
    setSelectedValue,
    warning,
    modal,
    setModal,
    handleSubmit,
    imageSend,
  }: any = useFormAskCamera();
  const [show, setShow] = useState(false);
  const [section, setSection] = useState(1);
  const [learnSelect, setLearnSelect] = useState(null);
  const [babSelect, setBabSelect] = useState(null);
  const handleOptionPress = (option: any) => {
    setSelectedValue(option?.name);
    setBabSelect(option?.id);
  };
  const boldText = (
    <Text style={styles.boldTetxt}>
      {learnSelect ? learnSelect?.coin_default : data_param?.coin_default} Koin
    </Text>
  );
  const renderLearn = () => {
    return (
      <ScrollView style={{padding: 0, maxHeight: 300}}>
        <Text style={styles.ModalTitle}>Pilih Mata Pelajaran</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 16}}>
          {lastAccessed?.map((item: any, index: any) => (
            <Pressable
              style={[styles.subCard]}
              key={index}
              onPress={() => {
                handleSubjectId(item);
                setLearnSelect(item);
                setSelectedValue('');
                setShow(false);
              }}>
              {item?.path_url?.endsWith('svg') ? (
                <SvgUri uri={item?.path_url} />
              ) : (
                <MapelMatematika width={67} />
              )}
              <Text style={[styles.text, {textAlign: 'center'}]}>
                {item?.name}
              </Text>
              <View style={[styles.coinRow, styles.shadowProp]}>
                <IconCoin width={11} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 11,
                    marginLeft: 5,
                  }}>
                  {item?.coin_default}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderBab = () => {
    return (
      <View style={{width: '100%', paddingVertical: 20}}>
        <Text style={styles.ModalTitle}>Pilih Bab Pelajaran</Text>
        <ScrollView style={{flexWrap: 'wrap'}}>
          {chapter?.map((item: any, index: any) => (
            <Pressable
              style={[
                styles.subCard,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: 15,
                },
              ]}
              key={index}
              onPress={() => {
                handleChapterId(item);
                handleOptionPress(item);
                setShow(false);
              }}>
              <Text style={[{textAlign: 'center', color: 'black'}]}>
                {item?.name}
              </Text>
              <View
                style={[
                  styles.circle,
                  {
                    borderWidth: babSelect === item?.id ? 8 : 1,
                    borderColor:
                      babSelect === item?.id
                        ? Colors.primary.base
                        : Colors.dark.neutral50,
                  },
                ]}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header label="Pertanyaan" />
      <ScrollView style={styles.contentContainer}>
        <View>
          <Pressable
            style={styles.imageContainer}
            // onPress={() =>
            //   navigation.navigate('AskPreviewPhotoScreen', {
            //     imageUri: imageUri || imageSend?.path_url,
            //   })
            // }
          >
            {/* <Image
              onLoadStart={() => showLoading()}
              onLoadEnd={() => dismissLoading()}
              progressiveRenderingEnabled
              source={{uri: imageSend?.path_url ?? ''}}
              style={styles.image}
            /> */}
            <RenderImage
              imageUrl={imageSend?.path_url}
              style={styles.image}
              height={styles.image.height}
              width={styles.image.width}
              showPreviewImage={true}
              // onPress={() =>
              //   navigation.navigate('AskPreviewPhotoScreen', {
              //     imageUri: imageUri || imageSend?.path_url,
              //   })
              // }
            />
            <Pressable
              style={styles.buttonCamera}
              onPress={() => handleChooseImage()}>
              <Icon width={24} />
              <Text style={styles.text}>Ambil Ulang</Text>
            </Pressable>
          </Pressable>

          <View style={styles.listContainer}>
            <Text style={styles.title}>Mata Pelajaran</Text>
            <Pressable
              style={styles.listButton}
              onPress={() => {
                setShow(true);
                setSection(1);
              }}>
              <Text style={styles.active}>
                {learnSelect ? learnSelect?.name : data_param?.name}
              </Text>
              <Ic_bot width={24} height={24} />
            </Pressable>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.title}>Bab Pelajaran</Text>
            <Pressable
              style={styles.listButton}
              onPress={() => {
                setSection(2);
                setShow(true);
              }}>
              <Text style={selectedValue ? styles.active : styles.inActive}>
                {selectedValue ? selectedValue : 'Pilih Bab Pelajaran'}
              </Text>
              <Ic_bot
                width={24}
                height={24}
                onPress={() => {
                  setSection(2);
                  setShow(true);
                }}
              />
            </Pressable>
            {warning ? (
              <Text style={styles.textWarning}>Bab Pelajaran Wajib diisi.</Text>
            ) : null}
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.title}>Catatan (Optional)</Text>
            <TextInput
              placeholder="Masukan Catatan Pernyataanmu"
              style={[styles.inActive, styles.input]}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              onChangeText={text => setNotes(text)}
              value={notes}
            />
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            bottom: 10,
          }}>
          <Text style={styles.textBlue}>
            {learnSelect ? learnSelect?.coin_default : data_param?.coin_default}{' '}
            koin akan digunakan • Koin saya: {total_coin ? total_coin : 0} koin
          </Text>
          <Button
            label="Kirim Pertanyaan"
            action={() => {
              handleSendAsk();
            }}
          />
        </View>
        <SwipeUp
          height={300}
          visible={show}
          children={section === 1 ? renderLearn() : renderBab()}
          onClose={() => setShow(false)}
        />
        {modal ? (
          <PopUpWithIcon
            action_2={() => {
              setModal(false);
            }}
            title={!modalSection ? 'Berhasil Bertanya' : 'Kirim Pertanyaan'}
            desc={
              <Text style={styles.title}>
                Kamu akan menggunakan {boldText} untuk mengirim pertanyaan.
              </Text>
            }
            textButton={modalSection ? 'Kirim' : 'Tutup'}
            action={
              modalSection
                ? () => {
                    handleSubmit(imageSend);
                  }
                : () => {
                    handleSuccess();
                  }
            }
            textButton_2={'Kembali'}
            twoButton={modalSection}
            icon
            iconName={
              modalSection ? <Robot width={100} /> : <Robot2 width={100} />
            }
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export {AskCameraScreen};
