import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsSendFill } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify' // Импортируем ToastContainer для
import { instance } from '../../api/axios.ts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts'
import { ITransaction } from '../../models/ITransaction.ts'
import { fetchUserTransactions } from '../../store/reducers/ActionsCreator.ts'
import UnauthorizedPage from '../Unauthorized/UnauthorizedPage.tsx'

export function Withdraw() {
	const dispatch = useAppDispatch()
	const [transactions, setTransactions] = useState<ITransaction[]>([])
	const user = useAppSelector(state => state.user.user)
	const { t } = useTranslation()

	const fetchTransactions = async () => {
		try {
			const response = await instance.get('/transactions')
			setTransactions(response.data)
		} catch (error) {
			console.error('Error fetching transactions:', error)
			toast.error('Ошибка при загрузке транзакций')
		}
	}

	const getUserTransactions = (userId: string) => {
		return transactions.filter(transaction => transaction.userId === userId)
	}

	useEffect(() => {
		if (user) {
			fetchTransactions()
			dispatch(fetchUserTransactions(user.id))
		}
	}, [user]) // Запускаем загрузку транзакций только при изменении пользователя

	if (!user) {
		return <UnauthorizedPage /> // Если пользователь не существует, отрендерить UnauthorizedPage
	}
	return (
		<div className='DefaultLayout_contentChildren__UAU26 pt-12 md:pt-16 flex justify-center w-full'>
			<div className='styles_root__1igZZ flex justify-center items-center flex-col w-full'>
				<div className='styles_wallet__mbi07 md:w-1/2 border-color--border border'>
					<div className='styles_walletActions__pCmZM'>
						<div>
							<p className='styles_totalBalanceHeader__sUjSj'>
								{t('Overallbalance')}
							</p>
							<p className='styles_totalBalanceValue__KVoKa text-white'>
								{user ? <span>{user.balance}</span> : <span>--</span>}
								<span> USD</span>
							</p>
						</div>
						<div className='flex justify-center items-center'>
							<Link to='withdraw'>
								<div className='styles_walletButtonWrapper__5Q3zx  styles_walletActionButton__OMw2H'>
									<button className='styles_walletButton__PDVQb btn-gradient Button_root__0ygym'>
										<BsSendFill />
									</button>
									<p className='text-center'>{t('Withdraw')}</p>
								</div>
							</Link>

							<Link to='deposit'>
								<div className='styles_walletButtonWrapper__5Q3zx'>
									<button className='styles_walletButton__PDVQb bg-sky-400 Button_root__0ygym'>
										<IoMdAdd className='text-3xl' />
									</button>
									<p>{t('Deposit')}</p>
								</div>
							</Link>
						</div>
					</div>
					<div className='styles_balancesWrapper__BIGba'>
						<div className='flex justify-between mx-5'>
							<p>{t('TransactionHistory')}</p>
							<p className='pr-0 md:pr-6'>{t('Status')}</p>
							<p>{t('Amount')}</p>
						</div>
						<div className='styles_balances__0nTGG'>
							{getUserTransactions(user.id).map(transaction => (
								<>
									<div
										key={transaction.id}
										className='styles_root__6W9Qt styles_tokenBalance__QuKRC'>
										<div className='styles_container__ljKHI'>
											<p className='styles_upperText__JgZ7V'>
												{transaction.id}
											</p>
											<div className='styles_tooltip__JZjY4'>
												<div className='Tooltip_detailsIcon__0Np2G Tooltip_tooltip__m_96l'></div>
											</div>
										</div>
										<div className='pr-8 md:pr-14'>
											<p className='styles_upperText__JgZ7V'>
												{transaction.transactionStatus}
											</p>
										</div>
										<div>
											<p className='styles_upperText__JgZ7V'>
												{transaction.amount}
											</p>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
				</div>
			</div>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	)
}
