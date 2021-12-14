<template>
  <v-app>
    <div>
      <v-app-bar elevation="4" color="green lighten-4" dense>
        <v-toolbar-title class="text-left text-uppercase font-weight-regular">
          <span class="font-weight-light">Кардио</span>
          <span>диагноз</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="black"
          elevation="2"
          outlined
          class="text-uppercase"
          @click="goToUserPage()"
          >Вернуться в диагностику</v-btn
        >
        &nbsp;&nbsp;&nbsp;
        <div v-if="elIsVisible">
          <v-btn
            color="black"
            elevation="2"
            outlined
            class="text-uppercase"
            @click="goToPage()"
            >Войти</v-btn
          >
        </div>
        <div v-else>
          <v-btn
            color="black"
            elevation="2"
            outlined
            class="text-uppercase"
            @click="goToPage()"
            >Выйти</v-btn
          >
        </div>
      </v-app-bar>
    </div>
    <v-container>
      <v-parallax dark height="200" src="../img/2.png">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="font-weight-thin text-sm-h2 text-lg-h1">Авторизация</h1>
          </v-col>
        </v-row>
      </v-parallax>
      <v-row>
        <v-col cols="12" md="12">
          <v-card class="pa-4">
            <b-form @submit="login">
              <div class="form-group">
                <label for="username">Логин:</label>
                <b-input
                  v-model="username"
                  type="text"
                  id="username"
                  placeholder="Введите ваш логин"
                ></b-input>
              </div>
              <div class="form-group">
                <label for="password">Пароль:</label>
                <b-input
                  v-model="password"
                  type="password"
                  id="password"
                  placeholder="Введите пароль"
                ></b-input>
              </div>
              <div v-if="errorPassOrUserName">
                <h6 class="font-weight-light red--text">
                  Неверное имя пользователя или пароль
                </h6>
              </div>
              <v-btn
                color="success"
                @click="dialog = false"
                v-on:click="login"
                type="submit"
              >
                Войти
              </v-btn>

              <v-row align="center" justify="center">
                <p class="mt-3"></p>
              </v-row>
            </b-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      errorPassOrUserName: false,
      elIsVisible: null,
    };
  },

  methods: {
    login(event) {
      event.preventDefault();
      this.axios
        .post(`http://10.12.100.164:8000/auth/token`, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.setLogined(response.data.token);
        })
        .catch((err) => {
          console.error(err), (this.errorPassOrUserName = true);
        });
    },
    setLogined(token) {
      localStorage.setItem("token", token), this.$router.push("/AdminPage");
    },
    goToPage() {
      if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token");
        this.elIsVisible = false;
        this.$router.push("/Auth");
      } else {
        this.elIsVisible = true;
        this.$router.push("/Auth");
      }
    },
    goToUserPage() {
      this.$router.push("/UserPage");
    },
  },
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
};
</script>
<style>
</style>