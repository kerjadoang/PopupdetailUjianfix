import * as React from 'react';
import Colors from '@constants/colors';
import {Image, Modal, StyleSheet, View} from 'react-native';
type LoadingIndicatorProps = {
  withModal?: boolean;
};

const RenderLoading = ({withModal}: {withModal: boolean}) => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: withModal ? Colors.backgroundColorModal : '',
        },
      ]}>
      <View style={styles.card}>
        <Image
          source={require('@assets/gif/loading.gif')}
          style={{width: 100, height: 100}}
        />
      </View>
    </View>
  );
};

// This Component Was Made By Rahmat Saputra!
const LoadingIndicator = ({withModal = true}: LoadingIndicatorProps) => {
  return withModal ? (
    <Modal transparent={true} visible={true}>
      <RenderLoading withModal={withModal} />
    </Modal>
  ) : (
    <View style={styles.backdrop}>
      <RenderLoading withModal={withModal} />
    </View>
  );
};

export {LoadingIndicator};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.backgroundColorModal,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 32,
  },
});
