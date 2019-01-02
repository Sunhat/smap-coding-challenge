<template>
	<div>
		<sui-modal v-model="open">
			<template v-if="consumer">
				<sui-modal-header>Delete Consumer: {{ consumer.name }}</sui-modal-header>
				<sui-modal-content>
					<sui-modal-description>
						<sui-message negative>
						<sui-message-header>Are you sure you would like to delete this Consumer?</sui-message-header>
							<p>This action is irreversable.</p>
						</sui-message>
					</sui-modal-description>
				</sui-modal-content>
				<sui-modal-actions>
					<sui-button negative @click.native="deleteConsumer">
						Yes, Delete {{ consumer.name }}!
					</sui-button>
					<sui-button color="blue" @click.native="toggle">
						No, wait!
					</sui-button>
				</sui-modal-actions>
			</template>
		</sui-modal>
	</div>
</template>

<script>
export default {
	data () {
		return {
			open: false,
		}
	},
	props: {
		id: {    
			validator: prop => typeof prop === 'string' || typeof prop === 'number' || prop === null,
			required: true
		}
	},
	computed: {
		consumer () {
			if(!this.id) return null
			return this.$store.state.consumers.list.find(item => item.id === this.id) || null
		}
	},
	methods: {
		deleteConsumer () {
			this.$store.dispatch('consumers/destroy', this.id).then(() => {
				this.toggle()
			})
		},
		toggle () {
			this.open = !this.open
		},
	},
	watch: {
		open (to, from) {
			if(to) {
				window.addEventListener('keypress', this.escKeyListener)
			} else {
				window.removeEventListener('keypress', this.escKeyListener)
			}
		}
	}
}
</script>
