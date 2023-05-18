<script setup>
import { onMounted, ref, computed } from 'vue'
import { supabase } from '../services/supabase'

const supabaseStorageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL
let movies = ref([])
let searchText = ref('')
let selectedGenre = ref([])

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

const props = defineProps({
  currentUser: Object
})

const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log(error)
    } else {
        console.log('Se ha cerrado la sesión')
    }
}

const fetchMovies = async () => {
  const { data, error } = await supabase
    .from('movies')
    .select()
    .order('created_at')

  movies.value = data
}
</script>

<template>
    <div>
        <h1 class="text-3xl text-white">Home</h1>
        <div class="flex flex-col gap-6 px-6">
            <div class="flex gap-4 justify-center">
                <input v-model="searchText" type="text" placeholder="Buscar por título" class="rounded-md lg:w-2/12 bg-gray-100 pl-2">
                <div v-for="genre in allGenres" class="flex gap-2 text-white">
                    <input v-model="selectedGenre" type="checkbox" :value="genre">
                    <label>{{ genre }}</label>
                </div>
            </div>
            <div class="flex flex-wrap">
                <div v-for="movie in filteredMovies" :key="movie.id" class="flex w-1/6 p-2">
                    <a :href="movie.slug" class="flex flex-col bg-blue-300 p-3 rounded-md cursor-pointer">
                        <div>{{ movie.title }}</div>
                        <img :src="supabaseStorageUrl + movie.image">
                    </a>
                </div>
            </div>
        </div>

        <div v-if="currentUser">
            <div>
                Bienvenido/a {{ currentUser.user_metadata.name }}
            </div>
            <button class="px-4 py-2 rounded font-semibold bg-orange-800 w-1/3" type="button" @click="logout">Logout</button>
        </div>
    </div>
</template>