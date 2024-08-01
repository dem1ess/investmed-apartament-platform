// components/hero/Hero.jsx или .tsx

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function Hero() {
	const { t } = useTranslation()
	return (
		<div
			id='w-node-ce165c02-7f9c-728f-2537-0d64ec587cb2-4264e49b'
			className='hero-text-image mt-8 md:mt-0'>
			<div
				id='w-node-_5696bd84-ced8-eb2b-3118-f549358b8290-4264e49b'
				className='hero-content z-1'>
				<h1 id='second-block' className='text-[42px] text-white pb-4'>
					{t('heroTextMain')}
				</h1>
				<h2 className='text-4xl text-white mob-pad-l-r'>
					{t('heroTextSecond')}
				</h2>
				<div className='hero-content-buttons '>
					<Link
						to='/app'
						target='_blank'
						className='button whity icon w-inline-block'>
						<img
							src='/images/651d30742f51c69cbe13e096_House.svg'
							loading='lazy'
							width='28'
							height='28'
							alt=''
							className='icon-24 text-sky-500'
						/>
						<div>{t('heroBtn')}</div>
					</Link>
				</div>
			</div>
			<div
				id='w-node-_395b8a3d-5c75-b361-cb18-99b7f38fd729-4264e49b'
				className='image-hero'>
				<iframe
					width='100%'
					height='100%'
					src={t('heroYoutubeLink')}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
					title='Embedded youtube'
				/>
			</div>
		</div>
	)
}
