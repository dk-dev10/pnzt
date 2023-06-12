<template>
	<div class="menu">
		<div
			class="menu__logo"
		>
			<span class="menu__logo-text">Название</span>
		</div>
		<ul class="menu__navbar">
			<li
				v-for="(item, idx) in navItems"
				:key="idx"
				class="menu__item"
			>
				<router-link
					:class="{ 'menu__link_active': item.classModifier === 'active' }"
					:to="item.path ? item.path : item.childLinks?.[0].path || '/'"
					class="menu__link"
					@click="activateButton(idx)"
				>
					<img
						v-if="item.icons"
						:src="item.classModifier === 'active' ? item.icons[0] : item.icons[1]"
						alt="иконка на кнопке"
						class="menu__link-img"
					>
					<span
						v-sane-html="item.title"
						class="menu__link-text"
					/>
				</router-link>
				<ul
					v-if="item.childLinks"
					class="menu__child-items"
				>
					<li
						v-for="(childItem, index) in item.childLinks"
						:key="index"
						:class="{ 'menu__child-item_active': childItem.classModifier === 'active' }"
						class="menu__child-item"
					>
						<router-link
							:class="{ 'menu__link_active': item.classModifier === 'active' && childItem.classModifier === 'active' }"
							:to="childItem.path"
							class="menu__link menu__link_type_child-link"
							@click="activateButton(idx, index)"
						>
							<span
								v-sane-html="childItem.title"
								class="menu__link-text"
							/>
						</router-link>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"

import mainIcon from "@/assets/img/main-icon.svg"
import buttonBottom from "@/assets/img/menu-but-bottom.svg"
import buttonRatings from "@/assets/img/button-menu-ratings.svg"
import buttonRatingsDisabled from "@/assets/img/button-menu-ratings-disabled.svg"
import buttonBottomDisabled from "@/assets/img/menu-but-bottom-disabled.svg"
import buttonTop from "@/assets/img/menu-but-top.svg"
import buttonTopDisabled from "@/assets/img/menu-but-top-disabled.svg"

interface NavChild {
	title: string;
	path: string;
	classModifier?: string;
}

interface NavItem {
	title: string
	path: string
	icons?: string[],
	classModifier?: string
	childLinks?: NavChild[]
}

const router = useRouter()
const navItems: NavItem[] = reactive([
	{
		title: "Общие<br>характеристики<br>сети",
		path: "/",
		icons: [buttonTop, buttonTopDisabled],
		classModifier: "active"
	},
	{
		title: "Показатели по регионам",
		path: "/rating",
		icons: [buttonRatings, buttonRatingsDisabled],
		classModifier: "active"
	},
	{
		title: "Результативность<br>сети",
		path: "",
		icons: [buttonBottom, buttonBottomDisabled],
		childLinks: [
			{
				title: "Онлайн-задачи",
				path: "/online"
			},
			{
				title: "Офлайн-задачи",
				path: "/offline"
			},
			{
				title: "ТОП-50 участников",
				path: "/topParticipants"
			}
		]
	}
])
const route = useRoute()
const handlePath = (path: string) => {
	const routes = router.getRoutes()
	const index = routes.reduce((acc, route) => acc.includes(String(route.path)) ? acc : [...acc, String(route.path)], [] as string[]).findIndex(r => r === path)
	activateButton(index > 2 ? 2 : index, index > 2 ? index - 2 : null)
}
watch(() => route.path, () => {
	handlePath(String(route.path))
})
onMounted(() => {
	handlePath(String(route.path))
})
const activateButton = (idx: number, childId?: number | null) => {
	const parentItem = navItems[idx]
	navItems.forEach(item => {
		item.classModifier = ""
		if (item.childLinks) item.childLinks.forEach(childItem => childItem.classModifier = "")
	})
	parentItem.classModifier = "active"
	if (!childId) {
		const firstChildLink = navItems?.[idx]?.childLinks?.[0]
		navItems[idx].childLinks?.forEach(childLink => {
			childLink.classModifier = ""
			if (firstChildLink) {
				firstChildLink.classModifier = "active"
			}
		})

	} else {
		const childItem = parentItem.childLinks?.[childId]
		parentItem.childLinks?.forEach(childLink => childLink.classModifier = "")
		if (childItem) {
			childItem.classModifier = "active"
		}
	}
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.menu {
	height: 100vh;
	width: 20rem;
	background-color: var(--color-accent);
	padding: 2rem 0 0 1rem;

	&__logo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background-color: var(--color-bg-logo);
		width: 19rem;
		height: 5.9rem;
		border-radius: 5px 0 0 5px;

		&-img {
			width: 3.5rem;
			height: 3.5rem;
		}
	}

	&__logo-text {
		color: var(--color-accent-light);
		font-size: 2rem;
		font-weight: 700;
	}

	&__navbar {
		display: flex;
		list-style: none;
		flex-direction: column;
		color: var(--color-text-light);
		margin-top: 2rem;
	}

	&__link {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		width: 19rem;
		padding: 1rem 0 1rem 2rem;
		border-radius: 5px 0 0 5px;

		&-img {
			width: 2rem;
			height: 2rem;
			object-fit: cover;
		}

		&-text {
			font-weight: 400;
			font-size: 1.3rem;
			line-height: 1.5rem;
		}
	}

	&__link.menu__link_type_child-link {
		padding: 0;
		width: auto;
		margin-left: -5px;
		margin-bottom: 1.5rem;

		.menu__link-text {
			line-height: 2rem;
		}
	}

	&__child-items {
		list-style: disc;
		margin-top: 0.5rem;
		padding-left: 5.9rem;
	}

	&__link {
		padding: 0.95rem 0 0.95rem 2rem;
		margin-left: auto;

		span {
			font-weight: 400;
			font-size: 1.3rem;
		}
	}

	&__item .menu__link_active {
		background-color: var(--color-bg-light);
		color: var(--color-accent);
	}

	&__child-item .menu__link_active {
		background-color: transparent;
		color: #FFFFFF;
	}

	&__child-item_active {
		color: #FFFFFF;
	}
}
</style>
