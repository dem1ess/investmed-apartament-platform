import { useTranslation } from 'react-i18next'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import LanguageSelector from '../i18n'

export function HeroSelections() {
	const { t } = useTranslation()

	return (
		<div
			id='w-node-_39a22fe0-22f0-0bcf-597e-c84a48ee7eec-48ee7eec'
			className='menu-desktop-container static-light'>
			<div
				id='w-node-_39a22fe0-22f0-0bcf-597e-c84a48ee7eed-48ee7eec'
				className='menu-desktop static'>
				<div className='lang-logo'>
					<Link
						to='/app'
						aria-current='page'
						className='menu-logo-image light w-inline-block w--current'></Link>
					<LanguageSelector />
				</div>
				<div
					id='w-node-_39a22fe0-22f0-0bcf-597e-c84a48ee7efc-48ee7eec'
					className='menu_liinks-menu_button'>
					<div
						id='w-node-_39a22fe0-22f0-0bcf-597e-c84a48ee7efd-48ee7eec'
						className='menu-links'>
						<a href='#about_platform' className='static_menu-link'>
							{t('link1')}
						</a>
						<a href='#how-invest' className='static_menu-link'>
							{t('link2')}
						</a>
					</div>
					<a
						href={t('callUser')}
						className='rounded-2xl flex items-center p-4 justify-center bg-green-600 border-[1px] border-green-800 cursor-pointer'>
						<IoLogoWhatsapp className='text-green-200 text-3xl' />
						<p className='text-green-200 mx-3'>{t('callUs')}</p>
					</a>
					<Link
						id='w-node-_39a22fe0-22f0-0bcf-597e-c84a48ee7f06-48ee7eec'
						to='/app'
						className='button whity small_sign static-light w-inline-block'>
						<div>{t('link3')}</div>
					</Link>
				</div>
			</div>
		</div>
	)
}
