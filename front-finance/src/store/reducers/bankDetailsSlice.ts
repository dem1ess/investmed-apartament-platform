import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BankDetailsState {
	id: string
	accountName: string
	accountNumber: string
	routingNumber: string
	bankName: string
	bankAddress: string
}

const initialState: BankDetailsState[] = []

const bankDetailsSlice = createSlice({
	name: 'bankDetails',
	initialState,
	reducers: {
		setBankDetails: (state, action: PayloadAction<BankDetailsState[]>) => {
			return action.payload
		},
		clearBankDetails: () => initialState,
	},
})

export const { setBankDetails, clearBankDetails } = bankDetailsSlice.actions
export default bankDetailsSlice.reducer
