export interface IProperty {
	id?: string
	name: string
	description: string
	price: number
	tokens: number
	priceToken: number
	availableTokens: number
	landArea: number
	houseArea: number
	distanceToSea: string
	videoUrl: string
	photoUrls: string[]
	documentUrls: string[]
	location1: string
	location2: string
	mainLocation: string
	roi: number
	annualGrowthRate: number
	yearOfCompletion: number
	legalFees: number
	rentPerYear: number
	facilityManagement: number
	bookingLink: string
}
