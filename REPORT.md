# Getting started

`cd frontend`

`npm install`

`npm watch`

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

### Dependancies & Tech
- axios for API requests
- Vue
- VueX for storing data in an neat and effective manner 
- VueRouter to enable easy SPA
- lodash for some nice helper functions, larger applications would do better with this
- Semantic UI Vue & Sementic UI CSS
- C3 for charts instead of D3
- Sass/Scss
- ES6, Lazy Loading imports


### Linting
I haven't used a Linting tool, but would usually have one set up for a production project
If I did have more time, I would use one that would block compilation unless code is correct


### Naming conventions
Naming conventions aren't perfect, but I've learned Vue entirely by myself.
In a team, I would be open for any idea/changes that ensure consistency throughout the project.


### Design & Layout
While design is not a primary role of a front-end developer, it is an important role.

I do have a passion for creating intuitive UIs, although this doesn't feel evident in this project,
as I feel there's not too much to consider. e.g. login, menus, etc

I've used Semantic UI for layout/design. On a production project I would use or create a theme 
to get rid of the frameworky feeling.


### VueX Store
VueX has become the default way for storing data for me.

On occasion, I have used the EventBus method to store/retrieve data. When data gets big,
it's clear a dedicated data store is required.

While this is a test project, the concept is large data management, and VueX is hardly any trouble to implement.


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
Delete consumer is done via a modal, with error checking, loading screen, and an alert system in place.

If the API request is successful, the consumer will be removed from the list of consumers



### Consumer Stats
This is the first time I've ever had to create graphs/charts. I decided to use C3 instead of D3.
It looks much quicker & easier to use, however the documentation lacks some clarity on x/y axis data

I didn't format the date as I've run out of time, and couldn't quite understand the documentation.

I'm displaying the data with checkboxes you can filter the dates.


# Final Report
Unfortunately, I didn't get much time over the weekend to work on this,
and only really got to work on this Tuesday afternoon/evening.

The Chart was a challenge for me, but that just means learning the API more.


The rest of the Vue project was relatively simple to build out.

## Other ideas
- Make Chart responsive with aspect ratio or horizontal scrolling
- Add theme/create theme
- Use mutation_types on alert system
- Reconsider how/when data is cached
- Reconsider loading screen implementation (overlay vs inline)
- tests
- Django API could return 500 http status on fail, not just success=False
- API responses could be more consistent
- Multiple selections for deletion or even comparion viewing for stats


## Browsers tested
This was built and tested in the latest version Chrome & FireFox



## API Calls
I deicided against using all API Endpoints, but can see the reason for them.
The decisions I've made would be made depending on circumstance and the views of the team.

Maybe:
- pull data for each year and save it, as opposed to all years at once
- server-side caching


### axios.post
I had issues with axios.post/django def post for create.
I looked at another project of mine and found I had used request.body to deal with this issue, although I suspect there's a better way around this. I tried changing `Content-Type` to no avail.

### Updating the api response
I also updated the API response to return the created consumer. This way, I can add it to the list with its ID without making an additional API call.

### Loading screen 
The loading screen uses increment/decrement so it can wait appropriate for VueX actions and their axios requests.

Currently each action needs to individually increment/decrement the loading screen.
Next week, I'd look at using this feature:
https://github.com/vuejs/vuex/pull/1115#issuecomment-451520040

### Any questions or anything I've missed or left out, I'd be happy to answer