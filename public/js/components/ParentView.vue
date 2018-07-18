<style>
</style>
 <template>
        <div class="container">
            <header class="columns">
                <div class="column col-3 text-center">
                    <a href="/">
                      <img src="/public/beets.png" class="brand-img">
                    </a>
                    <!-- 
                      Image Credit https://github.com/k-syusteem
                      https://github.com/beetbox/beets/pull/2935
                     -->
                </div>
                <div id="header" class="column col-6">
                    <ul class="tab tab-block">
                        <li class="tab-item">
                            <a href="javascript:void(0)" @click="libraryTab($event)" id="library-tab" class="active">Library</a>
                        </li>
                        <li class="tab-item" v-show="searchTabShow">
                            <a href="javascript:void(0)" @click="searchTab($event)" id="search-tab">Search</a>
                        </li>
                    </ul>
                </div>
                <div class="column col-3">
                    <div class="input-group input-inline p-top-8">
                        <form id="queryForm" @submit.prevent="submit()">
                            <input class="form-input" name="search" type="search" id="query" placeholder="Search" v-model="searchQuery" @keyup.enter="submit()">
                        </form>
                        <button @click="submit($event)" id="searchButton" class="btn btn-primary input-group-btn">Search</button>
                    </div>
                </div>
            </header>

            <!-- Library View -->
            <main>
                <section id="library-view" class="container">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th></th>
                                <th>Artist</th>
                                <th>Album</th>
                            </tr>
                        </thead>
                        <tbody id="library" is="library-view" ref="library" v-show="libraryShow"> </tbody>
                        <tbody id="search" is="library-view" :search-term="searchQuery" ref="search" v-show="searchShow"> </tbody>
                    </table>
                </section>
                <!-- todo finish modal -->
                <item-modal ref="modal"></item-modal>
            </main>

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
      searchTabShow: false,
      searchShow: false,
      libraryShow: true,
      playingItem: {},
      searchQuery: ""
    };
  },

  mounted: function() {},
  methods: {
    toggleMainDetailView: function(e, id) {
      if (e) {
        if (id) {
          this.$refs.modal.render(id);
        }
        e.preventDefault();
        var modal = $("#main-detail-modal");
        // console.log(modal);
        if (modal.hasClass("active")) {
          modal.removeClass("active");
        } else {
          modal.addClass("active");
        }
      }
    },
    libraryTab: function(e) {
      if (this.searchQuery == "") {
        this.searchTabShow = false;
      }
      this.searchShow = false;
      this.libraryShow = true;
      $("#search-tab").removeClass("active");
      $("#library-tab").addClass("active");
    },
    searchTab: function(e) {
      this.searchTabShow = true;
      $("#search-tab").addClass("active");
      this.libraryShow = false;
      this.searchShow = true;
      $("#library-tab").removeClass("active");
      $("#search-tab").addClass("active");
    },
    submit: function(e) {
      // e.preventDefault();
      if (this.searchQuery == "") {
        this.searchTabShow = false;
        this.libraryShow = true;
        $("#library-tab").addClass("active");
      } else if (this.searchQuery) {
        this.searchTab();
        this.$refs.search.searchItems();
      }
    },
    eventStopProp: function(e) {}
  }
};
</script>