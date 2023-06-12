<template>
	<div class="heading">
		<p
			v-sane-html="text"
		/>
	</div>
</template>
<script lang="ts" setup>
interface Props {
	text: string
}

defineProps<Props>()
</script>
