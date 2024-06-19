<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>MI APP PELICULAS</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <!-- Géneros de películas -->
        <ion-grid>
          <ion-row>
            <ion-col v-for="genre in genres" :key="genre.id" size="6" size-md="4">
              <ion-card @click="goToListadoPeliculas(genre.id)">
                <ion-card-header>
                  <ion-card-title>{{ genre.name }}</ion-card-title>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Genres',
    data() {
      return {
        genres: [],
        loading: true
      };
    },
    methods: {
      async fetchGenres() {
        const apiKey = '492d218f089fd8c20e9c3a945b482a9f';
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-CO`;
        try {
          const response = await axios.get(url);
          this.genres = response.data.genres;
          this.loading = false;
        } catch (error) {
          console.error('Error fetching genres:', error);
          this.loading = false;
        }
      },
      goToListadoPeliculas(genreId) {
        // Redirigir a la vista de listado de películas con el ID del género seleccionado
        this.$router.push({
          name: 'listado',
          params: { genreId }
        });
      }
    },
    created() {
      this.fetchGenres();
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente */
  </style>
  