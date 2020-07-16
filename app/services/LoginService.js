import FireBase from './firebase/Firebase';

export default class LoginService {
  constructor() {
    this.auth = new FireBase().auth();
  }

  loginWithEmail(email, password) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((results) => {
        return {loggedIn: true, otherDetails: {...results}};
      })
      .catch((error) => console.log(error));
  }
}
