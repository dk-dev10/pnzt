import {onMounted, onUnmounted, ref} from 'vue'

export function getHeight(timeout = 200) {
	const height = ref(0)
	onMounted(() => {
		height.value = document.documentElement.clientHeight
		window.addEventListener('resize', checkHeight)
	})
	let heightTimeOut: ReturnType<typeof setTimeout>

	function checkHeight() {
		if (heightTimeOut) clearTimeout(heightTimeOut)
		heightTimeOut = setTimeout(() => {
			height.value = document.documentElement.clientHeight

		}, timeout)
	}

	onUnmounted(() => {
		window.removeEventListener('resize', checkHeight)
	})
	return height
}
export function getWidth(timeout = 100) {
	const width = ref(0)
	onMounted(() => {
		width.value = document.documentElement.clientWidth
		window.addEventListener('resize', checkWidth)
	})
	let widthTimeOut: ReturnType<typeof setTimeout>

	function checkWidth() {
		if (widthTimeOut) clearTimeout(widthTimeOut)
		widthTimeOut = setTimeout(() => {
			width.value = document.documentElement.clientWidth
		}, timeout)
	}

	onUnmounted(() => {
		window.removeEventListener('resize', checkWidth)
	})
	return width
}
