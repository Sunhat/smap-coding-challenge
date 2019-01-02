<template>
	<div>
		<loading-screen />
		<heading />
			<router-view></router-view>
	</div>
</template>
import Heading from 'pages/Partials/Heading'
import LoadingScreen from 'components/LoadingScreen'
export default {
	components: {
		Heading,
		LoadingScreen,
	},
}
</script>
