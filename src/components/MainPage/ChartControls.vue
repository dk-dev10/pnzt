<template>
	<div class="graph-nav">
		<div class="graph-nav__panel">
			<button-link
				v-for="(button, idx) in reactiveButtons"
				:key="idx"
				:path="button.path"
				:title="button.title"
				:text="button.text"
				:is-active="button.isActive"
				:title-level="titleLevel"
				class="graph-nav__link"
				@click="activateButton(idx)"
			/>
		</div>
	</div>
</template>
<script lang="ts" setup>
import ButtonLink from "@/components/reusable/LinkButton.vue"
import { reactive, computed } from "vue"
import { useQueryParams } from "@/use/queryParams"
import type { Button } from "@/models"

interface Props {
	buttons: Button[],
	height?: number,
	width?: number
	titleLevel?: number
}

const props = withDefaults(defineProps<Props>(), {
	height: 6.5,
	width: 11.8,
	titleLevel: 3
})
const emit = defineEmits(["chartChange"])
const reactiveButtons = reactive(props.buttons)
const buttonWidth = computed(() => `${props.width}rem`)
const buttonHeight = computed(() => `${props.height}rem`)
const activateButton = useQueryParams(reactiveButtons, emit)
</script>

<style lang="scss" scoped>
.graph-nav {
	&__panel {
		display: flex;
		justify-content: space-around;
		align-items: stretch;
		margin-bottom: 1rem;
		min-height: v-bind(buttonHeight);
	}

	&__link {
		flex: 0 1 v-bind(buttonWidth);
	}
}
</style>
