import FireBase from './firebase/Firebase';

import {fromEmailToId, messagesPath} from '../services/Transformer';
import {Alert} from 'react-native';

export default class MessageService {
  constructor() {
    this.db = new FireBase().database();
  }

  getAllMessages(fromEmail, toEmail, messageCallBack) {
    const messagePath = messagesPath(
      fromEmailToId(fromEmail),
      fromEmailToId(toEmail),
    );
    this.db
      .ref('/messages/' + messagePath)
      .once('value')
      .then((messages) => {
        console.log(messages.val());
      })
      .catch((error) => {
        Alert.alert('Something went wrong');
      });
  }

  getNewMessages(fromEmail, toEmail, messageCallBack) {
    const messagePath = messagesPath(
      fromEmailToId(fromEmail),
      fromEmailToId(toEmail),
    );
    this.db
      .ref('/messages/' + messagePath)
      .once('child_added')
      .then((messages) => {
        console.log(messages.val());
      })
      .catch((error) => {
        Alert.alert('Something went wrong');
      });
  }

  sendMessage(message, fromEmail, toEmail, addMessageInState) {
    const messagePath = messagesPath(
      fromEmailToId(fromEmail),
      fromEmailToId(toEmail),
    );
    const payload = {
      message,
      at: new Date().getTime(),
      sentBy: fromEmailToId(fromEmail),
    };
    this.db
      .ref('/messages/' + messagePath)
      .push(payload)
      .then((response) => {
        addMessageInState(messagePath, payload);
      })
      .catch((error) => {
        Alert.alert('Something went wrong');
      });
  }
}
