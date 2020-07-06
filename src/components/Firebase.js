import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7K_LTUdYHUCkV4DZMd-6mfu8VwAI3ehc",
  authDomain: "indiproducts.firebaseapp.com",
  databaseURL: "https://indiproducts.firebaseio.com",
  projectId: "indiproducts",
  storageBucket: "indiproducts.appspot.com",
  messagingSenderId: "161878248423",
  appId: "1:161878248423:web:c718da7d5dfc22c3b24b42",
  measurementId: "G-64W86WDQNC",
};

class Firebase {
  constructor() {
    // Initialize Firebase
    app.initializeApp(firebaseConfig);
    app.analytics();
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }
}

export default new Firebase();
