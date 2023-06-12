<template>
	<label
		class="checkbox"
	>
		<input
			v-model="checked"
			type="checkbox"
		>
	</label>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue"

interface Props {
	isChecked?: boolean;
	checkboxName: string;
}

const props = withDefaults(defineProps<Props>(), {
	isChecked: false
})
const checked = ref(props.isChecked !== undefined ? props.isChecked : false)
const emit = defineEmits(["checkboxChange"])

watch(() => checked.value, () => {
	emit("checkboxChange", props.checkboxName, checked.value)
})
</script>
<style lang="scss" scoped>
.checkbox {
	width: 2rem;
	height: 2rem;
	border-radius: 5px;
	border: 0.5px solid var(--color-accent);
	position: relative;
	overflow: hidden;

	input {
		opacity: 0;
	}

	&:has(>input:checked):before {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1;
		background-image: url("@/assets/img/check-mark.svg");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
	}

}

</style>
