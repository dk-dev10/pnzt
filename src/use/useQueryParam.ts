import type { RouteLocationNormalizedLoaded, Router } from "vue-router"

export const updateQuery = async (route: RouteLocationNormalizedLoaded, router: Router, queryName: string, queryValue: string | null, queryNameToDelete?: string | null) => {
	const queries = Object.assign({}, route.query)
	if (queryName && queryValue) queries[queryName] = queryValue
	if (queryNameToDelete) {
		delete queries[queryNameToDelete]
	}
	try {
		await router.replace({ query: queries })
	} catch (err) {
		console.log(err)
	}
}

export const getQueryValues = (route: RouteLocationNormalizedLoaded, queryNames: string[]): (string | null)[] => {
	return queryNames.map(name => route.query[name] ? String(route.query[name]) : null)
}
