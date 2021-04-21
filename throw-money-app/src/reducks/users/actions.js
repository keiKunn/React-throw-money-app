//Actionタイプ定義
export const ADD_USER = 'ADD_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

// ユーザ登録
export const addUserAction = (userState) => {
  return {
    type: ADD_USER,
    payload: {
      isSignIn: false,
      userName: userState.userName,
    },
  }
}

// ログイン
export const loginAction = (userState) => {
  return {
    type: LOGIN_USER,
    payload: {
      isSignIn: true,
      role: userState.role,
      uid: userState.uid,
      userName: userState.userName,
      remainMoney: userState.remainMoney,
    },
  }
}

// ログアウト
export const logoutAction = () => {
  return {
    type: LOGOUT_USER,
    payload: null,
  }
}
