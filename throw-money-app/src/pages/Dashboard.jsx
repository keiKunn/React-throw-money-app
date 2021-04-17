import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase/index'
import { logout } from '../reducks/users/operations'
import { Button } from '../component/'
import Modal from 'react-modal'
import { modalStyle } from './ModalStyle'

Modal.setAppElement('#root')

const Dashboard = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  // state保持データ確認用
  const uid = selector.users.uid
  const userName = selector.users.userName
  const remainMoney = selector.users.remainMoney

  // モーダル制御
  const [modalIsOpen, setMpdalIsOpen] = useState(false)
  const [modalOtherUserName, setModalOtherUserName] = useState('')
  const [modalOtherUserWallet, setModalOtherUserWallet] = useState('')

  // walletクリックイベント
  const handleClickWallet = (otherUserName, otherUserWallet) => {
    setMpdalIsOpen(true)
    setModalOtherUserName(otherUserName)
    setModalOtherUserWallet(otherUserWallet)
  }

  // 他ユーザ情報
  const [otherUsersInfo, setOtherUsersInfo] = useState([])
  console.log('ダッシュボードコンポーネント otherUsersInfo:' + otherUsersInfo)

  // 他ユーザ情報を取得する
  // 第２引数：[]
  useEffect(async () => {
    // 他のuser情報の取得
    console.log('ダッシュボード useEffect:')
    const otherUsersRef = await db.collection('users').where('uid', '!=', uid).get()
    // ダッシュボード内で表示用に成型(firebaseからの返却値ではmap関数が使えないため)
    const otherUsersInfoTmp = []
    otherUsersRef.forEach((doc) => {
      const otherUserData = doc.data()
      otherUsersInfoTmp.push([
        {
          id: otherUserData.uid,
          otherUserName: otherUserData.username,
          otherUserWallet: otherUserData.remainMoney,
        },
      ])
    })

    //stateにセット
    setOtherUsersInfo(otherUsersInfoTmp)
  }, [])

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
            //console.log('userData:' + JSON.stringify(userData))
            return (
              <tr key={index}>
                <td>{userData[0].otherUserName}</td>
                <td>
                  <button onClick={() => handleClickWallet(userData[0].otherUserName, userData[0].otherUserWallet)}>
                    walletを見る: {userData[0].otherUserWallet}
                  </button>
                </td>
                <td>送る</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/**モーダルの出力*/}
      <Modal isOpen={modalIsOpen} style={modalStyle} onRequestClose={() => setMpdalIsOpen(false)}>
        <p>ユーザ名：{modalOtherUserName}</p>
        <p>残高：{modalOtherUserWallet}</p>
        <p>
          <button onClick={() => setMpdalIsOpen(false)}>閉じる</button>
        </p>
      </Modal>

      <Button value="ログアウト" onClick={() => dispatch(logout())} />
    </div>
  )
}

export default Dashboard
