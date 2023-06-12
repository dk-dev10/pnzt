<template>
	<div class="radio-group">
		<div
			v-for="(item, idx) in items"
			:key="`item-${idx}`"
			class="radio-group__item"
		>
			<input
				v-model="selectedButton"
				type="radio"
				:value="idx"
				:class="{ 'radio-group__item_checked': selectedButton === idx}"
				@change="$emit('radioGroupChange', item, unselect)"
			>
			<p>
				{{ item }}
			</p>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue"

interface Props {
	activeItemIdx: number | null;
	items: string[];
	unselect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	unselect: false
})
const selectedButton = ref(props.activeItemIdx)
watch(() => props, () => {
	selectedButton.value = props.activeItemIdx
}, { deep: true })
</script>
<style lang="scss" scoped>
.radio-group {
	display: flex;
	align-items: center;
	justify-content: space-between;

	&__item {
		display: flex;
		align-items: center;
		margin-left: 1rem;
		cursor: pointer;

		input {
			opacity: 0;
			position: relative;
			left: -1rem;
			width: 2rem;
			height: 2rem;
			cursor: pointer;
			z-index: 1;
		}

		input.radio-group__item_checked + p:before {
			content: "";
			position: absolute;
			z-index: 0;
			left: -3rem;
			top: -0.2rem;
			width: 2rem;
			height: 2rem;
			background: url("@/assets/img/check-mark.svg") center no-repeat;
		}

		p {
			position: relative;

			&:before {
				content: "";
				position: absolute;
				z-index: 0;
				left: -3rem;
				top: -0.2rem;
				width: 2rem;
				height: 2rem;
				border: 1px solid var(--color-accent);
				border-radius: 5px;
			}
		}
	}
}
</style>
