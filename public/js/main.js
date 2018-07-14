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

var libraryView = require('./components/LibraryView.vue');
Vue.component('library-view', libraryView);

var musicItem = require('./components/MusicItem.vue');
Vue.component('music-item', musicItem);

var itemModal = require('./components/ItemModal');
Vue.component('item-modal', itemModal);

var audioPlayer = require('./components/AudioPlayer');
Vue.component('audio-player', audioPlayer);

var nowPlaying = require('./components/NowPlaying');
Vue.component('now-playing', nowPlaying);

var parentView = require('./components/ParentView');
Vue.component('parent-view', parentView);


const app = new Vue({
    el: '#app',
    data: {
        playingItem: {},
        searchQuery: "",
    },
    props: {},
    computed: {},
    filters: {},
    mounted: function () {
        // console.log();
        $("#player audio").bind("ended", {
            app: this
        }, function (e) {
            //TO DO: Your code goes here...
            app.audioEnded();
        });
    },
    methods: {
        toggleNowPlaying: function (e) {
            if (e) {
                e.preventDefault();
                if (!$('#moreButton').hasClass("hidden")) {
                    $('#more-panel').css({
                        'height': '100%'
                    });
                    $('#moreButton').addClass('hidden');
                    $('#nomoreButton').removeClass('hidden');
                } else {
                    $('#more-panel').css({
                        'height': '0'
                    });
                    $('#moreButton').removeClass('hidden');
                    $('#nomoreButton').addClass('hidden');
                }
            }
        },
        audioEnded: function () {
            var i = this.$children[0].$refs.library.libraryItems.indexOf(this.playingItem)
            if (i == -1) {
                return;
            }
            if ((i + 1) >= this.$children[0].$refs.library.libraryItems.length) {
                // End of  list.
                return;
            }
            this.$children[0].$refs.library.playItem(null, i + 1);
        }
    },
})
console.log(app);

//* Beets JS
require('./beets.js');
// TODO FINISH THE MODAL CODE atm is't this.$root.toggleModal or some shit