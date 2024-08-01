import axios from 'axios'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoArrowBack } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { instance } from '../../api/axios.ts'
import { useAppSelector } from '../../hooks/redux.ts'
import { IUser } from '../../models/IUser.ts'
import { setBankDetails } from '../../store/reducers/bankDetailsSlice.ts'
import { AppDispatch, RootState } from '../../store/store.ts'

export function WalletDeposit() {
	const user = useAppSelector(state => state.user.user) as IUser | null
	const [amount, setAmount] = useState('')
	const { t } = useTranslation()

	const dispatch: AppDispatch = useDispatch()
	const bankDetails = useSelector((state: RootState) => state.bankDetails)

	useEffect(() => {
		const fetchBankDetails = async () => {
			try {
				const response = await axios.get('/api/bank-details')
				dispatch(setBankDetails(response.data))
			} catch (error) {
				console.error('Error fetching bank details:', error)
			}
		}

		fetchBankDetails()
	}, [dispatch])

	if (!user || !user.wallet) {
		// Обработка случая, когда адрес кошелька не доступен
		return <div>{t('WalletAddressNotAvailable')}</div>
	}

	const cryptoAddress = user.wallet // Получаем адрес криптокошелька из редакса
	const qrValue = `usdt:${cryptoAddress}`

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
		toast.success('Address copied to clipboard!', {
			position: 'bottom-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!user) {
			console.error('User is not logged in')
			return
		}

		try {
			const response = await instance.post('/transactions', {
				userId: user.id,
				amount: parseFloat(amount),
			})

			// Получаем transactionId из ответа
			const transactionId = response.data.id

			// Очистите поле ввода после успешной отправки
			setAmount('')
		} catch (error) {
			console.error('Ошибка при создании транзакции:', error)
		}
	}

	return (
		<div className='DefaultLayout_contentChildren__UAU26 m0 md:m-5 pt-12 md:pt-16 flex justify-center w-full'>
			<div className='bg-color--primary-bg flex flex-col rounded-xl p-12 w-full max-w-4xl'>
				<Link to='/app/wallet'>
					<div className='flex items-center mb-6'>
						<IoArrowBack className='text-3xl text-sky-500' />
						<p className='text-sky-500 text-lg ml-2'>{t('BacktoWallet')}</p>
					</div>
				</Link>
				<h2 className='text-2xl text-stone-200 font-bold mb-6'>
					{t('DepositFunds')}
				</h2>
				<div className='flex flex-col md:flex-row justify-between gap-8 mb-8'>
					<div className='bg-gray-100 p-6 rounded-lg shadow-md mb-8 md:mb-0 md:w-1/2'>
						<h3 className='text-xl font-semibold mb-4'>{t('BankTransfer')}</h3>
						<p className='text-gray-700 mb-4'>{t('BankAccountDetails')}</p>
						<ul className='list-disc pl-5 space-y-2 text-gray-700'>
							<li>{t('AccountName')}: Your Bank Account Name</li>
							<li>{t('AccountNumber')}: 1234567890</li>
							<li>{t('RoutingNumber')}: 987654321</li>
							<li>{t('BankName')}: Your Bank Name</li>
							<li>{t('BankAddress')}: 123 Bank St, City, State, ZIP</li>
						</ul>
					</div>
					<div className='bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center md:w-1/2'>
						<h3 className='text-xl font-semibold mb-4'>{t('CryptoWallet')}</h3>
						<p className='text-gray-700 mb-4'>{t('CryptoWalletDetails')}</p>
						<div className='flex flex-col items-center'>
							<QRCode
								value={qrValue}
								size={128}
								className='cursor-pointer mb-4'
								onClick={() => copyToClipboard(cryptoAddress)}
							/>
							<p
								className='text-gray-700 mb-2 cursor-pointer'
								onClick={() => copyToClipboard(cryptoAddress)}>
								{cryptoAddress}
							</p>
						</div>
					</div>
				</div>
				<p className='text-lg mb-3'>{t('Enteramount')} USD</p>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<input
							type='number'
							value={amount}
							onChange={e => setAmount(e.target.value)}
							className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 text-lg'
							placeholder={t('AmountInUSD')}
						/>
						{(parseFloat(amount) < 10 || parseFloat(amount) > 500000) && (
							<p className='text-red-500 text-sm mt-1'>{t('alertWallet')}</p>
						)}
					</div>
					<div className='flex justify-center'>
						<button
							type='submit'
							className='bg-sky-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-500 transition duration-200'>
							{t('Continue')}
						</button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</div>
	)
}
