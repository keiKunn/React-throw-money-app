//Actionタイプ定義
export const ADD_USER = 'ADD_USER';

// ユーザ登録
export const addUserAction = (userState) => {
  return {
    type: ADD_USER,
    payload: {
      isSignIn: false, //★必要？
      userName: userState.userName,
      passWord: userState.passWord
    }
  }
}
