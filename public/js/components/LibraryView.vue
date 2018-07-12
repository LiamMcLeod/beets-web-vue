<style>
</style>
<template>
  <!-- <span> Hello World! </span> -->
  <tbody>
    <span>
      <music-item 
        v-if="hasItems" 
        v-for="(item,index) in libraryItems" 
        :item="item" 
        @click="selectItem(event)"></music-item>
    </span>  
      
      <!-- @click -->
      <!-- @dblclick="" -->
      <!-- @keyup.enter="" -->
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
      //TODO stuff
      this.clickEvent.clicks++;
      if (this.clickEvent.clicks === 1) {
        var self = this;
        this.clickEvent.timer = setTimeout(function() {
          alert("You clicked " + e);
          // self.result.push(event.type);
          self.clickEvent.clicks = 0;
        }, this.clickEvent.delay);
      } else {
        clearTimeout(this.clickEvent.timer);
        // this.result.push("dblclick");
        this.clickEvent.clicks = 0;
      }
    },
    playItem: function(e) {

    }
  }
};
</script>