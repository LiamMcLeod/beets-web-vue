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
    this.fetchItems();
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

      var index = this.getActualIndex(e);
      //? Fallback in case problems present with either index fetching methods
      // this.getIndexByRow(e);
      this.selectItem(e);
      // console.log(index);
      // console.log(this.libraryItems[index]);
      // var url = "/api/" + this.libraryItems[index].id + "/file";
      //$("#player audio").attr("src", url);
      // Controls playback
      // $("#player audio")
      //   .get(0)
      //   .play();
      // if (this.playingItem != null) {
      //   this.playingItem.entryView.setPlaying(false);
      // }
      // item.entryView.setPlaying(true);
      // this.playingItem = item;
      //TODO Build the template here
      // this.nowPlaying(item);
    },
    getActualIndex: function(e) {
      $(e.srcElement.parentElement).each(function() {
        var index = $(this).find(".libraryIndex");
        // console.log(index[0].innerHTML);
        index = index[0].innerHTML;
        // console.log(index);
        return index;
      });
    },
    getIndexByRow: function(e) {
      $(e.srcElement.parentElement).each(function() {
        var index = $(this).find(".libraryIndex");
        // Could also use innerHtml prop on å[0] for more reliability
        // console.log(index.context.rowIndex - 1);
        index = index.context.rowIndex - 1;
        // console.log(index);
        return index;
      });
    }
  }
};
</script>