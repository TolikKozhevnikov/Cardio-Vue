
<template>
  <div class="Xnet">
    
    <div v-if="XnetIsComplite">
      <v-container>
        <v-row>
          <v-col cols="12"  md="12">
            <v-card class="pa-4">
              <h4>
                <p align="justify" class="font-weight-light">
                  Чтобы проанализировать свое рентгеновское изображение нужно
                  выполнить всего два действия:
                </p>
                <v-divider></v-divider>
                <p align="justify" class="font-weight-light">
                  &nbsp;&nbsp;1. Выберите рентгеновское изображение для анализа;
                </p>
                <p align="justify" class="font-weight-light">
                  &nbsp;&nbsp;2. Нажать на кнопку
                  <strong>"Начать проверку"</strong>.
                </p>
                <v-divider></v-divider>
                <p align="justify" class="font-weight-light">
                  &nbsp; После этого наша нейронная сеть оценит состояние
                  легких, а ответ появится перед вами.
                </p>
              </h4>

              <v-file-input
                v-model="file"
                color="green darken-2"
                v-on:change="handleFileUpload()"
                ref="file"
                label="Нажмите, чтобы загрузить рентгеновское изображение"
              ></v-file-input>
              <div v-if="trigerFile">
                <h6 class="font-weight-light red--text">
                  Добавьте рентгеновское изображение в форму выше
                </h6>
              </div>
              <v-divider></v-divider>
              <v-row align="center" justify="center">
                <v-btn
                  class="center"
                  color="green darken-1"
                  text
                  @click="dialog = false"
                  v-on:click="submitFile()"
                >
                  <h5>Начать проверку</h5>
                </v-btn>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="12">
            <v-card class="pa-4">
              <div v-if="WaithingFor">
                <v-row align="center" justify="center">
                  <v-progress-circular
                    :width="3"
                    :size="40"
                    color="green"
                    indeterminate
                    class="center pa-5"
                  ></v-progress-circular>
                </v-row>
              </div>
              <div v-else>
                <div v-if="NormalOrNot">
                  <h4 class="font-weight-light">
                    <p>
                      На вашем рентгеновском изображении нейросеть
                      <strong class="green--text">не обнаружила</strong>
                      патологию.
                    </p>
                    <v-divider></v-divider>
                    <p>
                      Прогнозируемая вероятность составила:<strong>
                        {{ this.info.predicted_probability }}%
                      </strong>
                    </p>
                  </h4>
                </div>
                <div v-else>
                  <h4 class="font-weight-light">
                    <p>
                      На вашем рентгеновском изображении нейросеть
                      <strong class="red--text">обнаружила</strong>
                      патологию.
                    </p>
                    <v-divider></v-divider>
                    <p>
                      Доверительная вероятность составила:
                      <strong>{{ this.info.predicted_probability }}%</strong>
                    </p>
                  </h4>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      trigerFile: false,
      XnetIsComplite: true,
      NormalOrNot: "",
      name: "",
      file: "",
      info: "",
      WaithingFor: false,
    };
  },
  methods: {
    uploadMore() {
      (this.XnetIsComplite = true), (this.NormalOrNot = "");
    },
    submitFile() {
      if (this.file != "") {
        this.WaithingFor = true;
        this.XnetIsComplite = false;
        let formData = new FormData();
        if (localStorage.getItem("username") == null) {
          this.name = "NoName";
        } else {
          this.name = localStorage.getItem("username");
        }

        formData.append("title", this.name);
        if (this.file != null) {
          formData.append("image", this.file);
          axios
            .post("http://192.168.43.82:8001/xnet/xnetapi", formData)
            .then((response) => {
              (this.info = response.data),
                (this.XnetIsComplite = false),
                (this.WaithingFor = false);
              if (this.info.predicted_label == "normal") {
                this.NormalOrNot = true;
              } else if (this.info.predicted_label == "not normal") {
                this.NormalOrNot = false;
              }
            })
            .catch(function () {
              console.log("FAILURE!!");
            });
        }
      } else {
        this.trigerFile = true;
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    mounted() {
      this.NormalOrNot = "";
    },
  },
};
</script>
  