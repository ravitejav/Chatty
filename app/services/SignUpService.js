import FireBase from './firebase/Firebase';

export default class LoginService {
  constructor() {
    this.auth = new FireBase().auth();
  }

  sendOtp(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password);
  }

}
