import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducks/users/operations'
import { Button } from '../component/'
import Modal from 'react-modal'
import { modalStyle } from './ModalStyle'

Modal.setAppElement('#root')

const Dashboard = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  // state保持データ確認用
  const userName = selector.users.userName
  const remainMoney = selector.users.remainMoney
  const otherUsersInfo = selector.users.otherUsersInfo
  //console.log('otherUsersInfo:' + JSON.stringify(otherUsersInfo))
  //console.log(modalStyle)

  // モーダル制御
  const [modalIsOpen, setMpdalIsOpen] = useState(false)

  return (
    <div>
      <h2>ダッシュボード</h2>
      <p>{userName}さん、ようこそ</p>
      <p>残高：{remainMoney}</p>

      <h3>ユーザ一覧</h3>
      <table>
        <tbody>
          <tr>
            <th>ユーザ名</th>
            <th>wallet</th>
            <th></th>
          </tr>
          {/**他ユーザ情報の出力*/}
          {otherUsersInfo.map((userData, index) => {
            console.log('userData:' + JSON.stringify(userData))
            return (
              <tr key={index}>
                <td>{userData[0].otherUserName}</td>
                <td>
                  <button onClick={() => setMpdalIsOpen(true)}>walletを見る: {userData[0].otherUserWallet}</button>
                  <Modal isOpen={modalIsOpen} style={modalStyle} onRequestClose={() => setMpdalIsOpen(false)}>
                    <p>ユーザ名：{userData[0].otherUserName}</p>
                    <p>残高：{userData[0].otherUserWallet}</p>
                    <p>
                      <button onClick={() => setMpdalIsOpen(false)}>閉じる</button>
                    </p>
                  </Modal>
                </td>
                <td>送る</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Button value="ログアウト" onClick={() => dispatch(logout())} />
    </div>
  )
}

export default Dashboard
