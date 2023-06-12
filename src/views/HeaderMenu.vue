<template>
	<div class="headerMenu">
		<h2>Header Menu</h2>
		<div class="text-end">
			<v-menu open-on-click>
				<template #activator="{ props }">
					<v-btn
						color="primary"
						v-bind="props"
					>
						Dropdown
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="(item, index) in items"
						:key="index"
						@click="clogger(item.title)"
					>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		items: [
			{ title: 'Первый меня' },
			{ title: 'Второй меню' },
			{ title: 'Третий меню' },
			{ title: 'Последний' },
		],
	}),
	methods: {
		clogger(what) {
			console.log(what)
		}
	},
}
</script>

<style lang="scss" scoped>
.headerMenu {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 1rem;
	border-bottom: 1px solid black;
}
</style>
