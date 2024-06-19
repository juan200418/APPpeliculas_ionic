<template>
    <ion-page>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goToListado()" class="btn btn-success">Ir al listado</ion-button>
        </ion-buttons>
        <ion-title>DETALLE</ion-title>
      </ion-toolbar>
      <ion-content class="ion-padding">
        <ion-card v-if="movie">
          <ion-card-header>
            <ion-card-title>{{ movie.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-thumbnail>
              <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster">
            </ion-thumbnail>
            <ion-button @click="showInfoType('overview')" color="primary">Resumen o Descripción</ion-button>
            <ion-button @click="showInfoType('genres')" color="primary">Géneros</ion-button>
            <ion-button @click="showInfoType('production')" color="primary">País y Empresas Productoras</ion-button>
  
            <div v-if="infoType === 'overview'">
              <p>{{ movie.overview }}</p>
            </div>
            <div v-else-if="infoType === 'genres'">
              <p>
                Géneros:
                <span v-for="(genre, index) in movie.genres" :key="index">
                  {{ genre.name }}{{ index < movie.genres.length - 1 ? ', ' : '' }}
                </span>
              </p>
            </div>
            <div v-else-if="infoType === 'production'">
              <p>Países:
                <span v-for="(country, index) in movie.production_countries" :key="index">
                  {{ country.name }}{{ index < movie.production_countries.length - 1 ? ', ' : '' }}
                </span>
              </p>
              <p>Empresas Productoras:
                <span v-for="(company, index) in movie.production_companies" :key="index">
                  {{ company.name }}{{ index < movie.production_companies.length - 1 ? ', ' : '' }}
                </span>
              </p>
            </div>
          </ion-card-content>
        </ion-card>
        <ion-spinner v-else name="crescent"></ion-spinner>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MovieDetail',
    data() {
      return {
        movie: null,  // Inicialmente no hay película cargada
        infoType: 'overview'  // Tipo de información a mostrar por defecto
      };
    },
    methods: {
      async fetchMovieDetails(movieId) {
        const apiKey = '492d218f089fd8c20e9c3a945b482a9f';
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-CO`;
        try {
          const response = await axios.get(url);
          this.movie = response.data;
        } catch (error) {
          console.error('Error al traer los detalles de la película:', error);
        }
      },
      getMoviePosterUrl(posterPath) {
        if (!posterPath) {
          return 'https://via.placeholder.com/500x750?text=No+Image';
        }
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      },
      showInfoType(type) {
        this.infoType = type;
      },
      goToListado() {
        // Redirigir al listado de películas
        this.$router.push({ name: 'listado', params: { genreId: this.movie.genre_id } });
      }
    },
    created() {
      const movieId = this.$route.params.movieId;  // Obtener el id de la película desde los parámetros de ruta
      this.fetchMovieDetails(movieId);
    }
  };
  </script>
  
  <style scoped>

.text-center {
  text-align: center;
}
.center-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 300px; /* Ajuste para pantallas pequeñas */
  height: auto;
}
.segment-buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap; 
}
.segment-buttons ion-button {
  margin: 5px; 
}
.scrollable-content {
  max-height: calc(100vh - 400px); 
  overflow-y: auto; 
}
.segment-content {
  text-align: center;
  margin: 20px;
}
.trailer-container {
  width: 100px; 
  height: 100px; 
  margin: 0 auto;
}
.trailer-modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
}
  </style>
  