<template>
	<div class="view-header">
		<div class="view-header__title">
			<h2
				v-if="title"
				v-sane-html="title"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
interface Props {
	title?: string
	text?: string
	textColor?: string
	titleColor?: string
	underlineColor?: string
}

withDefaults(defineProps<Props>(), {
	title: "Без названия",
	text: "",
	textColor: 'black',
	titleColor: 'black',
	underlineColor: 'black'
})
</script>
<style lang="scss" scoped>
.view-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 1rem;
	margin-bottom: 3.5rem;

	&__title {
		flex: 1 1 auto;
		position: relative;
		min-width: 0;

		h2 {
			font-size: 1.3rem;
			line-height: 1.5rem;
			color: v-bind("titleColor");
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		&:after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 0.5px;
			background-color: v-bind("underlineColor");
		}
	}

	p {
		font-weight: 700;
		font-size: 4rem;
		line-height: 4rem;
		margin-bottom: -0.5rem;
		color: v-bind("textColor");
	}

}
</style>
