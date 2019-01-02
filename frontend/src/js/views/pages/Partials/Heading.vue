<template>
	<header>
		<sui-menu pointing secondary class="huge">
			<router-link
				tag="sui-menu-item"
				active-class="active"
				v-for="(item, index) in items"
				:key="index"
				:to="item.to">
				{{ item.text }}
			</router-link>
		</sui-menu>
	</header>
</template>


<script>
export default {
	data () {
		return {
			items: [
				{
					to: '/',
					text: 'Consumers'
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
header {
	background-color: #fff;
	margin-bottom: 1em;
}
</style>
