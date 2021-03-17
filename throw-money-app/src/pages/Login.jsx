import React, { ussState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'

const Login = () => {
  const dispatch = useDispatch();
  
  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(push('/'))}>
        ログイン
      </button>

      <button onClick={() => dispatch(push('/Regist'))}>
        新規登録はこちら
      </button>
    </div>
  )
}
export default Login;