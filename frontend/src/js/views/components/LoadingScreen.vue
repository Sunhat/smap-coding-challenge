<template>
	<div v-if="isLoading">
		<sui-dimmer :active="true" class="loadingscreen">
			<sui-loader />
		</sui-dimmer>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters('app', ['isLoading']),
	}
}
</script>

<style scoped>
div {
	position: absolute;
	z-index:1000000000;
}
.loadingscreen {
	z-index:1000000000;
	position: fixed;
}
</style>
