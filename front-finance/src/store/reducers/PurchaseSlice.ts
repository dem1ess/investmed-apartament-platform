import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {IPurchase} from "../../models/IPurchase.ts";

// Define a type for the slice state
interface PurchaseState {
	purchase: IPurchase[] | null
	isLoading: boolean
	error: string
}

// Define the initial state using that type
const initialState: PurchaseState = {
	purchase: null,
	isLoading: false,
	error: ''
}

export const purchaseSlice = createSlice({
	name: 'purchase',
	initialState,
	reducers: {
		purchaseFetching(state) {
			state.isLoading = true
		},
		purchaseFetchingSuccess(state, action: PayloadAction<IPurchase[]>) {
			state.isLoading = false
			state.error = ''
			state.purchase = action.payload
		},
		purchaseFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

// Export the action creators
export const { purchaseFetching, purchaseFetchingSuccess, purchaseFetchingError} = purchaseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default purchaseSlice.reducer