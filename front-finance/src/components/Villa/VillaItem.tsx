import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IProperty } from '../../models/IProperty.ts'

interface IProps {
	property: IProperty
	class1: string
}
export function VillaItem({ property, class1 }: IProps) {
	const { t } = useTranslation()
	const purchasedTokens = property.tokens - property.availableTokens
	const percentagePurchased = (purchasedTokens / property.tokens) * 100
	return (
		<div
			className={`flex w-full mb-5 md:m-0 md:${class1} bg-color--primary-bg flex-col border border-color--border rounded-xl p-5`}>
			<Link to={`asset/${property.id}`}>
				<div className='w-full'>
					<div
						style={{ backgroundImage: `url(villas/${property.photoUrls[0]})` }}
						className='bg-cover bg-center h-[348px] rounded-xl'></div>
				</div>
				<div className='w-full mt-5'>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<p className=' text-[18px] md:text-[24px] font-bold'>
								{property.name}
							</p>
							<p className='text-[#808a9d] pb-4 md:py-5'>
								{property.mainLocation}
							</p>
						</div>
						<div
							className='styles_status__0gCRC'
							style={{ backgroundColor: '#e6f9e5', padding: '4px 16px' }}>
							<div
								className='styles_statusDot__xGtp_'
								style={{ backgroundColor: '#228d21' }}></div>
							<p style={{ color: '#228d21' }}>Sale</p>
						</div>
					</div>
					<div className='flex justify-between pt-4 md:pt-8'>
						<div>
							<p className='mb-4 text-xl'>{t('estatePrice')}</p>
							<p className='text-sky-400 0 py-5 font-bold text-[37px]'>
								$ {property.price.toLocaleString()}
							</p>
						</div>
						<div>
							<p className='mb-4 text-xl'>{t('unitPrice')}</p>
							<p className='text-sky-400 py-5 font-bold text-[37px]'>
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
								<div className='styles_collected__ZFp3q'>
									{t('collected')} :
								</div>
								<div className='styles_progress__YVFzC'>
									{percentagePurchased.toFixed(2)}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}
