import { configureStore } from '@reduxjs/toolkit'
import propertyReducer from './reducers/PropertySlice'
import purchaseReducer from './reducers/PurchaseSlice'
import transactionReducer from './reducers/TransactionSlice'
import userReducer from './reducers/UserSlice'
import bankDetailsReducer from './reducers/bankDetailsSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		property: propertyReducer,
		transaction: transactionReducer,
		purchase: purchaseReducer,
		bankDetails: bankDetailsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
