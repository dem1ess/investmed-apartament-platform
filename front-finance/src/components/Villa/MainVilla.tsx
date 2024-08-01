import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IProperty } from '../../models/IProperty.ts'

interface Iprops {
	property: IProperty
}
export function MainVillaComponent({ property }: Iprops) {
	const { t } = useTranslation()
	const purchasedTokens = property.tokens - property.availableTokens
	const percentagePurchased = (purchasedTokens / property.tokens) * 100

	return (
		<Link
			to={`asset/${property.id}`}
			className='flex md:flex-row flex-col border border-color--border bg-color--primary-bg rounded-xl p-5'>
			<div className='pr-0 md:pr-10 w-full md:w-1/2'>
				<div
					style={{ backgroundImage: `url(/villas/${property.photoUrls[0]})` }}
					className='bg-cover bg-center h-[348px] rounded-xl'></div>
			</div>
			<div className='w-full md:w-1/2 mt-5'>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<p className='styles_addressLine__7Wf2L'>{property.name}</p>
						<p className='styles_city__pfuUW'>{property.mainLocation}</p>
					</div>
					<div
						className='styles_status__0gCRC'
						style={{ backgroundColor: '#e6f9e5', padding: '4px 16px' }}>
						<div
							className='styles_statusDot__xGtp_'
							style={{ backgroundColor: '#228d21' }}></div>
						<p
							style={{ color: '#228d21' }}
							className='styles_statusTitle__fz_3b'>
							Sale
						</p>
					</div>
				</div>
				<div className='flex justify-between pt-8'>
					<div>
						<p className='mb-4 text-xl'>{t('estatePrice')}</p>
						<p className='text-sky-400 pb-5 font-bold text-[37px]'>
							$ {property.price.toLocaleString()}
						</p>
					</div>
					<div>
						<p className='mb-4 text-xl'>{t('unitPrice')}</p>
						<p className='text-sky-400 font-bold text-[37px]'>
							$ {property.priceToken}
						</p>
					</div>
				</div>
				<div className='py-5 styles_bottomInfo__X25WU'>
					<div className='styles_tokenIrr__Gu31I'>
						<div className='flex justify-start'>
							<p className='pb-3'>ROI</p>
						</div>
						<p className='styles_bottomValue__A3PzE'>{property.roi}%</p>
					</div>

					<div className='styles_tokenRentStart__BovuN'>
						<div className='flex justify-start'>
							<p className='pb-3'>{t('RentPerYear')}</p>
						</div>
						<p className='styles_bottomValue__A3PzE styles_rentStartDate__7eaEr'>
							$ {property.rentPerYear.toLocaleString()}
						</p>
					</div>
				</div>
				<div className='mt-2 md:mt-[32px]'>
					<div className='styles_progressBar__Xp6qx'>
						<div className='styles_fillerWrapper__5cKm8'>
							<div
								className='styles_filler__fITGx'
								style={{ width: `${percentagePurchased}%` }}>
								<span className='styles_collectedText__p6_dr'>
									{t('collected')} :
								</span>
							</div>
							<div className='styles_collected__ZFp3q'>{t('collected')} :</div>
							<div className='styles_progress__YVFzC'>
								{percentagePurchased.toFixed(2)}%
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
