import FireBase from './firebase/Firebase';

import {fromEmailToId} from './Transformer';

export default class SignUpService {
  constructor() {
    this.fireApp = new FireBase();
    this.auth = this.fireApp.auth();
    this.db = this.fireApp.database();
  }

  addUserAndSendOtp({emailId, password, fullName, nickName}, responseHandler) {
    this.addUser(emailId, password)
      .then((registerUser) => {
        Promise.all([this.sendOtp(), this.updateUser(fullName, nickName)])
          .then((res) => {
            this.db
              .ref('/users/')
              .child(fromEmailToId(emailId))
              .set({emailId, fullName, nickName, friends: {}})
              .then()
              .catch();
            responseHandler({
              signup: true,
              emailVerification: false,
              message:
                'User is registered succesfully, Verification email is sent to registered emailId',
            });
          })
          .catch((err) =>
            responseHandler({
              message: err.message,
            }),
          );
      })
      .catch((error) =>
        responseHandler({
          message: error.message,
        }),
      );
  }

  addUser(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  sendOtp() {
    return this.auth.currentUser.sendEmailVerification();
  }

  updateUser(fullName, nickName) {
    return this.auth.currentUser.updateProfile({
      displayName: fullName + '##' + nickName,
    });
  }
}
