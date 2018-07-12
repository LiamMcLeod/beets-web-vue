 <style>
</style>
 <template>
   <tr>
     <td>
        <!-- todo v-if -->
         <!-- <span class="playing">&#9654;</span> -->
     </td>
     <td>
         {{ item.title }}
     </td>
     <td>
       <!--  todo re-add hidden -->
         <button  @dblclick="testDbl($event)" @click="test($event)" class="info btn btn-primary"> Info </button>
     </td>
     <td>
         {{ item.artist }}
     </td>
     <td>
         {{ item.album }}
     </td>
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
    }
  },
  data: function() {
    return {
    };
  },
  mounted: function() {},
  methods: {
    test: function(e) {
      
    },
  }
};
</script>