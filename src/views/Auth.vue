<template>
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
</template>
<script>
export default {
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      errorPassOrUserName: false,
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
  },
};
</script>
<style>
</style>