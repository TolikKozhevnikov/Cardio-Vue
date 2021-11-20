<template>
  <div>
      <v-app-bar elevation="4" color="green lighten-4" dense>
        <v-toolbar-title class="text-left text-uppercase font-weight-regular">
          <span class="font-weight-light">Кардио</span>
          <span>диагноз</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        
        <router-link class="text-uppercase" to="/Auth" tag="button">Войти</router-link>
      </v-app-bar>
    </div>
</template>
<script>
export default {
  data: () => ({
    username: localStorage.getItem("username"),
    drawer: false,
    elIsVisible: false,
    group: null,
    selectedItem: 0,
    items: [
      { text: "Главная страница", icon: "mdi-home", route: "/" },
      { text: "Рентгенография", icon: "mdi-grain", route: "/Xnet" },
      { text: "Профиль", icon: "mdi-account", route: "/Profile" },
    ],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  updated() {
    if (localStorage.getItem("auth_token") != null) {
      this.elIsVisible = false;
    } else {
      this.elIsVisible = true;
    }
  },
  methods: {
    get() {
      this.username = localStorage.getItem("username");
    },
    goToPage() {
      if (localStorage.getItem("auth_token") != null) {
        this.$router.push("/Profile");
      } else {
        this.$router.push("/Auth");
      }
    },
    mounted() {
      this.get();
    },
  },
};
</script>
