export interface IUser {
	id: string
	createdAt: string
	updatedAt: string
	password: string
	email: string
	role: string
	googleId: string
	balance: number
	firstName: string
	secondName: string
	documentType: string
	country: string
	selfieUrl: string
	documentPhoto1Url: string
	documentPhoto2Url: string
	isVerif: boolean
	isEmailVerif: boolean
	wallet: string
}

export interface IResponseUser {
	user: IUser
	token: string
}
export interface IUserData {
	email: string
	password: string
}
