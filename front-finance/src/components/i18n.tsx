import React, { useEffect, useState } from 'react'
import i18n from '../service/i18n'
const languages = [
	{ value: 'en', label: 'ENG' },
	{ value: 'pl', label: 'PL' },
	{ value: 'it', label: 'IT' },
	{ value: 'de', label: 'DE' },
]

const LanguageSelector: React.FC = () => {
	const [language, setLanguage] = useState(i18n.language)

	useEffect(() => {
		const handleChangeLanguage = () => {
			setLanguage(i18n.language)
		}
		i18n.on('languageChanged', handleChangeLanguage)
		return () => {
			i18n.off('languageChanged', handleChangeLanguage)
		}
	}, [])

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
	}

	const handleLanguageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedLanguage = event.target.value
		setLanguage(selectedLanguage)
		changeLanguage(selectedLanguage)
	}

	return (
		<div className='my-2'>
			<select
				id='language'
				value={language}
				onChange={handleLanguageChange}
				className='mt-1 block w-full border-color--secondary-bg rounded-xl font-bold text-white shadow-sm py-1 px-2 bg-color--secondary-bg text-sm'>
				{languages.map(({ value, label }) => (
					<option key={value} value={value} className='font-bold'>
						{label}
					</option>
				))}
			</select>
		</div>
	)
}

export default LanguageSelector
