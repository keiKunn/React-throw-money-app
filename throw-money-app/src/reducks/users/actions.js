//Actionタイプ定義
export const ADD_USER = 'ADD_USER'

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
    type: ADD_USER,
    payload: {
      isSignIn: true,
      role: userState.role,
      uid: userState.uid,
      userName: userState.userName,
    },
  }
}
