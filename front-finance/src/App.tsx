import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import { getTokenFromLocalStorage } from './helpers/localstorage.helper.ts'
import { useAppDispatch } from './hooks/redux.ts'
import { router } from './router/router.tsx'
import { AuthService } from './service/auth.service.ts'
import i18n from './service/i18n.ts'
import { login, logout } from './store/reducers/UserSlice.ts'

function App() {
	const dispatch = useAppDispatch()
	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await AuthService.getProfile()
				if (data) {
					dispatch(login(data))
				} else {
					dispatch(logout())
				}
			}
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])
	return (
		<I18nextProvider i18n={i18n}>
			<RouterProvider router={router} />
		</I18nextProvider>
	)
}

export default App
