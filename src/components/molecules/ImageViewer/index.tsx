import React, {ReactElement, useCallback} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ModalProps,
  SafeAreaView,
} from 'react-native';

import IconCloseWhite from '@assets/svg/ic24_x_white.svg';
import Colors from '@constants/colors';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import RenderImageViewer from './RenderImageViewer';
import {Image} from 'react-native';
import {IMAGES} from '@constants/image';

type ImageViewerProps = {
  pathUrl?: string;
  title?: string;
  imageId?: string;
  userToken?: string;
  placeholder?: ReactElement;
} & ModalProps;

const ImageViewer: React.FC<ImageViewerProps> = props => {
  const onRequestClose = useCallback(
    (event: any) => {
      props.onRequestClose?.(event);
    },
    [props.onRequestClose],
  );

  return (
    <Modal animationType="slide" {...props}>
      <SafeAreaView
        style={{
          backgroundColor: 'rgba(0,0,0,.3)',
          flex: 1,
        }}>
        <View style={{marginTop: 0}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              color: Colors.white,
            }}>
            {props?.title || 'Preview Foto'}
          </Text>
          <Pressable
            hitSlop={40}
            onPress={onRequestClose}
            style={{
              position: 'absolute',
              right: 15,
            }}>
            <IconCloseWhite />
          </Pressable>
        </View>
        <View style={styles.newCenteredView}>
          <RenderImageViewer
            width={WINDOW_WIDTH - 12}
            height={328}
            style={{width: WINDOW_WIDTH - 12, height: 328}}
            imageUrl={props?.pathUrl}
            imageId={props.imageId}
            // source={sourceUri}
            showPreviewImage={false}
            placeholder={
              props.placeholder ?? (
                <Image
                  style={{width: WINDOW_WIDTH - 12, height: 328}}
                  source={IMAGES.imgPlaceHolder}
                />
              )
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  newCenteredView: {
    justifyContent: 'center',
    flex: 1,
    zIndex: -99,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ImageViewer;
