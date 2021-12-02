    
<template>
  <v-app>
    <v-tabs color="green darken-1">
      <v-tab :key="1">Диагностика по симптомам</v-tab>
      <v-tab :key="2">Диагностика по заболеваниям</v-tab>
      <v-tab-item :key="1">
        <v-conteiner class="spacing-playground" fluid>
          <v-row class="pt-3">
            <v-col>
              <th class="text-left text-uppercase font-weight-regular px-3">
                Симптомы
              </th>
              <v-autocomplete
                class="px-4 mt-4"
                v-model="value"
                :items="AllSymptom"
                dense
                item-text="name"
                label="Поиск по симптомам"
                item-value="id"
                @change="ClickSymptom(value)"
                color="green"
              ></v-autocomplete>
              <v-select
                class="px-4"
                v-model="selected"
                @change="onChangeSelectedTask()"
                color="green"
                label="Тип обследования"
                required
                :items="AllType"
                item-text="name"
                item-value="id"
              ></v-select>
              <v-sheet elevation="4" class="overflow-y-auto" max-height="290">
                <v-simple-table dense>
                  <tbody>
                    <tr
                      @click="ClickSymptom(item.id)"
                      v-for="item in AllSymptom"
                      :key="item.name"
                    >
                      <td v-if="item.idType == idTypeSelected" class="py-2">
                        {{ item.name }}
                      </td>
                      <td v-else-if="idTypeSelected == null" class="py-2">
                        {{ item.name }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-sheet>
            </v-col>

            <v-col>
              <div v-if="AllIllness != 'Not'">
                <th class="text-left text-uppercase font-weight-regular px-3">
                  Заболевания
                </th>
                <v-sheet elevation="4" class="overflow-y-auto" max-height="420">
                  <v-simple-table dense>
                    <tbody>
                      <tr v-for="item in AllIllness" :key="item.name">
                        <td class="py-2">{{ item.name }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-sheet>
              </div>
              <div v-else>
                <h2 class="font-weight-light">
                  Не найдено подходящего заболевания
                </h2>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="visibleSelectedSimptom">
            <v-col>
              <v-row class="pa-3" align="center">
                <th class="text-left text-uppercase font-weight-regular px-3">
                  Выбранные симптомы:
                </th>
                <v-spacer></v-spacer>
                <v-btn text color="success" @click="DeleteAllSelectedSymptom()"
                  >Удалить выбранные симптомы</v-btn
                >
              </v-row>

              <v-sheet elevation="4" class="overflow-y-auto" max-height="190">
                <v-simple-table dense>
                  <tbody>
                    <tr
                      @click="DeleteSymptom(item.id)"
                      v-for="item in SymptomId"
                      :key="item.name"
                    >
                      <td class="py-2">{{ item.name }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-sheet>
            </v-col>

            <v-col>
              <div v-if="CheckSymptom != 'not'">
                <v-row class="pa-3" align="center">
                  <th class="text-left text-uppercase font-weight-regular px-3">
                    Следует проверить следующий симптом:
                  </th>
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="ClickSymptom(CheckSymptom.id)"
                    text
                    color="green"
                    >Добавить</v-btn
                  >
                </v-row>

                <v-sheet class="overflow-y-auto" max-height="300">
                  <v-card>
                    <v-card-text>{{ CheckSymptom.name }}</v-card-text>
                  </v-card>
                </v-sheet>
              </div>
            </v-col>
          </v-row>
        </v-conteiner>
      </v-tab-item>
      <v-tab-item :key="2">
        <v-conteiner>
          <v-row class="pt-3">
            <v-col>
              <th class="text-left text-uppercase font-weight-regular px-3">
                Заболевания
              </th>
              <v-sheet elevation="4" class="overflow-y-auto" max-height="650">
                <v-simple-table dense>
                  <tbody>
                    <tr
                      @click="ClickIllness(item.id, item.name)"
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
              <div v-if="flagSimptom">
                <v-row class="pt-3 mr-4">
                  <th class="text-left text-uppercase font-weight-regular px-3">
                    Выбранное заболевание:
                  </th>
                </v-row>
                <v-row class="pt-3 mr-4">
                  <v-card class="rounded-0 d-flex pa-2">
                    <v-card-text class="black--text">
                      {{ illnessSelected }}
                    </v-card-text>
                  </v-card>
                </v-row>
                <v-row class="pt-3 mr-4">
                  <th class="text-left text-uppercase font-weight-regular px-3">
                    Симптомы которые должны быть:
                  </th>
                </v-row>
                <v-row class="pt-3 mr-4">
                  <v-sheet
                    elevation="4"
                    class="overflow-y-auto"
                    max-height="220"
                  >
                    <v-simple-table dense>
                      <tbody>
                        <tr
                          @click="ClickSymptom(item.id)"
                          v-for="item in AllIllness1"
                          :key="item.name"
                        >
                          <td class="py-2">{{ item.name }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-sheet>
                </v-row>
                <v-row class="pt-3 mr-4">
                  <th class="text-left text-uppercase font-weight-regular px-3">
                    Симптомы которые могут быть:
                  </th>
                  <v-sheet
                    elevation="4"
                    class="overflow-y-auto"
                    max-height="220"
                  >
                    <v-simple-table dense>
                      <tbody>
                        <tr
                          @click="ClickSymptom(item.id)"
                          v-for="item in AllIllness2"
                          :key="item.name"
                        >
                          <td class="py-2">{{ item.name }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-sheet>
                </v-row>
                <v-row class="py-3 mr-4">
                  <v-btn
                    block
                    text
                    color="success"
                    @click="DeleteAllSelectedIllness()"
                    >Начать заново</v-btn
                  >
                </v-row>
              </div>
              <div v-else>
                <h2 class="font-weight-light">
                  Выберите заболевание из таблицы.
                </h2>
              </div>
            </v-col>
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
      search: "",
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
        },
      ],
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
      visibleSelectedSimptom: null,
      illnessSelected: null,
      flagSimptom: false,
      CheckSymptom: null,
      IllnessStringTable: null,
      AllType: null,
      idTypeSelected: null,
      value: null,
      UserId: null,
    };
  },
  methods: {
    onChangeSelectedTask() {
      if (this.selected != 0) {
        this.idTypeSelected = this.selected;
      } else {
        this.idTypeSelected = null;
      }
    },
    ChangeToYes() {
      this.axios.get(
        "http://10.12.100.164:8000/api/ChangeToYes/" +
          this.IdIllnessToChange +
          "/" +
          this.IdSymptomToChange
      ),
        this.ChangeStringTable();
    },
    ChangeToNo() {
      this.axios.get(
        "http://10.12.100.164:8000/api/ChangeToNo/" +
          this.IdIllnessToChange +
          "/" +
          this.IdSymptomToChange
      ),
        this.ChangeStringTable();
    },
    ChangeToMaybe() {
      this.axios.get(
        "http://10.12.100.164:8000/api/ChangeToMaybe/" +
          this.IdIllnessToChange +
          "/" +
          this.IdSymptomToChange
      ),
        this.ChangeStringTable();
    },
    ChangeStringTable() {
      this.ClickSymptomForTable(this.IdIllnessToChange, this.Symptom);
    },
    SendNewSymptom() {
      this.axios.get(
        "http://10.12.100.164:8000/api/AddSymptom/" +
          this.nameSymptom +
          "/" +
          this.nameEngSymptom +
          "/" +
          this.TypeSelected +
          "/" +
          this.ReliabilitySelected
      );
    },
    SendNewIllness() {
      this.axios.get(
        "http://10.12.100.164:8000/api/AddIllness/" +
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
        .get("http://10.12.100.164:8000/api/TableString/" + id)
        .then((response) => (this.IllnessStringTable = response.data));
    },
    CheckTheSymptom() {
      this.axios
        .get("http://10.12.100.164:8000/api/CheckSymptom/" + this.UserId)
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
      this.axios.get(
        "http://10.12.100.164:8000/api/DeleteSelectedSymptom/" + this.UserId
      );
      this.SymptomId = null;
      (this.visibleSelectedSimptom = false),
        this.axios
          .get("http://10.12.100.164:8000/api/AllIllness/" + this.UserId)
          .then((response) => (this.AllIllness = response.data));
      this.axios
        .get("http://10.12.100.164:8000/api/AllSymptom")
        .then((response) => (this.AllSymptom = response.data));
    },
    ClickIllness(id, name) {
      this.illnessSelected = name;
      this.flagSimptom = true;
      this.axios
        .get("http://10.12.100.164:8000/api/PresentIllness1/" + id)
        .then(
          (response) => (
            (this.AllIllness1 = response.data), this.SearchIllness2(id)
          )
        );
    },
    SearchIllness2(id) {
      this.axios
        .get("http://10.12.100.164:8000/api/PresentIllness2/" + id)
        .then((response) => (this.AllIllness2 = response.data));
    },
    ClickSymptom(id) {
      this.axios
        .get(
          "http://10.12.100.164:8000/api/PresentSymptom/" +
            this.UserId +
            "/" +
            id
        )
        .then(
          (response) => ((this.SymptomId = response.data), this.IllnessSearch())
        );
      this.visibleSelectedSimptom = true;
    },
    SymptomWithoutSelected() {
      this.axios
        .get("http://10.12.100.164:8000/api/HintSymptom/" + this.UserId)
        .then(
          (response) => (
            (this.AllSymptom = response.data), this.CheckTheSymptom()
          )
        );
    },
    IllnessSearch() {
      this.AllIllness = null;
      this.axios
        .get("http://10.12.100.164:8000/api/IllnessSearch/" + this.UserId)
        .then(
          (response) => (
            (this.AllIllness = response.data), this.SelectedSymptom()
          )
        );
    },
    SelectedSymptom() {
      this.axios
        .get("http://10.12.100.164:8000/api/SelectedSymptom/" + this.UserId)
        .then(
          (response) => (this.SymptomId = response.data),
          this.SymptomWithoutSelected()
        );
    },
    DeleteSymptom(id) {
      this.axios
        .get(
          "http://10.12.100.164:8000/api/DeleteSymptom/" +
            this.UserId +
            "/" +
            id
        )
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
        .get("http://10.12.100.164:8000/api/SelectedSymptom/" + this.UserId)
        .then((response) => (this.SymptomId = response.data));

      this.axios
        .get("http://10.12.100.164:8000/api/IllnessSearch/" + this.UserId)
        .then(
          (response) => (this.AllIllness = response.data),
          this.SymptomWithoutSelected()
        );
    },
  },
  mounted() {
    if (localStorage.getItem("userId") == null) {
      this.axios
        .get("http://10.12.100.164:8000/api/GetUserId")
        .then((response) => (localStorage.userId = response.data));
    }
    this.UserId = localStorage.userId;
    this.axios
      .get("http://10.12.100.164:8000/api/CountSymptom")
      .then((response) => (this.CountSymptom = response.data));
    this.axios
      .get("http://10.12.100.164:8000/api/CountIllness")
      .then((response) => (this.CountIllness = response.data));
    this.axios
      .get("http://10.12.100.164:8000/api/AllSymptom")
      .then((response) => (this.AllSymptom = response.data));
    this.axios
      .get("http://10.12.100.164:8000/api/AllIllness/" + this.UserId)
      .then((response) => (this.AllIllness = response.data));
    this.axios
      .get("http://10.12.100.164:8000/api/SelectedSymptom/" + this.UserId)
      .then((response) => (this.SymptomId = response.data));
    this.axios
      .get("http://10.12.100.164:8000/api/AllTable")
      .then((response) => (this.AllTable = response.data));
    this.axios
      .get("http://10.12.100.164:8000/api/ReturnAllType")
      .then((response) => (this.AllType = response.data));
    if (this.SymptomId != null) {
      this.visibleSelectedSimptom = true
    }
  },
  computed: {
    todosByTitle() {
      return this.AllSymptom.filter(
        (item) => item.name.indexOf(this.search) !== -1
      );
    },
  },
};
</script>