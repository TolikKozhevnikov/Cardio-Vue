<template>
  <v-container>
    <p>Загрузите базу данных или выберите из существующих</p>
    <v-file-input
      v-model="file"
      color="green darken-2"
      v-on:change="handleFileUpload()"
      ref="file"
      label="Нажмите, чтобы загрузить свою базу данных"
    ></v-file-input>
    <v-select
      color="green darken-2"
      :items="items"
      label="Нажмите, чтобы выбрать существующую БД"
    ></v-select>
  </v-container>
</template>