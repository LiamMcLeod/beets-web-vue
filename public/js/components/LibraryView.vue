<style>
</style>
<template>
  <tbody @click="selectItem($event)" @dblclick="playItem($event)">
    <tr v-if="hasItems" v-for="(item, index) in libraryItems" is="music-item" :item=item :index=index></tr>
  </tbody>
</template>
<script>
export default {
  mixins: [],
  props: {
    /** Parsed to the template **/
    searchTerm: {
      type: String,
      default: null,
      required: false
    }
  },
  data: function() {
    return {
      error: "",
      hasItems: 0,
      libraryItems: [],
      clickEvent: {
        delay: 200,
        clicks: 0,
        timer: null
      }
    };
  },
  created: function() {
    if (!this.searchTerm) this.fetchItems();
  },
  mounted: function() {},
  methods: {
    fetchItems: function() {
      this.$http.get("/api/").then(function(res) {
        if (res.data.items) {
          this.hasItems = res.data.items.length;
          this.libraryItems = res.data.items;
        } else {
          this.hasItems = 0;
          this.error = "There was an error with your request";
        }
      });
    },
    searchItems: function(q = null) {
      this.clearItems();
      var term = q || this.searchTerm;
      var query = "/api/query/" + term;
      if (q == 0) {
        query = "/api/query/%20";
      } else if (q) {
        // TODO OTHER ACTION HERE
        // query = "/title/first/" + term;
      }
      this.$http.get(query).then(function(res) {
        if (res.data.results) {
          if (q && !(q == "*" || q == "0")) {
            //* CHECK START OF THE SONG FOR MATCHING CHAR
            this.libraryItems = res.data.results.filter(function(item) {
              return item.title.charAt(0).toUpperCase() === q.toUpperCase();
            });
            this.hasItems = this.libraryItems.length;
          } else if (q == "*") {
            //* Fetch All
            this.fetchItems();
          } else if (q === "0") {
            //* CHECK START FOR ALL NUMBERS
            this.libraryItems = res.data.results.filter(function(item) {
              return item.title.charAt(0).match("([0-9])+");
            });
            this.hasItems = this.libraryItems.length;
          } else {
            this.hasItems = res.data.results.length;
            this.libraryItems = res.data.results;
          }
        } else {
          this.hasItems = 0;
          this.error = "There was an error with your request";
        }
      });
    },
    fetchItemByArtist: function(q = null) {
      // TODO FINISH
      this.clearItems();
      this.$http
        .get("/api/") //+ (q == null ? this.searchTerm : q))
        .then(function(res) {
          console.log(res);
          if (res.data.results) {
            this.hasItems = res.data.results.length;
            this.libraryItems = res.data.results;
          } else {
            this.hasItems = 0;
            this.error = "There was an error with your request";
          }
        });
    },
    selectItem: function(e) {
      // TODO Double click doesnät work on Mozilla.
      //? Copy+Paste from https://stackoverflow.com/questions/41303982/vue-js-how-to-handle-click-and-dblclick-events-on-same-element
      this.clickEvent.clicks++;
      if (this.clickEvent.clicks === 1) {
        var self = this;
        this.clickEvent.timer = setTimeout(function() {
          // console.log(e);
          $("#library tr").removeClass("selected");
          $("#search tr").removeClass("selected");
          if (!$("#library tr").hasClass("selected")) {
            $("td button").addClass("hidden");
          }
          if (!$("#search tr").hasClass("selected")) {
            $("td button").addClass("hidden");
          }

          var parentEl = $(e.srcElement.parentElement);
          if (parentEl.is("table") || parentEl.is("tbody")) {
          } else {
            parentEl.addClass("selected");
            $(".selected td button").removeClass("hidden");
          }

          self.clickEvent.clicks = 0;
        }, this.clickEvent.delay);
      } else {
        clearTimeout(this.clickEvent.timer);
        this.clickEvent.clicks = 0;
      }
    },
    playItem: function(e, i, itemId) {
      if (!i && !itemId) {
        i = this.getActualIndex(e);
        //? Fallback in case problems present with either index fetching methods
        // var index = this.getIndexByRow(e);
        this.selectItem(e);
      }
      if (itemId) {
        var id = itemId;
        var url = "/api/" + id + "/file";

        this.play(url, id);
        this.$root.playingItem = this.libraryItems.indexOf(id);
      } else {
        var id = this.libraryItems[i].id;
        var url = "/api/" + id + "/file";

        this.play(url, id);
        this.$root.playingItem = this.libraryItems[i];
      }
    },
    play: function(url, id) {
      var player = $("#player audio");
      player.attr("src", url);
      player.get(0).play();
      this.$root.audioIsPaused = false;
      $("#moreButton").removeClass("invisible");
      this.$root.peekNowPlaying();
      this.$root.$refs.playing.render(id);
    },
    getActualIndex: function(e) {
      var index = $(e.srcElement.parentElement).find(".libraryIndex");
      // console.log(index[0].innerHTML);
      index = index[0].innerHTML;
      return index;
    },
    getIndexByRow: function(e) {
      var index = $(e.srcElement.parentElement).find(".libraryIndex");
      // Could also use innerHtml prop on å[0] for more reliability
      // console.log(index.context.rowIndex - 1);
      index = index.context.rowIndex - 1;
      return index;
    },
    clearItems: function() {
      this.libraryItems = {};
    }
  }
};
</script>