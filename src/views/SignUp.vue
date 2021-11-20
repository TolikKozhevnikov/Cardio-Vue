<template>
  <v-container>
    <v-parallax dark height="200" src="../img/2.png">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="font-weight-thin text-sm-h2 text-lg-h1">Регистрация</h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row>
      <v-col cols="12" md="12">
        <v-card class="pa-4">
          <b-form @submit="register">
            <div class="form-group">
              <label for="username">Придумайте логин:</label>
              <b-input
                v-model="username"
                type="text"
                id="username"
                placeholder="Логин пользователя"
              ></b-input>
              <p>
                <small class="text-muted"
                  >Минимальная длина логина 5 символов</small
                >
              </p>
            </div>
            <div class="form-group">
              <label for="username">Введите свой Email:</label>
              <b-input
                v-model="email"
                type="text"
                id="email"
                placeholder="Email"
              ></b-input>
              <p>
                <small class="text-muted"
                  >Введите свою почту в формате example@gmail.com</small
                >
              </p>
            </div>

            <div class="form-group">
              <label for="password">Придумайте пароль:</label>
              <b-input
                v-model="password"
                type="password"
                id="password"
                placeholder="Пароль"
              ></b-input>
              <p>
                <small class="text-muted"
                  >Минимальная длина пароля 6 символов</small
                >
              </p>
            </div>
            <div class="form-group">
              <label for="repeatPassword">Повторите пароль:</label>
              <b-input
                v-model="repeatPassword"
                type="password"
                id="repeatPassword"
                placeholder="Повторите пароль"
              ></b-input>
              <p><small class="text-muted">Пароли должны совпадать</small></p>
            </div>
            <div v-if="errorSingUp">
              <h6 class="font-weight-light red--text">Некорректные данные</h6>
            </div>
            <v-btn color="success" v-on:click="register" type="submit">
              Зарегитрироваться
            </v-btn>
            <p class="mt-3">
              Уже есть аккаунт? <router-link to="/Auth">Вход</router-link>
            </p>
          </b-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="text-h5 font-weight-light">
            Вы успешно зарегистрированы
          </v-card-title>

          <v-card-text>
            <h5 class="font-weight-light">
              Для перехода на страницу авторизации нажмите
              <router-link to="/Auth">сюда</router-link>
            </h5>
          </v-card-text>

          <v-card-actions> </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorSingUp: "",
      dialog: false,
    };
  },
  methods: {
    RoutAuth() {},
    register(event) {
      event.preventDefault();

      this.axios
        .post(`http://192.168.43.82:8001/api/v1/auth/users/`, {
          username: this.username,
          password: this.password,
          email: this.email,
        })
        .catch((err) => {
          console.error(err), (this.errorSingUp = true);
        });
      if (this.errorSingUp != false) {
        this.dialog = true;
      }
    },
  },
};
</script>
<style>
</style>