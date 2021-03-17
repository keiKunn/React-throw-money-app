import * as Actions from './actions'
import initialState from '../store/initialState'

// 第一引数：state
// 第二引数：actionがreturnした値
export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.ADD_USER:
      return {
        ...state,
        ...action.payload
      }
      default:
        return state
  }
}