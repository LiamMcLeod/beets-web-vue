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
                        <!-- TODO make this look better -->
                  <dl>
                      <dt>Track:</dt>
                      <dd>
                          {{ item.track }}/{{ item.tracktotal }}
                      </dd>
                      <span v-if="item.disc">
                      <dt>Disc:</dt>
                      <dd>
                          {{ item.disc }}/{{ item.disctotal }}
                      </dd>
                      </span>
                      <dt>Length:</dt>
                      <dd>
                          {{ timeFormat(item.length) }}
                      </dd>
                      <dt>Format:</dt>
                      <dd>
                          {{ item.format }}
                      </dd>
                      <dt>Bitrate:</dt>
                      <dd>
                      {{ Math.round(item.bitrate/1000) }} kbps
                      </dd>
                      <span v-if="item.mb_trackid">
                      <dt>MusicBrainz entry:</dt>
                      <dd>
                          <a target="_blank" :href='"http://musicbrainz.org/recording/"+item.mb_trackid'>view</a>
                      </dd>
                      </span>
                      <dt>File:</dt>
                      <dd>
                          <a target="_blank" class="download" :href='"../api/"+ item.id +"/file"'>download</a>
                      </dd>
                      <span v-if="item.lyrics">
                          <dt>Lyrics:</dt>
                          <dd class="lyrics">
                              {{ item.lyrics }}
                          </dd>
                      </span>
                      <span v-if="item.comments">
                        <dt>Comments:</dt>
                        <dd>
                            {{ item.comments }}
                        </dd>
                      </span>
                </dl>
              </div>
          </div>
          <div class="modal-footer">
              <!-- <button class="btn">Close</button> -->
              <button @click="playClick()" class="btn btn-primary">Play</button>
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
      error: "",
      itemId: null
    };
  },
  created: function() {
    // this.getById();
  },
  mounted: function() {},
  methods: {
    timeFormat: function() {
      if (this.item.length) {
        // todo shit
      }
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
    timeFormat: function(secs) {
      if (secs == undefined || isNaN(secs)) {
        return "0:00";
      }
      secs = Math.round(secs);
      var mins = "" + Math.floor(secs / 60);
      secs = "" + secs % 60;
      if (secs.length < 2) {
        secs = "0" + secs;
      }
      return mins + ":" + secs;
    },
    playClick: function() {
      this.$parent.$refs.library.playItem(null, null, this.itemId);
    },
    close: function(e) {
      //todo fix playback stops when modal is closed
      this.$root.$refs.parent.toggleMainDetailView(e);
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
