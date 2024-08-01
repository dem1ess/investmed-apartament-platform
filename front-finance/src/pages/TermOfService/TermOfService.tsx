import { useTranslation } from 'react-i18next'

const MyComponent = () => {
	const { t } = useTranslation()

	return (
		<div className='min-h-screen py-6 flex flex-col justify-center sm:py-12'>
			<div className='relative py-3 sm:max-w-xl sm:mx-auto'>
				<div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
				<div className='relative px-4 py-10 bg-color--primary-bg border-color--border border shadow-lg sm:rounded-3xl sm:p-20'>
					<h1 className='text-2xl text-white font-semibold text-center'>
						{t('termsOfService.title')}
					</h1>
					<p className='mt-8 text-white'>{t('termsOfService.content')}</p>
					<p className='mt-8 text-white'>{t('agreeToTerms.content')}</p>
					<h2 className='mt-8 text-lg font-semibold text-white'>
						{t('useOfTheSite.title')}
					</h2>
					{(t('useOfTheSite.content', { returnObjects: true }) as string[]).map(
						(item, index) => (
							<p key={index} className='mt-4 text-white'>
								{item}
							</p>
						)
					)}
					<h2 className='mt-8 text-lg font-semibold text-white'>
						{t('investmentDisclaimer.title')}
					</h2>
					{(
						t('investmentDisclaimer.content', {
							returnObjects: true,
						}) as string[]
					).map((item, index) => (
						<p key={index} className='mt-4 text-white'>
							{item}
						</p>
					))}
					<h2 className='mt-8 text-lg font-semibold text-white'>
						{t('intellectualProperty.title')}
					</h2>
					{(
						t('intellectualProperty.content', {
							returnObjects: true,
						}) as string[]
					).map((item, index) => (
						<p key={index} className='mt-4 text-white'>
							{item}
						</p>
					))}
					<h2 className='mt-8 text-lg font-semibold text-white'>
						{t('linksToThirdPartyWebsites.title')}
					</h2>
					{(
						t('linksToThirdPartyWebsites.content', {
							returnObjects: true,
						}) as string[]
					).map((item, index) => (
						<p key={index} className='mt-4 text-white'>
							{item}
						</p>
					))}
					<h2 className='mt-8 text-lg font-semibold text-white'>
						{t('termination.title')}
					</h2>
					<p className='mt-4 text-white'>{t('termination.content')}</p>
					<h2 className='mt-8 text-lg font-semibold text-white'>
						{t('changesToTerms.title')}
					</h2>
					<p className='mt-4 text-white'>{t('changesToTerms.content')}</p>
					<h2 className='mt-8 text-lg font-semibold text-white'>
						{t('contactUs.title')}
					</h2>
					<p className='mt-4 text-white'>{t('contactUs.content')}</p>
					<p className='mt-8 text-white'>{t('acknowledgement.content')}</p>
				</div>
			</div>
		</div>
	)
}

export default MyComponent
