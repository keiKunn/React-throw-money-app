import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthState } from './reducks/users/operations'

const Auth = ({ children }) => {
  const dispath = useDispatch()
  const selector = useSelector((state) => state)
  // storeのstateからログイン状態を取得
  const isSignIn = selector.users.isSignIn

  // 副作用処理を1回目のマウント時のみ実行
  useEffect(() => {
    if (!isSignIn) {
      // 認証状態のチェック
      dispath(checkAuthState())
    }
  }, [])

  if (!isSignIn) {
    // 空のJSXを返却
    return <></>
  } else {
    // Router.jsxのAuthの子要素を返却する
    return children
  }
}

export default Auth
