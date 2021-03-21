import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { pushRegistUser } from '../reducks/users/operations'
import { InputTextForm, Button } from '../component/'

const RegistUser = () => {
  const dispath = useDispatch()
  // 新規登録画面のstateを定義
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // onChange関数のメモ化。
  //子供のコンポーネントに変更するための関数を渡す際には、関数のメモ化をすることによりパフォーマンスを向上させることができる
  // 一つ目の引数：コールバック関数
  // 二つ目の引数：配列の中に値を渡してあげる、今回はsetUsernameという関数を渡す。
  const inputUserName = useCallback(
    (event) => {
      setUsername(event.target.value)
    },
    [setUsername]
  )

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value)
    },
    [setPassword]
  )

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value)
    },
    [setConfirmPassword]
  )

  return (
    <div>
      <h2>新規登録</h2>
      <InputTextForm name="UserName" labelName="ユーザ名" type="text" value={username} onChange={inputUserName} />

      <InputTextForm name="Email" labelName="メールアドレス" type="email" value={email} onChange={inputEmail} />

      <InputTextForm name="Password" labelName="パスワード" type="password" value={password} onChange={inputPassword} />

      <InputTextForm
        name="ConfirmPassword"
        labelName="パスワードの確認"
        type="password"
        value={confirmPassword}
        onChange={inputConfirmPassword}
      />

      <Button
        value="アカウント登録"
        onClick={() => dispath(pushRegistUser(username, email, password, confirmPassword))}
      />
    </div>
  )
}

export default RegistUser
