<template>
	<div
		v-click-outside="hideList"
		:class="{'select_type_search': search}"
		class="select"
	>
		<div
			class="select__controls"
		>
			<p
				v-sane-html="title"
				:style="{color: isListVisible ? '#0077B6': ''}"
				@click="isListVisible = inline ? true : !isListVisible"
			/>
			<button
				:class="{ 'select__open-button_opened': isListVisible }"
				aria-label="Кнопка открытия выпадающего списка"
				class="select__open-button"
				@click="isListVisible = !isListVisible"
			>
				<img
					:src="isListVisible ? ArrowUp: ArrowDown"
					alt=""
				>
			</button>
			<div
				v-if="search && isListVisible"
				class="select__search"
			>
				<input
					v-model="searchString"
					placeholder="Поиск"
					type="text"
				>
			</div>
		</div>
		<div
			:class="{ 'select__list_visible': isListVisible }"
			class="select__list"
		>
			<div
				class="select__list-items"
			>
				<p
					v-for="(item, idx) in filteredItems"
					:key="idx"
					ref="listItems"
					v-sane-html="item"
					:class="[{select__item_active: activeItemIdx === idx}, getHoverClass]"
					class="select__item"
					@click="() => selectItem(item)"
					@mouseout="onMouseOver(null)"
					@mouseover="onMouseOver(item)"
				/>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue"
import ArrowUp from "@/assets/img/arrow-up-blue.svg"
import ArrowDown from "@/assets/img/arrow-down-black.svg"

interface Props {
	items: string[];
	title: string;
	activeItemIdx: number | null;
	search?: boolean;
	unselect?: boolean;
	inline?: boolean;
	visibleItem?: number;
	typeOfHover?: string;
}

const props = withDefaults(defineProps<Props>(), {
	disabledItems: () => [],
	search: false,
	unselect: false,
	inline: false,
	visibleItem: 0,
	typeOfHover: "text"
})
const listItems = ref<(HTMLElement | null)[]>([])
const emit = defineEmits(["selectChange", "selectHoverItem"])
const filteredItems = computed(() => props.items.filter(item => item.toLowerCase().includes(searchString.value.toLowerCase())))
const searchString = ref("")
const isListVisible = ref(props.inline)
const getHoverClass = computed(() => {
	switch (props.typeOfHover) {
		case "background":
			return "select__item_hover-background"
	}
	return "select__item_hover-text"
})
const selectItem = (name: string) => {
	const idx = props.items.findIndex(item => item === name)
	emit("selectChange", props.title, idx, props.unselect, true)
	if (!props.inline) isListVisible.value = false
}
watch(() => props.activeItemIdx, () => {
	emit("selectChange", props.title, props.activeItemIdx, props.activeItemIdx === null ? false : props.unselect)
	if (!props.inline) isListVisible.value = false
})
watch(() => props.visibleItem, () => {
	if (listItems.value[props.visibleItem]) {
		listItems.value[props.visibleItem]?.scrollIntoView()
	}
})
const onMouseOver = (name: string | null) => {
	emit("selectHoverItem", name)
}
const hideList = async () => {
	await nextTick()
	if (!props.inline) isListVisible.value = false
}
const displayScrollbar = computed(() => props.search ? "block" : "none")
const listTranslate = computed(() => props.search ? "2rem" : "-1rem")
</script>
<style lang="scss" scoped>
.select {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	position: relative;
	padding: 0 1.5rem;
	min-width: 0;
	max-width: 100%;

	&__controls {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 5px;
		min-width: 0;

		& > p {
			cursor: pointer;
			font-size: 1.3rem;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

		}
	}

	&__search {
		position: absolute;
		bottom: -100%;
		left: 0;
		width: 100%;
		padding: 1rem 2.5rem 1rem 1rem;
		z-index: 10;
		background: var(--color-bg-light);

		input {
			width: 100%;
			height: 1.5rem;
			border: 1px solid var(--color-min-text);
			border-radius: 5px;
			padding: 0 0.5rem;
			line-height: 1.5rem;
			font-size: 1.2rem;
			outline: none;
			color: var(--color-main-text);

			&::placeholder {
				font-size: 0.66rem;
				transform: translateY(-0.2rem);
				color: var(--color-min-text);
			}
		}

		&:after {
			content: "";
			width: 1rem;
			height: 1rem;
			position: absolute;
			right: 3rem;
			top: 50%;
			transform: translateY(-50%);
			background: url('@/assets/img/search.svg') center no-repeat;
		}
	}

	&__list {
		position: absolute;
		width: 100%;
		top: calc(100% + 1rem);
		left: 0;
		z-index: 10;
		background-color: var(--color-bg-light);
		padding: 1.2rem 1rem;
		pointer-events: none;
		transform: translateY(-1rem);
		opacity: 0;
		transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;

		&-items {
			scroll-behavior: smooth;
			max-height: 20rem;
			overflow-y: auto;
			padding-right: 0.6rem;

			.select__item {
				font-size: 1.3rem;
				line-height: 2rem;
				margin-bottom: 0.7rem;
				cursor: pointer;
			}

			.select__item.select__item_active.select__item_hover-text, .select__item_hover-text:hover {
				color: var(--color-accent);
			}

			.select__item.select__item_active.select__item_hover-background, .select__item_hover-background:hover {
				background: var(--color-accent-light);
				color: #000000;
			}

			.select__item:last-child {
				margin-bottom: 0;
			}
		}
	}


	&__list_visible {
		opacity: 1;
		transform: translateY(v-bind('listTranslate'));
		pointer-events: auto;
	}

	&__open-button {
		margin-top: -0.2rem;
		transition: all 150ms ease-in-out;

		img {
			width: 1.2rem;
			height: 0.6rem;
		}

		&_opened {
			margin-top: -0.4rem;
			transform: rotate(360deg);
		}
	}

	::-webkit-scrollbar {
		display: v-bind("displayScrollbar");
		width: 5px;
	}

	::-webkit-scrollbar-track {
		background: var(--color-accent-light);
		width: 5px;
		border-radius: 5px;
	}

	::-webkit-scrollbar-thumb {
		width: 3px;
		border-radius: 100px;
		background: var(--color-accent);
	}
}
</style>
