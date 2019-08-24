import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import io from 'socket.io-client';
import produce from 'immer';

import {
  Container,
  FeedItem,
  FeedItemHeader,
  UserInfo,
  Name,
  FeedItemPlus,
  FeedImage,
  FeedItemFooter,
  Actions,
  Action,
  ActionIcon,
  Place,
  Likes,
  Description,
  Hashtags,
  HeaderButton,
  HeaderButtonIcon,
} from './styles';

import api from '../../services/api';

import camera from '../../assets/camera.png';
import more from '../../assets/more.png';
import like from '../../assets/like.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';

export default function Home({navigation}) {
  const [feed, setFeed] = useState([]);
  const [toUpdate, setToUpdate] = useState([]);

  useEffect(() => {
    async function getFeeds() {
      try {
        registerToSocket();
        const {data} = await api.get('/posts');
        setFeed(data);
      } catch (e) {
        console.error(e);
      }
    }
    getFeeds();
  }, []);

  useEffect(() => {
    const newFeed = feed.map(f => (f._id === toUpdate._id ? toUpdate : f));
    setFeed(newFeed);
  }, [toUpdate]);

  function registerToSocket() {
    const socket = io('http://10.0.3.2:3333');

    socket.on('post', newPost => {
      setFeed([newPost, ...feed]);
    });

    socket.on('like', newLike => {
      setToUpdate(newLike);
    });
  }

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  return (
    <Container>
      <FlatList
        data={feed}
        keyExtractor={post => post._id}
        renderItem={({item}) => (
          <FeedItem>
            <FeedItemHeader>
              <UserInfo>
                <Name>{item.author}</Name>
                <Place>{item.place}</Place>
              </UserInfo>

              <FeedItemPlus source={more} />
            </FeedItemHeader>

            <FeedImage
              source={{uri: `http://10.0.3.2:3333/files/${item.image}`}}
            />

            <FeedItemFooter>
              <Actions>
                <Action onPress={() => handleLike(item._id)}>
                  <ActionIcon source={like} />
                </Action>
                <Action onPress={() => {}}>
                  <ActionIcon source={comment} />
                </Action>
                <Action onPress={() => {}}>
                  <ActionIcon source={send} />
                </Action>
              </Actions>

              <Likes>{item.likes.length} curtidas</Likes>
              <Description>{item.description}</Description>
              <Hashtags>{item.hashtags}</Hashtags>
            </FeedItemFooter>
          </FeedItem>
        )}
      />
    </Container>
  );
}

Home.navigationOptions = ({navigation}) => ({
  headerRight: (
    <HeaderButton onPress={() => navigation.navigate('Post')}>
      <HeaderButtonIcon source={camera} />
    </HeaderButton>
  ),
});
