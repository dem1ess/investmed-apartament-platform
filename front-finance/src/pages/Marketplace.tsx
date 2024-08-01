import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MainVillaComponent } from '../components/Villa/MainVilla'
import { VillaItem } from '../components/Villa/VillaItem.tsx'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { fetchProperty } from '../store/reducers/ActionsCreator.ts'

export const MarketplacePage: FC = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { property } = useAppSelector(state => state.property)

	useEffect(() => {
		dispatch(fetchProperty())
		console.log(property)
	}, [])

	return (
		<div className='AssetsListController_root__iaV8e'>
			<div className='Container_container__nWO8i'>
				<div className='AssetsListController_pageContent__D_UK3'>
					<div className='AssetsListController_crudTopNav__LsPdX'>
						<h2 className='text-white mb-3'>{t('marketplace')}</h2>
					</div>
					<div>
						<div className='styles_assetListMain__wC9EK'>
							{property ? (
								<MainVillaComponent property={property[0]} />
							) : (
								<div>
									<h1>Loading</h1>
								</div>
							)}
						</div>
						<div className='styles_assetListMain__wC9EK'>
							{property ? (
								<MainVillaComponent property={property[1]} />
							) : (
								<div>
									<h1>Loading</h1>
								</div>
							)}
						</div>
						<div className='flex md:flex-row mt-4 flex-col justify-between w-full'>
							{property ? (
								<VillaItem class1='mr-4' property={property[2]} />
							) : (
								<div>
									<h1>Loading</h1>
								</div>
							)}
							{property ? (
								<VillaItem class1='mr-4' property={property[3]} />
							) : (
								<div>
									<h1>Loading</h1>
								</div>
							)}
							{property ? (
								<VillaItem class1='mr-0' property={property[4]} />
							) : (
								<div>
									<h1>Loading</h1>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
