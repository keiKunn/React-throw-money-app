// firebaseのサービスを'firebase/app'からimport
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
//import 'firebase/functions';
import { firebaseConfig } from './config'

// firebaseのアプリケーションをconfigで初期化
firebase.initializeApp(firebaseConfig)

// firebaseの各サービスのメソッドをexport(アプリ内で呼出しやすくする)
export const auth = firebase.auth()
export const db = firebase.firestore()
//export const functions = firebase.functions();
export const storage = firebase.storage()
export const fb = firebase
export const FirebaseFieldValue = firebase.firestore.FieldValue
export const FirebaseTimestamp = firebase.firestore.Timestamp
