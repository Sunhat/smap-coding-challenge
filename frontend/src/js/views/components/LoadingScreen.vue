<template>
	<sui-dimmer :active="isLoading" class="loadingscreen">
		<sui-loader />
	</sui-dimmer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('app', ['isLoading']),
	}
}
</script>

<style scoped>
.loadingscreen {
	z-index: 1000000000;
	position: fixed;
}
</style>
