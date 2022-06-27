import * as TalkRn from '@talkjs/expo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { URL } from '../constant/listurl';
import LoadingAll from '../components/LoadingAll';

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export default function ChatScreen({ route }) {
  
  // console.log(route)
  const [sender, setSender] = useState({});
  const [reciver, setReciver] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(route.params.data, "<<<<<<<");
  useEffect(() => {
    (async () => {
      try {

        const data = await getData("customer")
        if(!data){
          const workshop = await getData("workshop")
          setSender(workshop.payload)
          // console.log(sender, '<<>>');
        } else {
          setSender(data.payload)
        }
        setReciver(route.params.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  
  // console.log(sender.TalkJSID, 'sendersssssss');
  // console.log(reciver.TalkJSID, 'reciversssssss');

  if (isLoading) {
    return <LoadingAll></LoadingAll>
  }


  const me = {
    id: sender.TalkJSID,
    name: sender.name,
    email: 'alice@example.com',
    photoUrl: sender.imgUrl,
    welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  };
  //untuk test, id other "testingya"
  let other = {
    id: reciver.TalkJSID,
    name: reciver.name,
    email: 'Sebastian@example.com',
    photoUrl: reciver.imgUrl,
    welcomeMessage: `Hallo ..`,
    role: 'default',
  };
  if(reciver.role === 'staff'){
    other.welcomeMessage = `Haii ${sender.name}, ada yang bisa di bantu ?`
  }

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    <TalkRn.Session appId='t3Kyi1jS' me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );

}