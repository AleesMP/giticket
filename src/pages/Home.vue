<script setup>
import { onMounted, ref, computed } from 'vue'
import { supabase } from '../services/supabase'

const supabaseStorageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL
let movies = ref([])
let searchText = ref('')
let selectedGenre = ref([])
let showGenreFilters = ref(true)

const allGenres = computed(() => {
    return movies.value.map((movie) => movie.genre).filter((tmpGenre, index, tmpGenres) => tmpGenre.length && tmpGenres.indexOf(tmpGenre) == index)
})

const filteredMovies = computed(() => {
    return movies.value.filter((movie) => {
        const movieHasSearchText = movie.title.includes(searchText.value)
        const movieHasSelectedGenre = selectedGenre.value.includes(movie.genre) || !selectedGenre.value.length

        return movieHasSearchText && movieHasSelectedGenre
    })
})

onMounted(() => {
    // Recuperar las peliculas desde la bd supabase
  fetchMovies()
})

const fetchMovies = async () => {
  const { data, error } = await supabase
    .from('movies')
    .select()
    .order('created_at')

  movies.value = data
}
</script>

<template>
    <div class="py-8">
        <div class="flex flex-col gap-6 px-6">
            <div class="flex flex-col md:flex-row gap-4 justify-center">
                <input v-model="searchText" type="text" placeholder="Buscar por título" class="rounded-md bg-gray-100 pl-2 w-2/3 md:w-1/3">
                <button class="flex gap-2 items-center justify-center text-white bg-slate-600 rounded w-44 py-1 md:hidden" @click="showGenreFilters = !showGenreFilters">
                    <span>Filtrar por género</span>
                    <font-awesome-icon :icon="['fas', showGenreFilters ? 'chevron-down' : 'chevron-up']" class="text-xs" />
                </button>
                <div v-if="showGenreFilters" class="flex flex-col md:flex-row gap-x-3">
                    <div v-for="genre in allGenres" class="flex gap-2 text-white">
                        <input v-model="selectedGenre" type="checkbox" :value="genre">
                        <label>{{ genre }}</label>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap">
                <div v-for="movie in filteredMovies" :key="movie.id" class="flex w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
                    <router-link :to="{ name: 'Movie', params: { movieSlug: movie.slug } }" class="flex flex-col bg-blue-400/60 p-3 gap-2 rounded-md hover:bg-blue-300/60 group">
                        <div class="h-min overflow-hidden rounded-md">
                            <img class="rounded-md group-hover:scale-110 transition-all duration-500" :src="supabaseStorageUrl + movie.image">
                        </div>
                        <div class="text-center font-semibold text-white leading-tight">{{ movie.title }}</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>