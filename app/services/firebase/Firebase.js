import * as firebase from 'firebase';

export default class Firebase {
  constructor() {
    this.fireApp = null;
    const firebaseConfig = {
      apiKey: 'AIzaSyCn_X7kXW9jfY1cMmD9IxHPHW_D2PvGVCo',
      authDomain: 'chatapplication-8846f.firebaseapp.com',
      databaseURL: 'https://chatapplication-8846f.firebaseio.com',
      projectId: 'chatapplication-8846f',
      storageBucket: 'chatapplication-8846f.appspot.com',
      messagingSenderId: '379283584592',
      appId: '1:379283584592:web:06a4f58b7a084933874355',
      measurementId: 'G-H5D16CN417',
    };
    if (firebase.apps.length === 0) {
      this.fireApp = firebase.initializeApp(firebaseConfig);
    } else {
      this.fireApp = firebase.apps[firebase.apps.length - 1];
    }
  }

  database(): firebase.database.Database {
    return this.fireApp.database();
  }

  auth(): firebase.auth.Auth {
    return this.fireApp.auth();
  }

  users(): firebase.database.Reference {
    return this.fireApp.database().ref('users');
  }
}
