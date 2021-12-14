    
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
    <v-tabs color="green darken-1">
      <v-tab :key="1">Заболевания / Все симптомы</v-tab>
      <v-tab :key="2">Добавить симптом / заболевание</v-tab>
      <v-tab :key="3">Изменение типа обследования </v-tab>
      <v-tab :key="4">Настройка базы данных</v-tab>
      <v-tab-item :key="1">
        <v-row class="pt-3">
          <v-col>
            <th class="text-left text-uppercase font-weight-regular px-3">
              Заболевания
            </th>
            <v-sheet elevation="4" class="overflow-y-auto" max-height="650">
              <v-simple-table dense>
                <tbody>
                  <tr
                    @click="ClickSymptomForTable(item.id, item.name)"
                    v-for="item in AllIllness"
                    :key="item.name"
                  >
                    <td class="py-2">{{ item.name }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-sheet>
          </v-col>

          <v-col>
            <th class="text-left text-uppercase font-weight-regular px-3">
              Все симптомы
            </th>
            <v-sheet elevation="4" class="overflow-y-auto" max-height="650">
              <v-simple-table dense>
                <tbody>
                  <tr
                    @click.stop="dialog = true"
                    @click="ClickSymptomForTableOnDialog(item.id, item.name)"
                    v-for="item in IllnessStringTable"
                    :key="item"
                  >
                    <td class="py-2">{{ item.name }}</td>
                    <td class="py-2 font-weight-medium">
                      {{ item.tableLink }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-sheet>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-text class="black--text font-weight-medium pt-5">
              Заболевание:
            </v-card-text>
            <v-card-text class="black--text text-left font-weight-regular">
              {{ Illness }}
            </v-card-text>
            <v-card-text class="black--text font-weight-medium">
              Симптом:
            </v-card-text>
            <v-card-text class="black--text text-left font-weight-regular">
              {{ Symptom }}
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="green darken-1"
                outlined
                @click="ChangeToYes(), (dialog = false)"
              >
                Да
              </v-btn>

              <v-btn
                color="green darken-1"
                outlined
                @click="ChangeToNo(), (dialog = false)"
              >
                Нет
              </v-btn>
              <v-btn
                color="green darken-1"
                outlined
                @click="ChangeToMaybe(), (dialog = false)"
              >
                Может быть
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" outlined @click="dialog = false">
                Закрыть
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-tab-item>
      <v-tab-item :key="2">
        <v-row>
          <v-col>
            <div class="pa-3">
              <th class="text-left text-uppercase font-weight-regular pb-3">
                Добавить симптом
              </th>

              <v-text-field
                v-model="nameSymptom"
                color="green"
                label="Название"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="nameEngSymptom"
                label="Название на английском"
                outlined
                dense
                color="green"
              ></v-text-field>

              <v-select
                v-model="ReliabilitySelected"
                color="green"
                label="Надежность симптома"
                required
                :items="reliability"
              ></v-select>
              <v-col>
                <v-btn
                  color="green darken-1"
                  block
                  outlined
                  @click="SendNewSymptom()"
                >
                  Добавить новый симптом
                </v-btn>
              </v-col>
            </div>
          </v-col>
          <v-col>
            <div class="pa-3">
              <th class="text-left text-uppercase font-weight-regular pb-3">
                Добавить заболевание
              </th>
              <v-text-field
                v-model="IllnessCode"
                label="Код"
                color="green"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="IllnessEngCode"
                label="Код на английском"
                outlined
                dense
                color="green"
              ></v-text-field>
              <v-text-field
                v-model="NameIllness"
                label="Название"
                color="green"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="NameEngIllness"
                label="Название на английском"
                outlined
                dense
                color="green"
              ></v-text-field>
              <v-text-field
                v-model="frequency"
                label="Частота (вероятность)"
                color="green"
                outlined
                dense
              ></v-text-field>
              <v-col>
                <v-btn
                  color="green darken-1"
                  block
                  outlined
                  @click="SendNewIllness()"
                >
                  Добавить новое заболевание
                </v-btn>
              </v-col>
            </div>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item :key="3">
        <v-row class="pt-3">
          <v-col>
            <th class="text-left text-uppercase font-weight-regular px-3">
              Все симптомы
            </th>

            <v-sheet elevation="4" class="overflow-y-auto" max-height="650">
              <v-simple-table dense>
                <tbody>
                  <tr
                    @click="ClickSymptomForTableOnDialog(item.id, item.name)"
                    v-for="item in SymptomAndType"
                    :key="item"
                  >
                    <td class="py-2">{{ item.name }}</td>
                    <td class="py-2 font-weight-medium">
                      {{ item.tableLink }}
                    </td>

                    <td class="py-2 font-weight-medium">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="green darken-3"
                            outlined
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click="SymptomIdForChangeType(item.id)"
                          >
                            {{ item.TypeName }}
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(item, id) in ReturnAllTypeWithoutAll"
                            :key="id"
                            link
                            @click="onChangeSelectedType(item.id)"
                          >
                            <v-list-item-title>{{
                              item.name
                            }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-sheet>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item :key="4">
        <v-conteiner>
          <v-row class="pa-4">
            <v-col>
              <v-card>
                <v-container>
                  <v-row class="px-4 mt-4">
                    <p class="text-left font-weight-regular">
                      Выбранная база данных для пользователей:&nbsp;
                    </p>
                    <p class="text-left text-uppercase font-weight-bold">
                      {{ CurrentBD }}
                    </p>
                  </v-row>
                  <v-row class="pa-4"
                    ><p class="text-left font-weight-regular">
                      Версия базы данных:&nbsp;
                    </p>
                    <p class="text-left text-uppercase font-weight-bold">
                      {{ BdVersion }}
                    </p>
                  </v-row>
                  <v-row class="px-4 mt-4">
                    <p>Выберите базу данных для отображения пользователям:</p>
                  </v-row>
                  <v-select
                    v-model="selected"
                    @change="onChangeSelectedDB()"
                    color="green"
                    required
                    :items="ListDB"
                    item-text="name"
                    item-value="id"
                    label="Нажмите, чтобы выбрать существующую БД"
                  ></v-select>
                </v-container>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-container>
                  <v-row class="px-4 mt-4">
                    <p class="text-left font-weight-regular">
                      Выбранная база данных для редактирования:&nbsp;
                    </p>
                    <p class="text-left text-uppercase font-weight-bold">
                      {{ GetCurrentBDForAdmin }}
                    </p>
                  </v-row>
                  <v-row class="pa-4"
                    ><p class="text-left font-weight-regular">
                      Версия базы данных:&nbsp;
                    </p>
                    <p class="text-left text-uppercase font-weight-bold">
                      {{ BdVersion }}
                    </p>
                  </v-row>
                  <v-row class="px-4 mt-4">
                    <p>Выберите базу данных для редактирования:</p>
                  </v-row>
                  <v-select
                    v-model="selectedForAdmin"
                    @change="onChangeSelectedDBForAdmin()"
                    color="green"
                    required
                    :items="ListDB"
                    item-text="name"
                    item-value="id"
                    label="Нажмите, чтобы выбрать БД для редактирования"
                  ></v-select>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="pa-4">
            <h5 class="font-weight-thin">
              <input
                class="pa-4"
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
            </h5>
            <v-btn
              color="success"
              outlined
              @click="dialog = false"
              v-on:click="submitFile()"
            >
              Загрузить базу данных
            </v-btn>
          </v-row>
        </v-conteiner>
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      url: "http://10.12.100.164:8000/api",
      search: "",
      file: null,
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
      ],
      TypeSelectedToChange: null,
      frequency: null,
      IdIllnessToChange: null,
      IdSymptomToChange: null,
      ReliabilitySelected: null,
      nameSymptom: null,
      nameEngSymptom: null,
      TypeSelected: null,
      NameIllness: null,
      NameEngIllness: null,
      IllnessCode: null,
      IllnessEngCode: null,
      reliability: ["Низкая", "Средняя", "Высокая"],
      TypeOfSurvey: ["Низкая", "Средняя", "Высокая"],
      dialog: false,
      items: {},
      i: 0,
      j: 0,
      Illness: null,
      Symptom: null,
      CountSymptom: null,
      CountIllness: null,
      AllSymptom: null,
      AllIllness: null,
      AllIllness1: null,
      AllIllness2: null,
      AllTable: null,
      SymptomId: null,
      dsf: null,
      dataFlag: true,
      visibleSelectedSimptom: false,
      illnessSelected: null,
      flagSimptom: false,
      CheckSymptom: null,
      IllnessStringTable: null,
      AllType: null,
      ReturnAllTypeWithoutAll: null,
      BdVersion: null,
      SymptomAndType: null,
      SymptomIdForChangeTypeInt: null,
      ListDB: null,
      StatusChangeSelectedBD: null,
      GetCurrentBDForAdmin: null,
      CurrentBD: null,
      name: "",
      elIsVisible: null,
      info: "",
      headerForRequest: {
        headers: {
          Authorization: "Token " + localStorage.token,
        },
      },
    };
  },
  methods: {
    submitFile() {
      let formData = new FormData();
      if (localStorage.getItem("username") == null) {
        this.name = "NoName";
      } else {
        this.name = localStorage.getItem("username");
      }

      formData.append("title", this.name);
      formData.append("file", this.file);
      this.axios
        .post(this.url + "/FileUploadView", formData, this.headerForRequest)
        .then((response) => (this.info = response.data))
        .catch(function () {
          console.log("FAILURE!!");
        });
      this.XnetIsComplite = false;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    onChangeSelectedDBForAdmin() {
      this.axios
        .get(
          this.url + "/ChangeSelectedBDForAdmin/" + this.selectedForAdmin,
          this.headerForRequest
        )
        .then(
          (response) => (
            (this.StatusChangeSelectedBD = response.data), this.CheckCurrent()
          )
        );
    },
    onChangeSelectedDB() {
      this.axios
        .get(
          this.url + "/ChangeSelectedBD/" + this.selected,
          this.headerForRequest
        )
        .then(
          (response) => (
            (this.StatusChangeSelectedBD = response.data), this.CheckCurrent()
          )
        );
    },
    ReturnSymptomAndType() {
      this.axios
        .get(this.url + "/ReturnSymptomAndTypeForAdmin")
        .then((response) => (this.SymptomAndType = response.data));
    },
    SymptomIdForChangeType(id) {
      this.SymptomIdForChangeTypeInt = id;
    },
    onChangeSelectedType(id) {
      this.axios
        .get(
          this.url + "/ChangeType/" + this.SymptomIdForChangeTypeInt + "/" + id,
          this.headerForRequest
        )
        .then(
          (response) => (
            console.log(response.data), this.ReturnSymptomAndType()
          )
        );
    },
    ChangeToYes() {
      this.axios.get(
        this.url +
          "/ChangeToYes/" +
          this.IdIllnessToChange +
          "/" +
          this.IdSymptomToChange,
        this.headerForRequest
      ),
        this.ChangeStringTable();
    },
    ChangeToNo() {
      this.axios.get(
        this.url +
          "/ChangeToNo/" +
          this.IdIllnessToChange +
          "/" +
          this.IdSymptomToChange,
        this.headerForRequest
      ),
        this.ChangeStringTable();
    },
    ChangeToMaybe() {
      this.axios.get(
        this.url +
          "/ChangeToMaybe/" +
          this.IdIllnessToChange +
          "/" +
          this.IdSymptomToChange,
        this.headerForRequest
      ),
        this.ChangeStringTable();
    },
    ChangeStringTable() {
      this.ClickSymptomForTable(this.IdIllnessToChange, this.Symptom);
    },
    SendNewSymptom() {
      this.axios.get(
        this.url +
          "/AddSymptom/" +
          this.nameSymptom +
          "/" +
          this.nameEngSymptom +
          "/" +
          this.TypeSelected +
          "/" +
          this.ReliabilitySelected,
        this.headerForRequest
      );
    },
    SendNewIllness() {
      this.axios.get(
        this.url +
          "/AddIllness/" +
          this.NameIllness +
          "/" +
          this.NameEngIllness +
          "/" +
          this.IllnessCode +
          "/" +
          this.IllnessEngCode +
          "/" +
          this.frequency
      );
    },
    ClickSymptomForTableOnDialog(id, name) {
      this.IdSymptomToChange = id;
      this.Symptom = name;
    },
    ClickSymptomForTable(id, name) {
      this.IdIllnessToChange = id;
      this.Illness = name;
      this.IllnessStringTable = null;
      this.axios
        .get(this.url + "/TableStringForAdmin/" + id)
        .then((response) => (this.IllnessStringTable = response.data));
    },
    CheckTheSymptom() {
      this.axios
        .get(this.url + "/CheckSymptom")
        .then((response) => (this.CheckSymptom = response.data));
    },
    DeleteAllSelectedIllness() {
      this.illnessSelected = null;
      this.AllIllness1 = null;
      this.AllIllness2 = null;
      this.flagSimptom = false;
      this.DeleteAllSelectedSymptom();
    },
    DeleteAllSelectedSymptom() {
      this.axios.get(this.url + "/DeleteSelectedSymptom");
      this.SymptomId = null;
      (this.visibleSelectedSimptom = false),
        this.axios
          .get(this.url + "/AdminAllIllness")
          .then((response) => (this.AllIllness = response.data));
      this.axios
        .get(this.url + "/AllSymptomForAdmin")
        .then((response) => (this.AllSymptom = response.data));
    },
    ClickIllness(id, name) {
      this.illnessSelected = name;
      this.flagSimptom = true;
      this.axios
        .get(this.url + "/PresentIllness1/" + id)
        .then(
          (response) => (
            (this.AllIllness1 = response.data), this.SearchIllness2(id)
          )
        );
    },
    SearchIllness2(id) {
      this.axios
        .get(this.url + "/PresentIllness2/" + id)
        .then((response) => (this.AllIllness2 = response.data));
    },
    ClickSymptom(id) {
      this.axios
        .get(this.url + "/PresentSymptom/" + id)
        .then(
          (response) => ((this.SymptomId = response.data), this.IllnessSearch())
        );
      this.visibleSelectedSimptom = true;
    },
    SymptomWithoutSelected() {
      this.axios
        .get(this.url + "/HintSymptom")
        .then(
          (response) => (
            (this.AllSymptom = response.data), this.CheckTheSymptom()
          )
        );
    },
    IllnessSearch() {
      this.AllIllness = null;
      this.axios
        .get(this.url + "/IllnessSearch")
        .then(
          (response) => (
            (this.AllIllness = response.data), this.SelectedSymptom()
          )
        );
    },
    SelectedSymptom() {
      this.axios
        .get(this.url + "/SelectedSymptom")
        .then(
          (response) => (this.SymptomId = response.data),
          this.SymptomWithoutSelected()
        );
    },
    DeleteSymptom(id) {
      this.axios
        .get(this.url + "/DeleteSymptom/" + id)
        .then(
          (response) => (
            (this.SymptomId = response.data), this.SyptomAfterDelete()
          )
        );
    },
    SyptomAfterDelete() {
      this.AllIllness = null;
      this.SymptomId = null;
      this.axios
        .get(this.url + "/SelectedSymptom")
        .then((response) => (this.SymptomId = response.data));

      this.axios
        .get(this.url + "/IllnessSearch")
        .then(
          (response) => (this.AllIllness = response.data),
          this.SymptomWithoutSelected()
        );
    },
    CheckCurrent() {
      this.axios
        .get(this.url + "/GetCurrentBD")
        .then((response) => (this.CurrentBD = response.data));
      this.axios
        .get(this.url + "/GetCurrentBDForAdmin")
        .then(
          (response) => (
            (this.GetCurrentBDForAdmin = response.data), this.ReloadAll()
          )
        );
    },
    ReloadAll() {
      this.axios
        .get(this.url + "/CountSymptomForAdmin")
        .then((response) => (this.CountSymptom = response.data));
      this.axios
        .get(this.url + "/CountIllnessForAdmin")
        .then((response) => (this.CountIllness = response.data));
      this.axios
        .get(this.url + "/AllSymptomForAdmin")
        .then((response) => (this.AllSymptom = response.data));
      this.axios
        .get(this.url + "/AdminAllIllness")
        .then((response) => (this.AllIllness = response.data));
      this.axios
        .get(this.url + "/AllTableForAdmin")
        .then((response) => (this.AllTable = response.data));
      this.axios
        .get(this.url + "/ReturnAllTypeForAdmin")
        .then((response) => (this.AllType = response.data));
      this.axios
        .get(this.url + "/ReturnAllTypeWithoutAll")
        .then((response) => (this.ReturnAllTypeWithoutAll = response.data));
      this.axios
        .get(this.url + "/ReturnBdVersionForAdmin", this.headerForRequest)
        .then((response) => (this.BdVersion = response.data));
      this.axios
        .get(this.url + "/GetListOfDB", this.headerForRequest)
        .then((response) => (this.ListDB = response.data));
      this.axios
        .get(this.url + "/ReturnSymptomAndTypeForAdmin")
        .then((response) => (this.SymptomAndType = response.data));
      this.axios
        .get(this.url + "/GetCurrentBD")
        .then((response) => (this.CurrentBD = response.data));
      this.axios
        .get(this.url + "/GetCurrentBDForAdmin")
        .then((response) => (this.GetCurrentBDForAdmin = response.data));

      this.ClickSymptomForTable(1, 0);
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
    this.axios
      .get(this.url + "/CountSymptomForAdmin")
      .then((response) => (this.CountSymptom = response.data));
    this.axios
      .get(this.url + "/CountIllnessForAdmin")
      .then((response) => (this.CountIllness = response.data));
    this.axios
      .get(this.url + "/AllSymptomForAdmin")
      .then((response) => (this.AllSymptom = response.data));
    this.axios
      .get(this.url + "/AdminAllIllness")
      .then((response) => (this.AllIllness = response.data));
    this.axios
      .get(this.url + "/AllTableForAdmin")
      .then((response) => (this.AllTable = response.data));
    this.axios
      .get(this.url + "/ReturnAllTypeForAdmin")
      .then((response) => (this.AllType = response.data));
    this.axios
      .get(this.url + "/ReturnAllTypeWithoutAll")
      .then((response) => (this.ReturnAllTypeWithoutAll = response.data));
    this.axios
      .get(this.url + "/ReturnBdVersionForAdmin", this.headerForRequest)
      .then((response) => (this.BdVersion = response.data));
    this.axios
      .get(this.url + "/GetListOfDB", this.headerForRequest)
      .then((response) => (this.ListDB = response.data));
    this.axios
      .get(this.url + "/ReturnSymptomAndTypeForAdmin")
      .then((response) => (this.SymptomAndType = response.data));
    this.axios
      .get(this.url + "/GetCurrentBD")
      .then((response) => (this.CurrentBD = response.data));
    this.axios
      .get(this.url + "/GetCurrentBDForAdmin")
      .then((response) => (this.GetCurrentBDForAdmin = response.data));

    this.ClickSymptomForTable(1, 0);
  },
};
</script>