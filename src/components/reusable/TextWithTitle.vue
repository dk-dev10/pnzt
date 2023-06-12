<template>
	<div class="text-with-title">
		<component
			:is="hnode"
			v-if="title"
			v-sane-html="title"
			class="text-with-title__title"
		/>
		<component
			:is="tnode"
			v-sane-html="text"
			class="text-with-title__text"
		/>
	</div>
</template>

<script setup lang="ts">
import { h } from "vue"
import { type TextTag } from "@/models"

const props = defineProps<{
	titleLevel: number
	textTag: TextTag
	title: string
	text: string | number

}>()

const titleTag = props.titleLevel ? `h${props.titleLevel}` : "div"

const hnode = h(titleTag, {})
const tnode = h(props.textTag, {})

</script>

