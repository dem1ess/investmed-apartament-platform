import {AppDispatch} from "../store.ts";
import {instance} from "../../api/axios.ts";
import {IProperty} from "../../models/IProperty.ts";
import {AuthService} from "../../service/auth.service.ts";
import {login} from "./UserSlice.ts";
import {propertySlice} from "./PropertySlice.ts";
import {transactionSlice} from "./TransactionSlice.ts";
import {ITransaction} from "../../models/ITransaction.ts";
import {purchaseSlice} from "./PurchaseSlice.ts";
import {IPurchase} from "../../models/IPurchase.ts";

export const fetchProperty = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(propertySlice.actions.propertyFetching())
        const response = await instance.get<IProperty[]>('/properties')
        dispatch(propertySlice.actions.propertyFetchingSuccess(response.data))
    } catch (e) {
        const error = e as Error;
        dispatch(propertySlice.actions.propertyFetchingError(error.message))
    }
}

export const fetchUserTransactions = (id:string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(transactionSlice.actions.transactionFetching())
        const response = await instance.get<ITransaction[]>(`transactions/user/${id}`)
        dispatch(transactionSlice.actions.transactionFetchingSuccess(response.data))
    } catch (e) {
        const error = e as Error;
        dispatch(transactionSlice.actions.transactionFetchingError(error.message))
    }
}

export const fetchUserPurchase = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(purchaseSlice.actions.purchaseFetching())
        const response = await instance.get<IPurchase[]>(`purchase`)
        dispatch(purchaseSlice.actions.purchaseFetchingSuccess(response.data))
    } catch (e) {
        const error = e as Error;
        dispatch(purchaseSlice.actions.purchaseFetchingError(error.message))
    }
}


export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.getProfile();
        if (response && response) {
            dispatch(login(response));
        }
    } catch (error) {
        console.error('Ошибка при проверке аутентификации:', error);
        // Обработка ошибки, например, выход из системы
    }
};