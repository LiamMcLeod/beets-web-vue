 <style>
</style>
 <template>
  <section id="player" class="container">
        <!-- &#8963; -->
        <div class="container">
            <button onclick="openNav()" id="moreButton" class="align-center btn btn-primary btn-action circle more-button hidden">
                <i class="icon icon-arrow-up"></i>
            </button>
            <button onclick="closeNav()" id="nomoreButton" class="align-center btn btn-primary btn-action circle more-button hidden">
                <i class="icon icon-arrow-down"></i>
            </button>
        </div>
        <audio></audio>
        <div class="columns">
            <div class="column col-3 text-center">
                <!-- todo  -->
                <a href="javascript:void(0)" class="btn btn-link" id="btnPrevious">Previous</a>
                <a href="javascript:void(0)" class="btn btn-link" id="btnPlay">Play</a>
                <a href="javascript:void(0)" class="btn btn-link" id="btnPause">Pause</a>
                <!-- todo -->
                <a href="javascript:void(0)" class="btn btn-link" id="btnNext">Next</a>
            </div>

            <div class="column col-6">
                <span id=seek>
                    <input type="range" value="0" step="any" class="slider" id="seekSlider">
                </span>
            </div>
            <div class="column col-1 text-center">
                <span id="times">
                    <span class="currentTime">
                    </span>
                    <span>/</span>
                    <span class="totalTime">
                    </span>
                </span>
            </div>

            <div class="column col-2">
                <span id=volume>
                    <input type="range" min="0" max="1" value="1" step=".05" class="slider" id="volumeSlider">
                </span>
            </div>
        </div>
    </section>
 </template>
 <script>
export default {
  mixins: [],
  props: {
    /** Parsed to the template **/
    item: {
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

</script> 
