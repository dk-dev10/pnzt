<template>
	<div>
		<!-- <LoginPage v-if="!store.user && showSite" /> -->
		<div class="app">
			<div class="app__wrapper">
				<HeaderMenu />
				<MainPage />

				<br>
				<footer-custom />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import AnimatedRouterView from '@/components/reusable/AnimatedRouterView.vue'
// import LoginPage from "@/views/LoginPage.vue"
import HeaderMenu from "@/views/HeaderMenu.vue"
import FooterCustom from "@/views/FooterCustom.vue"
// import NavigationBar from "@/components/reusable/NavigationBar.vue"
// import stores from "@/stores"
import { computed } from "vue"
import MainPage from "./views/MainPage.vue"
// const store = stores.useUserStore()
// const showSite = ref(false)
// onBeforeMount(async () => {
// 	await store.setCurrentUser()
// 	showSite.value = true
// })
const wrapperPadding = computed(() => '2rem 5%')
</script>
<style lang="scss">

.app {
	// height: 100vh;
	display: flex;

	&__wrapper {
		width: 100%;
		padding: v-bind("wrapperPadding");
	}

	&__title {
		font-weight: 700;
		font-size: 2rem;
		line-height: 4rem;
		text-transform: uppercase;
		text-align: left;
		position: relative;
		margin-bottom: 2rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;

		&::after {
			content: "";
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 1.5px;
			background-color: var(--color-accent);
		}
	}
}
</style>
