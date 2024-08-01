export interface IPurchase {
    id: string
    createdAt: string
    tokens: number
    totalCost: number
    propertyId: string
    buyerId: string
}