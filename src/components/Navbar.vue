<template>
  <div>
      <v-app-bar absolute color="green lighten-4" dense>
        <v-toolbar-title class="text-left text-uppercase font-weight-regular">
          <span class="font-weight-light">Кардио</span>
          <span>диагноз</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="elIsVisible">
          <v-btn text class="text-uppercase" @click="goToPage()">Войти</v-btn>
        </div>
        <div v-else>
          <v-btn text class="text-uppercase" @click="goToPage()">Выйти</v-btn>
        </div>
        

      </v-app-bar>
    </div>
</template>
<script>
export default {
  data: () => ({
    elIsVisible: null,
  }),
  updated() {
      if (localStorage.getItem("token") != null) {
        this.elIsVisible = false;
      } else {
        this.elIsVisible = true;
      }
    },
    mounted() {
      if (localStorage.getItem("token") != null) {
      this.elIsVisible = false;
    } else {
      this.elIsVisible = true;
    }
  },
  methods: {
    goToPage() {
      if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token")
        this.elIsVisible = false;
        this.$router.push("/Auth");
      } else {
        this.elIsVisible = true;
        this.$router.push("/Auth");
        
      }
    
    },
    
  },
};
</script>
