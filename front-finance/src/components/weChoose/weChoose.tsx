import { useTranslation } from 'react-i18next'

export function WeChoose() {
	const { t } = useTranslation()
	return (
		<section id='about_platform' className='fold is--agent-program is--radius'>
			<div className='wrapp'>
				<div className='agent-program-box'>
					<div className='is--green agent-program-title py-8 px-5'>
						<h2>{t('aboutTextMain')}</h2>
					</div>
					<div className='flex-is-grow'>
						<div className='agent-program-content'>
							<div className='agent-program-item '>
								<div className='bold-35px py-4'>
									$<span role='marquee'>{t('about3Mill')}</span>
								</div>
								<p className='text-white text-lg'>{t('about3MillSecond')}</p>
							</div>
							<div className='agent-program-item is--green'>
								<div className='bold-35px py-3'>10&gt;</div>
								<p className='text-white text-lg'>{t('about10VillSecond')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
