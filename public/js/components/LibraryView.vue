<style>
</style>
<template>
  <!-- <span> Hello World! </span> -->
  <tbody>
    <music-item v-if="hasItems" v-for="(item,index) in libraryItems" :item="item"> </music-item>
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
      libraryItems: []
    };
  },
  created: function() {
    this.fetchItems();
  },
  mounted: function() {},
  methods: {
    fetchItems: function() {
      this.$http.get("/api/").then(function(res) {
        console.log(res.data);
        if (res.data.items){
          this.hasItems=res.data.items.length;
          this.libraryItems = res.data.items;
        }
        else {
          this.hasItems=0;
          this.error = "There was an error with your request" 
        }
      });
    }
  }
};
</script>