'use client'
import { useEffect, useState } from 'react'

export function Header() {
	const [isHeaderVisible, setIsHeaderVisible] = useState(true)

	useEffect(() => {
		const firstBlock = document.getElementById('hero')

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.intersectionRatio === 0) {
						setIsHeaderVisible(true)
					} else {
						setIsHeaderVisible(false)
					}
				})
			},
			{ threshold: [0] }
		) // Установка порога в 0, чтобы отслеживать полную видимость элемента

		if (firstBlock) {
			observer.observe(firstBlock)
			console.log(isHeaderVisible)
		}

		return () => {
			if (firstBlock) {
				observer.unobserve(firstBlock)
			}
		}
	}, [])

	return (
		<header
			style={{
				transition: 'opacity 0.5s',
				opacity: isHeaderVisible ? 1 : 0,
			}}>
			<div
				className='menu-desktop-container fixed-dark'
				style={{
					willChange: 'transform, opacity',
					transform:
						'translate3d(0px, 0vw, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
					transformStyle: 'preserve-3d',
					opacity: 1,
					display: 'flex',
				}}>
				<div className='menu-desktop'>
					<div className='lang-logo'>
						<a
							href="/"
							aria-current="page"
							className="menu-logo-image-dark bg-cover bg-center w-[60px] w--current">
							<img
								className=""
								src="/TLD_logo_beige.svg"
								alt="TLD"
							/>
						</a>
					</div>
					<div className="menu_liinks-menu_button">
						<div className="menu-links">
							<a href="#" className='menu-link hidden'>
								Partners
							</a>
							<a
								href='/'
								target='_blank'
								className='menu-link'>
								About platform
							</a>
							<a
								href='/'
								target='_blank'
								className='menu-link'>
								How to invest
							</a>
						</div>
						<a
							href='/'
							target='_blank'
							className='button small_sign w-inline-block'>
							<div>Sign up / Log in</div>
						</a>
					</div>
					<a href='#' className='menu-burger w-inline-block'>
						<img
							src='/images/65199899af4f709c4a25a69b_burger.svg'
							loading='lazy'
							alt='Menu Burger Icon'
							className='icon-burger'
						/>
					</a>
				</div>
			</div>
		</header>
	)
}
