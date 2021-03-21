// StoreでReducersを関連付ける
import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { UsersReducer } from '../users/reducers'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  )
}

// next:storeとreactアプリ関連付ける:ルートjs(index.js)でProviderとこのcreateStoreをimport。＜App＞をProviderでラップし、property storeにcreateStoreを渡す。
