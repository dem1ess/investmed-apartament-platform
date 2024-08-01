import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { removeTokenFromLocalStorage } from '../../helpers/localstorage.helper'
import { useAppDispatch } from '../../hooks/redux'
import { logout } from '../../store/reducers/UserSlice'
import { RootState } from '../../store/store.ts'
import LoginModal from '../auth/authModal'
import BurgerMenu from './BurgerMenu.tsx'

export function MainHeaderComponent() {
	const { t } = useTranslation()
	const [showLoginModal, setShowLoginModal] = useState(false)
	const [showBurgerMenu, setshowBurgerMenu] = useState(false)

	const handleOpenLoginModal = () => {
		setShowLoginModal(true)
	}

	const handleCloseLoginModal = () => {
		setShowLoginModal(false)
	}

	const handleBurger = () => {
		setshowBurgerMenu(true)
	}

	const handleCloseBurgerl = () => {
		setshowBurgerMenu(false)
	}

	const user = useSelector((state: RootState) => state.user.user)
	const dispatch = useAppDispatch()

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('You logout')
	}

	// @ts-ignore
	return (
		<div className='DefaultLayout_header__Q0qOg'>
			<div className='DesktopBar_root__Am6ZS'>
				<div className='Container_container__nWO8i DesktopBar_container__L1ci2'>
					<div className='DesktopBar_labelChecklist__sjUZc'>
						<div className='DesktopBar_userTestnetProgress__2SaLX'>
							<div className='styles_root__BcHB1'>
								<div className='styles_fourSteps__wSrau'>
									<div className='styles_imageWrapper__VEPPl'>
										<img src='/TLD_logo_beige.svg' alt='Logo' />
									</div>
									<p className='styles_fourStepsText__RzOim'>
										{t('threesteps')}
									</p>
								</div>
								<div className='styles_stepsWrapper__SGFJ4'>
									<div className='styles_step__63BMk'>
										<div
											className={
												user
													? `styles_successWrapper__xMm_U`
													: `styles_stepNumber__XqYeI`
											}>
											{user ? (
												<svg
													width='14'
													height='10'
													viewBox='0 0 10 8'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'>
													<path
														d='M9.125 1.375L3.62188 6.625L0.875 4'
														stroke='white'
														strokeWidth='1.5'
														strokeLinecap='round'
														strokeLinejoin='round'></path>
												</svg>
											) : (
												1
											)}
										</div>
										<div className='styles_linkHide__hKrHj '>{t('signup')}</div>
									</div>
									<div className='styles_dash__HDftA'></div>
									<div className='styles_step__63BMk'>
										<div
											className={
												user?.isVerif
													? `styles_successWrapper__xMm_U`
													: `styles_stepNumber__XqYeI`
											}>
											{user?.isVerif ? (
												<svg
													width='14'
													height='10'
													viewBox='0 0 10 8'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'>
													<path
														d='M9.125 1.375L3.62188 6.625L0.875 4'
														stroke='white'
														strokeWidth='1.5'
														strokeLinecap='round'
														strokeLinejoin='round'></path>
												</svg>
											) : (
												2
											)}
										</div>
										<div className='styles_linkHide__hKrHj'>
											{t('verification')}
										</div>
									</div>
									<div className='styles_dash__HDftA'></div>
									<div className='styles_step__63BMk'>
										<div className='styles_stepNumber__XqYeI'>3</div>
										<div className='styles_linkHide__hKrHj'>
											{t('buyUnits')}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='DesktopBar_buttons__YhcZx'>
						<div className='DesktopBar_buttonsContainer__oNNAt'>
							<div className='DesktopBar_center__glZ2G'>
								<a
									href={t('callUser')}
									className='rounded-2xl hidden md:flex px-2 items-center justify-center bg-green-600 border-[1px] border-green-800 cursor-pointer'>
									<IoLogoWhatsapp className='text-green-200 text-3xl' />
									<p className='text-green-200 mx-3'>{t('callUs')}</p>
								</a>

								{user ? (
									<div className='text-white mx-3 flex justify-center text-lg items-center'>
										{user.email}{' '}
										<button
											onClick={logoutHandler}
											className='DesktopBar_walletConnectButton__YSbTf hidden md:flex Button_root__0ygym'>
											<p>{t('logout')}</p>
										</button>
									</div>
								) : (
									<button
										onClick={handleOpenLoginModal}
										className='DesktopBar_walletConnectButton__YSbTf flex Button_root__0ygym'>
										<p>{t('signuplogin')}</p>
									</button>
								)}
								<a
									href={t('callUser')}
									className='rounded-2xl flex md:hidden px-2 items-center justify-center bg-green-600 border-[1px] border-green-800 cursor-pointer'>
									<IoLogoWhatsapp className='text-green-200 text-3xl' />
									<p className='text-green-200 mx-3'>WhatsApp</p>
								</a>
							</div>
						</div>
						<div onClick={handleBurger} className='DesktopBar_burger__DmAsn'>
							<img
								alt='burger'
								loading='lazy'
								width='15'
								height='15'
								decoding='async'
								data-nimg='1'
								style={{ color: 'transparent' }}
								src='/burger.svg'
							/>
						</div>
					</div>
				</div>
			</div>
			<BurgerMenu
				logoutHandler={logoutHandler}
				show={showBurgerMenu}
				onClose={handleCloseBurgerl}
			/>
			<LoginModal show={showLoginModal} onClose={handleCloseLoginModal} />
			<ToastContainer />
		</div>
	)
}
