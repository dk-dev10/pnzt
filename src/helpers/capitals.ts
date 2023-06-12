import {subtract} from "lodash"

export const capitalNames = ['Москва', 'Санкт-Петербург', 'Московское кольцо']
export const separateCapitalsItems = (dataItems: {[name: string]: string | number | boolean}[]) => {
	const capitals = capitalNames.map(capitalName => dataItems.find(dataItem => {
		if ('region' in dataItem) return dataItem.region === capitalName
		return false
	}))
	const nonCapitals = dataItems.reduce((acc, dataItem) => {
		return typeof dataItem['region'] === 'string' && capitalNames.includes(dataItem['region']) ? acc : [...acc, dataItem]
	}, [] as {[name: string]: string | number | boolean}[])
	return [...capitals, ...nonCapitals]
}
export const separateItemsWithCapital = <T>(dataItems: T[]): T[] => {
	const capitals = capitalNames.reduce((acc,capitalName) => {
		const capitalItem = dataItems.find(dataItem => {
			return hasCapital(dataItem, capitalName)
		})
		if (capitalItem) acc.push(capitalItem)
		return acc
	}, [] as T[])
	const nonCapitals = dataItems.filter(obj => !capitals.includes(obj))
	return [...capitals, ...nonCapitals] as T[]
}
const hasCapital = (object: any, key: string): boolean  => {
	if (typeof object === 'object' && Object.values(object).includes(key)) return true
	else {
	for (const prop in object) {
		if (typeof object[prop] === 'object' && object[prop] !== null) {
			const value = hasCapital(object[prop], key)
			if (value) return true
		}
	}
	}
	return false
}
