<template>
	<div
		class="toggle"
		:class="{'toggle_active': isActive}"
		@click="toggle"
	>
		<p
			v-sane-html="getTitle(title)"
			:style="{color: currentColor}"
		/>
		<button
			:class="{ 'toggle__button_toggled': isIncreasing }"
			class="toggle__button"
		>
			<svg
				width="13"
				height="6"
				viewBox="0 0 13 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0.628555 5.8347C0.813407 6.03984 1.12956 6.0563 1.33471 5.87144L6.54595 1.17573L11.662 5.86847C11.8655 6.05513 12.1818 6.04148 12.3685 5.83798C12.5551 5.63448 12.5415 5.31819 12.338 5.13153L6.88692 0.131526C6.69698 -0.0426998 6.40572 -0.0439897 6.21424 0.128547L0.665302 5.12855C0.460156 5.3134 0.443704 5.62955 0.628555 5.8347Z"
					:fill="currentColor"
				/>
			</svg>
		</button>
	</div>
</template>
<script lang="ts" setup>
import { computed, watch } from "vue"

interface Props {
	hideDashed: boolean;
	title: string;
	isActive?: boolean;
	watchActive?: boolean;
	isIncreasing?: boolean;
	multiSelect?: boolean;
	activeColor?: string;
	color?: string;
}

const getTitle = (title: string) => {
	if (props.hideDashed && /_/.test(title)) {
		return title.split("_")[1]
	}
	return title
}
const emit = defineEmits(["toggleChange"])
const props = withDefaults(defineProps<Props>(), {
	hideDashed: false,
	isIncreasing: true,
	isActive: false,
	watchActive: true,
	multiSelect: false,
	activeColor: 'var(--color-accent)',
	color: 'white'
})
watch(() => props.isActive, () => {
	if (props.isActive && props.watchActive) emit("toggleChange", props.title, props.isIncreasing)
})
const currentColor = computed(() => {
	return props.isActive ? props.activeColor : props.color
})
const toggle = () => {
	emit("toggleChange", props.title, !props.isIncreasing)
}
</script>
<style lang="scss" scoped>
.toggle {
	display: flex;
	align-items: center;
	gap: 5px;
	min-width: 0;
	max-width: 100%;

	& > p {
		cursor: pointer;
		font-weight: 400;
		font-size: 1.3rem;
		line-height: 1.5rem;
		min-width: 0;
	}

	p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	&__button {
		margin-top: -0.2rem;


		svg {
			width: 1.2rem;
			height: 0.6rem;
			transition: all 150ms ease-in-out;
			transform: rotate(-180deg);
		}

		&_toggled {
			svg {
				transform: rotate(0);
			}
		}
	}
}

</style>
