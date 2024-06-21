<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Listado de Películas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goToHome()" class="btn btn-success">Ir al inicio</ion-button>
        </ion-buttons>
      </ion-toolbar>
      
      <ion-list class="movie-list">
        <ion-item v-for="movie in paginatedMovies" :key="movie.id" class="movie-item" @click="showMovieDetail(movie.id)">
          <ion-thumbnail slot="start" class="movie-thumbnail">
            <ion-img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster"></ion-img>
          </ion-thumbnail>
          <ion-label class="movie-title">{{ movie.title }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-footer v-if="numPages > 1">
        <ion-toolbar class="pagination">
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
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  padding: 20px;
}

.movie-item {
  width: calc(20% - 20px); /* Para mostrar cinco películas en una fila */
  max-width: 300px; /* Ancho máximo de cada película */
  text-align: center; /* Centrar contenido */
}

.movie-thumbnail {
  width: 100%; /* Ajustar el tamaño del contenedor */
  max-width: 300px; /* Ancho máximo de la imagen */
  height: auto; /* Mantener la proporción */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; /* Espacio debajo de cada película */
}

.movie-thumbnail ion-img {
  width: 100%; /* Ajustar la imagen al tamaño del contenedor */
  height: auto; /* Mantener la proporción */
  max-width: 100%;
  max-height: 100%;
}

.movie-title {
  margin-top: 10px;
  text-align: center; /* Centrar el título */
  font-weight: bold; /* Negrita para el título */
  white-space: nowrap; /* Evitar que el título se divida en varias líneas */
  overflow: hidden; /* Ocultar cualquier texto que desborde */
  text-overflow: ellipsis; /* Mostrar puntos suspensivos si el texto desborda */
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 30px 0 50px; /* Ajusta el margen top y bottom para mover todo el contenedor hacia abajo */
}

.pagination ion-button {
  margin: 0 5px;
}
</style>

