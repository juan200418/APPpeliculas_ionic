<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script>
  export default {
    name: 'HeaderApp',
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  /* Puedes añadir estilos personalizados aquí */
  </style>
  