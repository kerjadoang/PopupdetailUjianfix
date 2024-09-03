import React from 'react';
import {Image, StyleProp, ImageStyle} from 'react-native';
import styles from './style';
import RenderImage from '../RenderImage';
import {MainView} from '../MainComponent';

const Avatar = ({id, style}: {id: string; style?: StyleProp<ImageStyle>}) => {
  // const [imageURL, setImageURL] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     try {
  //       const imgRes = await api.get(`/media/v1/image/${id}`);
  //       setImageURL(imgRes?.data?.data?.path_url);
  //     } catch (error) {
  //       console.error('Error fetching image:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchImage();
  // }, [id]);

  // if (isLoading) {
  //   return <ActivityIndicator size="small" />;
  // }

  return (
    <MainView>
      <RenderImage
        // imageUrl={imageURL ?? ''}
        imageId={id}
        placeholder={
          <Image
            source={require('@assets/images/placeholder_avatar.png')}
            style={style ?? styles.cardAvatar}
          />
        }
        style={style ?? styles.cardAvatar}
      />
    </MainView>
  );
};

export default Avatar;
