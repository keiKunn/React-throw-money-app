import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { logout } from '../reducks/users/operations'
import { Button } from '../component/'

const Dashboard = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignIn = selector.users.isSignIn

  // 認証されていない場合はログイン画面へリダイレクト
  if (!isSignIn) {
    dispatch(push('/Login'))
  }

  // state保持データ確認用
  const userName = selector.users.userName
  const remainMoney = selector.users.remainMoney

  return (
    <div>
      <h2>ダッシュボード</h2>
      <p>{userName}さん、ようこそ</p>
      <p>残高：{remainMoney}</p>

      <Button value="ログアウト" onClick={() => dispatch(logout())} />
    </div>
  )
}

export default Dashboard
