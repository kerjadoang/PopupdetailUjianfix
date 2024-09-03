import {URL_PATH} from '@constants/url';
import {
  ChangeUserBody,
  CheckPhonebookBody,
  EditProfile,
  LinkAccountBody,
  SearchUserBody,
  ShareLearnNoteBody,
  TCheckPassword,
  VerifyDeactivedAccountBody,
} from './type';
import client from '@api/alternate';

const provider = {
  updateParentConection: (body: any) =>
    client.put(URL_PATH.search_by_orangtua, body),
  searchByParent: (body: SearchUserBody) =>
    client.post(URL_PATH.search_by_orangtua, body),

  getAllPrefferedQualityVideo: () =>
    client.get(URL_PATH.get_all_prefered_quality_video),
  putSetUnsetDownloadWithWifi: () =>
    client.put(URL_PATH.put_download_with_wifi),
  putPrefferedQualityVideo: (video_quality_id: number) =>
    client.put(URL_PATH.put_prefered_quality_video(video_quality_id)),

  searchByStudent: (body: SearchUserBody) =>
    client.post(URL_PATH.search_by_student, body),
  getListActivity: (
    limit: number,
    page: number,
    startDate: any,
    endDate: any,
  ) => client.get(URL_PATH.get_list_activity(limit, page, startDate, endDate)),
  linkAccountStudentToParent: (body: LinkAccountBody) =>
    client.post(URL_PATH.send_connect_request_to_orangtua, body),
  linkAccountParentToStudent: (body: LinkAccountBody) =>
    client.post(URL_PATH.send_connect_request_to_anak, body),
  cancelParentConnection: (body: LinkAccountBody) =>
    client.post(URL_PATH.cancel_parent_connection, body),
  cancelStudentConnection: (body: LinkAccountBody) =>
    client.post(URL_PATH.cancel_student_connection, body),
  postCheckPassword: (body: TCheckPassword) =>
    client.post(URL_PATH.post_check_password, body),
  getParent: () => client.get(URL_PATH.get_orang_tua),
  checkPhonebook: (body: CheckPhonebookBody) =>
    client.post(URL_PATH.check_phone_book, body),
  shareLearnNote: (body: ShareLearnNoteBody) =>
    client.post(URL_PATH.share_learn_note, body),
  putChangeAvatar: (body: ChangeUserBody) =>
    client.put(URL_PATH.change_avatar, body),
  putEditProfile: (body: EditProfile) => client.put(URL_PATH.edit_profil, body),
  preDeactivedAccount: () => client.get(URL_PATH.get_pre_deactived_account),
  verivyDeactivedAccount: (body: VerifyDeactivedAccountBody) =>
    client.post(URL_PATH.verify_otp_deactived_account, body),
  startVideoXPTimer: (body: {
    type: 'learn' | 'guru' | 'ptn';
    activity: 'video_animasi' | 'video_presentasi' | 'concept_adventure';
    reference_id: string; //(Learn > send chapter material id)
  }) => client.post(URL_PATH.start_vid_xp_timer, body),
  endVideoXPTimer: (object_id: any) =>
    client.get(URL_PATH.end_vid_xp_timer(object_id)),
};

export default provider;
