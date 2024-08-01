import React from 'react'
import { useTranslation } from 'react-i18next'

const UnauthorizedPage: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className='min-h-screen py-6 flex flex-col justify-center sm:py-12'>
			<div className='relative py-3 sm:max-w-xl sm:mx-auto'>
				<div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
				<div className='relative px-4 py-10 bg-color--primary-bg border-color--border border shadow-lg sm:rounded-3xl sm:p-20'>
					<h1 className='text-2xl text-white font-semibold text-center'>
						{t('Unauthorized')}
					</h1>
					<p className='text-white text-center mt-4'>{t('Unauthorizedp')}</p>
				</div>
			</div>
		</div>
	)
}

export default UnauthorizedPage
