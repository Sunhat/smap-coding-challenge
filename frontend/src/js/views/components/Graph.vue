<template>
	<vue-c3 :handler="handler" v-show="showGraph" />
</template>


<script>
import Vue from 'vue'
import VueC3 from 'vue-c3'
export default {
	components: { VueC3 },
	data () {
		return {
			handler: new Vue(),
		}
	},
	props: {
		config: {
			required: true
		},
		data: {
			required: true
		}
	},
	watch: {
		config () {
			this.loadData()
		},
		data () {
			this.loadData()
		}
	},
	computed: {
		showGraph () {
			return this.data.length > 0
		},
		graphData () {
			const mergedConfig = { ...this.config }
			mergedConfig.data.json = [ ...this.data ]
			return mergedConfig
		}
	},
	methods: {
		loadData () {
			console.log(this.graphData)
			this.handler.$emit('init', this.graphData)
		}
	},
	mounted () {
		this.loadData()
	}
}
</script>
