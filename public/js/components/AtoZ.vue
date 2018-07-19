<style>
</style>
<template>
  <aside id="a-to-z" class="p-top-8">
    <div class="text-bold text-center p-top-8">
      <a @click="libraryFetch('*')" href="#">*</a>
    </div>
    <div class="text-bold text-center p-top-8">
      <a @click="libraryFetch('0')" href="#">#</a>
    </div>
    <div v-for="(i, index) in alphanum" class="text-bold text-center p-top-8">
      <a @click="libraryFetch(i)" href="#">{{ i }}</a>
    </div>
  </aside>
</template>
<script>
export default {
  mixins: [],
  props: {
    /** Parsed to the template **/
  },
  data: function() {
    return {
      alphanum: []
    };
  },
  created: function() {
    for (var i = 0; i <= 25; i++) {
      this.alphanum[i] = String.fromCharCode(i + 65);
    }
    // this.alphanum.unshift("#");
    // this.alphanum.unshift("*");
  },
  mounted: function() {},
  methods: {
    test: function(e) {},
    libraryFetch: function(q) {
      this.$root.$refs.parent.$refs.library.searchItems(q);
    }
  }
};
</script>