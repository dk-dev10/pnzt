import { createRouter, createWebHistory } from "vue-router"

import MainPage from "@/views/MainPage.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: MainPage,
			meta: {
				title: "Общие характеристики",
			},
			props: true,
		},
	],
})
router.beforeEach((to, from, next) => {
	const title = String(to.meta.title)
	if (title && window.document) {
		window.document.title = title
	}
	next()
})
export default router
