 <style>
 </style>
 <template>
   <span>
     <td>
         <span class="playing">&#9654;</span>
     </td>
     <td>
       TEST
         <!-- {{ title }} -->
     </td>
     <td>
         <button class="info btn btn-primary hidden"> Info </button>
     </td>
     <td>
         <!-- {{ artist }} -->
     </td>
     <td>
         <!-- {{ album }} -->
     </td>
      <button @click="test($event)" class="info btn btn-primary"> Hello World </button>
   </span>
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
      test: function(e){
      alert("Hello World! "+e);
    },
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
    // </script> 

    
        // <!-- Now Playing -->
        // <!-- <section class="popover popover-right active">
        //     <div class="popover-container">
        //         <div class="card">
        //             <div id="main-detail" class="card-header">
            
        //             </div>
        //             <div id="extra-detail" class="card-body">
             
        //             </div>
        //             <div class="card-footer">
        //                 <button class="btn">&8690;</button>
        //                 <button class="btn btn-primary">Play</button>
        //             </div>
        //         </div>
        //     </div>
        // </section> -->
</script>