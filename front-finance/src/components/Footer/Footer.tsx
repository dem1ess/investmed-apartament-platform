// components/Footer.tsx

import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdDownload } from 'react-icons/md'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
	const { t } = useTranslation()
	return (
		<section className='fold mx-[-1.1vw] mb=[-1.1vw] is--footer'>
			<div className='wrapp is--footer'>
				<div className='footer-box'>
					<div className='footer-logo-side'>
						<div className='lang-logo justify-center items-center'>
							<Link to='/' aria-current='page' className=''>
								<img className='h-[150px]' src='/TLD_logo_beige.svg' alt='' />
							</Link>
						</div>
					</div>
				</div>
				<div className='footer-bottom'>
					<div> {t('footer2024')}</div>
					<div className='footer-bottom-box'>
						<a
							href={`tel:${t('footerNumber')}`}
							className='button-with-icon is--no-shape textcolor-white w-inline-block'>
							<div>{t('footerNumber')}</div>
						</a>
						<a
							href={`mailto:${t('footerEmail')}`}
							className='text-white w-inline-block'>
							{t('footerEmail')}
						</a>
						<Link to='app/privacy-policy' className='footer-link-bottom'>
							{t('footerPrivacy')}
						</Link>
						<a
							href='https://find-and-update.company-information.service.gov.uk/company/14791588/filing-history/MzM3NTM4OTAxOWFkaXF6a2N4/document?format=pdf&download=0'
							className='flex mt-0.5 footer-link-bottom'>
							{t('footerLicense')}
							<MdDownload className='text-lg' />
						</a>
						<Link to='app/terms-of-service' className='footer-link-bottom'>
							{t('footerTerms')}
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
