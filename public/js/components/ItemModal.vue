 <style>
</style>
 <template>
  <div class="modal" id="main-detail-modal">
      <a @click="close($event)" href="javascript:void(0)" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
          <div class="modal-header">
              <a @click="close($event)" href="javascript:void(0)" class="fright no-decoration">&#9932;</a>
              <div id="main-detail" class="modal-title h5">
                <span class="artist">
                    {{item.artist }}
                </span>
                <span class="album">
                    <span class="albumtitle">
                        {{item.album }}
                    </span>
                    <span class="year">(
                        {{ item.year }})</span>
                </span>
                <span class="title">
                    {{ item.title }}
                </span>
              </div>
          </div>
          <div class="modal-body">
              <div id="extra-detail" class="content text-center">
                  <!-- fix text here and remove center -->
              </div>
          </div>
          <div class="modal-footer">
              <!-- <button class="btn">Close</button> -->
              <!-- <button class="btn btn-primary">Play</button> -->
          </div>
      </div>
  </div>
 </template>
 <script>
export default {
  mixins: [],
  props: {
    /** Parsed to the template **/
  },
  data: function() {
    return {
      item: "",
      hasItem: false,
      error: ""
    };
  },
  created: function() {
    // this.getById();
  },
  mounted: function() {},
  methods: {
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
    close: function(e) {
      //todo fix playback stops when modal is closed
      this.$root.toggleMainDetailView(e);
    }
  }
};
// Main Detail Component
//<a href="javascript:void(0)" class="close fright no-decoration">&#9932;</a>
//         <span class="artist">
//             <%= artist %>
//         </span>
//         <span class="album">
//             <span class="albumtitle">
//                 <%= album %>
//             </span>
//             <span class="year">(
//                 <%= year %>)</span>
//         </span>
//         <span class="title">
//             <%= title %>
//         </span>
//         <div class="container align-center">
//             <button class="play btn btn-primary m-top-15">Play</button>
// </div>

// Extra Detail Component
// <script type="text/template" id="item-extra-detail-template">
//       <!-- TODO make this look better -->
//       <dl>
//           <dt>Track:</dt>
//           <dd>
//               <%= track %>/
//                   <%= tracktotal %>
//           </dd>
//           <% if (disc) { %>
//               <dt>Disc:</dt>
//               <dd>
//                   <%= disc %>/
//                       <%= disctotal %>
//               </dd>
//               <% } %>
//                   <dt>Length:</dt>
//                   <dd>
//                       <%= timeFormat(length) %>
//                   </dd>
//                   <dt>Format:</dt>
//                   <dd>
//                       <%= format %>
//                   </dd>
//                   <dt>Bitrate:</dt>
//                   <dd>
//                       <%= Math.round(bitrate/1000) %> kbps</dd>
//                   <% if (mb_trackid) { %>
//                       <dt>MusicBrainz entry:</dt>
//                       <dd>
//                           <a target="_blank" href="http://musicbrainz.org/recording/<%= mb_trackid %>">view</a>
//                       </dd>
//                       <% } %>
//                           <dt>File:</dt>
//                           <dd>
//                               <a target="_blank" class="download" href="../api/<%= id %>/file">download</a>
//                           </dd>
//                           <% if (lyrics) { %>
//                               <dt>Lyrics:</dt>
//                               <dd class="lyrics">
//                                   <%= lyrics %>
//                               </dd>
//                               <% } %>
//                                   <% if (comments) { %>
//                                       <dt>Comments:</dt>
//                                       <dd>
//                                           <%= comments %>
//                                       </dd>
//                                       <% } %>
//       </dl>
//
</script>
</script>