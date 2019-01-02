<template>
    <ul class="alerts">
      <li class="alerts__item" :class="{ 'alerts__item--new': alert.isNew, [alert.type]: alert.type }" v-for="(alert, i) in alerts" :key="i">
        <div>
          <strong>{{ alert.type }}</strong>
          <p>{{ alert.message }}</p>
        </div>
      </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data () {
		return {
			interval: undefined,
		}
	},
    computed: {
		...mapGetters({
			'alerts': 'alert/alerts',
			'newAlerts': 'alert/newAlerts'
		})
    },
    mounted () {
      setInterval(() => {
			if(this.alerts.length > 0 && !this.newAlerts) {
				setTimeout(() => { 
					this.$store.commit('alert/removeAll')
				}, 50)
			}
		}, 1000);
	},
	beforeDestroy () {
		clearInterval(this.interval)
	}
  }
</script>

<style lang="scss" scoped>

strong {
  text-transform: capitalize;
  padding: 0 0 10px;
  display: block;
}
p { margin: 0; }
.alerts {
  position: fixed;
  top: 100px;
  right: -10px;
  transform: translate(100%, 0);
  z-index: 999;
  list-style-type: none;
  &__item {
    border-width: 2px;
    border-style: solid;
    border-color: lighten(black, 60%);
    padding: 20px;
    margin: 20px 0;
    background: white;
    border-radius: 4px;
	min-width: 320px;
	max-width: 440px;
    animation: alertSliderBackwards 0.6s 1 forwards ease-in-out;
    // animation: alertSlider 0.4s 1 backwards ease-in-out;
    &--new {
      animation: alertSliderForwards 0.6s 1 forwards ease-in-out;
    }
    &.error {
      border-color: red;
      strong {
        color: red;
      }
    }
    &.success {
      border-color: green;
      strong {
        color: green;
      }
    }
    &.info {
      border-color: darkblue;
      strong {
        color: darkblue;
      }
    }
  }
}
@keyframes alertSliderBackwards {
  from {
    transform: translate(-130%, 0)
  }
  to {
      transform: translate(0, 0)
  }
}

@keyframes alertSliderForwards {
  from {
    transform: translate(0, 0)
  }
  to {
    transform: translate(-130%, 0)
  }
}

</style>
