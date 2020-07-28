import FireBase from './firebase/Firebase';

import {fromEmailToId} from '../services/Transformer';

export default class FriendService {
  constructor() {
    this.db = new FireBase().database();
  }

  getFirends(email) {
    return this.db.ref('/users/' + email).once('value', (results) => {
      return results.val();
    });
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

  getAllFriends(email, callBack) {
    this.db
      .ref('/users/' + email + '/friends/')
      .once('value')
      .then((results) => {
        Object.keys(results.val()).forEach((emailId) => {
          this.db
            .ref('/users/' + emailId)
            .once('value')
            .then((res) => {
              callBack(res.val());
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

  getNewFriends(email, callBack) {
    this.db
      .ref('/users/' + email + '/friends/')
      .once('child_added')
      .then((results) => {
        Object.keys(results.val()).forEach((emailId) => {
          this.db
            .ref('/users/' + emailId)
            .once('value')
            .then((res) => {
              callBack(res.val());
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
}
