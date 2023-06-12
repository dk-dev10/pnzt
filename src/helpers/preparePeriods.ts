export const formatDashedDate = (date: Date) => {
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, "0")
	return `${year}-${month}-01`
}
export const getMonths = (from: Date, to: Date) => {
	const monthArr = [] as string[]
	const currentDate = from
	while (currentDate < to) {
		monthArr.push(months[currentDate.getMonth() + 1])
		currentDate.setMonth(currentDate.getMonth() + 1)
	}
	return monthArr
}

export const months: { [position: number]: string } = {
	1: "Январь",
	2: "Февраль",
	3: "Март",
	4: "Апрель",
	5: "Май",
	6: "Июнь",
	7: "Июль",
	8: "Август",
	9: "Сентябрь",
	10: "Октябрь",
	11: "Ноябрь",
	12: "Декабрь"
}
export const getMonth = (n: number) => {
	return months[n]
}
export const convertToWeek = (from: string, to: string) => {
	const weekFrom = from.split("-")
	weekFrom.shift()
	const weekTo = to.split("-")
	weekTo.shift()
	return weekFrom.reverse().join(".") + "-" + weekTo.reverse().join(".")
}

export const convertDatesToPeriodString = (from: Date, to: Date) => {
	const fromString = from.toDateString()
	const toString = to.toDateString()
	return `${fromString}-${toString}`
}

