# Webpack
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

This checks for a file called hot, and if it exists returns http://localhost:8080 in the template. 
The file gets created on `npm run watch` and deleted on `npm run production`


# Project

### Dependancies
- axios for API requests
- VueX for storing data in an neat and effective manner 
- VueRouter to enable easy SPA
- lodash for some nice helper functions, larger applications would do better with this
- Semantic UI Vue & Sementic UI CSS


### Linting
I haven't used a Linting tool as I wanted to get this done quick.
If I did have more time, I would use one that would block compilation unless code is correct


### Naming conventions
Naming conventions aren't perfect, but I've learned Vue entirely by myself.
In a team, I would be open for any idea/changes that ensure consistency throughout the project.


### Main Tech
- ES6, Lazy Loading imports
- Vue
- Sass/Scss


### Design & Layout
While design is not a primary role of a front-end developer, it is an important role.

I do have a passion for creating intuitive UIs, although this doesn't feel evident in this project,
as I feel there's not too much to consider. e.g. login, menus, etc

I've used Semantic UI for layout/design. On a production project I would use or create a theme 
to get of the frameworky feeling.


### VueX Store
VueX has become the default way for storing data for me.

On occasion, I have used the EventBus method to store/retrieve data. When data gets big,
it's clear a dedicated data store is required.

While this is a test project, the concept is large data management, and VueX isn't hardly any trouble to implement.


### Alert system
I copied this alert system over again, from another project of mine. It's bugged and incomplete, but I thought it would be a good example of work, regardless.

In future, I'd consider using `npm install --save vue-notification` instead of building my own


## Consumers.vue
The data is displayed in a simple table, with the Customer name, voltage, and buttons.

To filter the data, I've added a `<select></select>` field, although I did consider separating each voltage type
into it's own table. 

I would've made the table "sortable" - a feature the Semantic UI library has, but isn't implemented in the `semantic-ui-vue` port.
If I had more time, I'd contribute to the repo and add this feature.	


### Delete Consumer
Deleting a Consumer appears to give a 405 error method 'DELETE' not allowed.
I'm not sure 


