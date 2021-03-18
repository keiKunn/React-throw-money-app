import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'
import { login } from '../reducks/users/operations'
import { InputTextForm, Button } from '../component/';

const Login = () => {
  const dispatch = useDispatch();
  // ログイン画面のstateを定義
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword]);
  
  return (
    <div>
      <h2>ログイン</h2>
      <InputTextForm name="Email" labelName="メールアドレス" type="email"
        value={email} onChange={inputEmail} />

      <InputTextForm name="Password" labelName="パスワード" type="password"
        value={password} onChange={inputPassword} />

      <Button value="ログイン" onClick={() => dispatch(login(email, password))} />

      <button onClick={() => dispatch(push('/Regist'))}>
        新規登録はこちら
      </button>
    </div>
  )
}
export default Login;