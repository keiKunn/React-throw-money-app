import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase/index'
import { logout, sendMoneyOperation } from '../reducks/users/operations'
import { Button, InputTextForm } from '../component/'
import Modal from 'react-modal'
import { modalStyle } from './ModalStyle'
import { getUserRemainMoney } from '../reducks/users/selectors'

Modal.setAppElement('#root')

const Dashboard = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  // state保持データ確認用
  const uid = selector.users.uid
  const userName = selector.users.userName
  const [remainMoney, setRemainMoney] = useState(selector.users.remainMoney)

  //const testwallet = getUserRemainMoney(selector)
  const testwallet = selector.users.remainMoney

  // モーダル制御
  // walletを見る
  const [modalIsOpenWatchWallet, setMpdalIsOpenWatchWallet] = useState(false)
  const [modalOtherUserName, setModalOtherUserName] = useState('')
  const [modalOtherUserWallet, setModalOtherUserWallet] = useState('')
  // 送る
  const [modalIsOpenSend, setMpdalIsOpenSend] = useState(false)
  const [sendMoney, setSendMoney] = useState('')
  const [modalOtherUserData, setModalOtherUserData] = useState('')

  // walletを見る クリックイベント
  const handleClickWallet = (otherUserName, otherUserWallet) => {
    setMpdalIsOpenWatchWallet(true)
    setModalOtherUserName(otherUserName)
    setModalOtherUserWallet(otherUserWallet)
  }

  // 送る クリックイベント
  // otherUserData:金額の送付先ユーザ情報
  const handleClickSend = (otherUserData) => {
    setMpdalIsOpenSend(true)
    setModalOtherUserData(otherUserData)
  }
  // 送る金額 入力イベント
  const inputSendMoney = useCallback(
    (event) => {
      setSendMoney(event.target.value)
    },
    [setSendMoney]
  )
  // 送金実行
  // const handleClickSendMoney = useCallback(
  //   (modalOtherUserData, sendMoney) => {
  //     console.log('handleSendMoney:送金実行')
  //     if (!sendMoney) {
  //       alert('金額を入力してください')
  //       return false
  //     }
  //     dispatch(sendMoneyOperation(uid, modalOtherUserData, sendMoney))
  //     // 送金モーダルを閉じる
  //     setMpdalIsOpenSend(false)
  //     // ダッシュボードの残高更新
  //     console.log('selector.users.remainMoney:' + selector.users.remainMoney)
  //     console.log('testwallet:' + testwallet)

  //     //setRemainMoney(testwallet)
  //   },
  //   [testwallet, dispatch]
  // )

  const handleClickSendMoney = async () => {
    console.log('handleSendMoney:送金実行')
    if (!sendMoney) {
      alert('金額を入力してください')
      return false
    }
    await dispatch(sendMoneyOperation(uid, modalOtherUserData, sendMoney))
    // 送金モーダルを閉じる
    setMpdalIsOpenSend(false)
    // ダッシュボードの残高更新
    console.log('selector.users.remainMoney:' + selector.users.remainMoney)
    console.log('testwallet:' + testwallet)
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
          uid: otherUserData.uid,
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
      <p>残高：{testwallet}</p>

      <h3>ユーザ一覧</h3>
      <table>
        <tbody>
          <tr>
            <th>ユーザ名</th>
            <th>wallet</th>
            <th></th>
          </tr>
          {/**他ユーザ情報の出力*/}
          {otherUsersInfo.map((otherUserData, index) => {
            //console.log('otherUserData:' + JSON.stringify(otherUserData))
            return (
              <tr key={index}>
                <td>{otherUserData[0].otherUserName}</td>
                <td>
                  <Button
                    value="walletを見る"
                    onClick={() => handleClickWallet(otherUserData[0].otherUserName, otherUserData[0].otherUserWallet)}
                  />
                </td>
                <td>
                  <Button value="送る" onClick={() => handleClickSend(otherUserData[0])} />
                  {/**
                   * モーダルの表示
                   * 表示タイミングで、全ユーザの残金再取得、firestoreに排他処理
                   *
                   * 金額入力フォーム
                   * 送信ボタン
                   * 送信タイミングで、送信先ユーザの残高更新、排他処理の解除
                   * 閉じるボタン
                   * ダッシュボードの更新（再レンダリング） */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/**モーダル：walletを見る*/}
      <Modal isOpen={modalIsOpenWatchWallet} style={modalStyle} onRequestClose={() => setMpdalIsOpenWatchWallet(false)}>
        <p>ユーザ名：{modalOtherUserName}</p>
        <p>残高：{modalOtherUserWallet}</p>
        <p>
          <button onClick={() => setMpdalIsOpenWatchWallet(false)}>閉じる</button>
        </p>
      </Modal>

      {/**モーダル：送る*/}
      <Modal isOpen={modalIsOpenSend} style={modalStyle} onRequestClose={() => setMpdalIsOpenSend(false)}>
        <p>あなたの残高：{remainMoney}</p>
        <InputTextForm
          name="sendMoneyForm"
          labelName="送る金額"
          type="text"
          value={sendMoney}
          onChange={inputSendMoney}
        />
        <Button value="送金実行" onClick={() => handleClickSendMoney(modalOtherUserData, sendMoney)} />

        <p>
          <button onClick={() => setMpdalIsOpenSend(false)}>閉じる</button>
        </p>
      </Modal>

      <Button value="ログアウト" onClick={() => dispatch(logout())} />
    </div>
  )
}

export default Dashboard
