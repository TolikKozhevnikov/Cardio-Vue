
    
<template>
  <div class="Home">
    <div>
      <v-app-bar color="green lighten-4" absolute dense>
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
          >Перейти в диагностику</v-btn
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

    <v-parallax dark src="../img/13.png" height="350" class="pt-4">
      <v-row align="center" justify="center">
        <v-col class="text-center black--text" cols="12">
          <div>
            <h1 class="display-4 text-uppercase font-weight-thin text-sm-6">
              <span class="font-weight-light">Кардио</span> <span>диагноз</span>
            </h1>
          </div>

          <h3 class="font-weight-light">
            Диагностика сердечно-сосудистых заболеваний онлайн
          </h3>
        </v-col>
      </v-row>
    </v-parallax>

    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-card class="pa-4">
            <h4 class="font-weight-light">
              Веб-приложение предназначено для помощи постановки диагноза и
              подтверждения поставленного диагноза болезней сердечно-сосудистой
              системы.
            </h4>
            <h4 class="font-weight-light">
              Это может быть полезно как для начинающих, так и для опытных
              врачей.
            </h4>
            <h4 class="font-weight-light">Чтобы начать диагностику нажмите

              <router-link class="green--text" to="/UserPage"> сюда </router-link>
            </h4>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-parallax dark height="200" src="../img/8.png">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-3 font-weight-thin mb-4">Как это работает?</h1>
          </v-col>
        </v-row>
      </v-parallax>
      <v-row class="pt-4">
        <v-col cols="12" md="12">
          <v-card class="pa-4">
            <h4 class="font-weight-light">
              Диагностика по симптомам:
            </h4>
            <h4 class="font-weight-light">
              Страница разделена на два столбца, в левом симптомы, в правом заболевания.
            </h4>
            <h4 class="font-weight-light">
              Для нахождения заболевания необходимо выбрать симптом одним из способов:
            </h4>
            <h4 class="font-weight-light">
              1. В графе «поиск по симптомам» напечатать существующий симптом (в выпадающем окне появится поиск по существующим симптомам).
            </h4>
            <h4 class="font-weight-light">
              2. Найти существующий симптом в окне ниже (их можно отсортировать по типам обследования)
            </h4>
            <h4 class="font-weight-light">
              Для того чтобы выбрать симптом необходимо по нему кликнуть.
            </h4>
            <h4 class="font-weight-light">
              После выбора симптома он появится ниже, под заголовком «Выбранные симптомы»
            </h4>
            <h4 class="font-weight-light">
              Так же под окном «заболевания» появится подсказка о наиболее вероятном следующим симптоме. Чтобы добавить симптом из подсказки необходимо нажать кнопку «добавить».
            </h4>
            <h4 class="font-weight-light">
              Для удаления отмеченного симптома необходимо нажать на него в окне «выбранные симптомы», для удаления всех выбранных симптомов, необходимо нажать кнопку «Удалить выбранные симптомы».
            </h4>
            
          </v-card>
          <v-card class="pa-4 mt-4">
            <h4 class="font-weight-light">
              Диагностика по заболеваниям:
            </h4>
            <h4 class="font-weight-light">
              Диагностика по заболеваниям так же поделена на два столбца.
            </h4>
            <h4 class="font-weight-light">
              В левом столбце можно выбрать конкретное заболевание, и просмотреть какие у него симптомы в правом.
            </h4>
            <h4 class="font-weight-light">
              Так же, как и в первом случае для выбора симптома необходимо по нему кликнуть. После выбора симптома количество заболеваний сократится.
            </h4>
            <h4 class="font-weight-light">
              Для того чтобы удалить выбранные симптомы необходимо нажать кнопку начать заново, или перейти на вкладку диагностики по симптомам и удалить необходимый.
            </h4>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      elIsVisible: null,
    };
  },

  methods: {
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
