import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {ITransaction} from "../../models/ITransaction.ts";

// Define a type for the slice state
interface TransactionState {
	transaction: ITransaction[] | null
	isLoading: boolean
	error: string
}

// Define the initial state using that type
const initialState: TransactionState = {
	transaction: null,
	isLoading: false,
	error: ''
}

export const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		transactionFetching(state) {
			state.isLoading = true
		},
		transactionFetchingSuccess(state, action: PayloadAction<ITransaction[]>) {
			state.isLoading = false
			state.error = ''
			state.transaction = action.payload
		},
		transactionFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

// Export the action creators
export const { transactionFetching, transactionFetchingSuccess, transactionFetchingError} = transactionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default transactionSlice.reducer