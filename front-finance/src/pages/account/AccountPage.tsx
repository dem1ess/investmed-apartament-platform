import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { MainVillaComponent } from '../../components/Villa/MainVilla.tsx'
import { useAppSelector } from '../../hooks/redux.ts'
import { IPurchase } from '../../models/IPurchase.ts'
import { fetchUserPurchase } from '../../store/reducers/ActionsCreator.ts'
import UnauthorizedPage from '../Unauthorized/UnauthorizedPage.tsx'
import s from './styles.module.scss'

export default function AccountPage() {
	const dispatch = useDispatch()
	const user = useAppSelector(state => state.user.user)
	const properties = useAppSelector(state => state.property.property)
	const purchases = useAppSelector(state => state.purchase.purchase)
	const isLoading = useAppSelector(state => state.purchase.isLoading)

	const error = useAppSelector(state => state.purchase.error)
	const { t } = useTranslation()

	useEffect(() => {
		// @ts-ignore
		dispatch(fetchUserPurchase())
	}, [dispatch])

	// Обработка загрузки, ошибок и получения данных
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>
	if (!purchases || !properties || !user) return <UnauthorizedPage />

	const propertiesWithShare = properties.filter(property => {
		return purchases.some(
			(purchase: IPurchase) =>
				purchase.propertyId === property.id && purchase.buyerId === user.id
		)
	})

	const incomes = purchases.map(purchase => {
		// Находим свойство с соответствующим propertyId
		const property = properties.find(
			property => property.id === purchase.propertyId
		)

		if (property) {
			const income =
				purchase.tokens *
				((property.rentPerYear - 0.3 * property.rentPerYear) / 10 / 365)
			return income
		} else {
			// Если свойство не найдено, возвращаем 0 дохода
			return 0
		}
	})

	const totalIncome = incomes.reduce((acc, income) => acc + income, 0)

	const propertiesWithTokens = propertiesWithShare.map(property => {
		const totalTokens = purchases.reduce((acc, purchase) => {
			if (purchase.propertyId === property.id && purchase.buyerId === user.id) {
				return acc + purchase.tokens
			}
			return acc
		}, 0)
		console.log(propertiesWithShare)
		return { ...property, totalTokens }
	})

	const getUserPurchases = (userId: string) => {
		return purchases.filter(purchases => purchases.buyerId === userId)
	}

	const totalSpent = propertiesWithShare.reduce((acc, property) => {
		const propertyTokens = purchases.reduce((propAcc, purchase) => {
			if (purchase.propertyId === property.id && purchase.buyerId === user.id) {
				return propAcc + purchase.tokens
			}
			return propAcc
		}, 0)
		return acc + propertyTokens * property.priceToken
	}, 0)

	const totalTokens = propertiesWithShare.reduce((acc, property) => {
		const propertyTokens = purchases.reduce((propAcc, purchase) => {
			if (purchase.propertyId === property.id && purchase.buyerId === user.id) {
				return propAcc + purchase.tokens
			}
			return propAcc
		}, 0)
		return acc + propertyTokens
	}, 0)

	return (
		<div className={s.root}>
			<div>
				<div className='flex flex-col md:flex-row'>
					<div className='w-full md:w-1/3 mx-0 md:mx-5'>
						<div className='flex w-full md:w-2/3'>
							<div className='text-xl text-white font-bold mb-0 mt-4 md:mt-0 md:mb-4'>
								{t('AssetOverview')}
							</div>
						</div>
						<div className={s.totalRentInfo}>
							<p className='text-xl mt-4'>{t('TotalRent')}</p>
							<div className={`${s.balanceGraphic} py-5`}>
								<div className={s.rentBalanceClaim}>
									<p className='text-6xl font-bold text-green-400 pb-5'>
										${totalIncome.toLocaleString()}
									</p>
								</div>
							</div>
							<div className='styles_tableWrapper__ZU9fr'>
								<table className='DetailsTable_tableDetails__q6yn_'>
									<tbody>
										<tr className='DetailsTable_trFirst__rxhBq'>
											<td className='DetailsTable_accountDetails__kPaIH DetailsTable_horizontalBorder__qV0WJ'>
												<div>
													<div className='DetailsTable_iconWrapper__id_GP DetailsTable_iconThemeHardcoded__NLY4H'>
														<svg
															width='15'
															height='14'
															viewBox='0 0 15 14'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'>
															<path
																d='M13.1875 3.0625H1.9375C1.78832 3.0625 1.64524 3.00324 1.53975 2.89775C1.43426 2.79226 1.375 2.64918 1.375 2.5C1.375 2.35082 1.43426 2.20774 1.53975 2.10225C1.64524 1.99676 1.78832 1.9375 1.9375 1.9375H11.5C11.6492 1.9375 11.7923 1.87824 11.8977 1.77275C12.0032 1.66726 12.0625 1.52418 12.0625 1.375C12.0625 1.22582 12.0032 1.08274 11.8977 0.977253C11.7923 0.871763 11.6492 0.8125 11.5 0.8125H1.9375C1.49052 0.814351 1.06237 0.992735 0.746302 1.3088C0.430235 1.62487 0.251851 2.05302 0.25 2.5V11.5C0.251851 11.947 0.430235 12.3751 0.746302 12.6912C1.06237 13.0073 1.49052 13.1856 1.9375 13.1875H13.1875C13.4859 13.1875 13.772 13.069 13.983 12.858C14.194 12.647 14.3125 12.3609 14.3125 12.0625V4.1875C14.3125 3.88913 14.194 3.60298 13.983 3.392C13.772 3.18103 13.4859 3.0625 13.1875 3.0625ZM10.6562 8.96875C10.4894 8.96875 10.3262 8.91926 10.1875 8.82655C10.0487 8.73384 9.94059 8.60206 9.87673 8.44789C9.81287 8.29371 9.79616 8.12406 9.82871 7.96039C9.86127 7.79672 9.94163 7.64638 10.0596 7.52838C10.1776 7.41038 10.328 7.33002 10.4916 7.29746C10.6553 7.26491 10.825 7.28162 10.9791 7.34548C11.1333 7.40934 11.2651 7.51748 11.3578 7.65624C11.4505 7.79499 11.5 7.95812 11.5 8.125C11.5 8.34878 11.4111 8.56339 11.2529 8.72162C11.0946 8.87986 10.88 8.96875 10.6562 8.96875Z'
																fill='#00B4CC'></path>
														</svg>
													</div>
												</div>
												<div>
													<p className='DetailsTable_details_text_grey__nTKdr'>
														{t('Currentballance')}
													</p>
													<p className='DetailsTable_details_text_purple__SEzmS'>
														${user.balance}
													</p>
												</div>
											</td>
											<td className='DetailsTable_accountDetails__kPaIH'>
												<div>
													<div className='DetailsTable_iconWrapper__id_GP'>
														<svg
															width='20'
															height='20'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															className='DetailsTable_iconsColor__9y9_w'>
															<path
																opacity='0.2'
																d='M14.25 19.5V15C14.25 14.8011 14.171 14.6103 14.0303 14.4697C13.8897 14.329 13.6989 14.25 13.5 14.25H10.5C10.3011 14.25 10.1103 14.329 9.96967 14.4697C9.82902 14.6103 9.75 14.8011 9.75 15V19.5C9.75 19.6989 9.67098 19.8897 9.53033 20.0303C9.38968 20.171 9.19891 20.25 9 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V10.8281C3.75168 10.7243 3.77411 10.6219 3.81597 10.5269C3.85783 10.432 3.91828 10.3463 3.99375 10.275L11.4937 3.45939C11.632 3.33291 11.8126 3.26276 12 3.26276C12.1874 3.26276 12.368 3.33291 12.5062 3.45939L20.0062 10.275C20.0817 10.3463 20.1422 10.432 20.184 10.5269C20.2259 10.6219 20.2483 10.7243 20.25 10.8281V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H15C14.8011 20.25 14.6103 20.171 14.4697 20.0303C14.329 19.8897 14.25 19.6989 14.25 19.5Z'
																fill='#58667E'></path>
															<path
																d='M14.25 19.5V15C14.25 14.8011 14.171 14.6103 14.0303 14.4697C13.8897 14.329 13.6989 14.25 13.5 14.25H10.5C10.3011 14.25 10.1103 14.329 9.96967 14.4697C9.82902 14.6103 9.75 14.8011 9.75 15V19.5C9.75 19.6989 9.67098 19.8897 9.53033 20.0303C9.38968 20.171 9.19891 20.25 9 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V10.8281C3.75168 10.7243 3.77411 10.6219 3.81597 10.5269C3.85783 10.432 3.91828 10.3463 3.99375 10.275L11.4937 3.45939C11.632 3.33291 11.8126 3.26276 12 3.26276C12.1874 3.26276 12.368 3.33291 12.5062 3.45939L20.0062 10.275C20.0817 10.3463 20.1422 10.432 20.184 10.5269C20.2259 10.6219 20.2483 10.7243 20.25 10.8281V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H15C14.8011 20.25 14.6103 20.171 14.4697 20.0303C14.329 19.8897 14.25 19.6989 14.25 19.5Z'
																stroke='#58667E'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'></path>
														</svg>
													</div>
												</div>
												<div>
													<p className='DetailsTable_details_text_grey__nTKdr'>
														{t('EstatesOwned')}
													</p>
													<p className='DetailsTable_details_text_purple__SEzmS'>
														{propertiesWithTokens.length}
													</p>
												</div>
											</td>
										</tr>
										<tr className='DetailsTable_trSecond__x90LC'>
											<td className='DetailsTable_accountDetails__kPaIH DetailsTable_horizontalBorder__qV0WJ'>
												<div>
													<div className='DetailsTable_iconWrapper__id_GP'>
														<svg
															width='20'
															height='20'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															className='DetailsTable_iconsColor__9y9_w'>
															<rect width='20' height='20' fill='none'></rect>
															<path
																opacity='0.2'
																d='M9 11.25C13.1421 11.25 16.5 9.73896 16.5 7.875C16.5 6.01104 13.1421 4.5 9 4.5C4.85786 4.5 1.5 6.01104 1.5 7.875C1.5 9.73896 4.85786 11.25 9 11.25Z'
																fill='#58667E'></path>
															<path
																opacity='0.2'
																d='M16.5 9.06561C19.9219 9.38436 22.5 10.7437 22.5 12.375C22.5 14.2406 19.1438 15.75 15 15.75C13.1625 15.75 11.475 15.45 10.1719 14.9625C13.7625 14.7094 16.5 13.3125 16.5 11.625V9.06561Z'
																fill='#58667E'></path>
															<path
																d='M9 11.25C13.1421 11.25 16.5 9.73896 16.5 7.875C16.5 6.01104 13.1421 4.5 9 4.5C4.85786 4.5 1.5 6.01104 1.5 7.875C1.5 9.73896 4.85786 11.25 9 11.25Z'
																stroke='#58667E'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'></path>
															<path
																d='M1.5 7.875V11.625C1.5 13.4906 4.85625 15 9 15C13.1438 15 16.5 13.4906 16.5 11.625V7.875'
																stroke='#58667E'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'></path>
															<path
																d='M6 10.9688V14.7188'
																stroke='#58667E'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'></path>
															<path
																d='M16.5 9.06561C19.9219 9.38436 22.5 10.7437 22.5 12.375C22.5 14.2406 19.1438 15.75 15 15.75C13.1625 15.75 11.475 15.45 10.1719 14.9625'
																stroke='#58667E'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'></path>
															<path
																d='M7.5 14.9344V16.125C7.5 17.9906 10.8562 19.5 15 19.5C19.1438 19.5 22.5 17.9906 22.5 16.125V12.375'
																stroke='#58667E'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'></path>
															<path
																d='M18 15.4688V19.2188'
																stroke='#58667E'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'></path>
															<path
																d='M12 10.9688V19.2188'
																stroke='#58667E'
																strokeWidth='2'
																strokeLinecap='round'
																strokeLinejoin='round'></path>
														</svg>
													</div>
												</div>
												<div>
													<p className='DetailsTable_details_text_grey__nTKdr'>
														{t('TotalUnits')}
													</p>
													<p className='DetailsTable_details_text_purple__SEzmS'>
														+ {totalTokens}
													</p>
												</div>
											</td>
											<td className='DetailsTable_accountDetails__kPaIH'>
												<div>
													<div className='DetailsTable_iconWrapper__id_GP DetailsTable_iconThemeHardcoded__NLY4H'>
														<svg
															width='17'
															height='14'
															viewBox='0 0 17 14'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'>
															<path
																d='M15.5312 12.0625H14.9688V0.8125C14.9688 0.663316 14.9095 0.520242 14.804 0.414753C14.6985 0.309263 14.5554 0.25 14.4062 0.25H10.4688C10.3196 0.25 10.1765 0.309263 10.071 0.414753C9.96551 0.520242 9.90625 0.663316 9.90625 0.8125V3.625H6.53125C6.38207 3.625 6.23899 3.68426 6.1335 3.78975C6.02801 3.89524 5.96875 4.03832 5.96875 4.1875V7H2.59375C2.44457 7 2.30149 7.05926 2.196 7.16475C2.09051 7.27024 2.03125 7.41332 2.03125 7.5625V12.0625H1.46875C1.31957 12.0625 1.17649 12.1218 1.071 12.2273C0.965513 12.3327 0.90625 12.4758 0.90625 12.625C0.90625 12.7742 0.965513 12.9173 1.071 13.0227C1.17649 13.1282 1.31957 13.1875 1.46875 13.1875H15.5312C15.6804 13.1875 15.8235 13.1282 15.929 13.0227C16.0345 12.9173 16.0938 12.7742 16.0938 12.625C16.0938 12.4758 16.0345 12.3327 15.929 12.2273C15.8235 12.1218 15.6804 12.0625 15.5312 12.0625ZM7.09375 4.75H9.90625V12.0625H7.09375V4.75ZM3.15625 8.125H5.96875V12.0625H3.15625V8.125Z'
																fill='#00B4CC'></path>
														</svg>
													</div>
												</div>
												<div>
													<p className='DetailsTable_details_text_grey__nTKdr'>
														{t('TotalEstatesValue')}
													</p>
													<p className='DetailsTable_details_text_purple__SEzmS'>
														${totalSpent.toLocaleString()}
													</p>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className='flex flex-col mt-3 w-full'>
							<div className='md:p-5 border flex flex-col border-color--border rounded-b-xl'>
								<p className='styles_headerTitle__6d1cy ml-5 mt-3'>
									{t('OrderHistory')}
								</p>
								<div className='md: px-7 flex justify-between'>
									<p>ID</p>
									<div className='flex'>
										<p className='mr-9'>{t('Unit')}</p>
										<p>{t('Total')}</p>
									</div>
								</div>
								{getUserPurchases(user.id).map(p => (
									<div className='flex flex-col bg-color--secondary-bg md:px-5 px-1 py-1 justify-center m-3 rounded'>
										<div className='flex flex-row  justify-between text-white'>
											<div className='flex flex-col mr-2'>
												<p>{p.id}</p>
											</div>{' '}
											<div className='flex flex-col '>
												<p className='md:px-4 px-2'> {p.tokens}</p>
											</div>
											<p>{`${p.totalCost.toLocaleString()}$`}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='mt-5 md:mt-0 w-full'>
						<div className={s.headerWrapper}>
							<div className='text-xl text-white font-bold mb-4'>
								{t('YourEstates')}
							</div>
						</div>
						<div>
							{propertiesWithTokens.map(property => (
								<div className='mb-5'>
									<MainVillaComponent property={property} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
