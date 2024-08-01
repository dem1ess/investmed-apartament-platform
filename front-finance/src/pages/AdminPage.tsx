import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify' // Импортируем ToastContainer для использования в компоненте
import { instance } from '../api/axios'
import { useAppSelector } from '../hooks/redux'
import { ITransaction } from '../models/ITransaction'
import { IUser } from '../models/IUser'

export function AdminPage() {
	const user = useAppSelector(state => state.user.user) as IUser | null
	const [users, setUsers] = useState<IUser[]>([])
	const [transactions, setTransactions] = useState<ITransaction[]>([])
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
	const [showModal, setShowModal] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		if (user && user.role === 'ADMIN') {
			fetchUsers()
			fetchTransactions()
		}
	}, [user])

	const fetchUsers = async () => {
		try {
			const response = await instance.get('/user')
			setUsers(response.data)
		} catch (error) {
			console.error('Error fetching users:', error)
			toast.error('Ошибка при загрузке пользователей')
		}
	}

	const fetchTransactions = async () => {
		try {
			const response = await instance.get('/transactions')
			setTransactions(response.data)
		} catch (error) {
			console.error('Error fetching transactions:', error)
			toast.error('Ошибка при загрузке транзакций')
		}
	}

	const toggleVerification = async (userId: string, isVerif: boolean) => {
		try {
			await instance.put(`/user/${userId}/verify`, { isVerif: !isVerif })
			fetchUsers()
			toast.success(
				isVerif ? 'Пользователь был отменен' : 'Пользователь был подтвержден'
			)
		} catch (error) {
			console.error('Error toggling verification:', error)
			toast.error('Ошибка при изменении статуса подтверждения')
		}
	}

	const updateTransactionStatus = async (
		transactionId: string,
		transactionStatus: string
	) => {
		try {
			await instance.patch('/transactions/update', {
				transactionId,
				transactionStatus,
			})
			fetchTransactions()
			toast.success('Статус транзакции обновлен')
		} catch (error) {
			console.error('Error updating transaction status:', error)
			toast.error('Ошибка при обновлении статуса транзакции')
		}
	}

	const handleEditUser = (user: IUser) => {
		setSelectedUser(user)
		setShowModal(true)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		if (selectedUser) {
			setSelectedUser({ ...selectedUser, [name]: value })
		}
	}

	const handleSubmit = async () => {
		try {
			if (selectedUser) {
				await instance.put(`/user/${selectedUser.id}`, selectedUser)
				fetchUsers()
				setShowModal(false)
				toast.success('Пользователь обновлен')
			}
		} catch (error) {
			console.error('Error updating user:', error)
			toast.error('Ошибка при обновлении пользователя')
		}
	}

	const getUserTransactions = (userId: string) => {
		return transactions.filter(transaction => transaction.userId === userId)
	}

	const filteredUsers = users.filter(user =>
		user.email.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='m-0 pt-12 md:pt-16 flex justify-center w-full'>
			{user && user.role === 'ADMIN' ? (
				<div className='w-full max-w-7xl bg-gray-900 p-8 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-bold mb-6 text-white'>Admin Page</h2>
					<div className='mb-6'>
						<input
							type='text'
							placeholder='Search by email...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full p-3 border border-gray-700 rounded bg-gray-800 text-white'
						/>
					</div>
					<div className='flex flex-col'>
						{filteredUsers
							.sort(
								(a, b) =>
									new Date(b.createdAt).getTime() -
									new Date(a.createdAt).getTime()
							)
							.map(user => (
								<div
									key={user.id}
									className='border border-gray-700 p-6 mb-4 rounded bg-gray-800'>
									<div className='flex justify-between items-center'>
										<div>
											<p className='text-white font-semibold'>ID: {user.id}</p>
											<p className='text-white'>Email: {user.email}</p>
											<p className='text-white'>Balance: {user.balance}</p>
											<p className='text-white'>Wallet: {user.wallet}</p>
										</div>
										<div className='flex'>
											<button
												onClick={() =>
													toggleVerification(user.id, user.isVerif)
												}
												className={`px-4 py-2 rounded ${
													user.isVerif
														? 'bg-red-600 text-white'
														: 'bg-green-600 text-white'
												}`}>
												{user.isVerif ? 'Unverify' : 'Verify'}
											</button>
											<button
												onClick={() => handleEditUser(user)}
												className='ml-2 px-4 py-2 rounded bg-blue-600 text-white'>
												Edit
											</button>
										</div>
									</div>
									<div className='mt-4'>
										<h3 className='text-lg font-bold text-white'>
											Transactions:
										</h3>
										{getUserTransactions(user.id).map(transaction => (
											<div
												key={transaction.id}
												className='border border-gray-600 p-4 mb-2 rounded bg-gray-700'>
												<p className='text-white'>
													ID: {transaction.id} | Amount: {transaction.amount} |
													Status: {transaction.transactionStatus}
												</p>
												<button
													onClick={() =>
														updateTransactionStatus(
															transaction.id,
															transaction.transactionStatus === 'COMPLETE'
																? 'CANCELLED'
																: 'COMPLETE'
														)
													}
													className={`mt-2 px-4 py-2 rounded ${
														transaction.transactionStatus === 'COMPLETE'
															? 'bg-red-600 text-white'
															: 'bg-green-600 text-white'
													}`}>
													{transaction.transactionStatus === 'COMPLETE'
														? 'Cancel'
														: 'Complete'}
												</button>
											</div>
										))}
									</div>
								</div>
							))}
					</div>

					{showModal && selectedUser && (
						<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
							<div className='bg-white p-8 rounded shadow-lg w-1/3'>
								<h2 className='text-xl mb-4'>Edit User</h2>
								<div className='mb-4'>
									<label className='block text-gray-700'>Email</label>
									<input
										type='email'
										name='email'
										value={selectedUser.email}
										onChange={handleChange}
										className='w-full p-2 border border-gray-300 rounded'
									/>
								</div>
								<div className='mb-4'>
									<label className='block text-gray-700'>Balance</label>
									<input
										type='number'
										name='balance'
										value={selectedUser.balance}
										onChange={handleChange}
										className='w-full p-2 border border-gray-300 rounded'
									/>
								</div>
								<div className='mb-4'>
									<label className='block text-gray-700'>Wallet</label>
									<input
										type='text'
										name='wallet'
										value={selectedUser.wallet}
										onChange={handleChange}
										className='w-full p-2 border border-gray-300 rounded'
									/>
								</div>
								<div className='flex justify-end'>
									<button
										onClick={() => setShowModal(false)}
										className='px-4 py-2 bg-gray-500 text-white rounded mr-2'>
										Cancel
									</button>
									<button
										onClick={handleSubmit}
										className='px-4 py-2 bg-blue-600 text-white rounded'>
										Save
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Создание контейнера для уведомлений вручную */}
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
			) : (
				<p className='text-white'>You are not authorized to view this page.</p>
			)}
		</div>
	)
}
