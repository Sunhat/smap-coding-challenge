const mix = require('laravel-mix')
mix
.js('src/js/app.js', 'app/static/js').extract(['vue', 'vuex', 'axios'])
.sass('src/scss/app.scss', 'app/static/css')
.options({
	extractVueStyles: 'app/static/css/components.css',
	globalVueStyles: "src/scss/_global.scss"
})
