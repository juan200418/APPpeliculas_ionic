<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Listado de Películas</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="goToHome()" class="btn btn-success">Ir al inicio</ion-button>
          </ion-buttons>
        </ion-toolbar>
        
        <ion-list>
          <ion-item v-for="movie in paginatedMovies" :key="movie.id">
            <ion-thumbnail slot="start" @click="showMovieDetail(movie.id)">
              <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster">
            </ion-thumbnail>
            <ion-label>{{ movie.title }}</ion-label>
          </ion-item>
        </ion-list>
  
        <ion-footer v-if="numPages > 1">
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button :disabled="currentPage === 1" @click="prevPage()">Anterior</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button :disabled="currentPage === numPages" @click="nextPage()">Siguiente</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-footer>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ListadoPeliculas',
    props: {
      genreId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        movies: [],
        loading: true,
        currentPage: 1,
        moviesPerPage: 5
      };
    },
    computed: {
      paginatedMovies() {
        const startIndex = (this.currentPage - 1) * this.moviesPerPage;
        const endIndex = startIndex + this.moviesPerPage;
        return this.movies.slice(startIndex, endIndex);
      },
      numPages() {
        return Math.ceil(this.movies.length / this.moviesPerPage);
      }
    },
    methods: {
      async fetchMovies() {
        const apiKey = '492d218f089fd8c20e9c3a945b482a9f';
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-CO&with_genres=${this.genreId}&page=${this.currentPage}`;
  
        try {
          const response = await axios.get(url);
          this.movies = response.data.results;
          this.loading = false;
        } catch (error) {
          console.error('Error fetching movies:', error);
          this.loading = false;
        }
      },
      getMoviePosterUrl(posterPath) {
        if (!posterPath) {
          return 'https://via.placeholder.com/500x750?text=No+Image';
        }
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      },
      showMovieDetail(movieId) {
        // Implementa la navegación a la vista de detalle de la película usando vue-router
        this.$router.push({ name: 'movidetail', params: { movieId } });
      },
      nextPage() {
        if (this.currentPage < this.numPages) {
          this.currentPage++;
          this.fetchMovies();
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.fetchMovies();
        }
      },
      goToHome() {
        // Implementa la navegación a la página de inicio usando vue-router
        this.$router.push('/');
      }
    },
    created() {
      this.fetchMovies(); // Cargar películas al inicio
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente */
  </style>
  