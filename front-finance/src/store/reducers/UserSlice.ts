import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import type { RootState } from '../store'

// Определяем тип для состояния слайса
interface UserState {
	user: IUser | null
	isLoading: boolean
	isAuth: boolean
}

// Определяем начальное состояние с использованием этого типа
const initialState: UserState = {
	user: null,
	isLoading: false,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: state => {
			state.isAuth = false
			state.user = null
		},
	},
})

// Экспортируем action creators
export const { login, logout} = userSlice.actions

// Другой код, такой как селекторы, может использовать импортированный тип `RootState`
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer