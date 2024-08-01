import React from 'react'
import { useTranslation } from 'react-i18next'

const RealEstateSection: React.FC = () => {
	const { t } = useTranslation()

	return (
		<section className='section connection'>
			<div
				id='w-node-_0bfa86ea-dc98-464a-b86b-20c62598e0ca-4264e49b'
				className='flex justify-center items-center border-2 border-solid border-color--border rounded-[1.6vw] p-12'>
				<h3 className='text-5xl text-white text-center'>
					{t('whyBaliH1')}{' '}
					<span className='text-color--border'>
						{t('whyBaliH1Span')}
						<br />
					</span>
					<br />
					<span className='text-2xl md:text-4xl'>
						{' '}
						{t('whyBaliSpan1')}
						<br />
						<span className='text-color--border'>{t('whyBali2span')} </span>
						{t('whyBaliSpan2')}
					</span>
				</h3>
			</div>
			<div
				id='w-node-_22c7f1ce-0a51-d9ec-97bf-35b275fd1665-4264e49b'
				className='points-vertical'>
				<div className='points-horizontal items-center'>
					<div className='points-icon'>
						<img
							src='https://assets-global.website-files.com/6512b085884d0caef09c7545/6514165a593e9e30b2828738_dollar.svg'
							loading='lazy'
							alt=''
							className='icon-40'
						/>
					</div>
					<div className='points-description justify-center border-2 border-solid border-color--border rounded-[1.6vw] p-8'>
						<h4 className='newtext-24-bold-120-3 text-white'>
							{t('whyBali1item1h1')}
						</h4>
						<h4 className='newtext-24-bold-120-3 text-white'>
							{t('whyBali1item1h2')}{' '}
							<span className='text-color--border bold'>
								{t('whyBali1item1h2Span')}
							</span>
						</h4>
					</div>
				</div>
				<div className='points-horizontal items-center '>
					<div className='points-icon'>
						<img
							src='https://assets-global.website-files.com/6512b085884d0caef09c7545/651417a8a63b5ea8ab53b5fc_smile.svg'
							loading='lazy'
							alt=''
							className='icon-40'
						/>
					</div>
					<div className='points-description justify-center text-white border-2 border-solid border-color--border rounded-[1.6vw] p-8'>
						<h4 className='newtext-24-bold-120-3 '>{t('whyBali1item4Span')}</h4>
						<h4 className='newtext-24-bold-120-3'>
							{t('whyBali1item5Span')}
							<br />
							{t('whyBali1item6Span')}
							<br /> {t('whyBali1item7Span')}
						</h4>
					</div>
				</div>
			</div>
			<img
				src='/images/65157e9dd3fc40cdb95ee011_hero-blur.svg'
				loading='lazy'
				id='w-node-_36e62274-ba85-a93c-58fc-8469f1eeaa91-4264e49b'
				alt=''
				className='bg-patteren-blur_hero'
			/>
			<img
				src='/villas/BALIWOOD/3.jpg'
				loading='lazy'
				id='w-node-a3fc9d2e-03d4-7058-1e04-c5cd662cfced-4264e49b'
				alt=''
				className='bg-patteren-city'
			/>
		</section>
	)
}

export default RealEstateSection
