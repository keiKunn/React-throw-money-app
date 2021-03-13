import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { push } from 'connected-react-router'
import { Button } from '../component/';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  // state保持データ確認用
  const userName = selector.users.userName;
  const passWord = selector.users.passWord;


  return (
    <div>
      <h2>ホーム</h2>
      <p>こんにちは、{userName}。先ほど登録されたパスワードは{passWord}</p>

      <Button value="ログインページはこちら" onClick={()=>dispatch(push('/Login')) }/>
      
    </div>
  );
}

export default Home;