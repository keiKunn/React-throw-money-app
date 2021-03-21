import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const selector = useSelector((state) => state)

  // state保持データ確認用
  const userName = selector.users.userName
  const uid = selector.users.uid
  const isSignIn = selector.users.isSignIn.toString()

  return (
    <div>
      <h2>ダッシュボード</h2>
      <p>{userName}さん、ようこそ</p>
      <p>uid : {uid}</p>
      <p>isSignIn : {isSignIn}</p>
    </div>
  )
}

export default Dashboard
