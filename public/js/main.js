// Just the usual
require('./jquery.js');
require('./underscore.js');

//* Vue shit
// window.Vue = require('./vue');

window.Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);

var VueRouter = require('vue-router');
Vue.use(VueRouter);

//? https://vuejs.org/v2/guide/components-registration.html
// var upperFirst = require('lodash/upperFirst');
// var camelCase = require('lodash/camelCase');
 
// const requireComponent = require.context(
//     // The relative path of the components folder
//     './components',
//     // Whether or not to look in subfolders
//     false,
//     // The regular expression used to match base component filenames
//     /Base[A-Z]\w+\.(vue|js)$/
// )
// console.log(requireComponent);

// requireComponent.keys().forEach(fileName => {
//   // Get component config
//   const componentConfig = requireComponent(fileName)

//   // Get PascalCase name of component
//   const componentName = upperFirst(
//     camelCase(
//       // Strip the leading `'./` and extension from the filename
//       fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
//     )
//   )
//   console.log(componentName);
//   // Register component globally
//   Vue.component(
//     componentName,
//     // Look for the component options on `.default`, which will
//     // exist if the component was exported with `export default`,
//     // otherwise fall back to module's root.
//     componentConfig.default || componentConfig
//   )
// })

var libraryView = require('./components/LibraryView.vue');
Vue.component('library-view', libraryView);

var musicItem = require('./components/musicItem.vue');
Vue.component('music-item', musicItem);

const app = new Vue({
    routes: [
        {
            path: '/',
            name: 'library',
            component: this.LibraryView
          }
    ],
    el: '#app',
    data: {
        playingItem: {},
        searchQuery: "",
    },
    props: {},
    computed: {},
    filters: {},
    methods: {},
    search: function () {},
})
console.log(app);

//* Beets JS
require('./beets.js');
