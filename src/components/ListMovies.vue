<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'

let movies = ref([])
onMounted(async () => {
  // Recuperar las peliculas desde la bd supabase
  const { data, error } = await supabase
    .from('movies')
    .select()

  movies.value = data
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
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.created_at }}</td>
            <td class="border-b border-slate-700 p-4 pl-8 text-slate-400">{{ movie.updated_at }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>No hay ninguna película.</div>
    </div>
</template>