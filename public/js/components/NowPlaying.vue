<style>
</style>
 <template>
    <div v-if="item" id="more-panel" class="container">
        <a href="javascript:void(0)" class="close-more-button" @click="$root.toggleNowPlaying($event)">&times;</a>
        <div id="more-panel-detail">
          <span class="artist">
              {{ item.artist }}
          </span>
          <span class="album">
              <span class="albumtitle">
                  {{ item.album }}
              </span>
              <span class="year">(
                  {{ item.year }})</span>
          </span>
          <span class="title">
              {{ item.title }}
          </span>
          <div class="container align-center">
              <button class="play btn btn-primary m-top-15">Play</button>
          </div>
        </div>
    </div>
 </template>
 <script>
export default {
  mixins: [],
  props: {
    /** Parsed to the template **/
    // item: {
    //   type: Object,
    //   default: null,
    //   required: false
    // }
  },
  data: function() {
    return {
      item: {},
      itemId: null
    };
  },

  mounted: function() {},
  methods: {
    test: function(e) {
      alert("Hello World! " + e);
    },
    render: function(id) {
      // console.log("Render called");
      this.itemId = id;
      this.getById();
    },
    getById: function(e) {
      this.$http.get("/api/" + this.itemId).then(function(res) {
        if (res.data) {
          this.item = res.data;
        } else {
          this.hasItems = 0;
          this.error = "There was an error with your request";
        }
      });
    },
    closeNav: function() {
      $("#more-panel").css({
        height: "0"
      });
      $("#moreButton").removeClass("hidden");
      $("#nomoreButton").addClass("hidden");
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