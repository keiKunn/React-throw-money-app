import { auth, db, FirebaseTimestamp } from '../../firebase/index'
import { push, goBack } from 'connected-react-router'
import { addUserAction, loginAction, logoutAction } from './actions'

// 認証状態のチェック
export const checkAuthState = () => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid
        // ユーザ情報取得
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            // ログイン状態を最新化
            const data = snapshot.data()
            dispatch(
              loginAction({
                role: data.role,
                uid: uid,
                userName: data.username,
                remainMoney: data.remainMoney,
              })
            )
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            alert(`ユーザ情報の取得が失敗しました。| errorCode:${errorCode}, errorMessage:${errorMessage}`)
            return false
          })
      } else {
        //ログイン画面へ遷移
        dispatch(push('/Login'))
      }
    })
  }
}

// アカウント登録ボタン押下
export const pushRegistUser = (username, email, password, confirmPassword) => {
  // firestoreにユーザ登録
  return (dispatch) => {
    // バリデーションチェック
    if (!username || !email || !password || !confirmPassword) {
      alert('必須項目が未入力です')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致していません')
      return false
    }

    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    // firebase authを呼び出し
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user

        // ユーザ情報作成
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()
        const userInitialData = {
          created_time: timestamp,
          email: email,
          role: 'user',
          uid: uid,
          updated_time: timestamp,
          username: username,
          remainMoney: '0',
        }

        // firestoreに登録
        return db
          .collection('users')
          .doc(uid)
          .set(userInitialData)
          .then((result) => {
            //登録後、state変更
            dispatch(
              addUserAction({
                userName: username,
                passWord: password,
              })
            )
            //ホームへ遷移
            dispatch(push('/'))
          })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(`ユーザ登録が失敗しました。| errorCode:${errorCode}, errorMessage:${errorMessage}`)
        return false
      })
  }
}

// 金額を送る
// uid:ログインユーザのuid
// otherUserData:金額の送付先ユーザ情報
// money：送金金額
export const sendMoneyOperation = (uid, otherUserData, money) => {
  return async (dispatch) => {
    // transaction start
    try {
      // 金額の送付先ユーザ情報をfirestoreから取得
      const otherUserRef = db.collection('users').doc(otherUserData.uid)
      //console.log(otherUserRef)
      const otherUserDoc = await otherUserRef.get()
      if (otherUserDoc.exists) {
        const timestamp = FirebaseTimestamp.now()
        // 残高加算
        const otherUserWallet = parseInt(otherUserDoc.get('remainMoney'), 10)
        const culcOtherUserRemainMoney = otherUserWallet + parseInt(money, 10)
        console.log('culcOtherUserRemainMoney:' + culcOtherUserRemainMoney)
        await otherUserRef.update({
          remainMoney: culcOtherUserRemainMoney.toString(10),
          updated_time: timestamp,
        })

        // ログインユーザ情報をfirestoreから取得
        const userRef = db.collection('users').doc(uid)
        const userDoc = await userRef.get()
        // 残高減算
        const userWallet = parseInt(userDoc.get('remainMoney'), 10)
        const culcRemainMoney = userWallet - parseInt(money, 10)
        console.log('culcRemainMoney:' + culcRemainMoney)
        await userRef.update({
          remainMoney: culcRemainMoney.toString(10),
          updated_time: timestamp,
        })
        //ダッシュボードへ遷移
        dispatch(push('/Dashboard'))
      } else {
        // エラーをthrow
        console.log('No such document!')
      }
    } catch (error) {
      const errorMessage = error.message
      console.log(errorMessage)
      //ダッシュボードへ遷移
      dispatch(push('/Dashboard'))
    }
    // transaction end
  }
}

// ログイン
export const login = (email, password) => {
  return (dispatch) => {
    // バリデーションチェック
    if (!email || !password) {
      alert('必須項目が未入力です')
      return false
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user
        const uid = user.uid

        // ユーザ情報取得
        return db
          .collection('users')
          .doc(uid)
          .get()
          .then(async (snapshot) => {
            const data = snapshot.data()

            // データ取得後、state変更
            // (action引数のstateのキーは、ユーザ新規登録処理のuserInitialDataのキーを使用すること)
            dispatch(
              loginAction({
                role: data.role,
                uid: uid,
                userName: data.username,
                remainMoney: data.remainMoney,
              })
            )
            //ダッシュボードへ遷移
            dispatch(push('/Dashboard'))
          })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(`ログインが失敗しました。| errorCode:${errorCode}, errorMessage:${errorMessage}`)
        return false
      })
  }
}

// ログアウト
export const logout = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        // ログアウトが成功
        dispatch(logoutAction)
        //ログイン画面へ遷移
        dispatch(push('/Login'))
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(`ログアウトが失敗しました。| errorCode:${errorCode}, errorMessage:${errorMessage}`)
        return false
      })
  }
}
