// Just the usual
require('./jquery.js');
require('./underscore.js');

//* Vue shit
// window.Vue = require('./vue');

window.Vue = require('vue');
window.Bus = require('vue');
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
var vm = new Vue({
    method: {
        renderModal: function (id) {
            this.$http.get("/api/" + id).then(function (res) {
                console.log(res.data);
            });
        }
    }
});
var libraryView = require('./components/LibraryView.vue');
Vue.component('library-view', libraryView);

var musicItem = require('./components/MusicItem.vue');
Vue.component('music-item', musicItem);

var itemModal = require('./components/ItemModal');
Vue.component('item-modal', itemModal);

const app = new Vue({
    routes: [{
        path: '/',
        name: 'library',
        component: this.LibraryView
    }],
    el: '#app',
    data: {
        playingItem: {},
        searchQuery: "",
    },
    props: {},
    computed: {},
    filters: {},
    methods: {
        search: function () {},
        toggleMainDetailView: function (e, id) {
            if (id) {
                //* reference https://stackoverflow.com/questions/45097278/how-can-i-call-method-in-other-component-on-vue-js-2/50343039#50343039
                //* and https://stackoverflow.com/questions/42990308/vue-js-how-to-call-method-from-another-component
                console.log(id);
                // console.log(window.vm);
                // window.vm.renderModal(id);
            }
            if (e) {
                e.preventDefault();
                var modal = $("#main-detail-modal");
                // console.log(modal);
                if (modal.hasClass("active")) {
                    modal.removeClass("active");
                } else {
                    modal.addClass("active");
                }
            }
        },
    },
})
console.log(app);

//* Beets JS
require('./beets.js');
// TODO FINISH THE MODAL CODE atm is't this.$root.toggleModal or some shit