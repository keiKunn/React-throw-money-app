import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const selector = useSelector((state) => state)

  // state保持データ確認用
  const userName = selector.users.userName
  const remainMoney = selector.users.remainMoney

  return (
    <div>
      <h2>ダッシュボード</h2>
      <p>{userName}さん、ようこそ</p>
      <p>残高：{remainMoney}</p>
    </div>
  )
}

export default Dashboard
