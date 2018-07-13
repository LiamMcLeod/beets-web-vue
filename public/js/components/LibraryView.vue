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
    else this.searchItems();
    //Todo something
  },
  mounted: function() {},
  methods: {
    fetchItems: function() {
      this.$http.get("/api/").then(function(res) {
        //! remove in prod
        // console.log(res.data);
        if (res.data.items) {
          this.hasItems = res.data.items.length;
          this.libraryItems = res.data.items;
        } else {
          this.hasItems = 0;
          this.error = "There was an error with your request";
        }
      });
    },
    searchItems: function() {
      this.$http.get("/api/query/" + this.searchTerm).then(function(res) {
        // if (res.data.items) {
        //todo finish
        // this.hasItems = res.data.items.length;
        // this.libraryItems = res.data.items;
        // } else {
        // this.hasItems = 0;
        // this.error = "There was an error with your request";
        // }
      });
    },
    selectItem: function(e) {
      //? Copy+Paste from https://stackoverflow.com/questions/41303982/vue-js-how-to-handle-click-and-dblclick-events-on-same-element
      this.clickEvent.clicks++;
      if (this.clickEvent.clicks === 1) {
        var self = this;
        this.clickEvent.timer = setTimeout(function() {
          // console.log(e);
          $("#library tr").removeClass("selected");
          if (!$("#library tr").hasClass("selected")) {
            $("td button").addClass("hidden");
          }
          $(e.srcElement.parentElement).addClass("selected");
          $(".selected td button").removeClass("hidden");

          self.clickEvent.clicks = 0;
        }, this.clickEvent.delay);
      } else {
        clearTimeout(this.clickEvent.timer);
        // this.result.push("dblclick");
        this.clickEvent.clicks = 0;
      }
    },
    playItem: function(e) {
      var i = this.getActualIndex(e);
      // console.log(index);
      //? Fallback in case problems present with either index fetching methods
      // var index = this.getIndexByRow(e);
      this.selectItem(e);
      // console.log(this.libraryItems[index].id);
      var url = "/api/" + this.libraryItems[i].id + "/file";
      $("#player audio").attr("src", url);
      //Controls playback
      $("#player audio")
        .get(0)
        .play();

      this.$root.playingItem = this.libraryItems[i];
      // Set playing item and component
      // if (this.playingItem != null) {
      //   this.playingItem.entryView.setPlaying(false);
      // }
      // item.entryView.setPlaying(true);
      // this.playingItem = item;
      //TODO Build the template here
      // this.nowPlaying(item);
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
    }
  }
};
</script>