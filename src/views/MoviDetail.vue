<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button href="" @click.prevent="goToListado" class="btn btn-success" :href="`/listado/${genre.Id}`">Ir al listado</ion-button>
      </ion-buttons>
      <ion-title>DETALLE</ion-title>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <div class="text-center">
        <ion-card v-if="movie">
          <ion-card-header>
            <ion-card-title>{{ movie.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content class="text-center">
            <ion-thumbnail class="center-img">
              <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster">
            </ion-thumbnail>
            <div class="segment-buttons">
              <ion-button @click="showInfoType('overview')" color="primary">Resumen o Descripción</ion-button>
              <ion-button @click="showInfoType('genres')" color="primary">Géneros</ion-button>
              <ion-button @click="showInfoType('production')" color="primary">País y Empresas Productoras</ion-button>
              <ion-button @click="fetchAndShowTrailer()" color="primary">Ver Trailer</ion-button>
            </div>
            <div v-if="infoType === 'overview'" class="segment-content">
              <p>{{ movie.overview }}</p>
            </div>
            <div v-else-if="infoType === 'genres'" class="segment-content">
              <p>
                Géneros:
                <span v-for="(genre, index) in movie.genres" :key="index">
                  {{ genre.name }}{{ index < movie.genres.length - 1 ? ', ' : '' }}
                </span>
              </p>
            </div>
            <div v-else-if="infoType === 'production'" class="segment-content">
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
            <div v-if="trailerKey" class="segment-content">
              <iframe width="560" height="315" :src="getYouTubeEmbedUrl(trailerKey)" frameborder="0" allowfullscreen></iframe>
            </div>
          </ion-card-content>
        </ion-card>
        <ion-spinner v-else name="crescent"></ion-spinner>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: null,
      infoType: 'overview',
      trailerKey: null
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
        console.error('Error fetching movie details:', error);
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
    async fetchAndShowTrailer() {
      const movieId = this.$route.params.movieId;
      const apiKey = '492d218f089fd8c20e9c3a945b482a9f';
      const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=es-CO`;

      try {
        const response = await axios.get(url);
        const trailers = response.data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');

        if (trailers.length > 0) {
          this.trailerKey = trailers[0].key;
        } else {
          console.log('No trailer found for this movie.');
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    },
    goToListado() {
      if (this.movie && this.movie.genres.length > 0) {
        const genreId = this.movie.genres[0].id;
        this.$router.push({ name: 'listado', params: { genreId } });
      } else {
        console.error('Cannot redirect to list because movie is not loaded or does not have genres.');
      }
    },
    getYouTubeEmbedUrl(key) {
      return `https://www.youtube.com/embed/${key}`;
    }
  },
  created() {
    const movieId = this.$route.params.movieId;
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
  max-width: 200px;
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
.segment-content {
  text-align: center;
  margin: 20px;
}
</style>
