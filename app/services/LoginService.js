import FireBase from './firebase/Firebase';

import {pickAll, set} from 'ramda';
import {Alert} from 'react-native';

export default class LoginService {
  constructor() {
    this.auth = new FireBase().auth();
  }

  loginWithEmail(email, password, userLoggedIN, setLoader) {
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
