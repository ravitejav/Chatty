import FireBase from './firebase/Firebase';

import {fromEmailToId, messagesPath} from '../services/Transformer';
import {Alert} from 'react-native';

export default class MessageService {
  constructor() {
    this.db = new FireBase().database();
  }

  getAllMessages(from, contacts, messageCallBack) {
    contacts.forEach((contact) => {
      this.getAllMessagesFromUser(from, contact.emailId, messageCallBack);
      this.getNewMessages(from, contact.emailId, messageCallBack);
    });
  }

  getAllMessagesFromUser(fromEmail, toEmail, messageCallBack) {
    const messagePath = messagesPath(
      fromEmailToId(fromEmail),
      fromEmailToId(toEmail),
    );
    this.db
      .ref('/messages/' + messagePath)
      .once('value')
      .then((messages) => {
        if (messages.val()) {
          messageCallBack(messagePath, messages.val());
        }
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
    this.db.ref('/messages/' + messagePath).on('child_added', (messages) => {
      if (messages.val()) {
        messageCallBack(messagePath, {[messages.key]: messages.val()});
      }
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
        addMessageInState(messagePath, {[response.key]: payload});
      })
      .catch((error) => {
        Alert.alert('Something went wrong');
      });
  }
}
