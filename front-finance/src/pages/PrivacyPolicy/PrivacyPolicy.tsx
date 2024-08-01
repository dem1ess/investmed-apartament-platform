import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const PrivacyPolicyPage: FC = () => {
	const { t } = useTranslation()
	const rightsList = t('RightsList', { returnObjects: true })

	// Type assertion to tell TypeScript that rightsList is an array
	const rightsListArray = rightsList as Array<string>

	return (
		<div className='min-h-screen py-6 flex flex-col justify-center sm:py-12'>
			<div className='relative py-3 sm:max-w-xl sm:mx-auto'>
				<div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
				<div className='relative px-4 py-10 bg-color--primary-bg border-color--border border shadow-lg sm:rounded-3xl sm:p-20'>
					<div className='max-w-md mx-auto'>
						<h1 className='text-2xl text-white font-semibold text-center'>
							{t('PrivacyPolicy')}
						</h1>
						<div className='space-y-6 py-8'>
							<p className='text-white'>
								{t('t1')}
								<br />
								{t('t2')}
							</p>
							<p className='text-white'>
								{t('PersonalInformation')}
								<br />
								{t('t3')}
							</p>
							<p className='text-white'>
								{t('DataProcessing')}
								<br />
								{t('t4')}
							</p>
							<p className='text-white'>{t('DataUsage')}</p>
							<p className='text-white'>
								{t('YourRights')}
								<br />
								<ul>
									{rightsListArray.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
								{t('t6')}
							</p>
							<p className='text-white'>{t('DataTransfer')}</p>
							<p className='text-white'>
								{t('LinksToOtherSites')}
								<br />
								{t('t7')}
							</p>
							<p className='text-white'>
								{t('InformationSecurity')}
								<br />
								{t('t8')}
								<br />
								{t('LegalDisclosure')}
								<br />
								{t('t9')}
							</p>
							<p className='text-white'>
								{t('ContactInformation')}
								<br />
								{t('t10')}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
