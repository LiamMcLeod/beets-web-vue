 <style>
</style>
 <template>

 </template>
 <script>
export default {
  mixins: [],
  props: {
    /** Parsed to the template **/
    item: {
      type: Object,
      default: null,
      required: true
    }
  },
  data: function() {
    return {};
  },

  mounted: function() {},
  methods: {
    test: function(e) {
      alert("Hello World! " + e);
    }
  }
};

//! REMOVE THIS WHEN COMPONENT IS MADE
//  Start of a test template
//  <script type="text/template" id="now-playing-template">
//     <span class="artist">
//         <%= artist %>
//     </span>
//     <span class="album">
//         <span class="albumtitle">
//             <%= album %>
//         </span>
//         <span class="year">(
//             <%= year %>)</span>
//     </span>
//     <span class="title">
//         <%= title %>
//     </span>
//     <div class="container align-center">
//         <button class="play btn btn-primary m-top-15">Play</button>
//     </div>
//

// <div id="more-panel" class="container">
//     <a href="javascript:void(0)" class="close-more-button" onclick="closeNav()">&times;</a>
//     <div id="more-panel-detail">

//     </div>
// </div>
</script>