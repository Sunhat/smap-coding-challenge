<template>
	<sui-modal v-model="open">
		<sui-modal-header>Create New Consumer</sui-modal-header>
		<sui-modal-content>
			<sui-modal-description>
 				<sui-form class="form">
					<sui-form-field>
						<label>Consumer Name</label>
						<sui-input v-model="input.name" />
					</sui-form-field>
					<sui-form-field>
						<label>Consumer Type</label>
						<sui-dropdown
							placeholder="Filter By..."
							selection
							:options="consumer_types"
							v-model="input.consumer_type"
						/>
					</sui-form-field>
 				 </sui-form>
			</sui-modal-description>
		</sui-modal-content>
		<sui-modal-actions>
			<sui-button positive @click.native="createConsumer" :disabled="isDisabled">
				Create New Consumer
			</sui-button>
			<sui-button negative @click.native="toggle">
				Cancel
			</sui-button>
		</sui-modal-actions>
	</sui-modal>
</template>

<script>
import ModalMixin from 'mixins/ModalMixin'
import { mapState, mapGetters } from 'vuex'
export default {
	mixins: [ ModalMixin ],
	data () {
		return {
			input: {
				name: '',
				consumer_type: '',
			},
		}
	},
	computed: {
		...mapState('consumers', ['consumer_types']),
		...mapGetters('consumers', ['consumer_type_values']),
		isDisabled () {
			return this.consumer_type_values.indexOf(this.input.consumer_type)=== -1 || this.input.name.length === 0
		}
	},
	watch: {
		open (to) {
			// Clear on open
			if(to) {
				for(let item in this.input) {
					this.input[item] = ''
				}
			}
		}
	},
	methods: {
		createConsumer () {
			this.$store.dispatch('consumers/create', this.input).then(() => {
				this.toggle()
			})
		},
	}
}
</script>


<style scoped>
.form {
	max-width: 300px;
}
</style>
