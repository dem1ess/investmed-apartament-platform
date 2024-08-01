import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IProperty } from "../../models/IProperty.ts";

// Define a type for the slice state
interface PropertyState {
	property: IProperty[] | null
	isLoading: boolean
	error: string
}

// Define the initial state using that type
const initialState: PropertyState = {
	property: null,
	isLoading: false,
	error: ''
}

export const propertySlice = createSlice({
	name: 'property',
	initialState,
	reducers: {
		propertyFetching(state) {
			state.isLoading = true
		},
		propertyFetchingSuccess(state, action: PayloadAction<IProperty[]>) {
			state.isLoading = false
			state.error = ''
			state.property = action.payload
		},
		propertyFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

// Export the action creators
export const { propertyFetching, propertyFetchingSuccess, propertyFetchingError} = propertySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default propertySlice.reducer