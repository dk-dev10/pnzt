<template>
	<router-link
		:to="path.path"
		class="button-link"
		:class="{'button-link_active': isActive}"
		@click="addQuery(path)"
	>
		<text-with-title
			:title-level="titleLevel"
			:text-tag="textTag"
			:title="title"
			:text="text"
		/>
	</router-link>
</template>

<script setup lang="ts">
import TextWithTitle from '@/components/reusable/TextWithTitle.vue'
import {useRoute, useRouter} from 'vue-router'
import {type Button, type RouteObject} from '@/models'


withDefaults(defineProps<Button>(), {
	titleLevel: 3,
	textTag: 'p',
	title: '',
	text: '',
	isActive: false
})
const route = useRoute()
const router = useRouter()
const addQuery = (newQuery: RouteObject) => {
	const queryParams = {...route.query, ...newQuery.query}
	const paramsString = Object.entries(queryParams).reduce((string, entry, idx) => {
		return `${string}${(idx === 0) ? '' : '&'}${entry[0]}=${entry[1]}`
	}, '?')
	router.push(`${newQuery.path}${paramsString}`)
}
</script>
<style lang="scss" scoped>
.button-link {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: space-between;
	padding: 0.8rem;
	flex-shrink: 0;
	flex-grow: 0;
	border-radius: 5px;
	color: var(--color-text-blue);
	background-color: var(--color-accent-light);
}

.button-link_active {
	background-color: var(--color-accent);
	color: #FFFFFF;
}

:deep(.text-with-title) {
	.text-with-title__title {
		font-size: 1.1rem;
		font-weight: 400;
		line-height: 1.1rem;

		& > * {
			margin-bottom: 0.8rem;
		}
	}

	.text-with-title__text {
		font-weight: 700 !important;
		font-size: 2rem;
		line-height: 2rem;
	}
}
</style>
