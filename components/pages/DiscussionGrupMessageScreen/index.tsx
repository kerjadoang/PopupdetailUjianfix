import React, {useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {styles} from './style';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useDiscussionGrupMessageScreen from './useDiscussionGrupMessageScreen';
import IconArrowLeftBlue from '@assets/svg/blueArrowLeft.svg';
import IconCameraBlue from '@assets/svg/ic24_camera_blue.svg';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import IconSendWhite from '@assets/svg/ic20_send_white.svg';
import IconMicrophoneWhite from '@assets/svg/ic20_microphone_white.svg';
import IconTrashGrey from '@assets/svg/ic24_trash_grey.svg';
import IconPlayAudioWhite from '@assets/svg/ic24_play_audio_white.svg';
import IconPauseAudioWhite from '@assets/svg/ic24_pause_audio_white.svg';
import IconArrowUpBlue from '@assets/svg/ic24_chevron_up_blue.svg';
import IconArrowUpBlueLight from '@assets/svg/ic24_chevron_up_blue_light.svg';
import Colors from '@constants/colors';
import {SvgUri} from 'react-native-svg';
import {
  _handlerConvertAllDate,
  _handlerConvertTimeTrackerPlayer,
  hostEndsWith,
  lisFileSvgExtension,
  listFileImageExtension,
} from '@constants/functional';
import {InputText, SwipeUp} from '@components/atoms';
import {
  BackgroundStar1,
  BackgroundStar2,
  IconGroupAvatar,
  PlaceholderAvatar,
} from '@assets/images';
import ProgressBar from '@components/atoms/ProgressBar';
import RenderImage from '@components/atoms/RenderImage';

const DiscussionGrupMessageScreen = () => {
  const {
    isLoading,
    isOnSearching,
    groupData,
    allMessageData,
    searchQuery,
    currentUserId,
    isShowRecordFrame,
    recordTime,
    messageText,
    refferenceScrollView,
    navigation,
    trackPlayerProgress,
    isShowSwipeUpAttachment,
    initialisationSwipeUpAttachment,
    searchResultTotal,
    currentSelectedSearch,
    _handlerSetActiveSearch,
    _handlerSetNotActiveSearch,
    _handlerOnChangeSearching,
    _handlerSetStatusToogleRecord,
    _handleOnCancelRecordVoice,
    _handlerOnChangeMessageText,
    _handlerOnSubmitText,
    _handlerOnSubmitSearch,
    _handlerOnPressGoBack,
    _handlerNavigateToPhotoScreen,
    _handlerOnPressPlayAudioButton,
    _handlerOnPressPauseAudioButton,
    _handlerShowSwipeUpAttachment,
    _handlerHideSwipeUpAttachment,
    _handlerGetNextPreviousSearch,
    _handlerNavigateToDiscussionGroup,
    _handlerOnScroll,
    _handlerSetMessageTextPosition,
  } = useDiscussionGrupMessageScreen();

  const currentProgressBarPosition =
    trackPlayerProgress?.position && trackPlayerProgress?.duration
      ? `${Math.round(
          (trackPlayerProgress?.position / trackPlayerProgress?.duration) * 100,
        )}%`
      : '0%';
  const groupTitle = groupData?.name || false;
  const groupAvatar = groupData?.path_url || false;

  const totalMember = groupData?.users?.length || 0;
  const totalOnlineUser =
    (groupData &&
      groupData?.users?.filter((item: any) => {
        return item?.is_online;
      })?.length) ||
    0;
  const groupSubtitle = `${totalMember} Anggota • ${totalOnlineUser} Online`;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => _renderHeader(),
    });
  }, [groupData, isOnSearching, searchQuery]);

  const _renderHeader = () => {
    return (
      <>
        {isOnSearching ? (
          <View style={styles.headerOnSearchingContainer}>
            <InputText
              top={-6}
              width={'90%'}
              backgroundColor={Colors.dark.neutral10}
              returnKeyType={'search'}
              value={searchQuery}
              maxLength={60}
              onChangeText={(val: any) => {
                _handlerOnChangeSearching(val);
              }}
              onSubmitEditing={() => {
                _handlerOnSubmitSearch();
              }}
              leftIcon={IconSearchBlue}
              placeholder={'Cari'}
            />

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginLeft: -10,
              }}
              onPress={() => {
                _handlerSetNotActiveSearch();
              }}>
              <Text style={styles.headCancelTitle}>{'Batal'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerContainer}>
            <View style={styles.leftContent}>
              <IconArrowLeftBlue
                width={16}
                height={16}
                style={styles.iconArrowLeftBlue}
                onPress={() => {
                  _handlerOnPressGoBack();
                }}
              />

              <TouchableOpacity
                style={styles.middleContent}
                onPress={() => {
                  _handlerNavigateToDiscussionGroup();
                }}>
                <RenderImage
                  imageUrl={groupAvatar}
                  style={styles.headIconGroup}
                  placeholder={
                    <Image
                      source={IconGroupAvatar}
                      style={styles.headIconGroup}
                    />
                  }
                />

                <View style={styles.headTextContainer}>
                  <Text style={styles.headTitle}>{groupTitle}</Text>
                  <Text style={styles.headSubtitle}>{groupSubtitle}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <IconSearchBlue
              width={24}
              height={24}
              style={styles.headIconSearch}
              onPress={() => {
                _handlerSetActiveSearch();
              }}
            />
          </View>
        )}
      </>
    );
  };

  const _renderInputMessage = () => {
    return (
      <View style={styles.inputMessageContainer}>
        <InputText
          top={-6}
          width={'92%'}
          backgroundColor={Colors.white}
          value={messageText}
          returnKeyType={'send'}
          maxLength={60}
          onChangeText={(val: any) => {
            _handlerOnChangeMessageText(val);
          }}
          onSubmitEditing={() => {
            _handlerOnSubmitText();
          }}
          leftIcon={IconCameraBlue}
          leftOnPressIcon={() => {
            _handlerShowSwipeUpAttachment();
          }}
          placeholder={'Ketik pesan...'}
        />

        {messageText && messageText?.length != 0 ? (
          <TouchableOpacity
            style={styles.iconMicrophoneContainerNotActive}
            onPress={() => {
              _handlerOnSubmitText();
            }}>
            <IconSendWhite width={20} height={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconMicrophoneContainerNotActive}
            onPress={() => {
              _handlerSetStatusToogleRecord();
            }}>
            <IconMicrophoneWhite width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const _renderInputVoice = () => {
    return (
      <View style={styles.inputVoiceContainer}>
        <View style={styles.inputVoiceCard}>
          <TouchableOpacity
            style={styles.inputVoiceIcon}
            onPress={() => {
              _handleOnCancelRecordVoice();
            }}>
            <IconTrashGrey width={24} height={24} />
          </TouchableOpacity>

          <View style={styles.inputVoiceFlex}>
            <View style={styles.inputVoiceOutterDot}>
              <View style={styles.inputVoiceInnerDot} />
            </View>
            <Text style={styles.inputVoiceTitle}>
              {recordTime != 0 ? recordTime : '00:00:00'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.iconMicrophoneContainerActive}
          onPress={() => {
            _handlerSetStatusToogleRecord();
          }}>
          <IconSendWhite width={20} height={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const _renderSearchResult = () => {
    const maxNextCondition = currentSelectedSearch == searchResultTotal;
    const maxPrevCondition = currentSelectedSearch <= 1;

    return (
      <>
        {!searchResultTotal ? null : (
          <View style={styles.searchResultContainer}>
            {searchResultTotal > 0 ? (
              <View style={styles.row}>
                <Text
                  style={
                    styles.searchResultTexFoundBold
                  }>{`${searchResultTotal} `}</Text>
                <Text style={styles.searchResultTextFound}>
                  {'kata ditemukan.'}
                </Text>
              </View>
            ) : (
              <Text style={styles.searchResultTextNotFound}>
                {'Hasil pencarian tidak ditemukan.'}
              </Text>
            )}

            {searchResultTotal > 0 ? (
              <View style={styles.iconArrowContainer}>
                <TouchableOpacity
                  disabled={maxNextCondition}
                  style={styles.iconArrowUp}
                  onPress={() => {
                    _handlerGetNextPreviousSearch('next');
                  }}>
                  {maxNextCondition ? (
                    <IconArrowUpBlueLight width={24} height={24} />
                  ) : (
                    <IconArrowUpBlue width={24} height={24} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={maxPrevCondition}
                  style={styles.iconArrowDown}
                  onPress={() => {
                    _handlerGetNextPreviousSearch('prev');
                  }}>
                  {maxPrevCondition ? (
                    <IconArrowUpBlueLight width={24} height={24} />
                  ) : (
                    <IconArrowUpBlue width={24} height={24} />
                  )}
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      </>
    );
  };

  const _handlerLocalCompare = (a: any, b: any) => {
    return typeof a === 'string' && typeof b === 'string'
      ? a.localeCompare(b, undefined, {sensitivity: 'accent'}) === 0
      : a === b;
  };

  const _handlerHighlighter = (
    keyword: any,
    allWords: any,
    highlightColor: string,
  ) => {
    const arr = allWords.split(/(\s+)/);

    let gos = arr.map((item: any, _: number) => {
      if (typeof item !== 'string') {
        return item;
      } else if (
        searchResultTotal &&
        searchResultTotal > 0 &&
        keyword &&
        (item?.toLocaleLowerCase()?.match(keyword?.toLowerCase()) ||
          item?.toUpperCase()?.match(keyword?.toUpperCase()) ||
          _handlerLocalCompare(item, keyword))
      ) {
        return (
          <Text
            style={{
              ...styles.cardMessageTitleHightLight,
              backgroundColor: highlightColor,
            }}>
            {item}
          </Text>
        );
      } else {
        return <Text style={styles.cardMessageTitle}>{item}</Text>;
      }
    });

    return <View style={styles.cardMessageTitleHightLightWrapper}>{gos}</View>;
  };

  const _renderCard = (item: any, index: any) => {
    const {
      full_name,
      path_url_avatar,
      path_url_attachment,
      file_name_attachment,
      created_at,
      message,
      audio_player_is_runnning,
      current_progress,
      current_progress_duration,
      type,
      user_id,
    } = item || false;
    const isCurrentUserMessage = currentUserId == user_id;

    const createdAt: any = _handlerConvertAllDate(created_at, 8);
    const isDataSeparator = type == 'separator_name';
    const isDataImage = type == 'attachment';
    const isDataVoice = type == 'voice';
    const isDataNotification = type == 'notif';

    const attachmentExtension =
      path_url_attachment && path_url_attachment?.split('.')?.pop();
    const isAttachmentImage =
      listFileImageExtension.includes(attachmentExtension);
    const isAttachmentSvg = lisFileSvgExtension.includes(attachmentExtension);

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
            <Text style={styles.notificationTitle}>
              <Text style={styles.notificationTitle}>{message}</Text>
            </Text>
          </View>
        ) : isDataImage ? (
          <>
            {isCurrentUserMessage ? (
              <View style={styles.messageContainerCurrentUser}>
                <View style={styles.cardImageContainerCurrentUser}>
                  {path_url_attachment && isAttachmentSvg ? (
                    <SvgUri
                      uri={path_url_attachment}
                      style={styles.cardAttachmentImage}
                    />
                  ) : path_url_attachment && isAttachmentImage ? (
                    <Image
                      source={hostEndsWith(path_url_attachment ?? '')}
                      style={styles.cardAttachmentImage}
                    />
                  ) : null}

                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardAttachmentName}>
                      {file_name_attachment}
                    </Text>
                    <View style={styles.cardAttachmentTextContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          _handlerNavigateToPhotoScreen(
                            path_url_attachment,
                            file_name_attachment.replace(/\.[^/.]+$/, ''),
                          );
                        }}>
                        <Text style={styles.cardAttachmentOpenTitle}>
                          {'Buka'}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.cardMessageDateImage}>
                        {createdAt}
                      </Text>
                    </View>
                  </View>
                </View>

                <RenderImage
                  imageUrl={path_url_avatar}
                  style={styles.cardMessageIconCurrentUser}
                  placeholder={
                    <Image
                      source={PlaceholderAvatar}
                      style={styles.cardMessageIconCurrentUser}
                    />
                  }
                />
              </View>
            ) : (
              <View style={styles.messageContainer}>
                <RenderImage
                  imageUrl={path_url_avatar}
                  style={styles.cardMessageIcon}
                  placeholder={
                    <Image
                      source={PlaceholderAvatar}
                      style={styles.cardMessageIcon}
                    />
                  }
                />

                <View style={styles.cardImageContainer}>
                  {path_url_attachment && isAttachmentSvg ? (
                    <SvgUri
                      uri={path_url_attachment}
                      style={styles.cardAttachmentImage}
                    />
                  ) : path_url_attachment && isAttachmentImage ? (
                    <Image
                      source={hostEndsWith(path_url_attachment ?? '')}
                      style={styles.cardAttachmentImage}
                    />
                  ) : null}

                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardAttachmentName}>
                      {file_name_attachment}
                    </Text>

                    <View style={styles.cardAttachmentTextContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          _handlerNavigateToPhotoScreen(
                            path_url_attachment,
                            file_name_attachment.replace(/\.[^/.]+$/, ''),
                          );
                        }}>
                        <Text style={styles.cardAttachmentOpenTitle}>
                          {'Buka'}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.cardMessageDateImage}>
                        {createdAt}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </>
        ) : isDataVoice ? (
          <>
            {isCurrentUserMessage ? (
              <View style={styles.messageContainerCurrentUser}>
                <View style={styles.cardMessageContainerCurrentUser}>
                  <Text style={styles.cardMessageName}>{full_name}</Text>
                  <View style={styles.cardProgressAudioContainer}>
                    {audio_player_is_runnning ? (
                      <IconPauseAudioWhite
                        width={24}
                        height={24}
                        onPress={() => {
                          _handlerOnPressPauseAudioButton(index);
                        }}
                      />
                    ) : (
                      <IconPlayAudioWhite
                        width={24}
                        height={24}
                        onPress={() => {
                          _handlerOnPressPlayAudioButton(index);
                        }}
                      />
                    )}
                    <View style={styles.progressBarContainer}>
                      <ProgressBar
                        pasiveColor={Colors.primary.light2}
                        activeColor={Colors.primary.base}
                        progress={
                          audio_player_is_runnning
                            ? currentProgressBarPosition
                            : current_progress
                            ? current_progress
                            : '0%'
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.cardMessageDateAudioContainer}>
                    <Text style={styles.cardMessageDateAudio}>
                      {audio_player_is_runnning
                        ? _handlerConvertTimeTrackerPlayer(
                            Math.floor(trackPlayerProgress?.position),
                          )
                        : current_progress_duration
                        ? current_progress_duration
                        : '00:00:00'}
                    </Text>
                    <Text style={styles.cardMessageDateAudio}>{createdAt}</Text>
                  </View>
                </View>

                <RenderImage
                  imageUrl={path_url_avatar}
                  style={styles.cardMessageIconCurrentUser}
                  placeholder={
                    <Image
                      source={PlaceholderAvatar}
                      style={styles.cardMessageIconCurrentUser}
                    />
                  }
                />
              </View>
            ) : (
              <View style={styles.messageContainer}>
                <RenderImage
                  imageUrl={path_url_avatar}
                  style={styles.cardMessageIcon}
                  placeholder={
                    <Image
                      source={PlaceholderAvatar}
                      style={styles.cardMessageIcon}
                    />
                  }
                />

                <View style={styles.cardMessageContainer}>
                  <Text style={styles.cardMessageName}>{full_name}</Text>
                  <View style={styles.cardProgressAudioContainer}>
                    {audio_player_is_runnning ? (
                      <IconPauseAudioWhite
                        width={24}
                        height={24}
                        onPress={() => {
                          _handlerOnPressPauseAudioButton(index);
                        }}
                      />
                    ) : (
                      <IconPlayAudioWhite
                        width={24}
                        height={24}
                        onPress={() => {
                          _handlerOnPressPlayAudioButton(index);
                        }}
                      />
                    )}
                    <View style={styles.progressBarContainer}>
                      <ProgressBar
                        pasiveColor={Colors.primary.light2}
                        activeColor={Colors.primary.base}
                        progress={'0%'}
                      />
                    </View>
                  </View>
                  <View style={styles.cardMessageDateAudioContainer}>
                    <Text style={styles.cardMessageDateAudio}>
                      {' '}
                      {audio_player_is_runnning
                        ? _handlerConvertTimeTrackerPlayer(
                            Math.floor(trackPlayerProgress?.position) ||
                              '00:00:00',
                          )
                        : '00:00:00'}
                    </Text>
                    <Text style={styles.cardMessageDateAudio}>{createdAt}</Text>
                  </View>
                </View>
              </View>
            )}
          </>
        ) : (
          <>
            {isCurrentUserMessage ? (
              <View
                onLayout={({
                  nativeEvent: {
                    layout: {y},
                  },
                }) => _handlerSetMessageTextPosition(y)}
                style={styles.messageContainerCurrentUser}>
                <View style={styles.cardMessageContainerCurrentUser}>
                  <Text style={styles.cardMessageName}>{full_name}</Text>
                  {_handlerHighlighter(
                    searchQuery,
                    message,
                    Colors.secondary.light1,
                  )}
                  <Text style={styles.cardMessageDate}>{createdAt}</Text>
                </View>

                <RenderImage
                  imageUrl={path_url_avatar}
                  style={styles.cardMessageIconCurrentUser}
                  placeholder={
                    <Image
                      source={PlaceholderAvatar}
                      style={styles.cardMessageIconCurrentUser}
                    />
                  }
                />
              </View>
            ) : (
              <View
                onLayout={({
                  nativeEvent: {
                    layout: {y},
                  },
                }) => _handlerSetMessageTextPosition(y)}
                style={styles.messageContainer}>
                <RenderImage
                  imageUrl={path_url_avatar}
                  style={styles.cardMessageIcon}
                  placeholder={
                    <Image
                      source={PlaceholderAvatar}
                      style={styles.cardMessageIcon}
                    />
                  }
                />

                <View style={styles.cardMessageContainer}>
                  <Text style={styles.cardMessageName}>{full_name}</Text>
                  {_handlerHighlighter(
                    searchQuery,
                    message,
                    Colors.secondary.light1,
                  )}
                  <Text style={styles.cardMessageDate}>{createdAt}</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  const _renderSwipeUpAttachment = () => {
    return (
      <View style={styles.swipeUpContainer}>
        {initialisationSwipeUpAttachment?.map((value: any, index: any) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.swipeUpContent}
              onPress={value?.onPress}>
              {value?.icon}
              <Text style={styles.swipeUpTitle}>{value?.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        <Image source={BackgroundStar1} style={styles.backgroundStar1} />
        <ScrollView
          bounces={false}
          ref={refferenceScrollView}
          showsVerticalScrollIndicator={false}
          onScroll={event => _handlerOnScroll(event)}>
          {allMessageData?.data?.map((item: any, index: number) => {
            return _renderCard(item, index);
          })}
        </ScrollView>
        <Image source={BackgroundStar2} style={styles.backgroundStar2} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        {_renderContent()}
        {isShowRecordFrame
          ? _renderInputVoice()
          : isOnSearching
          ? _renderSearchResult()
          : _renderInputMessage()}
      </View>

      {isLoading ? <LoadingIndicator /> : null}

      <SwipeUp
        height={100}
        visible={isShowSwipeUpAttachment}
        onClose={_handlerHideSwipeUpAttachment}
        children={_renderSwipeUpAttachment()}
      />
    </>
  );
};

export default DiscussionGrupMessageScreen;
