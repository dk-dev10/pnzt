<template>
	<div class="filters-bar">
		<slot />
		<template
			v-for="(item, idx) in components"
			:key="idx"
		>
			<component
				:is="item.component"
				v-bind="item.props"
				v-on="onEmits"
			/>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { computed, reactive} from "vue"
import Checkbox from "@/components/reusable/CheckboxVue.vue"
import PeriodCalendar from "@/components/reusable/PeriodCalendar.vue"
import Select from "@/components/reusable/Select.vue"
import FilterToggle from "@/components/reusable/FilterToggle.vue"
import RadioButton from "@/components/reusable/RadioGroup.vue"
import Heading from "@/components/reusable/HeadingVue.vue"
import type { FilterItem } from "@/models"
import { convertDatesToPeriodString } from "@/helpers/preparePeriods"

interface Props {
	title?: string;
	data: FilterItem[];
	search?: boolean;
}


const compObj = {
	"heading": Heading,
	"checkbox": Checkbox,
	"toggle": FilterToggle,
	"select": Select,
	"radio-group": RadioButton,
	"period-calendar": PeriodCalendar
}

const props = defineProps<Props>()
const data = reactive(props.data)
const components = computed(() => data.map(item => ({
	component: compObj[item.type],
	props: {
		title: item.title,
		items: item.items,
		isActive: item.isActive,
		activeItemIdx: item.activeItemIdx,
		isIncreasing: item.isIncreasing,
		search: item.search,
		unselect: item.unselect,
		availableYears: item.availableYears,
		calendarQueryName: item.calendarQueryName,
		from: item.from,
		to: item.to,
		isFullscreen: item.isFullscreen,
		inline: item.inline,
		visibleItem: item.visibleItem,
		typeOfHover: item.typeOfHover,
		watchActive: item.watchActive,
		isChecked: item.isChecked,
		checkboxName: item.checkboxName,
		multiSelect: item.multiSelect,
		activeColor: item.activeColor,
		color: item.color,
		text: item.text,
		hideDashed: item.hideDashed,
	}
})))

const emit = defineEmits(["change", "hoverSelectItem"])
const onEmits = {
	"checkboxChange": (checkboxName: string, checked: boolean) => {
		emit("change", checkboxName, checked)
	},
	"selectHoverItem": (name: string | null) => {
		emit("hoverSelectItem", name)
	},
	"periodChange": (calendarName: string, from: Date | null, to: Date | null, unselect = false) => {
		const calendar = data.find(item => item.title === calendarName)
		if (!from || !to) emit("change", calendar?.calendarQueryName, null)
		else emit("change", calendar?.calendarQueryName, convertDatesToPeriodString(from, to))
		if (unselect && from && to) {
			setTimeout(() => {
				data.forEach(item => {
					if (item.type === "select" && item.title) onEmits.selectChange(item.title, null)
					if (item.type === "radio-group" && item.title) onEmits.radioGroupChange(item.title)
				})
			}, 0)
		}
	},
	"radioGroupChange": (name: string | null, unselect = false) => {
		const radioGroupQueryName = data.find(item => item.type === "radio-group")?.radioGroupQueryName
		emit("change", radioGroupQueryName, name)
		if (unselect) {
			setTimeout(() => {
				data.forEach(item => {
					if (item.type === "select" && item.title) onEmits.selectChange(item.title, null)
					if (item.type === "period-calendar" && item.title) onEmits.periodChange(item.title, null, null)
				})
			}, 0)
		}
	},
	"toggleChange": async (title: string, isIncreasing: boolean) => {
		let toggleCount = 0
		data.forEach(item => {
			if (item.type === "toggle") {
				toggleCount++
				item.isActive = false
			}
		})
		const activeItem = data.find(item => item.title === title)
		if (activeItem) {
			if (toggleCount > 1) activeItem.isActive = true
			activeItem.isIncreasing = isIncreasing
		}
		emit("change", props.title + "Sort", title)
		setTimeout(() => {
			emit("change", props.title + "SortIncreasing", String(isIncreasing))
		}, 0)
	},
	"selectChange": (selectName: string, idx: number | null, unselect = false, directClick = false) => {
		const selectItem = data.find(item => item.title === selectName)
		if (selectItem) {
			selectItem.activeItemIdx = idx
			emit("change", selectItem.selectQueryName, idx !== null ? selectItem.items?.[idx] : null, directClick)
			if (unselect) {
				setTimeout(() => {
					data.forEach(item => {
						if (item.type === "period-calendar" && item.title) onEmits.periodChange(item.title, null, null)
						if (item.type === "radio-group" && item.title) onEmits.radioGroupChange(item.title)
					})

				}, 0)
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.filters-bar {
	background-color: var(--color-bg-light);
	border-radius: 5px;
	display: grid;
	grid-template-columns: repeat(v-bind('components.length'), 1fr);
	column-gap: 0;
	padding: 0;
	font-size: 1.3rem;
	line-height: 1.5rem;

	& > * {
		justify-self: center;
		min-width: 0;
	}

	& > *:last-child {
		justify-self: end;
		padding-right: 2rem;
	}

	& > *:first-child {
		padding-left: 2rem;
		justify-self: start;
	}

}
</style>
