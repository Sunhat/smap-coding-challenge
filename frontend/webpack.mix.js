const mix = require('laravel-mix')

let options = mix.options({})

mix
.js('src/js/app.js', 'app/static/js').extract(['vue', 'vuex', 'axios'])
.sass('src/scss/app.scss', 'app/static/css')
.options({
	extractVueStyles: 'app/static/css/components.css',
	globalVueStyles: "src/scss/_global.scss"
})
.webpackConfig({
	output: {
		publicPath: options.config.hmr ? 'http://localhost:8080/' : '/'
	},
	resolve: {
		alias: {
			scss: path.resolve(__dirname, './src/scss'),
			js: path.resolve(__dirname, './src/js'),
			components: path.resolve(__dirname, './src/js/views/components'),
			pages: path.resolve(__dirname, './src/js/views/pages'),
			mixins: path.resolve(__dirname, './src/js/views/mixins'),
			store: path.resolve(__dirname, './src/js/store'),
		}
	}
})