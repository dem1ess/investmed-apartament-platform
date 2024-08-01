import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { MainHeaderComponent } from '../components/header/MainHeader'
import { NavBarComponent } from '../components/nav/NavBar'

export const Layout: FC = () => {
	return (
		<body
			className='
      m-2 font-sans'>
			<main>
				<div className='DefaultLayout_contentWrapper__dHiYy'>
					<NavBarComponent />
					<div className='DefaultLayt_content__BiKjo'>
						<MainHeaderComponent />
						<Outlet />
					</div>
				</div>
				<div className='DefaultLayout_footer__xJAFs'>
					<p>© 2024 TLD</p>
				</div>
			</main>
		</body>
	)
}
