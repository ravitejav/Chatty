import FireBase from './firebase/Firebase';

import {fromEmailToId} from '../services/Transformer';
import MessageService from './MessageService';

export default class FriendService {
  constructor() {
    this.db = new FireBase().database();
    this.messageService = new MessageService();
  }

  getFirends(email) {
    return this.db.ref('/users/' + email).once('value');
  }

  updateFriendlist(email, friend) {
    return this.db
      .ref(
        '/users/' +
          fromEmailToId(email) +
          '/friends/' +
          fromEmailToId(friend.emailId || friend.email),
      )
      .set({[fromEmailToId(friend.emailId || friend.email)]: friend.fullName});
  }

  getAllFriends(email, friendCallBack, messageCallBack) {
    this.db
      .ref('/users/' + email + '/friends/')
      .once('value')
      .then((results) => {
        Object.keys(results.val()).forEach((emailId) => {
          this.db
            .ref('/users/' + emailId)
            .once('value')
            .then((res) => {
              friendCallBack(res.val());
              this.messageService.getAllMessagesFromUser(
                email,
                fromEmailToId(res.val().emailId),
                messageCallBack,
              );
            })
            .catch((err) => {
              //handle error
            });
        });
      })
      .catch((error) => {
        //handle error
      });
  }

  getNewFriends(email, callBack, messageCallBack) {
    this.db
      .ref('/users/' + email + '/friends/')
      .on('child_added', (results) => {
        Object.keys(results.val()).forEach((emailId) => {
          this.db
            .ref('/users/' + emailId)
            .once('value')
            .then((res) => {
              callBack(res.val());
              this.messageService.getNewMessages(
                email,
                fromEmailToId(res.val().emailId),
                messageCallBack,
              );
            })
            .catch((err) => {
              //handle error
            });
        });
      })
  }
}
