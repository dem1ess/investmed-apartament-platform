import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsDownload, BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { LuHome, LuKeySquare, LuWaves } from 'react-icons/lu'
import { TbBrandBooking } from 'react-icons/tb'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { instance } from '../api/axios.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { IProperty } from '../models/IProperty.ts'
import i18n from '../service/i18n.ts'
import { checkAuth, fetchProperty } from '../store/reducers/ActionsCreator.ts'

export const AssetPage: FC = () => {
	const [inputValue, setInputValue] = useState<number>()
	const dispatch = useAppDispatch()
	const { id } = useParams<{ id: string }>() // Ensure the id is a string
	const properties = useAppSelector(state => state.property.property)
	const { t } = useTranslation()

	// Find the property by id
	const property = properties?.find((item: IProperty) => item.id === id)

	const user = useAppSelector(state => state.user.user)

	const createPurchase = async (tokens: number) => {
		try {
			const data = {
				propertyId: id,
				buyerId: user!.id,
				tokens: tokens,
			}

			await instance.post(`/purchase`, data)
			// If you need to do something after the request, you can put it here
			checkAuth()
			toast.success(`You buy ${tokens} pieces`)
		} catch (error) {
			console.error('Error creating purchase:', error)
			toast.error('Error creating purchase. Please try again.')
		}
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		if (
			!isNaN(value) &&
			value >= 0 &&
			value <= property!.availableTokens &&
			value <= user!.balance / property!.priceToken
		) {
			setInputValue(value)
		}
	}

	const handleMaxButtonClick = () => {
		const maxTokens = Math.min(
			property!.availableTokens,
			Math.floor(user!.balance / property!.priceToken)
		)
		setInputValue(maxTokens)
	}

	useEffect(() => {
		dispatch(fetchProperty())
		console.log(property)
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const propertyDescription = t(property?.description || '')

	interface LastDocumentUrls {
		en: string
		pl: string
		it: string
		de: string
		// Добавьте URL-адреса для других языков по мере необходимости
	}

	interface LastDocumentUrls {
		[language: string]: string
	}

	interface LastDocumentUrlsByVilla {
		[villaId: string]: LastDocumentUrls
	}

	const lastDocumentUrlsByVillaAndLanguage: LastDocumentUrlsByVilla = {
		cltzu9duu000bdzkdbip9w5yz: {
			en: 'https://tld-bali.com/villas/LYVIN_BINGIN_VILLA/Villa Lyvin Bingin Investment Contract.pdf',
			pl: 'https://tld-bali.com/villas/LYVIN_BINGIN_VILLA/Umowa inwestycyjna LYVIN BINGIN VILLAS.pdf',
			it: 'https://tld-bali.com/villas/LYVIN_BINGIN_VILLA/Contratto Di Investimento Villa Lyvin Bingin.pdf',
			de: 'https://tld-bali.com/villas/LYVIN_BINGIN_VILLA/Villa Lyvin Bingin Investitionsvertrag.pdf',
			// Добавьте URL-адреса для других языков по мере необходимости
		},
		cltzua8ic000cdzkdtbdnml68: {
			en: 'https://tld-bali.com/villas/LOFT_VILLA/Loft Villa Investment Contract.pdf',
			pl: 'https://tld-bali.com/villas/LOFT_VILLA/Umowa inwestycyjna LOFT VILLA.pdf',
			it: 'https://tld-bali.com/villas/LOFT_VILLA/Contratto Di Investimento Loft Villa.pdf',
			de: 'https://tld-bali.com/villas/LOFT_VILLA/Loft Villa  Investitionsvertrag.pdf',
			// Добавьте URL-адреса для других языков по мере необходимости
		},
		cltzu7efb000adzkd27mvfmaf: {
			en: 'https://tld-bali.com/villas/RED_SUNSET_VILLA/Villa Red Sunset Investment Contract.pdf',
			pl: 'https://tld-bali.com/villas/RED_SUNSET_VILLA/Umowa inwestycyjna Villa Red Sunset.pdf',
			it: 'https://tld-bali.com/villas/RED_SUNSET_VILLA/Contratto Di Investimento Villa Red Sunset.pdf',
			de: 'https://tld-bali.com/villas/RED_SUNSET_VILLA/Villa Red Sunset Investitionsvertrag.pdf',
			// Добавьте URL-адреса для других языков по мере необходимости
		},
		cltzu6mgd0009dzkdjg5iu0s1: {
			en: 'https://tld-bali.com/villas/BALIWOOD/Baliwood Villa Investment Contract.pdf',
			pl: 'https://tld-bali.com/villas/BALIWOOD/Umowa inwestycyjna Baliwood Villa.pdf',
			it: 'https://tld-bali.com/villas/BALIWOOD/Contratto Di Investimento Baliwood Villa.pdf',
			de: 'https://tld-bali.com/villas/BALIWOOD/Baliwood Villa Investitionsvertrag.pdf',
			// Добавьте URL-адреса для других языков по мере необходимости
		},
		cltzu616x0008dzkdh7be2hiz: {
			en: 'https://tld-bali.com/villas/VILLA_MILA/Villa Mila Investment Contract.pdf',
			pl: 'https://tld-bali.com/villas/VILLA_MILA/Umowa inwestycyjna Villa MILA.pdf',
			it: 'https://tld-bali.com/villas/VILLA_MILA/Contratto Di Investimento Villa Mila.pdf',
			de: 'https://tld-bali.com/villas/VILLA_MILA/Villa Mila Investitionsvertrag.pdf',
			// Добавьте URL-адреса для других языков по мере необходимости
		},
		// Добавьте сочетания id и последнего документа для других вилл по мере необходимости
	}

	// Получаем имя виллы для текущей
	const villaName = property?.id || 'cltzu616x0008dzkdh7be2hiz' // Если имя виллы не определено, используем 'defaultVilla'
	const currentLanguage = i18n.language
	// Получаем URL-адрес для последнего документа в зависимости от текущего языка и имени виллы
	const lastDocumentUrl =
		lastDocumentUrlsByVillaAndLanguage[villaName]?.[currentLanguage] || ''

	const decodedLastDocumentUrl = lastDocumentUrl
		? decodeURIComponent(lastDocumentUrl).replace(/ /g, '%20')
		: ''
	const fileName = lastDocumentUrl?.substring(
		lastDocumentUrl.lastIndexOf('/') + 1,
		lastDocumentUrl.lastIndexOf('.pdf')
	)

	const purchasedTokens = property
		? property.tokens - (property.availableTokens || 0)
		: 0
	const percentagePurchased = property
		? (purchasedTokens / (property.tokens || 1)) * 100
		: 0

	return (
		<div className='md:ml-[20px] ml-0 mt-5 md:mt-0 flex flex-col-reverse md:flex-row'>
			{property ? (
				<>
					<div className='w-full md:w-2/3 flex flex-col rounded-xl bg-color--primary-bg min-h-0 overflow-hidden p-5'>
						<p className='text-2xl text-22-bold-140'>{property.name}</p>
						<div className='flex mt-3'>
							<div className='rounded-xl inline-block bg-green-200 px-1 border-green-600 border-[1px]'>
								<p className='text-sm text-green-600'>On sale</p>
							</div>

							<div className='ml-2 rounded-xl flex bg-green-200 h-6 px-2 border-green-600 border-[1px]'>
								<LuKeySquare className='w-3 text-green-600' />
								<p className='text-sm ml-1 text-green-600'>Rented</p>
							</div>
						</div>
						<div className='w-full flex flex-col md:flex-row mt-3 h-auto rounded-xl'>
							<div className='w-full md:w-4/5 mr-3 mb-2 md:mb-0 items-center justify-center'>
								<img
									src={`/villas/${property.photoUrls[0]}`}
									className='object-cover h-auto md:h-[548px] md:max-h-full rounded-xl'
									alt=''
								/>
							</div>
							<div className='flex w-full md:w-1/5 flex-col md:h-[548px]'>
								<img
									src={`/villas/${property.photoUrls[1]}`}
									alt='Small Image 1'
									className='mb-2 h-auto md:h-[130px] object-cover rounded-xl'
								/>
								<img
									src={`/villas/${property.photoUrls[2]}`}
									alt='Small Image 2'
									className='mb-2 h-auto md:h-[130px] object-cover rounded-xl'
								/>
								<img
									src={`/villas/${property.photoUrls[3]}`}
									alt='Small Image 2'
									className='mb-2 h-auto md:h-[130px] object-cover rounded-xl'
								/>
								<img
									src={`/villas/${property.photoUrls[4]}`}
									alt='Small Image 3'
									className='object-cover h-auto md:h-[130px] rounded-xl'
								/>
							</div>
						</div>

						<h4 className='mt-7 text-white'>{t('details')}</h4>
						<div className='flex mt-3 flex-col md:flex-row justify-around'>
							<div className='bg-color--secondary-bg border border-color--border flex flex-col items-center justify-center my-2 md:my-0 rounded-xl px-16 py-2'>
								<svg
									width='18'
									className='mb-2'
									height='19'
									viewBox='0 0 24 25'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M20.5359 2.20001H3.46392C2.39249 2.20001 1.52393 3.06858 1.52393 4.14001V21.212C1.52393 22.2834 2.39249 23.152 3.46392 23.152H20.5359C21.6074 23.152 22.4759 22.2834 22.4759 21.212V4.14001C22.4759 3.06858 21.6074 2.20001 20.5359 2.20001Z'
										stroke='#00B4CC'
										strokeWidth='2.425'></path>
									<path
										d='M11 10V13.2C11 13.6418 10.6337 14 10.1818 14H2'
										stroke='#00B4CC'
										strokeWidth='2.425'></path>
									<path
										d='M11 3V7.656'
										stroke='#00B4CC'
										strokeWidth='2.425'></path>
									<path
										d='M16 2C16 5.42858 18.7794 8.208 22.208 8.208'
										stroke='#00B4CC'
										strokeWidth='2.425'></path>
									<path
										d='M22.536 15H14.7761C14.3475 15 14 15.3474 14 15.776V23.536'
										stroke='#00B4CC'
										strokeWidth='2.425'></path>
								</svg>
								<p>{property.landArea} ㎡</p>
							</div>
							<div className='bg-color--secondary-bg border border-color--border flex flex-col items-center my-2 md:my-0 justify-center rounded-xl px-16 py-2'>
								<LuHome className='text-2xl text-[#00B4CC] mb-2' />
								<p>{property.houseArea} ㎡</p>
							</div>
							<div className='bg-color--secondary-bg border border-color--border flex flex-col items-center my-2 md:my-0 justify-center rounded-xl px-16 py-2'>
								<LuWaves className='text-2xl text-[#00B4CC] mb-2' />
								<p>{property.distanceToSea}</p>
							</div>
						</div>
						<div>
							<p className='text-gray-300 text-xl my-5'>{t('aboutProperty')}</p>
							<p dangerouslySetInnerHTML={{ __html: propertyDescription }} />
						</div>
						<div className='mt-5'>
							<iframe
								width='100%'
								height='554'
								src={property.videoUrl}
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
								title='Embedded youtube'
							/>
						</div>
						<h4 className='my-7 text-gray-200'>{t('documents')}</h4>
						<div className='flex flex-col'>
							{property.documentUrls.slice(0, -1).map((doc, index) => {
								const decodedLastDocumentUrl = doc
									? decodeURIComponent(doc).replace(/ /g, '%20')
									: ''
								const fileName = doc.substring(
									doc.lastIndexOf('/') + 1,
									doc.lastIndexOf('.pdf')
								)
								return (
									<a
										href={decodedLastDocumentUrl}
										key={index}
										className='flex mb-3 bg-color--border rounded-xl transition-colors duration-300 ease-in-out cursor-pointer hover:text-sky-500 px-4 text-lg py-5 items-center justify-between'
										download>
										<BsFillFileEarmarkPdfFill className='text-2xl cursor-pointer' />{' '}
										{fileName}{' '}
										<BsDownload className='text-2xl cursor-pointer' />
									</a>
								)
							})}
						</div>
						<h4 className='my-7 text-white'>{t('financials')}</h4>
						<div className='ml-5 flex-col flex'>
							<div className='flex justify-between mb-5'>
								<p className='text-white text-lg'>
									{t('totalInvestmentValue')}
								</p>
								<p className='text-white text-lg'>
									${property.price.toLocaleString()}
								</p>
							</div>
							<div className='flex justify-between mb-3'>
								<p className='text-gray-200'>{t('legalFees')} (1.35%)</p>
								<p className='text-gray-200'>
									${property.legalFees.toLocaleString()}
								</p>
							</div>
							<hr />
							<div className='flex justify-between my-4'>
								<p className='text-white text-lg'>{t('basePrice')}</p>
								<p className='text-white text-lg'>
									${(property.price - property.legalFees).toLocaleString()}
								</p>
							</div>
							<div className='flex justify-between mb-5'>
								<p className='text-gray-200'>ROI</p>
								<p className='text-gray-200'>{property.roi}%</p>
							</div>
							<div className='flex justify-between mb-3'>
								<p className='text-gray-200'>{t('rentPerYear')}</p>
								<p className='text-gray-200'>
									${property.rentPerYear.toLocaleString()}
								</p>
							</div>
							<div className='flex justify-between mb-3'>
								<p className='text-white text-lg'>
									{t('facilityManagement')} (30%)
								</p>
								<p className='text-white text-lg'>
									${property.facilityManagement.toLocaleString()}
								</p>
							</div>
							<p className='text-xs'>{t('approximateValues')}</p>
						</div>
						<h4 className='my-7 text-white'>{t('contractToSign')}</h4>
						<a
							href={decodedLastDocumentUrl}
							className='flex mb-3 transition-colors duration-300 ease-in-out cursor-pointer hover:text-sky-500 bg-color--border rounded-xl px-4 text-lg py-5 items-center justify-between'
							download>
							<BsFillFileEarmarkPdfFill className='text-2xl cursor-pointer transition-colors duration-300 ease-in-out hover:text-sky-600' />{' '}
							{fileName}{' '}
							<BsDownload className='text-2xl cursor-pointer transition-colors duration-300 ease-in-out hover:text-sky-600' />
						</a>
						<h4 className='mt-7 mb-3 text-white'>{t('location')}</h4>
						<a
							href='#'
							className='font-bold cursor-pointer pl-5 pb-2 text-white transition-colors duration-300 ease-in-out hover:text-sky-600'>
							{property.mainLocation}
						</a>
						<div>
							<iframe
								className='w-full mt-3 min-h-[400px] h-auto'
								loading='lazy'
								allowFullScreen
								referrerPolicy='no-referrer-when-downgrade'
								src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD90dblmkKeJB699g-Iggzm4TCzr1QlGdg
								&q=${property.location1},${property.location2}`}></iframe>
						</div>
						<div className='w-full flex justify-between items-center rounded-xl bg-color--secondary-bg mt-7 py-8 px-4'>
							<div>
								<h4 className='text-white'>{t('moreQuestions')}</h4>
							</div>
							<a
								href={t('callUser')}
								className='rounded-xl flex items-center p-4 justify-center bg-green-600 border-[1px] border-green-800 cursor-pointer'>
								<IoLogoWhatsapp className='text-green-200 text-2xl' />
								<p className='text-green-200 mx-3'>{t('callUs')}</p>
							</a>
						</div>
					</div>
					<div className='flex h-1/2 flex-col md:mr-3 md:w-1/3'>
						<div className='ml-0 md:ml-[10px] my-5 md:my-0 h-1/2 bg-color--primary-bg rounded-xl w-full '>
							<div className='bg-color--secondary-bg p-5 items-center flex rounded-t-xl justify-between'>
								<div className='py-5'>
									<p className='pb-4'>{t('estatePrice')}</p>
									<p className='text-sky-500 font-bold text-[37px]'>
										${property.price.toLocaleString()}
									</p>
								</div>
								<div>
									<p className='text-gray-500 pt-8 text-3xl'>
										ROI: <span className='text-sky-500'>{property.roi}%</span>
									</p>
								</div>
							</div>
							<div className='p-5'>
								<div className='flex text-sm items-center justify-between'>
									<p>
										{t('unitPrice')}:{' '}
										<span className='text-sky-500 text-lg font-bold'>
											${property.priceToken}
										</span>
									</p>
									<p>
										{t('collected')}:{' '}
										<span className='font-bold'>
											{percentagePurchased.toFixed(2)}%
										</span>
									</p>
								</div>
								<div className='mt-4'>
									<div className='styles_progressBar__Xp6qx'>
										<div className='styles_fillerWrapper__5cKm8'>
											<div
												className='styles_filler__fITGx'
												style={{ width: `${percentagePurchased.toFixed(2)}%` }}>
												<span className='styles_collectedText__p6_dr'>
													{t('collected')} :
												</span>
											</div>
											<div className='styles_collected__ZFp3q'>
												{t('collected')} :
											</div>
											<div className='styles_progress__YVFzC'>
												{percentagePurchased.toFixed(2)}%
											</div>
										</div>
									</div>
								</div>
								<div className='flex mt-4 justify-between'>
									<p>{t('buyAmount')}</p>
									{user ? (
										<p>
											{t('yourBalance')}: {user.balance.toLocaleString()} $
										</p>
									) : (
										<p>{t('yourBalance')}: 0</p>
									)}
								</div>
								<div className='flex items-center mt-2 bg-gray-200 border rounded-xl p-1'>
									<input
										type='number'
										max={property.availableTokens}
										value={inputValue}
										onChange={handleInputChange}
										className='w-full p-2 hover:none bg-gray-200 text-gray-600 font-bold text-lg rounded-l-md focus:outline-none '
									/>
									<button
										onClick={handleMaxButtonClick}
										className='px-4 py-2 text-sky-400 font-bold focus:outline-none'>
										MAX
									</button>
								</div>
								{user ? (
									<button
										onClick={() => createPurchase(inputValue!)}
										className='bg-sky-400 w-full h-12 rounded-xl font-bold text-white mt-4'>
										{t('buyUnits')}
									</button>
								) : (
									<button
										onClick={() =>
											toast.error(
												'In order to make a purchase you need to log in. '
											)
										}
										type='submit'
										className='bg-sky-400 disabled:bg-gray-400 w-full h-12 rounded-xl font-bold text-white mt-4'>
										{t('buyUnits')}
									</button>
								)}
								<Link to={property.bookingLink}>
									<div className='bg-blue-600 disabled:bg-gray-400 w-full flex justify-center items-center h-12 rounded-xl font-bold text-white mt-4'>
										<TbBrandBooking className='text-3xl' />
										<p>Booking</p>
									</div>
								</Link>
							</div>
						</div>
					</div>

					<ToastContainer />
				</>
			) : (
				<p>Loading</p>
			)}
		</div>
	)
}
