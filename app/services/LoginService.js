import FireBase from './firebase/Firebase';
import FriendService from '../services/FriendSerivce';

import {pickAll} from 'ramda';
import {Alert} from 'react-native';
import {fromEmailToId} from './Transformer';

export default class LoginService {
  constructor() {
    this.firebase = new FireBase();
    this.auth = this.firebase.auth();
    this.db = this.firebase.database();
    this.friendService = new FriendService();
  }

  loginWithEmail(
    email,
    password,
    userLoggedIN,
    setLoader,
    addFriendToContactList,
    addMessage,
  ) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((results) => {
        this.db
          .ref('/users/' + fromEmailToId(email))
          .once('value')
          .then((res) => {
            userLoggedIN({
              loggedIn: true,
              emailVerified: results.user.emailVerified,
              userDetails: {
                ...pickAll(
                  [
                    'displayName',
                    'photoURL',
                    'email',
                    'emailVerified',
                    'photoURL',
                  ],
                  results.user,
                ),
                fullName: res.val().fullName,
                nickName: res.val().nickName,
              },
            });
            this.friendService.getAllFriends(
              fromEmailToId(email),
              addFriendToContactList,
              addMessage,
            );
            if (!results.user.emailVerified) {
              Alert.alert('please Verify you email');
            }
            setLoader(false);
          })
          .catch((error) => {
            Alert.alert('Something went wrong while signup');
          });
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
