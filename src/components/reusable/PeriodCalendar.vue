<template>
	<div
		v-click-outside="hideCalendar"
		class="calendar"
		:class="{'calendar_type_fullscreen': isFullscreen}"
	>
		<div
			class="calendar__controls"
		>
			<label>
				<input
					v-model="checked"
					type="checkbox"
					:disabled="!date[0] || !date[1] || date[0] === date[1]"
					@update:model-value="selectPeriod"
				>
			</label>
			<p
				@click="isCalendarOpened = !isCalendarOpened"
			>
				{{ date[0] && date[1] && checked ? formatPeriod(date) : "Период" }}
			</p>
		</div>
		<div
			:class="{'calendar__container_visible': isCalendarOpened || isFullscreen}"
			class="calendar__container"
		>
			<div class="calendar__picker">
				<VueDatePicker
					ref="datepicker"
					v-model="date"
					inline
					range
					auto-apply
					locale="ru"
					:enable-time-picker="false"
					@update:model-value="onRangeUpdate"
				>
					<template
						#month-year="{
							month,
							year,
							months,
							years,
							updateMonthYear,
							handleMonthYearChange
						}"
					>
						<div class="MY-controls">
							<span
								@click="ym_show = true"
							>{{ formatMonthYear(month, year) }}</span>
							<div class="icons">
								<span
									class="custom-icon"
									@click="handleMonthYearChange(false)"
								>
									<img
										:src="Left"
										alt="Стрелка влево"
									>
								</span>
								<span
									class="custom-icon"
									@click="handleMonthYearChange(true)"
								>
									<img
										:src="Right"
										alt="Стрелка вправо"
									>
								</span>
							</div>
							<transition
								appear
								name="fade"
								mode="out-in"
							>
								<div
									v-if="ym_show"
									v-click-outside="hideYM"
									class="YM-changer"
								>
									<div class="periods">
										<div
											v-for="(currentMonth, idx) in months"
											:key="`month${idx}`"
											class="period"
											:class="{'period_active': currentMonth.value === month}"
											@click="() => update(currentMonth.value, year, updateMonthYear)"
										>
											{{ currentMonth.text }}
										</div>
									</div>
									<div class="periods">
										<div
											v-for="(currentYear, idx) in years.filter(year => availableYears.includes(year.value))"
											:key="`year${idx}`"
											class="period"
											:class="{'period_active': currentYear.value === year}"
											@click="update(month, currentYear.value, updateMonthYear)"
										>
											{{ currentYear.text }}
										</div>
									</div>
								</div>
							</transition>
						</div>
					</template>
				</vuedatepicker>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { nextTick, ref, watch } from "vue"
import Left from "@/assets/img/left.svg"
import Right from "@/assets/img/right.svg"
import VueDatePicker from "@vuepic/vue-datepicker"

interface Props {
	isFullscreen?: boolean;
	unselect?: boolean;
	isActive?: boolean;
	title: string;
	from?: Date | null;
	to?: Date | null;
	availableYears?: number[];
}

const props = withDefaults(defineProps<Props>(), {
	availableYears: () => [],
	from: null,
	to: null,
	isActive: false,
	unselect: false,
	isFullscreen: false
})
watch([() => props.from, () => props.to], () => {
	checked.value = props.isActive
	date.value = [props.from ? props.from : today, props.to ? props.to : today]
})
const datepicker = ref<InstanceType<typeof VueDatePicker> | null>(null)
const emit = defineEmits(["periodChange"])
const checked = ref(props.isActive)
const today = new Date()
const isCalendarOpened = ref(false)
const date = ref<any>([props.from ? props.from : today, props.to ? props.from : today])
const ym_show = ref(false)
const formatPeriod = (period: Date[]) => {
	const options = { year: "2-digit", month: "numeric", day: "numeric" } as Intl.DateTimeFormatOptions
	return `${period[0].toLocaleDateString("ru", options)}-${period[1].toLocaleDateString("ru", options)}`
}
const formatMonthYear = (month: number, year: number) => {
	const options = { year: "numeric", month: "long" } as Intl.DateTimeFormatOptions
	const date = new Date(year, month)
	return date.toLocaleDateString("ru", options).replace(/^(.).*$/, (string, firstLetter) => `${firstLetter.toUpperCase()}${string.substring(1, string.length - 3)}`)
}
const onRangeUpdate = () => {
	if (checked.value) selectPeriod()
}
const update = (month: number, year: number, cb: (month: number, year: number) => void) => {
	cb(month, year)
}
const selectPeriod = () => {
	if (checked.value && date.value[0] && date.value[1]) {
		emit("periodChange", props.title, date.value[0], date.value[1], props.unselect)
	} else if (!checked.value) emit("periodChange", props.title, null, null, false)
}
const hideYM = async () => {
	await nextTick()
	ym_show.value = false
}
const hideCalendar = async () => {
	await nextTick()
	isCalendarOpened.value = false
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
	width: 0.6rem !important;
}

::-webkit-scrollbar-track {
	background: var(--color-accent-light);
	width: 0.6rem !important;
}

::-webkit-scrollbar-thumb {
	width: 0.4rem !important;
}

:deep(.dp__calendar_header) {
	color: var(--color-accent);
	font-weight: 400;
	font-size: 0.9rem;
	line-height: 0.9rem;
	text-transform: uppercase;
}

:deep(.dp__calendar) {
	padding: 0 0.5rem 0.5rem 0.5rem;
}

:deep(.dp__inner_nav svg) {
	width: 1rem;
	height: 1rem;
	stroke: var(--color-accent);
}

.calendar {
	display: flex;
	align-items: center;
	position: relative;

	&__controls {
		display: flex;
		align-items: center;

		label {
			position: relative;
			width: 2rem;
			height: 2rem;
			border: 0.5px solid var(--color-accent);
			border-radius: 5px;

			input {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				opacity: 0;
			}
		}

		label:has(> input:checked):after {
			content: "";
			position: absolute;
			z-index: 0;
			left: 50%;
			top: 50%;
			width: 1.5rem;
			height: 1.3rem;
			transform: translate(-50%, -50%);
			background: url("@/assets/img/check-mark.svg") center no-repeat;
		}

		label:has(> input:disabled) {
			border: 0.5px solid #CCC;
		}

		p {
			margin-left: 0.5rem;
		}
	}

	&__container {
		position: absolute;
		top: 100%;
		left: 0;
		background-color: var(--color-bg-light);
		z-index: 10;
		pointer-events: none;
		transform: translateY(-1rem);
		opacity: 0;
		transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;

		&_visible {
			opacity: 1;
			transform: translateY(0);
			pointer-events: auto;
		}
	}

	.MY-controls {
		flex: 0 0 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		padding: 0 1rem;

		.icons {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 2.4rem;

			img {
				cursor: pointer;
				width: 0.5rem;
				height: 0.7rem;
			}
		}
	}

	.YM-changer {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: 5px;
		z-index: 1;
		background: var(--color-bg-light);
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		padding: 0.5rem;

		.periods {
			flex: 0 0 calc(50% - 0.5rem);
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow-y: auto;
			gap: 0.5rem;

			.period {
				font-size: 1.3rem;
				line-height: 2rem;
				cursor: pointer;

				&:hover {
					filter: drop-shadow(0 0 1px black);
				}

				&_active {
					color: var(--color-accent);
				}
			}

		}
	}

	&_type_fullscreen {
		.calendar__container {
			right: -2.2rem;
			top: 5rem;
			border-radius: 5px;
		}

		:deep(.dp__month_year_row) {
			height: 6rem;
			padding: 0 1rem;
		}

		.MY-controls {
			font-size: 1.8rem;

			.icons {
				img {
					width: 1rem;
					height: 1.5rem;
				}
			}
		}

		:deep(.dp__menu) {
			margin: 0 auto;
			padding-bottom: 3rem;

			.dp__calendar_header_item {
				height: 4rem;
				padding: 0;
				width: 4rem;
				font-size: 1.4rem;
				line-height: 4rem;
			}

			.dp__cell_inner {
				height: 4rem;
				padding: 0;
				width: 4rem;
				font-size: 2rem;
				line-height: 2.5rem;
			}
		}
	}
}

.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
