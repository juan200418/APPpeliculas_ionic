<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ genre.name }}</ion-card-title>
      </ion-card-header>
    </ion-card>
  </template>
  
  <script>
  export default {
    name: 'GenreCard',
    props: {
      genre: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  /* Puedes añadir estilos personalizados aquí */
  </style>
  