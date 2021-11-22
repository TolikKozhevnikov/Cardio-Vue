    
<template>
  <v-app>
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
            <v-card-title class="font-weight-regular">
              Редактирование симптома
            </v-card-title>
            <v-card-text class="black--text">
              Может ли просутствовать выбранный симптом при выбранном
              заболевании?
            </v-card-text>
            <v-card-text class="black--text text-left font-weight-regular">
              Заболевание:
            </v-card-text>
            <v-card-text class="black--text font-weight-medium">
              {{ Illness }}
            </v-card-text>
            <v-card-text class="black--text text-left font-weight-regular">
              Симптом:
            </v-card-text>
            <v-card-text class="black--text font-weight-medium">
              {{ Symptom }}
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="green darken-1"
                text
                @click="ChangeToYes(), (dialog = false)"
              >
                Да
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="ChangeToNo(), (dialog = false)"
              >
                Нет
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="ChangeToMaybe(), (dialog = false)"
              >
                Может быть
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
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
                  text
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
                  text
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
                            text
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
                            v-for="(item, id) in AllType"
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
        <v-row class="pt-3">
          <v-col>
            <th class="text-left text-uppercase font-weight-regular px-3">
              Версия базы данных: {{ BdVersion }}
            </th>
          </v-col>
        </v-row>
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
      BdVersion: null,
      SymptomAndType: null,
      SymptomIdForChangeTypeInt: null,
    };
  },
  methods: {
    ReturnSymptomAndType(){
      this.axios
      .get("http://192.168.1.110:8001/api/ReturnSymptomAndType")
      .then((response) => (this.SymptomAndType = response.data));

    },
    SymptomIdForChangeType(id) {
      this.SymptomIdForChangeTypeInt = id;
    },
    onChangeSelectedType(id) {
      this.axios
      .get(
        "http://192.168.1.110:8001/api/ChangeType/" +
          this.SymptomIdForChangeTypeInt +
          "/" +
          id)
      .then((response) => ((console.log(response.data)), this.ReturnSymptomAndType()))
      
      
    },
    ChangeToYes() {
      this.axios.get(
        "http://192.168.1.110:8001/api/ChangeToYes/" +
          this.IdIllnessToChange +
          "/" +
          this.IdSymptomToChange
      ),
        this.ChangeStringTable();
    },
    ChangeToNo() {
      this.axios.get(
        "http://192.168.1.110:8001/api/ChangeToNo/" +
          this.IdIllnessToChange +
          "/" +
          this.IdSymptomToChange
      ),
        this.ChangeStringTable();
    },
    ChangeToMaybe() {
      this.axios.get(
        "http://192.168.1.110:8001/api/ChangeToMaybe/" +
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
        "http://192.168.1.110:8001/api/AddSymptom/" +
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
        "http://192.168.1.110:8001/api/AddIllness/" +
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
        .get("http://192.168.1.110:8001/api/TableString/" + id)
        .then((response) => (this.IllnessStringTable = response.data));
    },
    CheckTheSymptom() {
      this.axios
        .get("http://192.168.1.110:8001/api/CheckSymptom")
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
      this.axios.get("http://192.168.1.110:8001/api/DeleteSelectedSymptom");
      this.SymptomId = null;
      (this.visibleSelectedSimptom = false),
        this.axios
          .get("http://192.168.1.110:8001/api/AllIllness/")
          .then((response) => (this.AllIllness = response.data));
      this.axios
        .get("http://192.168.1.110:8001/api/AllSymptom")
        .then((response) => (this.AllSymptom = response.data));
    },
    ClickIllness(id, name) {
      this.illnessSelected = name;
      this.flagSimptom = true;
      this.axios
        .get("http://192.168.1.110:8001/api/PresentIllness1/" + id)
        .then(
          (response) => (
            (this.AllIllness1 = response.data), this.SearchIllness2(id)
          )
        );
    },
    SearchIllness2(id) {
      this.axios
        .get("http://192.168.1.110:8001/api/PresentIllness2/" + id)
        .then((response) => (this.AllIllness2 = response.data));
    },
    ClickSymptom(id) {
      this.axios
        .get("http://192.168.1.110:8001/api/PresentSymptom/" + id)
        .then(
          (response) => ((this.SymptomId = response.data), this.IllnessSearch())
        );
      this.visibleSelectedSimptom = true;
    },
    SymptomWithoutSelected() {
      this.axios
        .get("http://192.168.1.110:8001/api/HintSymptom")
        .then(
          (response) => (
            (this.AllSymptom = response.data), this.CheckTheSymptom()
          )
        );
    },
    IllnessSearch() {
      this.AllIllness = null;
      this.axios
        .get("http://192.168.1.110:8001/api/IllnessSearch")
        .then(
          (response) => (
            (this.AllIllness = response.data), this.SelectedSymptom()
          )
        );
    },
    SelectedSymptom() {
      this.axios
        .get("http://192.168.1.110:8001/api/SelectedSymptom")
        .then(
          (response) => (this.SymptomId = response.data),
          this.SymptomWithoutSelected()
        );
    },
    DeleteSymptom(id) {
      this.axios
        .get("http://192.168.1.110:8001/api/DeleteSymptom/" + id)
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
        .get("http://192.168.1.110:8001/api/SelectedSymptom")
        .then((response) => (this.SymptomId = response.data));

      this.axios
        .get("http://192.168.1.110:8001/api/IllnessSearch")
        .then(
          (response) => (this.AllIllness = response.data),
          this.SymptomWithoutSelected()
        );
    },
  },
  mounted() {
    this.axios
      .get("http://192.168.1.110:8001/api/CountSymptom")
      .then((response) => (this.CountSymptom = response.data));
    this.axios
      .get("http://192.168.1.110:8001/api/CountIllness")
      .then((response) => (this.CountIllness = response.data));
    this.axios
      .get("http://192.168.1.110:8001/api/AllSymptom")
      .then((response) => (this.AllSymptom = response.data));
    this.axios
      .get("http://192.168.1.110:8001/api/AllIllness/")
      .then((response) => (this.AllIllness = response.data));
    this.axios
      .get("http://192.168.1.110:8001/api/SelectedSymptom")
      .then((response) => (this.SymptomId = response.data));
    this.axios
      .get("http://192.168.1.110:8001/api/AllTable")
      .then((response) => (this.AllTable = response.data));
    this.axios
      .get("http://192.168.1.110:8001/api/ReturnAllType")
      .then((response) => (this.AllType = response.data));
    this.axios
      .get("http://192.168.1.110:8001/api/ReturnBdVersion")
      .then((response) => (this.BdVersion = response.data));
    this.axios
      .get("http://192.168.1.110:8001/api/ReturnSymptomAndType")
      .then((response) => (this.SymptomAndType = response.data));
  },
};
</script>