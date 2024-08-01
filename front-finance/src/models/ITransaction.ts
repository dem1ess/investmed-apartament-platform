export interface ITransaction {
    id: string,
    createdAt: string,
    updateAt: string,
    amount: number,
    transactionStatus: string,
    userId: string
}