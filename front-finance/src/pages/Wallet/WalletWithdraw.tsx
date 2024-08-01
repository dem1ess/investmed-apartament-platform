import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { instance } from '../../api/axios.ts'
import { useAppSelector } from '../../hooks/redux.ts'
import { IUser } from '../../models/IUser.ts'

export function WalletWithdraw() {
	const user = useAppSelector(state => state.user.user) as IUser | null
	const [amount, setAmount] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [iban, setIban] = useState('')
	const [bicCode, setBicCode] = useState('')
	const [country, setCountry] = useState('')
	const [address, setAddress] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [currency, setCurrency] = useState('USD') // Default to USD

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			if (user) {
				console.log(user.id, amount)
				// Создаем транзакцию
				await instance.post('/transactions', {
					userId: user.id,
					amount: parseFloat(amount),
				})
				toast(t('transfer'))
			} else {
				console.error('User is not logged in')
			}
		} catch (error) {
			console.error('Ошибка при создании транзакции:', error)
		}
	}

	const { t } = useTranslation()

	return (
		<div className='min-h-screen py-6 flex flex-col justify-center sm:py-12'>
			<div className='relative py-3 sm:max-w-xl sm:mx-auto'>
				<div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
				<div className='relative px-4 py-10 bg-color--primary-bg border-color--border border shadow-lg sm:rounded-3xl sm:p-20'>
					<Link to='/app/wallet' className='flex items-center mb-4'>
						<IoArrowBack className='text-3xl text-sky-500' />
						<p className='text-sky-500 text-lg'>{t('BacktoWallet')}</p>
					</Link>
					<p className='text-2xl text-white font-semibold text-center mb-6'>
						{t('Enteramount')}
					</p>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<input
							type='number'
							value={amount}
							onChange={e => setAmount(e.target.value)}
							placeholder={t('vAmmount')}
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							placeholder={t('vFirst')}
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							placeholder={t('vLast')}
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							value={iban}
							onChange={e => setIban(e.target.value)}
							placeholder='IBAN'
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							value={bicCode}
							onChange={e => setBicCode(e.target.value)}
							placeholder='BIC Code'
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							value={country}
							onChange={e => setCountry(e.target.value)}
							placeholder={t('vCountry')}
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							value={address}
							onChange={e => setAddress(e.target.value)}
							placeholder={t('vAddress')}
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='text'
							value={postalCode}
							onChange={e => setPostalCode(e.target.value)}
							placeholder={t('vPostalCode')}
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<select
							value={currency}
							onChange={e => setCurrency(e.target.value)}
							className='w-full p-2 bg-gray-200 text-gray-600 font-bold text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
							<option value='USD'>USD</option>
							<option value='EUR'>EUR</option>
						</select>
						<div className='mt-10 flex justify-center'>
							<button
								type='submit'
								className='bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500'>
								{t('Continue')}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
