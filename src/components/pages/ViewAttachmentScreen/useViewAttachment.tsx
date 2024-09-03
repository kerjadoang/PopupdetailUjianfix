import {useMergeState} from '@constants/functional';
import {useRoute} from '@react-navigation/native';
import provider from '@services/media/provider';
import {useEffect} from 'react';

const useViewAttachment = () => {
  const route: any = useRoute();
  const [state, setState] = useMergeState({
    isLoading: false,
    attachmentFile: false,
    attachmentImage: false,
  });
  const {isLoading, attachmentFile, attachmentImage}: any = state;
  const {mediaId, type} = route?.params;
  const imageUrl = attachmentImage?.path_url;
  const fileUrl = attachmentFile?.path_url;
  const isTypeImage = type == 'image';
  // console.log('abcde type>>>', JSON.stringify(type, null, 2));
  // console.log('abcde imageUrl>>>', JSON.stringify(imageUrl, null, 2));
  // console.log('abcde fileUrl>>>', JSON.stringify(fileUrl, null, 2));

  useEffect(() => {
    _handlerGetAttachmentFile();
  }, []);

  const _handlerGetAttachmentFile = async () => {
    setState({isLoading: true});

    try {
      const res = await provider.getFile(mediaId);

      setTimeout(() => {
        if (isTypeImage) {
          setState({isLoading: false, attachmentFile: res?.data?.data});
        } else {
          setState({isLoading: false, attachmentImage: res?.data?.data});
        }
      }, 500);
    } catch (e) {
      setTimeout(() => {
        setState({isLoading: false});
      }, 500);
    }
  };

  return {
    isLoading,
    imageUrl,
    fileUrl,
  };
};

export default useViewAttachment;
