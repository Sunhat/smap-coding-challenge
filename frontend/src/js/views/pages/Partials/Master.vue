<template>
	<div>
		<loading-screen />
			<router-view></router-view>
	</div>
</template>
import LoadingScreen from 'components/LoadingScreen'
export default {
	components: {
		LoadingScreen,
	},
}
</script>
