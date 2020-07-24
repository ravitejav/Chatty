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
}
