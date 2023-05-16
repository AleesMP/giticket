<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'

let movies = ref([])
const fetchMovies = async () => {
  const { data, error } = await supabase
    .from('movies')
    .select()
    .order('created_at')

  movies.value = data
}

const refreshMovie = async (movieData) => {
  const { data, error } = await supabase
    .from('movies')
    .select()
    .eq('id', movieData.id)

  if (error) {
    console.log(error)
  } else {
    const movieIndexToUpdate = movies.value.indexOf((movie) => movieData.id === movie.id)
    movies.value[movieIndexToUpdate] = data[0]
  }
}

onMounted(() => {
  // Recuperar las peliculas desde la bd supabase
  fetchMovies()
})

defineExpose({
  fetchMovies, refreshMovie
})

</script>

<template>
  <div class="flex flex-col gap-3">
    <h1 class="text-3xl">Listado</h1>
    <table class="border-collapse table-auto" v-if="movies">
      <thead>
        <tr>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">UUID</th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Title</th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Year</th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Genre</th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Synopsis</th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Created_at</th>
          <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Updated_at</th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
        <tr v-for="movie in movies" :key="movie.id">
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.id }}</td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.title }}</td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.year }}</td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.genre }}</td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.synopsis }}</td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ (new Date(movie.created_at)).toISOString() }}
          </td>
          <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ (new Date(movie.updated_at)).toISOString() }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>No hay ninguna película.</div>
  </div>
</template>