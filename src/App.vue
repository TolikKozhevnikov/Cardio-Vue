<template>
  <v-app class="grey lighten-4">
    
    <v-content>
      <router-view/>

    </v-content>
    <Footer />
  </v-app>
  
</template>

<script>


import Footer from '@/components/Footer.vue'

export default {
  name: 'App',

  components: {
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
