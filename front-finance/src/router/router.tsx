import { createBrowserRouter } from 'react-router-dom'
import AccountPage from '../pages/account/AccountPage'
import { AdminPage } from '../pages/AdminPage.tsx'
import { AssetPage } from '../pages/AssetPage'
import { EmailVerificationPage } from '../pages/EmailVerificationPage.tsx'
import { HomePage } from '../pages/HomePage'
import KycPage from '../pages/kyc/KycPage.tsx'
import { Layout } from '../pages/layout'
import { MarketplacePage } from '../pages/Marketplace'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicy/PrivacyPolicy.tsx'
import { ResetPasswordPage } from '../pages/ResetPassword/ResetPassword.tsx'
import TermsOfService from '../pages/TermOfService/TermOfService.tsx'
import { WalletDeposit } from '../pages/Wallet/Deposit.tsx'
import { WalletWithdraw } from '../pages/Wallet/WalletWithdraw.tsx'
import { Withdraw } from '../pages/Wallet/Withdraw.tsx'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/adminPageTLD',
		element: <AdminPage />,
	},
	{
		path: '/reset-password',
		element: <ResetPasswordPage />,
	},
	{
		path: '/email-verification',
		element: <EmailVerificationPage />,
	},

	{
		path: '/app',
		element: <Layout />,
		errorElement: <Layout />,
		children: [
			{ index: true, element: <MarketplacePage /> },
			{
				path: 'asset/:id',
				element: <AssetPage />,
			},
			{
				path: 'kyc',
				element: <KycPage />,
			},
			{
				path: 'wallet',
				element: <Withdraw />,
			},
			{
				path: 'wallet/deposit',
				element: <WalletDeposit />,
			},
			{
				path: 'wallet/withdraw',
				element: <WalletWithdraw />,
			},
			{
				path: 'terms-of-service',
				element: <TermsOfService />,
			},
			{
				path: 'privacy-policy',
				element: <PrivacyPolicyPage />,
			},
			{
				path: 'account',
				element: <AccountPage />,
			},
			// Добавьте другие страницы, которые должны быть внутри Layout
		],
	},
])
