import { instance } from '../api/axios'
import { IResponseUser, IUser, IUserData } from '../models/IUser'

export const AuthService = {
	async registration(userData: IUserData): Promise<IResponseUser> {
		const { data } = await instance.post<IResponseUser>(
			'auth/register',
			userData
		)
		return data
	},

	async googleLogin() {
		try {
			// Выполните запрос к вашему бекенду для аутентификации через Google
			const { data } = await instance.get('/auth/google')

			// Верните данные, полученные от бекенда
			return data
		} catch (error) {
			console.error('Error during Google login:', error)
			// Возможно, бросить ошибку или вернуть обработанную ошибку вместо того, чтобы молча ее подавлять
			throw error
		}
	},

	async login(userData: IUserData): Promise<IResponseUser | undefined> {
		const { data } = await instance.post<IResponseUser>('auth/login', userData)
		return data
	},

	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('auth/profile')
		console.log('data', data)
		if (data) return data
	},

	async requestPasswordReset(email: string): Promise<void> {
		try {
			await instance.post('auth/request-password-reset', { email })
		} catch (error) {
			console.error('Error during password reset request:', error)
			throw error
		}
	},

	async resetPassword(token: string, newPassword: string): Promise<void> {
		try {
			// Отправляем запрос, добавляя токен в URL и новый пароль в теле запроса
			await instance.post(`auth/reset-password?token=${token}`, { newPassword })
		} catch (error) {
			console.error('Error during password reset:', error)
			throw error
		}
	},
}
