import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const EmailVerificationPage: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const queryParams = new URLSearchParams(location.search)
	const success = queryParams.get('success') === 'true'

	const handleBackToHome = () => {
		navigate('/') // Замените на путь вашей главной страницы
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='p-8 bg-white rounded-lg shadow-lg w-full max-w-md'>
				<div className='flex items-center justify-center mb-6'>
					{success ? (
						<h1 className='text-3xl font-extrabold text-green-600'>
							Email Successfully Verified!
						</h1>
					) : (
						<h1 className='text-3xl font-extrabold text-red-600'>
							Verification Failed.
						</h1>
					)}
				</div>
				<p className='text-gray-600 text-lg mb-6'>
					{success
						? 'Your email address has been successfully verified. You can now log in to your account.'
						: 'The verification link may have expired or is invalid. Please check the link and try again.'}
				</p>
				<button
					onClick={handleBackToHome}
					className='w-full bg-sky-400 mb-4 text-white px-4 rounded-xl py-5'>
					Back to Home
				</button>
			</div>
		</div>
	)
}
