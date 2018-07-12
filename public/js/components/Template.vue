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
</script>