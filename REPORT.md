## Webpack
After following the instructions to install requirements the backend project,
I decided to use webpack, but to save time on configuration, I used Laravel Mix v2 (latest is v4), copied over from a personal Vue/Django project. I do have experience with writing Webpack 4 configs, although I've got nothing for this setup.

### Laravel Mix

Laravel Mix is another layer over Webpack, to quickly get up and running with a configuration, and, what they say
"provides a configuration for 80% use case."

The commands are:
`npm run watch`
`npm run production`

Although Laravel Mix supports a few more commands, I didn't add those to package.json

### asset_path
In addition to the Laravel Mix npm package, I had to write `app/templatetags/asset_path.py`