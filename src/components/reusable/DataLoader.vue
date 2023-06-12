<template>
	<div class="loader" />
</template>
<style lang="scss" scoped>
.loader {
	border: 16px solid #f3f3f3;
	border-top: 16px solid var(--color-accent);
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: spin 2s linear infinite;
	position: absolute;
	left: calc(50% - 60px);
	top: calc(50% - 60px);
	margin: 0;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
