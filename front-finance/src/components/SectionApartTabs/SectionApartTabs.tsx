import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts'
import { fetchProperty } from '../../store/reducers/ActionsCreator.ts'
import ApartmentItem from './ApartItems'

const SectionApartTabs: React.FC = () => {
	const dispatch = useAppDispatch()
	const { property } = useAppSelector(state => state.property)

	const orderedIds = [
		'cltzu616x0008dzkdh7be2hiz',
		'cltzu6mgd0009dzkdjg5iu0s1',
		'cltzu7efb000adzkd27mvfmaf',
		'cltzu9duu000bdzkdbip9w5yz',
		'cltzua8ic000cdzkdtbdnml68',
	]

	useEffect(() => {
		dispatch(fetchProperty())
		console.log(property)
	}, [])

	const { t } = useTranslation()
	return (
		<section className='section section-apart_tabs flex flex-col items-center justify-center'>
			<div className='flex flex-wrap justify-center m-auto max-w-[1400px]'>
				{property
					?.filter(apartment => typeof apartment.id === 'string') // Отфильтровать неверные значения id
					.sort((a, b) => orderedIds.indexOf(a.id!) - orderedIds.indexOf(b.id!))
					.map((apartment, index) => (
						<div
							key={apartment.id}
							className={`flex mb-5 justify-center w-full md:w-1/3 p-3 ${
								index < 3 ? 'md:w-1/3' : 'md:w-1/2'
							}`}>
							<ApartmentItem property={apartment} />
						</div>
					))}
			</div>
			<div className='mt-auto flex justify-center items-center'>
				<a
					href={t('callUser')}
					className='rounded-xl px-14 flex md:hidden items-center p-4 justify-center bg-green-600 border-[1px] border-green-800 cursor-pointer'>
					<IoLogoWhatsapp className='text-green-200 text-2xl' />
					<p className='text-green-200 mx-3'>{t('callUs')}</p>
				</a>
			</div>
		</section>
	)
}

export default SectionApartTabs
