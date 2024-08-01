// components/BecomeALandlord.tsx

import React from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../../service/i18n'

export const BecomeALandlord: React.FC = () => {
	const landlordCards = [
		{
			imageSrc: '/images/653779b7e88836f0f2534c3c_step1-en.png',
			numberImageSrc: '1',
			title: i18n.t('become1'),
			link: '/',
		},
		{
			imageSrc: '/images/6548eb055b76770d1fa6004e_step2-en-min.png',
			numberImageSrc: '2',
			title: i18n.t('become2'),
			link: '/',
		},
		{
			imageSrc: '/images/6548eb05e28013beaa4a7c64_step3-en-min.png',
			numberImageSrc: '3',
			title: i18n.t('become3'),
			link: '/',
		},
		{
			imageSrc: '/images/65377993116c4ba8daee61bb_step4-en.png',
			numberImageSrc: '4',
			title: i18n.t('become4'),
			link: '/',
		},
		{
			imageSrc: '/images/step_5.png',
			numberImageSrc: '5',
			title: i18n.t('become5'),
			link: '/',
		},
	]

	const { t } = useTranslation()
	return (
		<section id='how-invest' className='section section-become_landlord'>
			<h3
				id='w-node-_7f21a37f-6f21-bb8d-c3c1-41325c186397-4264e49b'
				className='text-3xl md:text-6xl text-white textalign-center'>
				{t('becomeMain')}
			</h3>
			<div
				id='w-node-f8a4bd0c-77d5-301b-f2bc-2860f6232d35-4264e49b'
				className='cards-landlord'>
				{landlordCards.map((card, index) => (
					<div key={index} className='item-landlord shadow-small'>
						<a
							href={card.link}
							target='_blank'
							className='steps-image-link w-inline-block'>
							<img
								src={card.imageSrc}
								loading='lazy'
								alt=''
								className='item-landlord-image'
							/>
						</a>
						<div className='flex items-center h-full pb-10 justify-start'>
							<div className='rounded-xl mx-3 bg-gray-200 '>
								<p className='mx-3 my-2 font-bold text-xl text-gray-800'>
									{card.numberImageSrc}
								</p>
							</div>
							<h4 className='newtext-18-regular-150 textcolor-white'>
								{card.title}
							</h4>
						</div>
					</div>
				))}
			</div>
			<img
				src='/images/65157e9dd3fc40cdb95ee011_hero-blur.svg'
				loading='lazy'
				id='w-node-_36e62274-ba85-a93c-58fc-8469f1eeaa91-4264e49b'
				alt=''
				className='bg-patteren-blur_hero'
			/>
			<img
				src='/villas/VILLA_MILA/1.jpg'
				loading='lazy'
				id='w-node-a3fc9d2e-03d4-7058-1e04-c5cd662cfced-4264e49b'
				alt=''
				className='bg-patteren-city'
			/>
		</section>
	)
}
