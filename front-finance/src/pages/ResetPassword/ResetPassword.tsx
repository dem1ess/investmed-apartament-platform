import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthService } from '../../service/auth.service' // Импортируйте ваш AuthService

export const ResetPasswordPage: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const queryParams = new URLSearchParams(location.search)
	const token = queryParams.get('token')
	const success = queryParams.get('success') === 'true'

	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordResetStatus, setPasswordResetStatus] = useState<string | null>(
		null
	)

	useEffect(() => {
		if (success) {
			setPasswordResetStatus(
				'Password reset successfully. You can now return to the home page.'
			)
		}
	}, [success])

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		if (name === 'newPassword') {
			setNewPassword(value)
		} else if (name === 'confirmPassword') {
			setConfirmPassword(value)
		}
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		if (newPassword !== confirmPassword) {
			setPasswordResetStatus('Passwords do not match')
			return
		}

		try {
			await AuthService.resetPassword(token as string, newPassword)
			navigate('?success=true') // Устанавливаем success=true в URL
		} catch (error) {
			console.error('Error resetting password:', error)
			setPasswordResetStatus('An error occurred while resetting the password')
		}
	}

	const handleBackToHome = () => {
		navigate('/')
	}

	return (
		<div className='flex items-center justify-center h-screen bg-transparent'>
			<div className='p-8 bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md'>
				<div className='flex items-center justify-center mb-6'>
					{success ? (
						<h1 className='text-3xl font-bold text-green-400'>
							Password Reset Successful!
						</h1>
					) : (
						<h1 className='text-3xl font-bold text-red-400'>Reset Password</h1>
					)}
				</div>
				{!success ? (
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label htmlFor='newPassword' className='block text-gray-300'>
								New Password
							</label>
							<input
								type='password'
								id='newPassword'
								name='newPassword'
								value={newPassword}
								onChange={handlePasswordChange}
								className='w-full p-3 border text-black border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								required
							/>
						</div>
						<div>
							<label htmlFor='confirmPassword' className='block text-gray-300'>
								Confirm Password
							</label>
							<input
								type='password'
								id='confirmPassword'
								name='confirmPassword'
								value={confirmPassword}
								onChange={handlePasswordChange}
								className='w-full p-3 border border-gray-600 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								required
							/>
						</div>
						{passwordResetStatus && (
							<div
								className={`mt-4 text-lg ${
									success ? 'text-green-300' : 'text-red-300'
								}`}>
								{passwordResetStatus}
							</div>
						)}
						<button
							type='submit'
							className='w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
							Reset Password
						</button>
					</form>
				) : (
					<div className='flex flex-col items-center'>
						<p className='mt-4 text-lg text-gray-300'>{passwordResetStatus}</p>
						<button
							onClick={handleBackToHome}
							className='w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'>
							Back to Home
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
