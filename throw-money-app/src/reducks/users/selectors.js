import { createSelector } from 'reselect'

const usersSelector = (state) => state.users

export const getUserRemainMoney = createSelector([usersSelector], (state) => state.remainMoney)
