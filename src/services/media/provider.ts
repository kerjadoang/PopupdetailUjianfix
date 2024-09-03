import client from '@api/alternate';
import api from '@api/index';
import {URL_PATH} from '@constants/url';

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  timeout: 0, //no timeout
};

const provider = {
  getImage: (idImage: string) =>
    api.get(URL_PATH.get_image(idImage)).then((res: any) => res.data),
  getFile: (idImage: string) => api.get(URL_PATH.get_file(idImage)),
  getVideoRecording: (idVideo: string) =>
    api.get(URL_PATH.get_video_recording(idVideo)).then((res: any) => res.data),
  getVideoRecordingByResolution: (
    idVideo: string,
    resolution: string = '1920x1080',
  ) =>
    api
      .get(URL_PATH.get_video_recording_by_resolution(idVideo, resolution))
      .then((res: any) => res.data),
  uploadImage: (data: any) => client.post(URL_PATH.upload_image, data, config),
  uploadFile: (data: any, anotherConfig?: any) =>
    client.post(
      URL_PATH.upload_file,
      data,
      anotherConfig ? {...anotherConfig, ...config} : config,
    ),
  uploadVideo: (data: any, anotherConfig?: any) =>
    client.post(
      URL_PATH.upload_video,
      data,
      anotherConfig ? {...anotherConfig, ...config} : config,
    ),
};

export default provider;
