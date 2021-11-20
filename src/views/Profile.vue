<template>
  <div v-if="UserIsAuth">
    <v-container>
      <v-parallax dark height="200" src="../img/2.png">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="text-sm-h3 text-lg-h1 font-weight-thin">Профиль</h1>
          </v-col>
        </v-row>
      </v-parallax>
      <v-row>
        <v-col cols="12" md="12">
          <v-card class="pa-4">
            <h3 class="font-weight-normal">
              Вы еще не вошли в свой профиль, либо не зарегистрировались.
            </h3>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-parallax dark height="200" src="../img/2.png">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="text-sm-h3 text-lg-h1 font-weight-thin">Профиль</h1>
          </v-col>
        </v-row>
      </v-parallax>
      <v-row>
        <v-col cols="12" md="12">
          <v-card class="pa-8">
            <h3 class="font-weight-light">
              <p class="font-weight-normal">Здравствуйте, {{ username }}.</p>
              <p>
                Это ваш профиль, чтобы выйти из него нажмите
                <a
                  v-on:click="exitProfile()"
                  class="text-decoration-none red--text"
                  >сюда.</a
                >
              </p>
              {{ XnetUplouds() }}
            </h3>
          </v-card>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="arrayGetGroup"
        :items-per-page="5"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    UserIsAuth: false,
    username: localStorage.getItem("username"),
    value: [],
    arrayGetGroup: [],
    headers: [
      {
        text: "",
        align: "left",
        value: "number",
      },
      { text: "Дата проверки", value: "created_at" },
      { text: "Ответ нейронной сети", value: "status" },
      { text: "Прогнозируемая вероятность", value: "probability" },
    ],
  }),
  methods: {
    get() {
      if (localStorage.getItem("auth_token") != null) {
        this.UserIsAuth = false;
      } else {
        this.UserIsAuth = true;
      }
    },
    exitProfile() {
      localStorage.clear(), this.$router.push("/");
    },
    XnetUplouds() {
      this.axios
        .get(`http://192.168.43.82:8001/xnet/xnetapi`)
        .then((response) => {
          (this.arrayGetGroup = response.data),
            (this.arrayGetGroup = this.arrayGetGroup.filter(
              (e) => e.title == this.username
            ));
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.get();
  },
};
</script>

<style>
</style>