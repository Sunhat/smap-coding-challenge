<template>
	<div>
		<loading-screen />
		<alert/>
		<heading />
			<router-view></router-view>
	</div>
</template>

<script>
import Heading from 'pages/Partials/Heading'
import LoadingScreen from 'components/LoadingScreen'
import Alert from 'components/Alert'
export default {
	components: {
		Heading,
		LoadingScreen,
		Alert
	},
}
</script>
