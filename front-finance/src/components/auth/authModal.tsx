import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../../helpers/localstorage.helper'
import { AuthService } from '../../service/auth.service'
import { login } from '../../store/reducers/UserSlice.ts'

interface LoginModalProps {
	show: boolean
	onClose: () => void
}

enum FormMode {
	Login,
	Registration,
	ResetPassword,
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [, setResetToken] = useState('')
	const [mode, setMode] = useState(FormMode.Login)
	const [, setResetDisabled] = useState(false)
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		try {
			const userData = { email, password }
			let response1
			if (mode === FormMode.Login) {
				response = await AuthService.login(userData)
			} else if (mode === FormMode.Registration) {
				response = await AuthService.registration(userData)
			} else if (mode === FormMode.ResetPassword) {
				response = await AuthService.resetPassword(email, password)
			}

			if (response && response.token) {
				setTokenToLocalStorage('token', response.token)
				dispatch(login(response.user))
				onClose()
			}
		} catch (error) {
			console.error(
				mode === FormMode.Login
					? 'Error during login:'
					: mode === FormMode.Registration
					? 'Error during registration:'
					: 'Error during password reset:',
				error
			)
			toast.error(
				mode === FormMode.Login
					? t('Error during login')
					: mode === FormMode.Registration
					? t('Error during registration')
					: t('Error during password reset')
			)
		}
	}

	const switchMode = (newMode: FormMode) => {
		setMode(newMode)
		setEmail('')
		setPassword('')
		setConfirmPassword('')
		setResetToken('')
	}

	const handleRegistration = async (event: React.FormEvent) => {
		event.preventDefault()

		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
			return
		}

		try {
			const userData = { email, password }
			const response = await AuthService.registration(userData)

			if (response && response.token) {
				toast.success(
					'Registration successful. Please check your email to confirm your account.'
				)
				onClose()
			}
		} catch (error) {
			console.error('Error during registration:', error)
			toast.error('Error during registration')
		}
	}

	const handlePasswordResetRequest = async (event: React.FormEvent) => {
		event.preventDefault()
		try {
			await AuthService.requestPasswordReset(email)
			toast.success(
				'Password reset email sent. Please check your email for further instructions.'
			)
			setResetDisabled(true)
			setTimeout(() => setResetDisabled(false), 30000)
		} catch (error) {
			console.error('Error during password reset request:', error)
			toast.error('Error during password reset request')
		}
	}

	if (!show) {
		return null
	}

	return (
		<div
			onClick={onClose}
			className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
			<div
				onClick={e => e.stopPropagation()}
				className='bg-color--secondary-bg rounded-xl shadow-lg overflow-hidden w-full max-w-md'>
				<div className='flex text-white items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600'>
					<h1 className='text-2xl font-semibold'>
						{mode === FormMode.Login
							? t('login')
							: mode === FormMode.Registration
							? t('registration')
							: t('forgotPassword')}
					</h1>
				</div>
				<form
					onSubmit={
						mode === FormMode.Registration
							? handleRegistration
							: mode === FormMode.ResetPassword
							? handlePasswordResetRequest
							: handleSubmit
					}
					className='space-y-4 p-6'>
					<div className='space-y-1'>
						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							className='w-full p-3 bg-gray-200 text-gray-600 font-bold text-lg rounded-lg focus:outline-none'
						/>
					</div>
					{mode !== FormMode.ResetPassword && (
						<div className='space-y-1'>
							<input
								type='password'
								placeholder={t('password')}
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								className='w-full p-3.5 bg-gray-200 text-gray-600 rounded-lg focus:outline-none'
							/>
						</div>
					)}
					{mode === FormMode.Registration && (
						<div className='space-y-1'>
							<input
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								required
								className='w-full p-3.5 bg-gray-200 text-gray-600 rounded-lg focus:outline-none'
							/>
						</div>
					)}
					<div className='flex flex-col items-center space-y-4'>
						<button
							type='submit'
							className='w-full bg-sky-400 text-white py-3 rounded-lg hover:bg-sky-500 transition duration-300'>
							{mode === FormMode.Login
								? t('login')
								: mode === FormMode.Registration
								? t('registration')
								: t('sendResetEmail')}
						</button>
						<div className='text-center'>
							{mode === FormMode.Login ? (
								<>
									<p
										onClick={() => switchMode(FormMode.Registration)}
										className='text-white cursor-pointer hover:underline'>
										{t('registration')}
									</p>
									<p
										onClick={() => switchMode(FormMode.ResetPassword)}
										className='text-white cursor-pointer hover:underline mt-2'>
										{t('forgotPassword')}
									</p>
								</>
							) : (
								<p
									onClick={() => switchMode(FormMode.Login)}
									className='text-white cursor-pointer hover:underline'>
									{t('SwitchTO')}
								</p>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginModal
