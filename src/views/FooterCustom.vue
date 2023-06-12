<template>
	<Footer class="customFooter">
		<h2>Custom Footer</h2>
		<ul>
			<li
				v-for="(item, idx) in footerList"
				:key="idx"
			>
				{{ item }}
			</li>
		</ul>
	</Footer>
</template>

<script>
export default {
	data() {
		return {
			footerList: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Amet aliquam'.split(' ')
		}
	},
}
</script>

<style lang="scss" scoped>
.customFooter {
	width: 100%;
	display: flex;

	ul {
		width: 40%;
		margin-left: auto;
		list-style: none;
		columns: 2;

		li {
			margin-bottom: 10px;
		}
	}
}
</style>
