<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'
import { useToast } from 'vue-toastification'

const toast = useToast()

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
    toast.error('Error al listar las películas')
  } else {
    const movieIndexToUpdate = movies.value.indexOf((movie) => movieData.id === movie.id)
    movies.value[movieIndexToUpdate] = data[0]
  }
}

onMounted(() => {
  // Recuperar las peliculas desde la bd supabase
  fetchMovies()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <h1 class="text-3xl">Listado de películas:</h1>
    <div class="w-full overflow-x-auto">
      <table v-if="movies" class="w-full">
        <thead>
          <tr>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">UUID</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Titulo</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Año</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Genero</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Sinopsis</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Fecha de creación</th>
            <th class="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">Última actualización</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-slate-800">
          <tr v-for="movie in movies" :key="movie.id">
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">
              <router-link :to="{ name: 'Movie', params: { movieSlug: movie.slug } }" class="hover:underline">{{ movie.id }}</router-link>
            </td>
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
  </div>
</template>