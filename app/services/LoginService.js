import FireBase from './firebase/Firebase';
import FriendService from '../services/FriendSerivce';

import {pickAll} from 'ramda';
import {Alert} from 'react-native';
import {fromEmailToId} from './Transformer';

export default class LoginService {
  constructor() {
    this.auth = new FireBase().auth();
    this.friendService = new FriendService();
  }

  loginWithEmail(
    email,
    password,
    userLoggedIN,
    setLoader,
    addFriendToContactList,
  ) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((results) => {
        userLoggedIN({
          loggedIn: true,
          emailVerified: results.user.emailVerified,
          userDetails: {
            ...pickAll(
              ['displayName', 'photoURL', 'email', 'emailVerified'],
              results.user,
            ),
            fullName: results.user.displayName.split('##')[0],
            nickName: results.user.displayName.split('##')[1],
          },
        });
        this.friendService.getAllFriends(
          fromEmailToId(email),
          addFriendToContactList,
        );
        if (!results.user.emailVerified) {
          alert('please Verify you email');
        }
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        Alert.alert(error.message);
      });
  }

  logout = () => {
    return this.auth.signOut();
  };
}
