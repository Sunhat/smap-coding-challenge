export default {
	data () {
		return {
			open: false,
		}
	},
	methods: {
		toggle () {
			this.open = !this.open
		},
		escKeyListener (e) {
			if(e.key === 'Escape') {
				this.toggle()
			}
		}
	},
	watch: {
		open (to, from) {
			if(to) {
				window.addEventListener('keydown', this.escKeyListener)
			} else {
				window.removeEventListener('keydown', this.escKeyListener)
			}
		}
	}
}