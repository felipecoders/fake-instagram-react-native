import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';

import {
  Container,
  SelectButton,
  SelectButtonText,
  Preview,
  Input,
  ShareButton,
  ShareButtonText,
} from './styles';

import api from '../../services/api';

export default function Post({navigation}) {
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleSelectimage() {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem',
      },
      upload => {
        if (upload.error) {
          console.log('Error');
        } else if (upload.didCancel) {
          console.log('Used canceled');
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          setImage(image);
          setPreview(preview);
        }
      },
    );
  }

  async function handleSubmit() {
    // como eu tenho que enviar uma imagem
    // preciso instanciar um FormData
    // e preencher os campos para envia-los
    // caso não tivesse imagem, poderia fazer um simples post
    const data = new FormData();
    data.append('image', image);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);
    // envia as informações para o servidor
    await api.post('/posts', data);
    // redireciona
    navigation.navigate('Home');
  }

  return (
    <Container>
      <SelectButton onPress={handleSelectimage}>
        <SelectButtonText>Selecionar imagem</SelectButtonText>
      </SelectButton>

      {preview && <Preview source={preview} />}

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Local da foto"
        placeholderTextColor="#999"
        value={place}
        onChangeText={place => setPlace(place)}
      />

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Descrição"
        placeholderTextColor="#999"
        value={description}
        onChangeText={description => setDescription(description)}
      />

      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Hashtags"
        placeholderTextColor="#999"
        value={hashtags}
        onChangeText={hashtags => setHashtags(hashtags)}
      />

      <ShareButton onPress={handleSubmit}>
        <ShareButtonText>Compartilhar</ShareButtonText>
      </ShareButton>
    </Container>
  );
}
