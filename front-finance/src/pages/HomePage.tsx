import { FC } from 'react'
import FeaturedInSection from '../components/Featured/FeaturedInSection'
import { Footer } from '../components/Footer/Footer'
import RealEstateSection from '../components/RealEstateSection/RealEstateSection'
import SectionApartTabs from '../components/SectionApartTabs/SectionApartTabs'
import { BecomeALandlord } from '../components/become_landlord/BecomeLandlord'
import { Hero } from '../components/hero/Hero'
import { HeroSelections } from '../components/hero/HeroSelections'
import { WeChoose } from '../components/weChoose/weChoose'

export const HomePage: FC = () => {
	return (
		<main className='m-1 md:m-5'>
			<div id='hero' className='section hero'>
				<HeroSelections />
				<Hero />
				<img
					src='/images/65157e9dd3fc40cdb95ee011_hero-blur.svg'
					loading='lazy'
					id='w-node-_36e62274-ba85-a93c-58fc-8469f1eeaa91-4264e49b'
					alt=''
					className='bg-patteren-blur_hero'
				/>
				<img
					src='/villas/BALIWOOD/1.jpg'
					loading='lazy'
					id='w-node-a3fc9d2e-03d4-7058-1e04-c5cd662cfced-4264e49b'
					alt=''
					className='bg-patteren-city'
				/>
			</div>
			<BecomeALandlord />
			<WeChoose />
			<RealEstateSection />
			<SectionApartTabs />
			<FeaturedInSection />
			<Footer />
		</main>
	)
}
