 <style>
</style>
 <template>
   <tr>
     <td>
        <!-- todo v-if -->
         <span v-if="$root.playingItem.id==item.id" class="playing">&#9654;</span>
     </td>
     <td>
         {{ item.title }}
     </td>
     <td>
         <button @click="toggleModalView($event)" class="info btn btn-primary hidden"> Info </button>
     </td>
     <td>
         {{ item.artist }}
     </td>
     <td>
         {{ item.album }}
     </td>
     <td hidden class="libraryIndex">{{index}}</td>
   </tr>
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
    },
    index: {
      type: Number,
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
      alert(e);
    },
    toggleModalView: function(e) {
      this.$root.toggleMainDetailView(e, this.item.id);
    }
  }
};
</script>