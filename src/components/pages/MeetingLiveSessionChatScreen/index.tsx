import React, {useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './style';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useMeetingLiveSessionChatScreen from './useMeetingLiveSessionChatScreen';
import IconSendWhite from '@assets/svg/ic20_send_white.svg';
import IconClose from '@assets/svg/close_x.svg';
import Colors from '@constants/colors';
import {_handlerConvertAllDate} from '@constants/functional';
import {InputText} from '@components/atoms';
import RenderImage from '@components/atoms/RenderImage';
import {defaultAvatar} from '@constants/url';

const MeetingLiveSessionChatScreen = () => {
  const {
    isLoading,
    allMessageData,
    currentUserId,
    messageText,
    refFlatList,
    navigation,
    _handlerOnChangeMessageText,
    _handlerOnSubmitText,
    _handlerOnScrollTopReached,
    _handlerOnClearChat,
  } = useMeetingLiveSessionChatScreen();

  // console.log(
  //   'abcde allMessageData>>>',
  //   JSON.stringify(allMessageData, null, 2),
  // );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => _renderHeader(),
    });
  }, []);

  const _renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            // navigation?.navigate('MeetingLiveSessionScreen', {
            //   card_id: card_id,
            //   type: service_type,
            // });
            navigation?.pop();
          }}>
          <Text style={styles.closeTitle}>{'Tutup'}</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headTitle}>{'Percakapan'}</Text>
        </View>
      </View>
    );
  };

  const _renderInputMessage = () => {
    return (
      <View style={styles.inputMessageContainer}>
        <InputText
          top={-6}
          width={'92%'}
          borderWidth={2}
          borderColor={Colors.primary.light2}
          backgroundColor={Colors.primary.light3}
          value={messageText}
          placeholderTextColor={Colors.dark.neutral50}
          maxLength={60}
          returnKeyType={'send'}
          onChangeText={(val: any) => {
            _handlerOnChangeMessageText(val);
          }}
          onSubmitEditing={() => {
            if (!messageText) {
              return;
            }
            _handlerOnSubmitText();
          }}
          placeholder={'Ketik di sini...'}
          rightIcon={IconClose}
          onPressIcon={() => {
            _handlerOnClearChat();
          }}
        />

        <TouchableOpacity
          style={styles.iconMicrophoneContainerActive}
          onPress={() => {
            if (!messageText) {
              return;
            }
            _handlerOnSubmitText();
          }}>
          <IconSendWhite width={20} height={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const _renderCard = (item: any, index: any) => {
    const isCurrentUserMessage = currentUserId == item?.user_id;

    const {
      full_name,
      path_url_avatar,
      path_url_attachment,
      file_name_attachment,
      created_at,
      message,
      type,
    } = item || false;

    const createdAt: any = _handlerConvertAllDate(created_at, 8);
    const isDataSeparator = type == 'separator_name';
    const isDataImage = type == 'attachment';
    const isDataNotification = type == 'notif';

    return (
      <View key={index}>
        {isDataSeparator ? (
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorTitle}>{message}</Text>
            <View style={styles.separatorLine} />
          </View>
        ) : isDataNotification ? (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationTitle}>{message}</Text>
          </View>
        ) : isDataImage ? (
          <>
            {isCurrentUserMessage ? (
              <View style={styles.messageContainerCurrentUser}>
                <View style={styles.cardImageContainerCurrentUser}>
                  <RenderImage
                    imageUrl={path_url_attachment}
                    style={styles.cardAttachmentImage}
                  />

                  {/* {path_url_attachment && isAttachmentSvg ? (
                    <SvgUri
                      uri={path_url_attachment}
                      style={styles.cardAttachmentImage}
                    />
                  ) : path_url_attachment && isAttachmentImage ? (
                    <Image
                      source={hostEndsWith(path_url_attachment ?? '')}
                      style={styles.cardAttachmentImage}
                    />
                  ) : null} */}

                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardAttachmentName}>
                      {file_name_attachment}
                    </Text>
                    <View style={styles.cardAttachmentTextContainer}>
                      <Text style={styles.cardMessageDateImage}>
                        {createdAt}
                      </Text>
                    </View>
                  </View>
                </View>

                <RenderImage
                  imageUrl={path_url_avatar ?? defaultAvatar}
                  style={styles.cardMessageIconCurrentUser}
                />

                {/* {path_url_avatar && isAvatarSvg ? (
                  <SvgUri
                    uri={path_url_avatar}
                    style={styles.cardMessageIconCurrentUser}
                  />
                ) : path_url_avatar && isAvatarImage ? (
                  <Image
                    source={hostEndsWith(path_url_avatar ?? '')}
                    style={styles.cardMessageIconCurrentUser}
                  />
                ) : null} */}
              </View>
            ) : (
              <View style={styles.messageContainer}>
                {/* {!path_url_avatar ? null : path_url_avatar?.endsWith('.svg') ? (
                  <SvgUri
                    uri={path_url_avatar}
                    style={styles.cardMessageIcon}
                  />
                ) : (
                  <Image
                    source={hostEndsWith(path_url_avatar ?? '')}
                    style={styles.cardMessageIcon}
                  />
                )} */}

                <RenderImage
                  imageUrl={path_url_avatar ?? defaultAvatar}
                  style={styles.cardMessageIcon}
                />

                <View style={styles.cardImageContainer}>
                  <RenderImage
                    imageUrl={path_url_attachment ?? defaultAvatar}
                    style={styles.cardAttachmentImage}
                  />

                  {/* {path_url_attachment && isAttachmentSvg ? (
                    <SvgUri
                      uri={path_url_attachment}
                      style={styles.cardAttachmentImage}
                    />
                  ) : path_url_attachment && isAttachmentImage ? (
                    <Image
                      source={hostEndsWith(path_url_attachment ?? '')}
                      style={styles.cardAttachmentImage}
                    />
                  ) : null} */}

                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardAttachmentName}>
                      {file_name_attachment}
                    </Text>

                    <View style={styles.cardAttachmentTextContainer}>
                      <Text style={styles.cardMessageDateImage}>
                        {createdAt}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </>
        ) : (
          <>
            {isCurrentUserMessage ? (
              <View style={styles.messageContainerCurrentUser}>
                <View style={styles.cardMessageContainerCurrentUser}>
                  <Text style={styles.cardMessageName}>{full_name}</Text>
                  <Text style={styles.cardMessageTitle}>{message}</Text>
                  <Text style={styles.cardMessageDate}>{createdAt}</Text>
                </View>

                <RenderImage
                  imageUrl={path_url_avatar ?? defaultAvatar}
                  style={styles.cardMessageIconCurrentUser}
                  // placeholder={renderPlaceHolderAvatar(
                  //   styles.cardMessageIconCurrentUser,
                  // )}
                />

                {/* {path_url_avatar && isAvatarSvg ? (
                  <SvgUri
                    uri={path_url_avatar}
                    style={styles.cardMessageIconCurrentUser}
                  />
                ) : path_url_avatar && isAvatarImage ? (
                  <Image
                    source={hostEndsWith(path_url_avatar ?? '')}
                    style={styles.cardMessageIconCurrentUser}
                  />
                ) : null} */}
              </View>
            ) : (
              <View style={styles.messageContainer}>
                <RenderImage
                  imageUrl={path_url_avatar ?? defaultAvatar}
                  style={styles.cardMessageIcon}
                  // placeholder={renderPlaceHolderAvatar(styles.cardMessageIcon)}
                />
                {/* {path_url_avatar && isAvatarSvg ? (
                  <SvgUri
                    uri={path_url_avatar}
                    style={styles.cardMessageIcon}
                  />
                ) : path_url_avatar && isAvatarImage ? (
                  <Image
                    source={hostEndsWith(path_url_avatar ?? '')}
                    style={styles.cardMessageIcon}
                  />
                ) : null} */}
                <View style={styles.cardMessageContainer}>
                  <Text style={styles.cardMessageName}>{full_name}</Text>
                  <Text style={styles.cardMessageTitle}>{message}</Text>
                  <Text style={styles.cardMessageDate}>{createdAt}</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        <FlatList
          ref={refFlatList}
          showsVerticalScrollIndicator={false}
          data={allMessageData?.data}
          keyExtractor={(_, idx): any => idx}
          renderItem={({item, index}) => _renderCard(item, index)}
          onScroll={e => {
            _handlerOnScrollTopReached(e);
          }}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        {_renderContent()}
        {_renderInputMessage()}
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default MeetingLiveSessionChatScreen;
