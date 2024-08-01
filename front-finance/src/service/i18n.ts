import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import de from '../../public/locales/de.json'
import en from '../../public/locales/en.json'
import it from '../../public/locales/it.json'
import pl from '../../public/locales/pl.json'

const resources = {
	en: {
		translation: en,
	},
	pl: {
		translation: pl,
	},
	it: {
		translation: it,
	},
	de: {
		translation: de,
	},
}

// Определение языка на основе заголовка Accept-Language
const detectedLanguage = window.navigator.language.slice(0, 2) // Получаем первые два символа языка

i18n.use(initReactI18next).init({
	resources,
	lng: detectedLanguage, // Установка определенного языка
	fallbackLng: 'en', // Резервный язык по умолчанию
	interpolation: {
		escapeValue: false,
	},
})

console.log(detectedLanguage)

export default i18n
