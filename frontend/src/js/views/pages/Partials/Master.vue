<template>
	<div>
		<transition name="fade">
			<div v-if="isLoading" class="loading-wrapper"><loading-screen /></div>
		</transition>
		<alert/>
		<heading />
		<sui-container>
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</sui-container>
		<footer></footer>
	</div>
</template>

<script>
import Heading from 'pages/Partials/Heading'
import LoadingScreen from 'components/LoadingScreen'
import Alert from 'components/Alert'
import { mapGetters } from 'vuex'
export default {
	components: {
		Heading,
		LoadingScreen,
		Alert
	},
	computed: {
		...mapGetters('app', ['isLoading']),
	}
}
</script>
<style scoped>
.loading-wrapper {
	position: absolute;
	z-index:999999999;
}
</style>

