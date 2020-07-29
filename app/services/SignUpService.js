import FireBase from './firebase/Firebase';

import {fromEmailToId} from './Transformer';
import {Alert} from 'react-native';
import {isNil, isEmpty} from 'ramda';

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
              .set({emailId, fullName, nickName, friends: {}, photoURL: ''})
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

  updateDetails = (
    {email, fullName, nickName, password},
    loader,
    updateUser,
  ) => {
    loader(true);
    Promise.all([
      this.updateUser(fullName, nickName),
      this.db
        .ref('/users/' + fromEmailToId(email))
        .update({fullName, nickName}),
      !(isNil(password) || isEmpty(password))
        ? this.newPasswordMail(password)
        : this.demoResolve,
    ])
      .then(() => {
        loader(false);
        Alert.alert('Details Updated Successfully.');
        updateUser({fullName, nickName, userDetails: {fullName, nickName}});
      })
      .catch((error) => {
        loader(false);
        Alert.alert('Error occured while updating details.');
      });
  };

  newPasswordMail = (password) => {
    return this.auth.currentUser.updatePassword(password);
  };

  demoResolve = () => {
    return new Promise((resolve, resject) => {
      resolve('resolved');
    });
  };
}
